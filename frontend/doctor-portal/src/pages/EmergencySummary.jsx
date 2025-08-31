import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { patients } from "../data/mockData";

export default function EmergencySummary() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) return <p className="text-red-500">Patient not found</p>;

  return (
    <div className="animate-fade-in">
      {/* Header with Warning */}
      <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 rounded-r-lg">
        <div className="flex items-center">
          <i className="fa-solid fa-triangle-exclamation text-3xl text-red-600 mr-4"></i>
          <div>
            <h1 className="text-2xl font-bold text-red-800">Emergency Access Mode</h1>
            <p className="text-red-700">
              You are viewing a limited, critical-only summary for <strong>{patient.name}</strong>. This access is being logged and audited.
            </p>
          </div>
        </div>
      </div>
      
      {/* Back Button */}
       <button onClick={() => navigate('/doctor/emergency')} className="text-blue-600 hover:underline mb-4">
          <i className="fa-solid fa-arrow-left mr-2"></i>Return to Emergency Access
        </button>

      {/* Limited Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <Card title="Critical Information" className="border-red-500 border-2">
          <div className="space-y-3 text-lg">
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
          </div>
        </Card>
        
        <Card title="Known Allergies & Conditions" className="border-red-500 border-2">
          <ul className="list-disc list-inside space-y-2 text-lg text-red-700 font-semibold">
            {patient.medicalHistory.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
             {/* Adding a mock critical allergy for demo purposes */}
            <li>Penicillin Allergy</li>
          </ul>
        </Card>
        
        <Card title="Current Medications" className="md:col-span-2 border-red-500 border-2">
           <ul className="list-disc list-inside space-y-2 text-lg">
            {patient.medications.map((med, index) => (
              <li key={index}>{med}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}