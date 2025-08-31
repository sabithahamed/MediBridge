import { useEffect, useState } from 'react';
import Card from '../components/Card';

// Regimen example: Personal OTC / supplements (avoid duplicating doctor-entered meds)
const defaultRegimens = [
  {
    id: 'reg1', name: 'Morning', instructions: 'Personal supplements / OTC',
    meds: [
      { id:'rxp1', drug:'Vitamin D3', dose:'1000IU', frequency:'OD', times:['08:00'], startDate:'2025-08-15', durationDays:60, endDate:'2025-10-13', notes:'With breakfast' },
      { id:'rxp2', drug:'Fish Oil', dose:'1g', frequency:'BID', times:['08:00','20:00'], startDate:'2025-08-10', durationDays:90, endDate:'2025-11-07', notes:'Heart health' }
    ]
  }
];

export default function Prescriptions(){
  const [regimens,setRegimens] = useState(()=>{
    const saved = localStorage.getItem('prescription_regimens');
    return saved? JSON.parse(saved): defaultRegimens;
  });
  const [doctorRx, setDoctorRx] = useState(()=> {
    try { const shared = JSON.parse(localStorage.getItem('shared_prescriptions')||'{}'); return shared['1']||[]; } catch(e){ return []; }
  });
  const [showAdd,setShowAdd] = useState(false);
  const [form,setForm] = useState({ id:null, drug:'', dose:'', frequency:'OD', times:'', notes:'', durationDays:'' });
  const [editingId,setEditingId] = useState(null);
  const [showConfirmDelete,setShowConfirmDelete] = useState(null);

  useEffect(()=> {
    localStorage.setItem('prescription_regimens', JSON.stringify(regimens));
    const shared = JSON.parse(localStorage.getItem('shared_prescriptions')||'{}');
    const docList = shared['1']||[];
    setDoctorRx(docList);
    // derive schedule merges doctor + patient meds (excluding PRN)
    const schedule = [
      ...docList.filter(m=>m.times && m.frequency !== 'PRN').map(m => ({ id:m.id, drug:`${m.drug} ${m.dose}`, times:m.times })),
      ...regimens.flatMap(r => r.meds.filter(m=>m.times).map(m => ({ id:m.id, drug:`${m.drug} ${m.dose}`, times:m.times })))
    ];
    localStorage.setItem('derived_schedule', JSON.stringify(schedule));
  },[regimens]);

  // poll for updates from doctor side every 3s (demo)
  useEffect(()=> {
    const int = setInterval(()=> {
      try { const shared = JSON.parse(localStorage.getItem('shared_prescriptions')||'{}'); const docList = shared['1']||[]; setDoctorRx(prev => JSON.stringify(prev)!==JSON.stringify(docList)? docList: prev); } catch(e){}
    },3000);
    return ()=> clearInterval(int);
  },[]);

  const addMedication = () => {
    if(!form.drug || !form.dose) return;
    const startDate = form.startDate || new Date().toISOString().slice(0,10);
    const dur = parseInt(form.durationDays)||null;
    const endDate = dur? new Date(new Date(startDate).getTime() + (dur-1)*86400000).toISOString().slice(0,10): null;
    const med = { id: form.id || 'rx'+Date.now(), drug:form.drug, dose:form.dose, frequency:form.frequency, times: form.times.split(',').map(t=>t.trim()).filter(Boolean), startDate, durationDays: dur, endDate, notes: form.notes };
    setRegimens(r => r.map(reg => reg.id==='reg1'? { ...reg, meds: editingId? reg.meds.map(m=> m.id===editingId? med: m): [...reg.meds, med]}: reg));
    setShowAdd(false);
    setEditingId(null);
    setForm({ id:null, drug:'', dose:'', frequency:'OD', times:'', notes:'', durationDays:'' });
  };

  const startEdit = (med) => {
    setForm({ id:med.id, drug:med.drug, dose:med.dose, frequency:med.frequency, times: med.times.join(', '), notes: med.notes||'', durationDays: med.durationDays || '', startDate: med.startDate });
    setEditingId(med.id);
    setShowAdd(true);
  };
  const confirmDelete = (id) => setShowConfirmDelete(id);
  const deleteMed = () => {
    const id = showConfirmDelete;
    setRegimens(r => r.map(reg => reg.id==='reg1'? { ...reg, meds: reg.meds.filter(m=>m.id!==id)}: reg));
    setShowConfirmDelete(null);
  };

  const resetAllData = () => {
    // Clear relevant patient-side keys (leave doctor side for demo continuity)
    Object.keys(localStorage).forEach(k => {
      if(k.startsWith('prescription_regimens') || k.startsWith('derived_schedule') || k.startsWith('medHistory_') || k==='symptomHistory' || k==='patient_profile' || k==='patient_notifications'){
        localStorage.removeItem(k);
      }
    });
    setRegimens(defaultRegimens);
  };

  return (
    <div className="space-y-6">
      <Card title="Doctor Prescriptions">
        <div className="space-y-4">
          {doctorRx.map(m => {
            const depletion = m.totalUnits? ((m.remainingUnits ?? m.totalUnits) / m.totalUnits) <= 0.2 : false;
            return (
            <div key={m.id} className={`p-4 border rounded-xl bg-white shadow-sm flex flex-col gap-2 relative overflow-hidden`}>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800 flex items-center gap-2"><i className="fa-solid fa-capsules text-emerald-500"/> {m.drug} <span className="text-xs text-gray-500 font-normal">{m.dose} • {m.frequency||m.schedule}</span></p>
                <span className={`text-[10px] px-2 py-1 rounded-full ${depletion? 'bg-rose-100 text-rose-600':'bg-emerald-100 text-emerald-600'}`}>{depletion? 'Low':'Active'}</span>
              </div>
              <p className="text-[11px] text-gray-500 flex flex-wrap gap-x-2">
                <span><i className="fa-regular fa-clock mr-1"/> {m.times?.length? m.times.join(' / '): (m.frequency==='PRN'?'PRN':'—')}</span>
                <span>Start {m.startDate}</span>
                {m.endDate && <span>End {m.endDate}</span>}
                {m.durationDays && <span>{m.durationDays}d</span>}
              </p>
              {m.remainingUnits && <p className="text-[11px] text-gray-500"><i className="fa-solid fa-battery-half mr-1"/> {m.remainingUnits} / {m.totalUnits} units</p>}
              {m.notes && <p className="text-xs text-gray-600"><i className="fa-regular fa-note-sticky mr-1"/>{m.notes}</p>}
            </div>
          )})}
          {doctorRx.length===0 && <p className="text-xs text-gray-400">No doctor-entered prescriptions synced yet.</p>}
        </div>
      </Card>
      <Card title="Active Regimens (Personal)">
        <div className="space-y-6">
          {regimens.map(reg => (
            <div key={reg.id} className="border rounded-xl p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2"><i className="fa-solid fa-sun text-amber-500"/> {reg.name}</h3>
                <div className="flex gap-2">
                  <button onClick={()=> setShowAdd(true)} className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-lg">Add Med</button>
                  <button onClick={resetAllData} className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg">Reset</button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">{reg.instructions}</p>
              <div className="space-y-3">
                {reg.meds.map(m => (
                  <div key={m.id} className="p-3 border rounded-lg flex flex-col gap-1 bg-gradient-to-br from-white to-blue-50 group">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-800 flex items-center gap-2"><i className="fa-solid fa-pills text-blue-500"/> {m.drug} <span className="text-xs text-gray-500">{m.dose} • {m.frequency}</span></p>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button onClick={()=>startEdit(m)} className="text-[10px] px-2 py-1 rounded bg-amber-100 text-amber-700 hover:bg-amber-200">Edit</button>
                        <button onClick={()=>confirmDelete(m.id)} className="text-[10px] px-2 py-1 rounded bg-rose-100 text-rose-700 hover:bg-rose-200">Remove</button>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 flex flex-wrap gap-x-2">
                      <span>Times: {m.times?.length? m.times.join(' / '): '—'}</span>
                      <span>Start {m.startDate}</span>
                      {m.durationDays && <span>{m.durationDays}d</span>}
                      {m.endDate && <span>End {m.endDate}</span>}
                    </p>
                    {m.notes && <p className="text-xs text-gray-600 flex items-center gap-1"><i className="fa-regular fa-note-sticky"/>{m.notes}</p>}
                  </div>
                ))}
                {reg.meds.length===0 && <p className="text-xs text-gray-400">No meds yet.</p>}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Adherence Overview">
        <p className="text-sm text-gray-600 mb-2">Linked to tracker data (last 7 days)</p>
        <div className="space-y-2">
          {regimens.flatMap(r=> r.meds).map(m => {
            // approximate adherence from stored medHistory
            const histories = Object.keys(localStorage).filter(k=>k.startsWith('medHistory_')).slice(-7);
            let total=0, taken=0;
            histories.forEach(hk => {
              const day = JSON.parse(localStorage.getItem(hk)||'{}');
              total += m.times.length;
              taken += Object.values(day[m.id]||{}).filter(Boolean).length;
            });
            const pct = total? Math.round((taken/total)*100):0;
            return (
              <div key={m.id} className="flex items-center gap-3 text-xs">
                <span className="w-32 truncate font-medium">{m.drug}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full ${pct>85?'bg-green-500': pct>60?'bg-yellow-500':'bg-red-500'}`} style={{width:pct+'%'}}/></div>
                <span className="w-10 text-right">{pct}%</span>
              </div>
            );
          })}
        </div>
      </Card>
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl">
            <h2 className="text-lg font-bold mb-4">{editingId? 'Edit Medication':'Add Medication'}</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <input placeholder="Drug" value={form.drug} onChange={e=>setForm(f=>({...f,drug:e.target.value}))} className="p-2 border rounded" />
              <input placeholder="Dose" value={form.dose} onChange={e=>setForm(f=>({...f,dose:e.target.value}))} className="p-2 border rounded" />
              <select value={form.frequency} onChange={e=>setForm(f=>({...f,frequency:e.target.value}))} className="p-2 border rounded">
                <option value="OD">OD</option>
                <option value="BID">BID</option>
                <option value="TID">TID</option>
              </select>
              <input placeholder="Times (comma sep)" value={form.times} onChange={e=>setForm(f=>({...f,times:e.target.value}))} className="p-2 border rounded" />
              <input placeholder="Duration (days)" value={form.durationDays} onChange={e=>setForm(f=>({...f,durationDays:e.target.value}))} className="p-2 border rounded" />
              <div className="text-xs text-gray-500 flex items-center">{form.durationDays? `Ends ${( () => { try { const d=parseInt(form.durationDays); if(!d) return ''; return new Date((form.startDate? new Date(form.startDate).getTime(): Date.now()) + (d-1)*86400000).toISOString().slice(0,10);} catch{return '';} })()}`: ' '}</div>
              <textarea placeholder="Notes" value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} className="p-2 border rounded col-span-2 h-24" />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={()=>{setShowAdd(false); setEditingId(null);}} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Cancel</button>
              <button onClick={addMedication} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">{editingId? 'Update':'Save'}</button>
            </div>
          </div>
        </div>
      )}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <h2 className="text-lg font-bold mb-2">Remove Medication</h2>
            <p className="text-sm text-gray-600 mb-4">This will delete the personal medication from your regimen.</p>
            <div className="flex justify-end gap-2">
              <button onClick={()=>setShowConfirmDelete(null)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Cancel</button>
              <button onClick={deleteMed} className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
