import ballerina/http;
import ballerina/io;
import ballerina/lang.regexp;
import ballerinax/postgresql;
import ballerina/uuid;
import ballerina/sql;
import ballerina/log;

// Define SymptomPayload record for POST /symptoms/{patientId}
type SymptomPayload record {|
    string 'type;
    "mild"|"moderate"|"severe" severity;
    string description;
    string startAt;
    string? endAt = ();
|};

// After SymptomCode record
type NotificationPayload record {|
    string patientId;
    string observationId;
    string symptomType;
    string severity;
    string description;
    string timestamp;
|};

// Define AdherencePayload record for POST /adherence
type AdherencePayload record {|
    string planId;
    string at;
    "taken"|"missed" status;
|};

// Define SymptomCode record
type SymptomCode record {|
    string code;
    string display;
|};

// Initialize PostgreSQL client in an isolated function
isolated function initDbClient() returns postgresql:Client|error {
    return new (host = "localhost",
                username = "postgres",
                password = "postgres",
                database = "medi_bridge",
                port = 5432);
}

// Global final client
final postgresql:Client dbClient = check initDbClient();
final http:Client notifierClient = check new ("http://localhost:9083"); // Use http://assist:9083 in Docker
// FHIR Adapter client with Bearer token authentication
final http:Client fhirClient = check new ("http://localhost:9443"); // Use http://gateway:9443 in Docker

listener http:Listener l = new (9082);

service / on l {
    // Handle POST /symptoms/{patientId}
    // Handle POST /symptoms/{patientId}
    isolated resource function post symptoms/[string patientId](@http:Payload SymptomPayload payload) returns json|http:BadRequest|http:InternalServerError|error {
        // Simple SNOMED CT mapping for symptom types (extend as needed)
        final map<SymptomCode> SYMPTOM_CODES = {
            "fever": {code: "386661006", display: "Fever"},
            "cough": {code: "49727002", display: "Cough"},
            "headache": {code: "25064002", display: "Headache"},
            "fatigue": {code: "84229001", display: "Fatigue"}
        };

        // Log the received payload
        io:println("Received Symptom for patient ", patientId, ": ", payload.toJsonString());

        // Additional validation (beyond type checking)
        if payload.'type.trim() == "" {
            return <http:BadRequest>{ body: { "error": "Type cannot be empty" } };
        }
        if payload.description.trim() == "" {
            return <http:BadRequest>{ body: { "error": "Description cannot be empty" } };
        }
        if !isValidDateTime(payload.startAt) {
            return <http:BadRequest>{ body: { "error": "Invalid startAt format, expected ISO 8601 (e.g., 2025-08-29T10:00:00Z)" } };
        }
        if !patientId.matches(re `^[a-zA-Z0-9]{1,50}$`) {
            return <http:BadRequest>{ body: { "error": "Invalid patientId: must be alphanumeric, 1-50 characters" } };
        }
        string? endAt = payload.endAt;
        if endAt is string {
            if endAt.trim() == "" {
                return <http:BadRequest>{ body: { "error": "endAt cannot be empty if provided" } };
            }
            if !isValidDateTime(endAt) {
                return <http:BadRequest>{ body: { "error": "Invalid endAt format, expected ISO 8601 (e.g., 2025-08-29T10:00:00Z)" } };
            }
        }
        if SYMPTOM_CODES[payload.'type] is () {
            return <http:BadRequest>{ body: { "error": "Unsupported symptom type, must be one of: " + SYMPTOM_CODES.keys().toString() } };
        }

        // Map to FHIR Observation
        SymptomCode symptomCode = SYMPTOM_CODES.get(payload.'type);
        map<json> fhirObs = {
            "resourceType": "Observation",
            "status": "final",
            "category": [
                {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                            "code": "patient-reported"
                        }
                    ]
                }
            ],
            "code": {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": symptomCode.code,
                        "display": symptomCode.display
                    }
                ]
            },
            "subject": {
                "reference": "Patient/" + patientId
            },
            "note": [
                {
                    "text": payload.description
                }
            ]
        };
        if endAt is string && endAt.trim() != "" {
            fhirObs["effectivePeriod"] = {
                "start": payload.startAt,
                "end": endAt
            };
        } else {
            fhirObs["effectiveDateTime"] = payload.startAt;
        }

        // Log FHIR Observation
        io:println("Mapped FHIR Observation: ", fhirObs.toJsonString());        

        do {
            // Check if patient exists in patients table
            sql:ParameterizedQuery checkQuery = `SELECT COUNT(*) FROM patients WHERE patient_id = ${patientId}`;
            int count = check dbClient->queryRow(checkQuery);

            // If patient does not exist, insert minimal record
            if count == 0 {
                sql:ParameterizedQuery insertPatientQuery = `INSERT INTO patients (patient_id, created_at) VALUES (${patientId}, CURRENT_TIMESTAMP)`;
                _ = check dbClient->execute(insertPatientQuery);
                io:println("Inserted minimal patient record for patientId: ", patientId);
            }

            // Generate unique obs_id
            string obsId = "obs-" + patientId + "-" + uuid:createType4AsString().substring(0, 8);
            int maxRetries = 5;
            int retryCount = 0;
            boolean isUnique = false;

            while !isUnique && retryCount < maxRetries {
                obsId = "obs-" + patientId + "-" + uuid:createType4AsString().substring(0, 8);
                sql:ParameterizedQuery checkObsQuery = `SELECT COUNT(*) FROM observations WHERE obs_id = ${obsId}`;
                int obsCount = check dbClient->queryRow(checkObsQuery);
                if obsCount == 0 {
                    isUnique = true;
                } else {
                    retryCount += 1;
                    io:println("obs_id collision detected: ", obsId, ", retrying (", retryCount, "/", maxRetries, ")");
                }
            }
            if !isUnique {
                return <http:InternalServerError>{ body: { "error": "Failed to generate unique obs_id after " + maxRetries.toString() + " attempts" } };
            }

            // Insert into observations table
            sql:ParameterizedQuery insertQuery = `INSERT INTO observations (obs_id, patient_id, type, severity, description, start_at, end_at)
                                                VALUES (${obsId}, ${patientId}, ${payload.'type}, ${payload.severity}, ${payload.description}, ${payload.startAt}::TIMESTAMP, ${payload.endAt}::TIMESTAMP)`;
            _ = check dbClient->execute(insertQuery);

            // After INSERT INTO observations and before return
            NotificationPayload notification = {
                patientId: patientId,
                observationId: obsId,
                symptomType: payload.'type,
                severity: payload.severity,
                description: payload.description,
                timestamp: payload.startAt
            };
            
            do {
                _ = check notifierClient->post("/notify", notification, targetType = json); // Specify response type as json
                log:printInfo("Notification sent for observation: " + obsId);
            } on fail var e {
                log:printError("Failed to send notification for observation: " + obsId, e);
            }

            // Send FHIR Observation to FHIR Adapter
            do {
                string accessToken = check getKeycloakToken();
                http:Request fhirRequest = new;
                fhirRequest.setJsonPayload(fhirObs);
                _ = check fhirClient->post("/fhir/Observation", fhirRequest, headers = {"Authorization": "Bearer " + accessToken}, targetType = json);
                log:printInfo("FHIR Observation sent for observation: " + obsId);
            } on fail var e {
                log:printError("Failed to send FHIR Observation for observation: " + obsId, e);
            }

            // Return success with generated obs_id
            return { "ok": true, "observationId": obsId };
        } on fail error e {
            // Handle SQL errors, e.g., foreign key violations
            if e is sql:DatabaseError && e.message().includes("foreign key") {
                return <http:BadRequest>{ body: { "error": "Patient ID does not exist" } };
            }
            // Log other errors and return generic error
            io:println("Database error: ", e.message());
            return <http:InternalServerError>{ body: { "error": "Failed to process symptom: " + e.message() } };
        }
    }

    // Handle POST /adherence
    isolated resource function post adherence(@http:Payload AdherencePayload payload) returns json|http:BadRequest|http:InternalServerError|error {
        // Log the received payload
        io:println("Received Adherence log: ", payload.toJsonString());

        // Additional validation
        if payload.planId.trim() == "" {
            return <http:BadRequest>{ body: { "error": "planId cannot be empty" } };
        }
        if !isValidDateTime(payload.at) {
            return <http:BadRequest>{ body: { "error": "Invalid at format, expected ISO 8601 (e.g., 2025-08-29T10:00:00Z)" } };
        }

        do {
            // Check if planId exists in medication_plans table
            sql:ParameterizedQuery checkQuery = `SELECT COUNT(*) FROM medication_plans WHERE plan_id = ${payload.planId}`;
            int count = check dbClient->queryRow(checkQuery);

            // If planId does not exist, log a warning and proceed
            if count == 0 {
                io:println("Warning: planId ", payload.planId, " not found in medication_plans. Proceeding with adherence log.");
                // Optional: Insert stub plan with only plan_id (adjust based on actual schema)
                sql:ParameterizedQuery insertPlanQuery = `INSERT INTO medication_plans (plan_id) VALUES (${payload.planId})`;
                _ = check dbClient->execute(insertPlanQuery);
                io:println("Inserted stub medication plan for planId: ", payload.planId);
            }

            // Insert into adherence_logs table
            sql:ParameterizedQuery insertQuery = `INSERT INTO adherence_logs (plan_id, at, status)
                                                VALUES (${payload.planId}, ${payload.at}::TIMESTAMP, ${payload.status})`;
            sql:ExecutionResult result = check dbClient->execute(insertQuery);

            // Retrieve last insert ID (BIGSERIAL log_id) and cast to int or string
            anydata logId = result.lastInsertId;
            string|int jsonLogId = logId is int ? logId : logId.toString();

            // Return success with generated log_id
            return { "ok": true, "logId": jsonLogId };
        } on fail error e {
            // Handle SQL errors, e.g., foreign key violations
            if e is sql:DatabaseError && e.message().includes("foreign key") {
                return <http:BadRequest>{ body: { "error": "Medication plan ID does not exist" } };
            }
            // Log other errors and return generic error
            io:println("Database error: ", e.message());
            return <http:InternalServerError>{ body: { "error": "Failed to process adherence log: " + e.message() } };
        }
    }
}

// Helper function to validate ISO 8601 date-time format
isolated function isValidDateTime(string dt) returns boolean {
    regexp:RegExp r = re `^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,6})?(?:Z|[+-](?:0\d|1[0-2]):[0-5]\d)$`;
    return dt.matches(r);
}

// Function to fetch Keycloak access token using client credentials
isolated function getKeycloakToken() returns string|error {
    http:Client keycloakClient = check new ("http://localhost:8080"); // Adjust to your Keycloak server URL, e.g., http://keycloak:8080 in Docker
    string clientId = "medi-bridge";
    string clientSecret = "YOUR_CLIENT_SECRET_HERE"; 
    string tokenEndpoint = "/auth/realms/your-realm/protocol/openid-connect/token"; // Adjust realm as per Keycloak setup

    map<string> payload = {
        "grant_type": "client_credentials",
        "client_id": clientId,
        "client_secret": clientSecret
    };

    http:Request request = new;
    request.setPayload(payload);
    request.addHeader("Content-Type", "application/x-www-form-urlencoded");

    json response = check keycloakClient->post(tokenEndpoint, request, targetType = json);
    string? accessToken = (check response.access_token).toString();
    
    if accessToken is () {
        return error("Failed to retrieve access token from Keycloak");
    }
    
    log:printInfo("Successfully fetched Keycloak access token");
    return accessToken;
}

