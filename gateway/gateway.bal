import ballerina/http;
import ballerina/jwt;

type Claims record {|
    string sub;
    string[] scope?;
    string preferred_username?;
    boolean emergency?;
|};

listener http:Listener gw = new (9443, config = {
    secureSocket: { keyStore: { path: "resources/keystore.p12", password: "changeit" }, mutualSsl: { verifyClient: http:REQUIRE } }
});

jwt:JwtValidator validator = check new ({
    issuer: "http://keycloak:8080/realms/medibridge",
    audience: ["gateway"],
    signatureConfig: { jwksUrl: "http://keycloak:8080/realms/medibridge/protocol/openid-connect/certs" }
});

service /v1 on gw {

    resource function get patients/[string patientId]/summary(http:Request req) returns json|error {
        Claims c = check validate(req);
        if !hasScope(c, "summary.read") { return error("insufficient_scope"); }
        // TODO: call adapter/summary aggregation service
        return { patientId, summary: { allergies:[], meds:[], problems:[] } };
    }

    resource function post patients/[string patientId]/symptoms(@http:Payload json payload, http:Request req) returns json|error {
        Claims c = check validate(req);
        if !hasScope(c, "symptom.write") { return error("insufficient_scope"); }
        http:Client prd = check new ("https://prd:9082", { secureSocket: { cert: "resources/trust.crt" } });
        return check prd->post("/symptoms/"+patientId, payload);
    }

    resource function post patients/[string patientId]/adherence(@http:Payload json payload, http:Request req) returns json|error {
        Claims c = check validate(req);
        if !hasScope(c, "adherence.write") { return error("insufficient_scope"); }
        http:Client prd = check new ("https://prd:9082", { secureSocket: { cert: "resources/trust.crt" } });
        return check prd->post("/adherence", payload);
    }

    resource function post assist/symptom-check(@http:Payload json payload, http:Request req) returns json|error {
        Claims c = check validate(req);
        if !hasScope(c, "assist.use") { return error("insufficient_scope"); }
        http:Client ai = check new ("https://assist:9083");
        return check ai->post("/symptom-check", payload);
    }

    function validate(http:Request req) returns Claims|error {
        string auth = check req.getHeader("authorization");
        string token = auth.split(" ")[1];
        jwt:Jwt j = check validator.validate(token);
        return <Claims>check j.getPayload();
    }

    function hasScope(Claims c, string s) returns boolean {
        return c.scope?.includes(s) ?: false;
    }
}
