import ballerina/http;
import ballerina/log;
import ballerinax/postgresql;
import ballerina/sql;
import ballerina/os;

function getEnvWithDefault(string envVar, string defaultValue) returns string {
    string value = os:getEnv(envVar);
    return value != "" ? value : defaultValue;
}

function getIntEnvWithDefault(string envVar, int defaultValue) returns int {
    string value = os:getEnv(envVar);
    int|error result = int:fromString(value);
    if result is int {
        return result;
    }else {
        return defaultValue;
    }
}
postgresql:Options options = {
    connectTimeout: 300 // 5 minutes
};

final postgresql:Client dbClient = check new (
    host = getEnvWithDefault("DB_HOST", "192.168.1.100"),
    port = getIntEnvWithDefault("DB_PORT", 5432),
    username = getEnvWithDefault("DB_USER", "myuser"),
    password = getEnvWithDefault("DB_PASSWORD", "mypassword"),
    database = getEnvWithDefault("DB_NAME", "mydb"),
    options = options
);


type GrantPayload record {|
    string patientId; string providerId; string[] scopes; string purpose;
|};
type EvaluatePayload record {|
    string patientId; string providerId; string scope; boolean emergency; string? reason; string purpose;
|};

listener http:Listener consentListener = new (9080);

service / on consentListener {
    resource function post consent/grant(@http:Payload GrantPayload payload) returns http:Created|error {
        sql:ExecutionResult result = check dbClient->execute(`
            INSERT INTO consents (patient_id, provider_id, scopes, status, purpose, expires_at)
            VALUES (${payload.patientId}, ${payload.providerId}, ${payload.scopes}, 'active', ${payload.purpose}, NOW() + INTERVAL '1 year')
        `);
        log:printInfo("Consent granted", patientId = payload.patientId, providerId = payload.providerId);
        return { body: { ok: true, id: result.lastInsertId } };
    }
    resource function post consent/evaluate(@http:Payload EvaluatePayload payload) returns json|error {
        if payload.emergency {
            log:printWarn("EMERGENCY override initiated", patientId = payload.patientId, actorId = payload.providerId);
            _ = check dbClient->execute(`
                INSERT INTO access_logs (actor_id, patient_id, action, reason, mode, purpose)
                VALUES (${payload.providerId}, ${payload.patientId}, 'EVALUATE', ${payload.reason ?: "Not provided"}, 'emergency', ${payload.purpose})
            `);
            return {decision: "Permit", claims: ["summary.read"], mode: "emergency"};
        }
        stream<record{}, sql:Error?> consentStream = dbClient->query(`
            SELECT * FROM consents WHERE patient_id = ${payload.patientId}
            AND provider_id = ${payload.providerId} AND status = 'active'
            AND expires_at > NOW() AND ${payload.scope} = ANY(scopes)
        `);
        record{}|sql:Error? consent = consentStream.next();
        check consentStream.close();
        if consent is () {
            log:printInfo("Consent denied", patientId = payload.patientId, scope = payload.scope);
            return {decision: "Deny", mode: "normal"};
        } else {
            log:printInfo("Consent permitted", patientId = payload.patientId, scope = payload.scope);
            _ = check dbClient->execute(`
                INSERT INTO access_logs (actor_id, patient_id, action, mode, purpose)
                VALUES (${payload.providerId}, ${payload.patientId}, 'EVALUATE', 'normal', ${payload.purpose})
            `);
            return {decision: "Permit", claims: [payload.scope], mode: "normal"};
        }
    }
}