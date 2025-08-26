import ballerina/http;
import ballerina/io;

listener http:Listener l = new (9080);

service /consent on l {
    resource function post evaluate(@http:Payload json req) returns json {
        // req: { patientId, providerId, scope, emergency: boolean, reason?: string }
        boolean emergency = <boolean>req["emergency"];
        if emergency {
            // Record break-glass; return limited claims
            io:println("EMERGENCY override for patient: ", req["patientId"].toString());
            return { decision: "Permit", claims: ["summary.read"], mode: "emergency" };
        }
        // TODO: Lookup stored consent by patient/provider/scope
        return { decision: "Permit", claims: [<string>req["scope"]], mode: "normal" };
    }

    resource function post grant(@http:Payload json req) returns json {
        // TODO: persist consent
        return { ok: true };
    }

    resource function post revoke(@http:Payload json req) returns json {
        // TODO: persist revoke
        return { ok: true };
    }
}
