import { useState } from "react";
import Card from "../components/Card";

export default function EmergencyAccess() {
  const [reason, setReason] = useState("");

  const requestAccess = () => {
    if (reason) {
      alert("Emergency access granted for reason: " + reason);
      setReason("");
    } else {
      alert("Please provide a justification.");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Emergency Access</h1>
        <p className="text-gray-600">Request temporary access to patient records in emergency situations</p>
      </div>
      
      <Card title="Request Emergency Access">
        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            Please provide a detailed justification for emergency access to patient records.
            This request will be logged and reviewed.
          </p>
        </div>
        <textarea
          placeholder="Justification for emergency access..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg h-32 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          onClick={requestAccess}
          className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <i className="fa-solid fa-triangle-exclamation mr-2"></i>
          Request Emergency Access
        </button>
      </Card>
    </div>
  );
}