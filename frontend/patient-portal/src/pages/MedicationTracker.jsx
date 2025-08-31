// src/pages/MedicationTracker.jsx
import { useState } from "react";
import Card from "../components/Card";

export default function MedicationTracker() {
  const [meds, setMeds] = useState([
    { id: 1, name: "Paracetamol", status: "taken" },
    { id: 2, name: "Aspirin", status: "missed" },
  ]);

  const toggleStatus = (id) => {
    setMeds(
      meds.map((m) =>
        m.id === id ? { ...m, status: m.status === "taken" ? "missed" : "taken" } : m
      )
    );
  };

  return (
    <Card title="Medication Tracker">
      <div className="space-y-4">
        {meds.map((m) => (
          <div key={m.id} className="flex justify-between items-center p-4 rounded-xl shadow-sm border border-gray-200">
            <span className="font-semibold text-gray-800 flex items-center gap-4">
              <i className="fa-solid fa-pills text-blue-500 text-xl"></i>
              {m.name}
            </span>
            <button
              onClick={() => toggleStatus(m.id)}
              className={`px-6 py-2 rounded-full font-bold text-sm text-white transition-colors duration-200 ${
                m.status === "taken" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}