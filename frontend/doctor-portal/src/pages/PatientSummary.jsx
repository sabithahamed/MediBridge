import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../components/Card";
import { patients } from "../data/mockData";

// Reusable component for displaying a vital sign
const VitalSign = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
    <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-${color}-100`}>
      <i className={`fa-solid ${icon} text-xl text-${color}-600`}></i>
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default function PatientSummary() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('history'); // 'history' or 'medications'
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) return <p className="text-center text-red-500 text-xl">Patient not found.</p>;

  return (
    <div className="animate-fade-in">
      {/* Patient Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 flex items-center justify-center bg-blue-100 rounded-full">
            <i className="fa-solid fa-user text-4xl text-blue-500"></i>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{patient.name}</h1>
            <p className="text-gray-600 text-md">
              {patient.age} years old {patient.gender} | Patient ID: {patient.id}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Update Record</button>
            <button className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Request Consultation</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Latest Vitals">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <VitalSign icon="fa-heart-pulse" label="Heart Rate" value={patient.vitals.heartRate} color="red" />
              <VitalSign icon="fa-droplet" label="Blood Pressure" value={patient.vitals.bloodPressure} color="blue" />
              <VitalSign icon="fa-temperature-half" label="Temperature" value={patient.vitals.temperature} color="orange" />
              <VitalSign icon="fa-percent" label="O₂ Saturation" value={patient.vitals.oxygenSaturation} color="green" />
            </div>
          </Card>

          <Card>
            {/* Tabs for History and Medications */}
            <div className="flex border-b mb-4">
              <button onClick={() => setActiveTab('history')} className={`py-2 px-4 font-semibold ${activeTab === 'history' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
                Medical History
              </button>
              <button onClick={() => setActiveTab('medications')} className={`py-2 px-4 font-semibold ${activeTab === 'medications' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
                Current Medications
              </button>
            </div>
            
            {/* Content based on active tab */}
            {activeTab === 'history' && (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {patient.medicalHistory.map((condition, index) => <li key={index}>{condition}</li>)}
              </ul>
            )}
            {activeTab === 'medications' && (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {patient.medications.map((med, index) => <li key={index}>{med}</li>)}
              </ul>
            )}
          </Card>
        </div>
        
        {/* Right Column - Alerts and Symptoms */}
        <div className="space-y-6">
          <Card title="Critical Alerts" className="bg-red-50 border-red-200">
            <ul className="list-disc list-inside space-y-2 text-red-800 font-semibold">
              <li>Penicillin Allergy</li>
              {patient.name === "Robert Johnson" && <li>High-risk for cardiac events</li>}
            </ul>
          </Card>
          
          <Card title="Latest Reported Symptom">
            <div className="p-2">
              <p className="text-lg font-semibold text-gray-800">{patient.latestSymptom.description}</p>
              <p className="text-sm text-gray-500 mt-1">Reported on: {patient.latestSymptom.date}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}