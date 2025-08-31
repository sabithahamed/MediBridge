import ballerina/http;
import ballerina/io;
import ballerina/lang.regexp;

// Define SymptomPayload record for POST /symptoms/{patientId}
type SymptomPayload record {|
    string 'type;
    "mild"|"moderate"|"severe" severity;
    string description;
    string startAt;
    string? endAt = ();
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


listener http:Listener l = new (9082);

service / on l {
    // Handle POST /symptoms/{patientId}
    isolated resource function post symptoms/[string patientId](@http:Payload SymptomPayload payload) returns json|http:BadRequest {

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
        // Validate endAt if provided and non-empty
        string? endAt = payload.endAt;
        if endAt is string && endAt.trim() != "" {
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
        if payload.endAt is string {
            // string? endAt = payload.endAt;
            if endAt is string && endAt.trim() != "" {
                fhirObs["effectivePeriod"] = {
                    "start": payload.startAt,
                    "end": endAt
                };
            } else {
                fhirObs["effectiveDateTime"] = payload.startAt;
            }
        } else {
            fhirObs["effectiveDateTime"] = payload.startAt;
        }

        // Log FHIR Observation
        io:println("Mapped FHIR Observation: ", fhirObs.toJsonString());

        // Stub response (persistence will be added in Step 4)
        return { "ok": true, "observationId": "obs-" + patientId + "-001" };
    }

    // Handle POST /adherence
    isolated resource function post adherence(@http:Payload AdherencePayload payload) returns json|http:BadRequest {
        // Log the received payload
        io:println("Received Adherence log: ", payload.toJsonString());

        // Additional validation
        if payload.planId.trim() == "" {
            return <http:BadRequest>{ body: { "error": "planId cannot be empty" } };
        }
        if !isValidDateTime(payload.at) {
            return <http:BadRequest>{ body: { "error": "Invalid at format, expected ISO 8601 (e.g., 2025-08-29T10:00:00Z)" } };
        }

        // Stub response (persistence will be added in Step 4)
        return { "ok": true };
    }
}

// Helper function to validate ISO 8601 date-time format
isolated function isValidDateTime(string dt) returns boolean {
    // Basic ISO 8601 check (e.g., 2025-08-29T10:00:00Z)
    regexp:RegExp r = re `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$`;
    return dt.matches(r);
}