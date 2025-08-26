import ballerina/http;
import ballerina/io;

listener http:Listener l = new (9082);

service / on l {
    resource function post symptoms/[string patientId](@http:Payload json s) returns json {
        // Validate shape; map to FHIR Observation; persist; emit event
        io:println("Symptom for ", patientId, ": ", s.toJsonString());
        return { ok: true, observationId: "obs-"+patientId+"-001" };
    }
    resource function post adherence(@http:Payload json a) returns json {
        // { planId, at, status } -> persist, recalc adherence%
        io:println("Adherence log: ", a.toJsonString());
        return { ok: true };
    }
}
