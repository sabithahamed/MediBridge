import ballerina/http;
import ballerina/io;

// Define the structure for incoming symptom data.
// This matches the OpenAPI contract. Ballerina will automatically
// validate the incoming JSON against this structure.
type SymptomPayload record {|
    string 'type;
    "mild"|"moderate"|"severe" severity;
    string description;
    string startAt;
    // By providing a default value of '()', the field becomes truly optional.
    // The JSON payload does not need to contain the 'endAt' key.
    string? endAt = (); 
|};

// Define the structure for incoming adherence data.
type AdherencePayload record {|
    string planId;
    string at;
    "taken"|"missed" status;
|};

// Create an HTTP server (listener) that will run on port 9082.
listener http:Listener l = new (9082);

// Define a service that attaches to the listener. All requests to
// port 9082 will be handled by this service.
service / on l {

    // This resource function handles POST requests to /symptoms/{patientId}
    // Example: POST /symptoms/p123
    resource function post symptoms/[string patientId](@http:Payload SymptomPayload payload) returns json|error {
        
        // At this point, Ballerina has already validated that the 'payload'
        // matches the SymptomPayload structure. If not, it would have
        // automatically sent back a 400 Bad Request error.

        // For now, we just print the received data to the console to confirm it works.
        io:println("Received Symptom for patient ", patientId, ": ", payload.toJsonString());

        // In the future, this is where we will add the logic to:
        // 1. Map this payload to a FHIR Observation.
        // 2. Persist it to the database.
        // 3. Emit an event to notify the doctor.

        // We return a success response.
        return { ok: true, observationId: "obs-" + patientId + "-001" };
    }

    // This resource function handles POST requests to /adherence
    // The plan shows the patientId in the JWT, not the path, so we'll adjust later if needed.
    resource function post adherence(@http:Payload AdherencePayload payload) returns json|error {

        // Ballerina has automatically validated the payload against the AdherencePayload structure.

        io:println("Received Adherence log: ", payload.toJsonString());

        // Future logic:
        // 1. Persist this adherence log to the database.
        // 2. Recalculate the patient's adherence percentage.
        
        return { ok: true };
    }
}