// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import Card from "../components/Card";

// Simple adapters reading from localStorage used elsewhere (demo cohesion)
const readNotes = () => Object.keys(localStorage)
  .filter(k=>k.startsWith('doctorNotes_'))
  .flatMap(k => JSON.parse(localStorage.getItem(k)||'[]'))
  .slice(0,5);

export default function Dashboard() {
  const [adherence, setAdherence] = useState(0);
  const [symptoms, setSymptoms] = useState([]);
  const [nextVisit, setNextVisit] = useState('2025-09-15');
  const [recentNotes, setRecentNotes] = useState([]);
  const [doctorMeds, setDoctorMeds] = useState([]);

  useEffect(()=>{
    // Simulate pulling from prescriptions (mock) & tracker
    setAdherence(85);
    setSymptoms([
      { id:1, type:'Headache', severity:'mild', reportedAt:'2025-08-30' },
      { id:2, type:'Fever', severity:'high', reportedAt:'2025-08-29' },
      { id:3, type:'Cough', severity:'moderate', reportedAt:'2025-08-27' }
    ]);
    setRecentNotes(readNotes());
    try {
      const sharedRaw = localStorage.getItem('shared_prescriptions');
      let shared = sharedRaw? JSON.parse(sharedRaw): {};
      if(!shared['1'] || !shared['1'].length){
        // seed demo doctor prescriptions if absent
        shared['1'] = [
          { id:'sd_rxA', drug:'Metformin', dose:'500mg', frequency:'BID', times:['08:00','20:00'], startDate:'2025-08-01', durationDays:60, endDate:'2025-09-29', totalUnits:120, remainingUnits:88, quantity:1 },
          { id:'sd_rxB', drug:'Lisinopril', dose:'10mg', frequency:'OD', times:['09:00'], startDate:'2025-07-20', durationDays:90, endDate:'2025-10-17', totalUnits:90, remainingUnits:55, quantity:1 }
        ];
        localStorage.setItem('shared_prescriptions', JSON.stringify(shared));
      }
      setDoctorMeds(shared['1']||[]);
      // seed a couple of doctor notes if none exist
      const noteKey = 'doctorNotes_1';
      if(!localStorage.getItem(noteKey)){
        localStorage.setItem(noteKey, JSON.stringify([
          { id: Date.now()-20000, text:'Continue current antihypertensive regimen.', at:'2025-08-29 10:05' },
          { id: Date.now()-10000, text:'Recheck labs in 2 weeks – lipid panel pending.', at:'2025-08-30 09:12' }
        ]));
        setRecentNotes(readNotes());
      }
    } catch{}
  },[]);

  return (
    <div className="flex-1 p-6 lg:p-8 overflow-y-auto space-y-10 bg-gradient-to-br from-slate-50 to-white">
      {/* Hero */}
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">Welcome Back</h1>
          <p className="text-sm text-slate-600 max-w-xl">Track your medications, symptoms and upcoming care activities in one place. Stay consistent for better outcomes.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-5 py-3 rounded-xl bg-white shadow border flex flex-col items-center min-w-[120px]">
            <span className="text-xs text-slate-500">Adherence</span>
            <span className="text-2xl font-bold text-slate-800">{adherence}%</span>
            <div className="mt-2 w-full h-1.5 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{width: adherence+'%'}}/></div>
          </div>
          <div className="px-5 py-3 rounded-xl bg-white shadow border flex flex-col items-center min-w-[120px]">
            <span className="text-xs text-slate-500">Next Visit</span>
            <span className="text-lg font-semibold text-slate-800">{nextVisit}</span>
            <span className="mt-1 text-[10px] text-slate-500">Reminder set</span>
          </div>
        </div>
      </div>

      {/* Top Grid */}
      <div className="grid gap-6 lg:grid-cols-4">
        <Card title="Active Prescriptions" className="lg:col-span-2">
          <ul className="divide-y divide-slate-100 text-sm">
            {doctorMeds.slice(0,4).map(m => (
              <li key={m.id} className="py-2 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800">{m.drug} <span className="text-xs text-slate-500 font-normal">{m.dose} • {m.frequency}</span></p>
                  <p className="text-[10px] text-slate-400">Start {m.startDate}{m.endDate && ` • End ${m.endDate}`}</p>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-600">Active</span>
              </li>
            ))}
            {doctorMeds.length===0 && <li className="py-2 text-xs text-slate-400">No prescriptions synced.</li>}
          </ul>
          <p className="mt-3 text-right text-xs text-blue-600 cursor-pointer hover:underline">View all</p>
        </Card>
        <Card title="Doctor Notes" className="lg:col-span-1">
          <ul className="space-y-2 text-xs max-h-40 overflow-auto pr-1">
            {recentNotes.length===0 && <li className="text-slate-400">No notes yet.</li>}
            {recentNotes.map(n=> <li key={n.id} className="p-2 rounded bg-slate-50 border text-slate-700 leading-snug">{n.text}</li>)}
          </ul>
        </Card>
        <Card title="Quick Actions" className="lg:col-span-1">
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              {icon:'fa-notes-medical',label:'Report Symptom',to:'/report-symptoms'},
              {icon:'fa-pills',label:'Tracker',to:'/medication-tracker'},
              {icon:'fa-file-medical',label:'My Data',to:'/my-data'},
              {icon:'fa-shield-heart',label:'Sharing',to:'/sharing-audit'}
            ].map(a => (
              <a key={a.label} href={a.to} className="p-3 rounded-lg border bg-slate-50 hover:bg-white shadow-sm flex flex-col items-center gap-2 transition">
                <i className={`fa-solid ${a.icon} text-blue-600`}></i>
                <span className="text-[11px] font-medium text-slate-700 text-center">{a.label}</span>
              </a>
            ))}
          </div>
        </Card>
      </div>

      {/* Secondary Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Recent Symptoms" className="lg:col-span-2">
          <div className="grid sm:grid-cols-3 gap-4">
            {symptoms.map(s => (
              <div key={s.id} className={`p-4 rounded-xl border shadow-sm bg-gradient-to-br from-white to-${s.severity==='high'?'rose':'sky'}-50` }>
                <p className="font-semibold text-slate-800">{s.type}</p>
                <p className="text-xs text-slate-500">Severity: <span className={`font-semibold capitalize ${s.severity==='high'?'text-rose-600': s.severity==='moderate'?'text-amber-600':'text-sky-600'}`}>{s.severity}</span></p>
                <p className="text-[10px] text-slate-400">Reported {s.reportedAt}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Notifications">
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3"><i className="fa-solid fa-file-medical text-blue-500"></i><span className="text-slate-700">Lab result available: HbA1c 6.7%</span></li>
            <li className="flex items-start gap-3"><i className="fa-solid fa-calendar-day text-emerald-500"></i><span className="text-slate-700">Upcoming visit on {nextVisit}</span></li>
            <li className="flex items-start gap-3"><i className="fa-solid fa-triangle-exclamation text-rose-500"></i><span className="text-slate-700">Evening dose missed yesterday</span></li>
          </ul>
          <p className="text-xs text-right text-blue-600 mt-4 cursor-pointer hover:underline">View all</p>
        </Card>
      </div>
    </div>
  );
}