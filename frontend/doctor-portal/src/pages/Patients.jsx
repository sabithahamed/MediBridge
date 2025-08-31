import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { patients as mockPatients } from "../data/mockData";
import AddPatientModal from "../components/AddPatientModal";
import SuccessDialog from "../components/SuccessDialog";

// Add a 'status' to our mock data for the demo
const patientsWithStatus = mockPatients.map((p, index) => ({
  ...p,
  status: index % 2 === 0 ? "Active" : "Pending Approval",
  lastActivity: `Symptom reported: ${p.latestSymptom.date}`
}));

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState(patientsWithStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.includes(searchTerm)
  );
  
  const handleInviteSent = (message) => {
    setSuccessMessage(message);
  };

  return (
    <div className="animate-fade-in">
      {isModalOpen && <AddPatientModal onClose={() => setIsModalOpen(false)} onInviteSent={handleInviteSent} />}
      {successMessage && <SuccessDialog message={successMessage} onClose={() => setSuccessMessage("")} />}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Manage Patients</h1>
          <p className="text-gray-600 mt-1">Search, view, and add patients to your network.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-md flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i>
          Add New Patient
        </button>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
      </div>

      {/* Patient List Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                         <i className="fa-solid fa-user text-blue-500"></i>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.age} years, {patient.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.lastActivity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => patient.status === 'Active' ? navigate(`/doctor/patient/${patient.id}`) : alert('Patient has not approved access yet.')}
                      className={`py-2 px-4 rounded-lg font-semibold transition-colors ${
                        patient.status === 'Active' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">No patients found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}