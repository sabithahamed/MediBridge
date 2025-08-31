// src/pages/ReportSymptoms.jsx
import { useState, useEffect } from "react";
import Card from "../components/Card";

export default function ReportSymptoms() {
  const [form, setForm] = useState({ type: "", severity: "", description: "", startAt: "", endAt: "" });
  const [history, setHistory] = useState([]);

  useEffect(()=>{
    const saved = localStorage.getItem('symptomHistory');
    if(saved) setHistory(JSON.parse(saved));
  },[]);

  const handleSubmit = () => {
    if(!form.type || !form.severity) return alert('Type & Severity required');
    const entry = { id: Date.now(), ...form, reportedAt: new Date().toISOString().slice(0,10) };
    const updated = [entry, ...history].slice(0,50);
    setHistory(updated);
    localStorage.setItem('symptomHistory', JSON.stringify(updated));
    setForm({ type:'', severity:'', description:'', startAt:'', endAt:'' });
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

        <button onClick={handleSubmit} className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
          <i className="fa-solid fa-paper-plane mr-2"></i> Submit Report
        </button>
        <div className="pt-4 border-t">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><i className="fa-solid fa-clock-rotate-left text-blue-500"></i> History</h3>
          <div className="max-h-64 overflow-auto space-y-2 pr-1">
            {history.length===0 && <p className="text-sm text-gray-500">No symptoms reported yet.</p>}
            {history.map(h => (
              <div key={h.id} className="p-3 bg-gray-50 rounded-lg border">
                <p className="text-sm font-semibold text-gray-800">{h.type} <span className="text-xs text-gray-500">({h.severity})</span></p>
                <p className="text-xs text-gray-500">Reported {h.reportedAt} | Start {h.startAt || '—'} {h.endAt && `End ${h.endAt}`}</p>
                {h.description && <p className="text-xs mt-1 text-gray-600 whitespace-pre-line">{h.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}