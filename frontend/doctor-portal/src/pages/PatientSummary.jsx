import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { patients } from "../data/mockData";

export default function PatientSummary() {
  const { patientId } = useParams();
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) return <p className="text-red-500">Patient not found</p>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Patient Summary</h1>
        <p className="text-gray-600">Detailed information about {patient.name}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Personal Information">
          <div className="space-y-3">
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>ID:</strong> {patient.id}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
          </div>
        </Card>
        
        <Card title="Latest Symptoms">
          <div className="space-y-3">
            <p><strong>Description:</strong> {patient.latestSymptom.description}</p>
            <p><strong>Date Reported:</strong> {patient.latestSymptom.date}</p>
          </div>
        </Card>
        
        <Card title="Medical History">
          <ul className="list-disc list-inside space-y-1">
            {patient.medicalHistory.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
          </ul>
        </Card>
        
        <Card title="Current Medications">
          <ul className="list-disc list-inside space-y-1">
            {patient.medications.map((med, index) => (
              <li key={index}>{med}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}