import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { patients } from "../data/mockData";

export default function SearchPatient() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.includes(searchTerm)
  );

  return (
    <div>
      <Card title="Search Patients">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="space-y-4">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                className="cursor-pointer p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-xl font-semibold text-blue-600">{patient.name}</h3>
                <p className="text-sm text-gray-600">ID: {patient.id} | Age: {patient.age} | {patient.gender}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Latest Symptom: {patient.latestSymptom?.description || "N/A"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No patients found.</p>
          )}
        </div>
      </Card>
    </div>
  );
}