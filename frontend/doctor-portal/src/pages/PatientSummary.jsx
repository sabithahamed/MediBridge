
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

// Batch add prescription modal allowing multiple entries with shared next visit date.
const frequencyTimes = (freq) => {
  switch(freq){
    case 'OD': return ['08:00'];
    case 'BID': return ['08:00','20:00'];
    case 'TID': return ['08:00','14:00','20:00'];
    case 'QID': return ['06:00','12:00','18:00','22:00'];
    default: return [];
  }
};

const BatchPrescriptionModal = ({ onClose, onSave }) => {
  const [rows, setRows] = useState([
    { drug:'', dose:'', frequency:'OD', times:frequencyTimes('OD'), quantity:1, unit:'tablet', durationType:'7', customDays:'', notes:'' }
  ]);
  const [nextVisit, setNextVisit] = useState('');
  const addRow = () => setRows(r => [...r, { drug:'', dose:'', frequency:'OD', times:frequencyTimes('OD'), quantity:1, unit:'tablet', durationType:'7', customDays:'', notes:'' }]);
  const updateRow = (i, field, value) => setRows(r => r.map((row,idx)=> {
    if(idx!==i) return row;
    let updated = { ...row, [field]: value };
    if(field==='frequency' && !['PRN','CUSTOM'].includes(value)) {
      updated.times = frequencyTimes(value);
    }
    if(field==='durationType' && value!=='CUSTOM') {
      updated.customDays = '';
    }
    return updated;
  }));
  const updateTimeList = (i, value) => setRows(r => r.map((row,idx)=> idx===i? { ...row, times: value.split(',').map(t=>t.trim()).filter(Boolean) }: row));
  const removeRow = (i) => setRows(r => r.filter((_,idx)=> idx!==i));
  const resolveDays = (row) => {
    if(row.durationType==='CUSTOM') return parseInt(row.customDays)||0; 
    return parseInt(row.durationType)||0;
  };
  const validItems = rows.filter(r => {
    if(!r.drug || !r.dose) return false;
    if(r.frequency !== 'PRN') {
      if(r.frequency === 'CUSTOM' && !r.times.length) return false;
      const days = resolveDays(r);
      if(!days || days <=0) return false;
    }
    return true;
  });
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl max-h-[92vh] flex flex-col">
        <div className="px-6 pt-5 pb-3 border-b sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-2xl font-bold">Add Prescriptions</h2>
          <p className="text-sm text-gray-500">Batch entry – shared next visit date applies to all.</p>
        </div>
        <div className="px-6 pt-4 pb-2 flex items-center gap-4 flex-wrap">
          <label className="text-sm font-semibold text-gray-600">Next Visit:</label>
          <input type="date" value={nextVisit} onChange={e=>setNextVisit(e.target.value)} className="p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400" />
          <button onClick={addRow} className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-1"><i className="fa-solid fa-plus"/> Add Row</button>
          <button onClick={onClose} className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">Close</button>
        </div>
        <div className="px-6 pb-5 overflow-y-auto custom-scroll flex-1">
          <div className="space-y-4">
            {rows.map((r,i)=>(
              <div key={i} className="space-y-2 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border shadow-sm relative">
                <div className="grid xl:grid-cols-12 md:grid-cols-6 gap-3">
                  <input placeholder="Drug" value={r.drug} onChange={e=>updateRow(i,'drug',e.target.value)} className="xl:col-span-3 md:col-span-3 p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400" />
                  <input placeholder="Dose (e.g. 500mg)" value={r.dose} onChange={e=>updateRow(i,'dose',e.target.value)} className="xl:col-span-2 md:col-span-3 p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400" />
                  <div className="xl:col-span-2 md:col-span-3 flex gap-2 min-w-[140px]">
                    <input type="number" min="1" value={r.quantity} onChange={e=>updateRow(i,'quantity',e.target.value)} className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400" />
                  </div>
                  <select value={r.frequency} onChange={e=>updateRow(i,'frequency',e.target.value)} className="xl:col-span-2 md:col-span-3 p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400 min-w-[140px]">
                    <option value="OD">OD (once)</option>
                    <option value="BID">BID (2x)</option>
                    <option value="TID">TID (3x)</option>
                    <option value="QID">QID (4x)</option>
                    <option value="PRN">PRN (as needed)</option>
                    <option value="CUSTOM">Custom</option>
                  </select>
                  <select value={r.durationType} onChange={e=>updateRow(i,'durationType',e.target.value)} className="xl:col-span-2 md:col-span-3 p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400">
                    <option value="3">3 days</option>
                    <option value="5">5 days</option>
                    <option value="7">1 week</option>
                    <option value="14">2 weeks</option>
                    <option value="30">1 month</option>
                    <option value="60">2 months</option>
                    <option value="CUSTOM">Custom</option>
                  </select>
                  <button onClick={()=>removeRow(i)} className="text-red-500 text-xs font-semibold hover:underline xl:col-span-1 md:col-span-3 text-left">Remove</button>
                </div>
                <div className="grid xl:grid-cols-12 md:grid-cols-6 gap-3">
                  {r.frequency==='CUSTOM' && (
                    <input placeholder="Times (comma separated HH:MM)" value={r.times.join(', ')} onChange={e=>updateTimeList(i,e.target.value)} className="xl:col-span-6 md:col-span-6 p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400" />
                  )}
                  {r.frequency!=='CUSTOM' && r.frequency!=='PRN' && (
                    <div className="xl:col-span-6 md:col-span-6 flex flex-wrap gap-2 items-center text-xs">
                      {r.times.map(t=> <span key={t} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md">{t}</span>)}
                    </div>
                  )}
                  {r.frequency==='PRN' && <div className="md:col-span-6 text-xs text-gray-500 italic">As needed</div>}
                  {r.durationType==='CUSTOM' && (
                    <input placeholder="Days" type="number" min="1" value={r.customDays} onChange={e=>updateRow(i,'customDays',e.target.value)} className="xl:col-span-2 md:col-span-3 p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400" />
                  )}
                  <input placeholder="Notes" value={r.notes} onChange={e=>updateRow(i,'notes',e.target.value)} className="xl:col-span-6 md:col-span-6 p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400" />
                </div>
                <div className="text-[11px] text-gray-400 flex gap-4">
                  <span>Daily doses: {['PRN'].includes(r.frequency)? '—': r.times.length}</span>
                  <span>Total units est: {(() => { const d=resolveDays(r); if(!d||!r.times.length) return '—'; return d * r.times.length * r.quantity; })()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 border-t bg-gray-50 rounded-b-2xl flex flex-wrap gap-4 items-center">
          <p className="text-xs text-gray-500">{validItems.length} valid item(s)</p>
          <div className="ml-auto flex gap-3">
            <button onClick={onClose} className="px-5 py-2 bg-white border rounded-lg text-sm font-medium hover:bg-gray-100">Cancel</button>
            <button disabled={!validItems.length} onClick={()=> onSave(validItems.map(r => ({
              drug: r.drug,
              dose: r.dose,
              frequency: r.frequency,
              times: r.times,
              quantity: Number(r.quantity)||1,
              unit: r.unit,
              durationDays: resolveDays(r)||null,
              notes: r.notes
            })), nextVisit)} className="px-5 py-2 bg-blue-600 disabled:bg-gray-400 text-white rounded-lg text-sm font-semibold shadow hover:bg-blue-700">Save All</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PatientSummary() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('history'); // history | medications | prescriptions | labs
  const [localPatients, setLocalPatients] = useState(patients);
  const patient = localPatients.find((p) => p.id === patientId);
  const [newRx, setNewRx] = useState({}); // legacy placeholder
  const [newLab, setNewLab] = useState({ name: '' });
  const [showAddRx, setShowAddRx] = useState(false);
  const [showAddLab, setShowAddLab] = useState(false);
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('doctorNotes_'+patientId);
    return saved ? JSON.parse(saved) : [];
  });
  const [newNote, setNewNote] = useState('');
  const [showDischarge, setShowDischarge] = useState(false);
  const [discharged, setDischarged] = useState(()=> localStorage.getItem('discharged_'+patientId)==='true');

  const updatePatient = (updater) => {
    setLocalPatients(prev => prev.map(p => p.id === patientId ? { ...updater(p) } : p));
  };

  const persistSharedPrescriptions = (updatedPatients) => {
    try {
      const shared = updatedPatients.reduce((acc,p)=> { acc[p.id]=p.prescriptions||[]; return acc; }, {});
      localStorage.setItem('shared_prescriptions', JSON.stringify(shared));
      if(shared['1']) {
        const schedule = shared['1']
          .filter(rx => rx.times && rx.times.length && rx.frequency !== 'PRN')
          .map(rx => ({ id: rx.id, drug: `${rx.drug} ${rx.dose}`, times: rx.times }));
        localStorage.setItem('derived_schedule', JSON.stringify(schedule));
      }
    } catch(e){/* noop */}
  };

  const orderLab = () => {
    if (!newLab.name) return;
    updatePatient(p => ({
      ...p,
      labTests: [...p.labTests, { id: 'lab'+Date.now(), name: newLab.name, status: 'Ordered', orderedDate: new Date().toISOString().slice(0,10), result: null }]
    }));
    setNewLab({ name: '' });
    setShowAddLab(false);
  };

  const addNote = () => {
    if(!newNote.trim()) return;
    const entry = { id: Date.now(), text: newNote.trim(), at: new Date().toLocaleString() };
    const updated = [entry, ...notes];
    setNotes(updated);
    localStorage.setItem('doctorNotes_'+patientId, JSON.stringify(updated));
    setNewNote('');
  };
  const dischargePatient = () => {
    setDischarged(true);
    localStorage.setItem('discharged_'+patientId,'true');
    setShowDischarge(false);
  };

  // Poll for remainingUnits updates from patient adherence every 5s (demo only)
  useEffect(()=> {
    const int = setInterval(()=> {
      try {
        const shared = JSON.parse(localStorage.getItem('shared_prescriptions')||'{}');
        const list = shared[patientId] || [];
        if(!list.length) return;
        setLocalPatients(prev => prev.map(p => p.id===patientId ? {
          ...p,
          prescriptions: p.prescriptions.map(rx => {
            const updated = list.find(r=> r.id===rx.id);
            return updated ? { ...rx, remainingUnits: updated.remainingUnits } : rx;
          })
        }: p));
      } catch(e){}
    },5000);
    return ()=> clearInterval(int);
  },[patientId]);

  const exportPrescriptions = () => {
    try {
      const data = JSON.stringify(patient.prescriptions, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `prescriptions_${patient.id}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch(e){}
  };

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
            <p className="text-sm mt-1">
              Sharing: {patient.sharingAllowed ? <span className="text-green-600 font-semibold">Allowed</span> : <span className="text-red-600 font-semibold">Not Allowed</span>} | Adherence: <span className="font-semibold">{patient.adherence}%</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
            <button onClick={()=> setShowDischarge(true)} disabled={discharged} className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50">{discharged? 'Discharged':'Discharge'}</button>
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
            {/* Tabs */}
            <div className="flex flex-wrap border-b mb-4">
              {['history','medications','prescriptions','labs'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`py-2 px-4 font-semibold capitalize ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>{tab}</button>
              ))}
              <div className="ml-auto flex gap-2">
                {activeTab === 'prescriptions' && <>
                  <button onClick={() => setShowAddRx(true)} className="py-1 px-3 bg-blue-100 text-blue-700 rounded-lg text-sm">Add Rx</button>
                  <button onClick={exportPrescriptions} className="py-1 px-3 bg-gray-100 text-gray-600 rounded-lg text-sm">Export</button>
                </>}
                {activeTab === 'labs' && <button onClick={() => setShowAddLab(true)} className="py-1 px-3 bg-blue-100 text-blue-700 rounded-lg text-sm">Order Lab</button>}
              </div>
            </div>
            {/* Content */}
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
            {activeTab === 'prescriptions' && (
              <div className="space-y-3">
                {patient.prescriptions.map(rx => {
                  const depletion = rx.totalUnits ? ((rx.remainingUnits ?? rx.totalUnits) / rx.totalUnits) <= 0.2 : false;
                  return (
                  <div key={rx.id} className={`p-4 border rounded-lg bg-white shadow-sm ${depletion? 'border-red-400 ring-1 ring-red-200':''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">{rx.drug} <span className="text-sm text-gray-500">{rx.dose} • {rx.frequency || rx.schedule}</span></p>
                        <p className="text-[11px] text-gray-500">
                          Start {rx.startDate} {rx.endDate && `• End ${rx.endDate}`} {rx.durationDays && `• ${rx.durationDays}d`} {rx.nextVisit && `• Next Visit ${rx.nextVisit}`}
                        </p>
                        <p className="text-[11px] text-gray-500">Times: {rx.times?.length? rx.times.join(' / ') : (rx.frequency==='PRN'?'As needed':'—')} • Qty: {rx.quantity || 1} {rx.unit||''}</p>
                        {rx.totalUnits && <p className={`text-[11px] ${depletion? 'text-red-600 font-semibold':'text-gray-500'}`}>Remaining: {rx.remainingUnits ?? rx.totalUnits} / {rx.totalUnits} units {depletion && '(Low)'}</p>}
                        {rx.notes && <p className="text-xs mt-1 text-gray-600">Notes: {rx.notes}</p>}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full self-start ${depletion? 'bg-red-100 text-red-700':'bg-green-100 text-green-700'}`}>{depletion? 'Low Stock':'Active'}</span>
                    </div>
                  </div>
                )})}
              </div>
            )}
            {activeTab === 'labs' && (
              <div className="space-y-3">
                {patient.labTests.map(lab => (
                  <div key={lab.id} className="p-4 border rounded-lg flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">{lab.name}</p>
                      <p className="text-xs text-gray-500">Ordered: {lab.orderedDate}</p>
                      <p className="text-sm mt-1">Status: <span className={`font-semibold ${lab.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{lab.status}</span></p>
                      {lab.result && <p className="text-sm text-gray-700">Result: {lab.result}</p>}
                    </div>
                    {!lab.result && lab.status !== 'Completed' && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">In Progress</span>}
                  </div>
                ))}
              </div>
            )}
          </Card>
          {/* Modals */}
          {showAddRx && (
            <BatchPrescriptionModal 
              onClose={()=> setShowAddRx(false)} 
              onSave={(items, sharedNextVisit)=> {
                if(!items.length) return;
                const today = new Date().toISOString().slice(0,10);
                updatePatient(p => ({
                  ...p,
                  prescriptions: [
                    ...p.prescriptions,
                    ...items.map(it => {
                      const startDate = today;
                      const endDate = it.durationDays ? new Date(Date.now() + (it.durationDays-1)*86400000).toISOString().slice(0,10) : null;
                      const totalDoses = (it.durationDays && it.times && it.times.length && it.frequency !== 'PRN') ? it.durationDays * it.times.length : null;
                      const totalUnits = totalDoses ? totalDoses * (it.quantity||1) : null;
                      return {
                        id: 'rx'+Date.now()+Math.random(),
                        startDate,
                        endDate,
                        nextVisit: sharedNextVisit,
                        remainingUnits: totalUnits,
                        totalUnits,
                        ...it
                      };
                    })
                  ]
                }));
                // persist shared after state settles
                setTimeout(()=>{
                  const updatedPatients = localPatients.map(lp => lp.id === patientId ? {
                    ...lp,
                    prescriptions: [
                      ...lp.prescriptions,
                      ...items.map(it => {
                        const startDate = today;
                        const endDate = it.durationDays ? new Date(Date.now() + (it.durationDays-1)*86400000).toISOString().slice(0,10) : null;
                        const totalDoses = (it.durationDays && it.times && it.times.length && it.frequency !== 'PRN') ? it.durationDays * it.times.length : null;
                        const totalUnits = totalDoses ? totalDoses * (it.quantity||1) : null;
                        return {
                          id: 'rx'+Date.now()+Math.random(),
                          startDate,
                          endDate,
                          nextVisit: sharedNextVisit,
                          remainingUnits: totalUnits,
                          totalUnits,
                          ...it
                        };
                      })
                    ]
                  } : lp);
                  persistSharedPrescriptions(updatedPatients);
                },0);
                setShowAddRx(false);
              }}
            />
          )}
          {showAddLab && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                <h2 className="text-xl font-bold mb-4">Order Lab Test</h2>
                <input placeholder="Lab Test Name" value={newLab.name} onChange={e=>setNewLab({ name: e.target.value })} className="p-2 border rounded w-full" />
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={()=>setShowAddLab(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                  <button onClick={orderLab} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Order</button>
                </div>
              </div>
            </div>
          )}
          {/* Doctor Notes */}
          <Card title="Doctor Notes">
            <div className="space-y-3">
              <div className="flex gap-2">
                <input placeholder="Add note..." value={newNote} onChange={e=>setNewNote(e.target.value)} className="flex-1 p-2 border rounded-lg" />
                <button onClick={addNote} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add</button>
              </div>
              <ul className="space-y-2 max-h-56 overflow-auto pr-2">
                {notes.length === 0 && <li className="text-sm text-gray-500">No notes yet.</li>}
                {notes.map(n=> (
                  <li key={n.id} className="p-2 bg-gray-50 rounded border text-sm flex justify-between">
                    <span className="whitespace-pre-line mr-2">{n.text}</span>
                    <span className="text-[10px] text-gray-400 self-end">{n.at}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
          {showDischarge && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                <h2 className="text-xl font-bold mb-2">Discharge Patient</h2>
                <p className="text-sm text-gray-600 mb-4">This will mark the patient as discharged in this demo session. You can no longer edit prescriptions.</p>
                <div className="flex justify-end gap-2">
                  <button onClick={()=>setShowDischarge(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                  <button onClick={dischargePatient} className="px-4 py-2 bg-red-600 text-white rounded-lg">Confirm</button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column - Alerts and Symptoms */}
        <div className="space-y-6">
          <Card title="Critical Alerts" className="bg-red-50 border-red-200">
            <ul className="list-disc list-inside space-y-2 text-red-800 font-semibold">
              {patient.medicalHistory.filter(c => /coronary|diabetes|asthma/i.test(c)).map((c,i)=>(<li key={i}>{c}</li>))}
              {patient.latestSymptom.severity === 'high' && <li>High severity symptom: {patient.latestSymptom.description}</li>}
              <li>Penicillin Allergy</li>
            </ul>
          </Card>
          
          <Card title="Latest Reported Symptom">
            <div className="p-2">
              <p className="text-lg font-semibold text-gray-800">{patient.latestSymptom.description}</p>
              <p className="text-sm text-gray-500 mt-1">Severity: <span className="font-semibold capitalize">{patient.latestSymptom.severity}</span></p>
              <p className="text-sm text-gray-500">Reported on: {patient.latestSymptom.date}</p>
            </div>
          </Card>
          <Card title="Emergency Contacts">
            <ul className="space-y-2 text-sm">
              {patient.emergencyContacts.map((c,i)=>(<li key={i}><span className="font-semibold">{c.name}</span> ({c.relation}) - {c.phone}</li>))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}