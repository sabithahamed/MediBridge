// src/pages/ReportSymptoms.jsx
import { useState } from "react";
import Card from "../components/Card";

export default function ReportSymptoms() {
  const [form, setForm] = useState({
    type: "",
    severity: "",
    description: "",
    startAt: "",
    endAt: "",
  });

  const handleSubmit = () => {
    alert("Symptoms reported: " + JSON.stringify(form, null, 2));
  };

  return (
    <Card title="Report Symptoms">
      <div className="space-y-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Symptom Type</label>
          <input
            type="text"
            placeholder="e.g., Headache, Nausea"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
          <input
            type="text"
            placeholder="e.g., Mild, Moderate, Severe"
            value={form.severity}
            onChange={(e) => setForm({ ...form, severity: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            placeholder="Describe your symptoms in detail..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={form.startAt}
              onChange={(e) => setForm({ ...form, startAt: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={form.endAt}
              onChange={(e) => setForm({ ...form, endAt: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg cursor-pointer"
        >
          <i className="fa-solid fa-paper-plane mr-2"></i> Submit Report
        </button>
      </div>
    </Card>
  );
}