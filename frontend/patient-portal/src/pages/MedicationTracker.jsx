// src/pages/MedicationTracker.jsx
import { useState } from "react";
import Card from "../components/Card";

export default function MedicationTracker() {
  const [meds, setMeds] = useState([
    {
      id: 1,
      name: "Paracetamol",
      doses: { morning: false, evening: false, night: false },
      history: [],
    },
    {
      id: 2,
      name: "Aspirin",
      doses: { morning: false, evening: false, night: false },
      history: [],
    },
  ]);
  const [confirm, setConfirm] = useState({ show: false, medId: null, time: null });

  // Helper to get current time slot
  const getCurrentTimeSlot = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "evening";
    return "night";
  };
  const currentSlot = getCurrentTimeSlot();
  const slotOrder = ["morning", "evening", "night"];

  const handleDoseClick = (id, time, alreadyTaken) => {
    if (alreadyTaken) return;
    setConfirm({ show: true, medId: id, time });
  };

  const confirmDose = () => {
    setMeds((prev) =>
      prev.map((m) => {
        if (m.id === confirm.medId) {
          const updatedDoses = { ...m.doses, [confirm.time]: true };
          const newHistory = [
            ...m.history,
            {
              time: confirm.time,
              status: "taken",
              date: new Date().toLocaleString(),
            },
          ];
          return { ...m, doses: updatedDoses, history: newHistory };
        }
        return m;
      })
    );
    setConfirm({ show: false, medId: null, time: null });
  };

  const cancelConfirm = () => {
    setConfirm({ show: false, medId: null, time: null });
  };

  return (
    <Card title="Medication Tracker">
      <div className="space-y-6">
        {meds.map((m) => (
          <div key={m.id} className="p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800 flex items-center gap-4">
                <i className="fa-solid fa-pills text-blue-500 text-xl"></i>
                {m.name}
              </span>
              <div className="flex gap-2">
                {slotOrder.map((time, idx) => (
                  <button
                    key={time}
                    onClick={() => handleDoseClick(m.id, time, m.doses[time])}
                    disabled={idx > slotOrder.indexOf(currentSlot) || m.doses[time]}
                    className={`px-3 py-1 rounded-full font-bold text-xs text-white transition-colors duration-200 cursor-pointer ${
                      m.doses[time] ? "bg-green-500" : "bg-gray-400 hover:bg-gray-500"
                    } ${idx > slotOrder.indexOf(currentSlot) || m.doses[time] ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {time.charAt(0).toUpperCase() + time.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm font-semibold text-gray-600">History:</span>
              <ul className="text-xs mt-1">
                {m.history.length === 0 ? (
                  <li className="text-gray-400">No history yet.</li>
                ) : (
                  m.history.slice(-5).reverse().map((h, idx) => (
                    <li key={idx} className="flex gap-2 items-center">
                      <span className={`font-bold ${h.status === "taken" ? "text-green-600" : "text-red-500"}`}>{h.status}</span>
                      <span>{h.time}</span>
                      <span className="text-gray-400">{h.date}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        ))}
        {confirm.show && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 min-w-[300px] flex flex-col items-center">
              <h4 className="text-lg font-bold mb-4">Confirm Dose</h4>
              <p className="mb-6">Did you really have your <span className="font-semibold">{confirm.time}</span> dose?</p>
              <div className="flex gap-4">
                <button onClick={confirmDose} className="px-6 py-2 rounded bg-green-500 text-white font-bold cursor-pointer">Confirm</button>
                <button onClick={cancelConfirm} className="px-6 py-2 rounded bg-gray-400 text-white font-bold cursor-pointer">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}