import { useState } from "react";

export default function AddPatientModal({ onClose, onInviteSent }) {
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");

  const handleSendInvite = () => {
    if (patientName && patientId) {
      // In a real app, this would trigger an API call.
      // For the demo, we'll just show the success message.
      onInviteSent(`Invite successfully sent to ${patientName}. The patient needs to approve the request.`);
      onClose(); // Close this modal
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Stop propagation to prevent modal from closing when clicking inside
  const handleModalContentClick = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        onClick={handleModalContentClick}
        style={{ animation: 'zoomIn 0.3s forwards' }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Patient</h2>
        <p className="text-gray-600 mb-6">Enter the patient's details to send a connection request. They will need to approve it before you can view their data.</p>

        <div className="space-y-4">
          <div>
            <label className="font-semibold text-gray-700">Patient Full Name</label>
            <input
              type="text"
              placeholder="e.g., John Doe"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Patient National ID / Hospital ID</label>
            <input
              type="text"
              placeholder="Enter a unique identifier"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="py-2 px-5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSendInvite}
            className="py-2 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
          >
            <i className="fa-solid fa-paper-plane mr-2"></i>
            Send Invite
          </button>
        </div>
      </div>
       <style>{`
        @keyframes zoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}