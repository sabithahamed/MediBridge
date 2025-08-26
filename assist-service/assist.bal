import ballerina/http;
import ballerina/io;

listener http:Listener l = new (9083);

service / on l {
    resource function post symptom-check(@http:Payload json body) returns json|error {
        string text = <string>body["text"];
        // Example external API call (replace with actual endpoint + key). For MVP, return a stub.
        json suggestions = {
            guidance: "Hydrate, rest, monitor temperature. If fever > 39°C, rash spreads, or breathing difficulty — seek urgent care.",
            red_flags: ["Chest pain", "Shortness of breath", "Confusion", "Stiff neck"],
            note: "This is general guidance, not a medical diagnosis."
        };
        return { suggestions, input: text };
    }
}
