import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { patients } from "../data/mockData";
import SuccessDialog from "../components/SuccessDialog";

export default function EmergencyAccess() {
  const [reason, setReason] = useState("");
  const [nic, setNic] = useState("");
  const [matched, setMatched] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLookup = () => {
    if(!nic) return;
    const p = patients.find(p=> p.nic?.toLowerCase() === nic.toLowerCase());
    if(p){
      setMatched(p);
    } else {
      // create ephemeral patient stub for demo
      const stub = {
        id: 'E'+Date.now(),
        name: 'Unknown Patient',
        nic,
        age: '—',
        gender: '—',
        medicalHistory: ['Unknown'],
        medications: ['Unknown'],
      };
      localStorage.setItem('ephemeral_'+nic, JSON.stringify(stub));
      setMatched(stub);
    }
  };

  const handleRequestAccess = () => {
    if (matched && reason) {
      setShowConfirmation(true);
    } else {
      alert("Lookup patient by NIC and provide justification.");
    }
  };

  const confirmAccess = () => {
    // Hide confirmation and show success dialog
    setShowConfirmation(false);
  setSuccessMessage(`Emergency access for ${matched.name} granted. Redirecting...`);
    
    // Simulate API call and redirect
    setTimeout(() => {
  navigate(`/doctor/emergency/${matched.id}?nic=${nic}`);
    }, 2000); // Wait 2 seconds before redirecting
  };

  return (
    <div className="animate-fade-in">
      {successMessage && <SuccessDialog message={successMessage} onClose={() => setSuccessMessage("")} />}
      
      {/* Confirmation Modal */}
      {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
              <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full">
                  <h2 className="text-2xl font-bold text-gray-800">Confirm Emergency Access</h2>
                  <p className="text-gray-600 my-4">Are you sure you want to proceed? This action will be permanently recorded in the audit log and the patient will be notified.</p>
                  <div className="mt-6 flex justify-end gap-3">
                      <button onClick={() => setShowConfirmation(false)} className="py-2 px-5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                      <button onClick={confirmAccess} className="py-2 px-5 bg-red-600 text-white rounded-lg hover:bg-red-700">Confirm Access</button>
                  </div>
              </div>
          </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Emergency Access</h1>
        <p className="text-gray-600 mt-1">Request temporary, audited access to a patient's critical data.</p>
      </div>
      
      <Card>
        {/* NIC Lookup */}
        <div className="mb-6">
          <label className="font-semibold text-gray-700 mb-2 block text-lg">1. Enter Patient NIC</label>
          <div className="flex gap-2">
            <input value={nic} onChange={e=>setNic(e.target.value)} placeholder="e.g. 852345678V" className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button type="button" onClick={handleLookup} className="px-5 bg-blue-600 text-white rounded-lg font-semibold">Lookup</button>
          </div>
          {matched && <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-800 flex items-center gap-2"><i className="fa-solid fa-user-shield"/> {matched.name} {matched.nic && <span className="text-xs text-blue-500">({matched.nic})</span>}</div>}
        </div>

        {/* Justification Input */}
        <div className="mb-6">
          <label className="font-semibold text-gray-700 mb-2 block text-lg">2. Provide Justification</label>
           <p className="text-sm text-gray-500 mb-2">
            Be specific. E.g., "Patient is unconscious in ER, need to check for allergies before administering medication."
          </p>
          <textarea
            placeholder="Justification for emergency access..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleRequestAccess}
          disabled={!matched || !reason}
          className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center text-lg"

        >
          <i className="fa-solid fa-triangle-exclamation mr-2"></i>
          Request Emergency Access
        </button>
      </Card>
    </div>
  );
}