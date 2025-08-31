import { useState } from 'react';
import Card from '../components/Card';

// This is the hardcoded response that mimics your Ballerina assist-service stub
const mockApiResponse = {
  suggestions: {
    guidance: "Hydrate, rest, monitor temperature. If fever > 39°C, rash spreads, or breathing difficulty — seek urgent care.",
    red_flags: ["Chest pain", "Shortness of breath", "Confusion", "Stiff neck"],
    note: "This is general guidance, not a medical diagnosis."
  },
  input: "" // We will fill this with the user's input
};

export default function AiAssist() {
  const [symptomText, setSymptomText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGetSuggestions = () => {
    if (!symptomText.trim()) {
      alert("Please enter a symptom description.");
      return;
    }
    setIsLoading(true);
    setResult(null);

    // Simulate a 1.5-second API call to the LLM service
    setTimeout(() => {
      const response = { ...mockApiResponse, input: symptomText };
      setResult(response);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
            <div className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl bg-purple-100`}>
                <i className={`fa-solid fa-robot text-3xl text-purple-600`}></i>
            </div>
            <div>
                <h1 className="text-4xl font-bold text-gray-800">AI Symptom Assist</h1>
                <p className="text-gray-600 mt-1">Get non-diagnostic guidance and potential red flags based on symptoms.</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Symptom Checker</h2>
          <p className="text-gray-600 mb-4">
            Enter the patient-reported symptoms below. The assistant will provide general guidance and highlight potential red-flag conditions.
          </p>
          <textarea
            value={symptomText}
            onChange={(e) => setSymptomText(e.target.value)}
            placeholder='e.g., "Patient reports a fever for 3 days and a spreading rash..."'
            className="w-full p-4 border border-gray-300 rounded-lg h-40 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleGetSuggestions}
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center justify-center text-lg font-semibold"
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Analyzing...
              </>
            ) : (
              <>
                <i className="fa-solid fa-lightbulb mr-2"></i>
                Get Suggestions
              </>
            )}
          </button>
        </Card>

        {/* Result Section */}
        <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Assistant Response</h2>
            { !result && !isLoading && (
                 <div className="text-center text-gray-500 py-16">
                    <i className="fa-solid fa-wand-magic-sparkles text-4xl mb-4"></i>
                    <p>Results will be displayed here.</p>
                </div>
            )}
             { isLoading && (
                 <div className="text-center text-gray-500 py-16">
                    <i className="fa-solid fa-spinner fa-spin text-4xl mb-4 text-blue-500"></i>
                    <p>Generating suggestions...</p>
                </div>
            )}
            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2 flex items-center"><i className="fa-solid fa-notes-medical text-green-600 mr-2"></i>General Guidance</h3>
                        <p className="bg-gray-100 p-3 rounded-lg">{result.suggestions.guidance}</p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-gray-700 mb-2 flex items-center"><i className="fa-solid fa-flag text-red-600 mr-2"></i>Potential Red Flags</h3>
                        <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                           <ul className="list-disc list-inside space-y-1 text-red-800 font-medium">
                               {result.suggestions.red_flags.map((flag, index) => <li key={index}>{flag}</li>)}
                           </ul>
                        </div>
                    </div>
                     <div className="pt-4 border-t mt-4">
                        <p className="text-sm text-gray-500 italic"><i className="fa-solid fa-shield-halved mr-2"></i><strong>Disclaimer:</strong> {result.suggestions.note}</p>
                    </div>
                </div>
            )}
        </Card>
      </div>
    </div>
  );
}