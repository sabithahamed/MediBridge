// src/pages/MedicationTracker.jsx (enhanced)
import { useState } from "react";
import Card from "../components/Card";

export default function MedicationTracker() {
  // Mock prescription schedule with daily dose times
  const schedule = (()=> {
    const saved = localStorage.getItem('derived_schedule');
    if(saved){
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [
      { id: 'rx1', drug: 'Metformin 500mg', times: ['08:00','20:00'] },
      { id: 'rx2', drug: 'Lisinopril 10mg', times: ['09:00'] }
    ];
  })();
  const today = new Date().toISOString().slice(0,10);
  const todayKey = 'medHistory_'+today;
  const [taken, setTaken] = useState(()=>{
    const saved = localStorage.getItem(todayKey);
    return saved? JSON.parse(saved): {};
  });
  const [history, setHistory] = useState(()=>{
    return Object.keys(localStorage)
      .filter(k=>k.startsWith('medHistory_'))
      .map(k=> ({ date: k.split('_')[1], doses: JSON.parse(localStorage.getItem(k)||'{}') }))
      .sort((a,b)=> a.date < b.date ? 1 : -1)
      .slice(0,7);
  });

  const toggleDose = (rxId, time) => {
    setTaken(prev => {
      const wasTaken = !!prev[rxId]?.[time];
      const next = { ...prev, [rxId]: { ...(prev[rxId]||{}), [time]: !wasTaken } };
      localStorage.setItem(todayKey, JSON.stringify(next));
      // decrement remainingUnits only when transitioning to taken (not when undo)
      if(!wasTaken){
        try {
          const shared = JSON.parse(localStorage.getItem('shared_prescriptions')||'{}');
            Object.keys(shared).forEach(pid => {
              shared[pid] = shared[pid].map(rx => rx.id === rxId ? { ...rx, remainingUnits: (rx.remainingUnits>0? rx.remainingUnits - (rx.quantity||1): 0) } : rx);
            });
          localStorage.setItem('shared_prescriptions', JSON.stringify(shared));
        } catch(e){}
      }
      // update rolling 7-day history list
      setHistory(h => {
        const updated = h.filter(e=> e.date !== today).concat([{ date: today, doses: next }]);
        return updated.sort((a,b)=> a.date < b.date ? 1 : -1).slice(0,7);
      });
      return next;
    });
  };

  return (
    <Card title="Medication Tracker">
      <div className="space-y-8">
        {/* Active Day */}
        <div className="space-y-5">
          {schedule.map(rx => (
            <div key={rx.id} className="p-4 border rounded-xl bg-white shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-800 flex items-center gap-2">
                  <i className="fa-solid fa-pills text-blue-500"/> {rx.drug}
                </p>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">{rx.times.length}× daily</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {rx.times.map(t => {
                  const done = taken[rx.id]?.[t];
                  return (
                    <button key={t} onClick={()=>toggleDose(rx.id,t)} className={`px-4 py-2 rounded-lg text-sm font-semibold border flex items-center gap-2 transition-colors ${done? 'bg-green-500 text-white border-green-600 shadow':'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'}`}>
                      {done? <i className="fa-solid fa-check"/>:<i className="fa-solid fa-clock"/>} {t}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* History */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-sm">
            <i className="fa-solid fa-chart-line text-green-500"/> Last 7 Days Adherence
          </h3>
          <div className="space-y-2 max-h-56 overflow-auto pr-1">
            {history.map(day => {
              const totalDoses = schedule.reduce((acc,rx)=> acc + rx.times.length,0);
              const takenCount = schedule.reduce((acc,rx)=> acc + Object.values(day.doses[rx.id]||{}).filter(Boolean).length,0);
              const pct = Math.round((takenCount/totalDoses)*100);
              return (
                <div key={day.date} className="flex items-center gap-3 text-xs">
                  <span className="w-20 font-medium">{day.date}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${pct>85?'bg-green-500': pct>60?'bg-yellow-500':'bg-red-500'}`} style={{width:pct+'%'}} />
                  </div>
                  <span className="w-10 text-right font-semibold">{pct}%</span>
                </div>
              );
            })}
            {history.length===0 && <p className="text-xs text-gray-500">No history yet.</p>}
          </div>
        </div>
      </div>
    </Card>
  );
}