// src/pages/MyData.jsx (enhanced)
import { useEffect, useState } from "react";
import Card from "../components/Card";

const mockProfile = {
  name: "John Doe",
  dob: "1995-03-20",
  gender: "Male",
  bloodType: "O+",
  heightCm: 178,
  weightKg: 82,
  conditions: ["Hypertension"],
  allergies: ["Penicillin"],
  emergency: { contact: "Jane Doe (Spouse)", phone: "+1 555-111-2222" },
  vitals: { heartRate: 78, bp: "130/85", o2: 98, temp: 37.2 }
};

export default function MyData() {
  const [profile, setProfile] = useState(mockProfile);
  const [edit, setEdit] = useState(false);

  useEffect(()=> {
    const saved = localStorage.getItem('patient_profile');
    if(saved) setProfile(JSON.parse(saved));
  },[]);

  const save = () => {
    localStorage.setItem('patient_profile', JSON.stringify(profile));
    setEdit(false);
  };

  const exportPrint = () => {
    window.print();
  };

  const field = (label, value, onChange) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 py-2 border-b last:border-b-0">
      <span className="w-40 text-sm font-semibold text-gray-600">{label}</span>
      {edit ? (
        <input value={value} onChange={e=> onChange(e.target.value)} className="flex-1 p-2 border rounded-lg text-sm" />
      ) : (
        <span className="text-sm text-gray-800">{value}</span>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <Card title="Identity & Demographics">
        {field('Name', profile.name, v=> setProfile(p=>({...p,name:v})))}
        {field('Date of Birth', profile.dob, v=> setProfile(p=>({...p,dob:v})))}
        {field('Gender', profile.gender, v=> setProfile(p=>({...p,gender:v})))}
        {field('Blood Type', profile.bloodType, v=> setProfile(p=>({...p,bloodType:v})))}
        {field('Height (cm)', profile.heightCm, v=> setProfile(p=>({...p,heightCm:v})))}
        {field('Weight (kg)', profile.weightKg, v=> setProfile(p=>({...p,weightKg:v})))}
        <div className="flex justify-end gap-3 mt-4">
          {!edit && <button onClick={()=>setEdit(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Edit</button>}
          {edit && <>
            <button onClick={()=>setEdit(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Cancel</button>
            <button onClick={save} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">Save</button>
          </>}
          <button onClick={exportPrint} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"><i className="fa-solid fa-print mr-2"/>Export</button>
        </div>
      </Card>
      <Card title="Vitals (Latest)">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['heartRate','bp','o2','temp'].map(k => (
            <div key={k} className="p-3 bg-gradient-to-br from-white to-blue-50 rounded-xl border flex flex-col">
              <span className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold">{k}</span>
              <span className="text-lg font-bold text-gray-800">{profile.vitals[k]}{k==='o2' && '%'}{k==='temp' && '°C'}</span>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Conditions">
          <ul className="list-disc list-inside text-sm space-y-1">
            {profile.conditions.map(c=> <li key={c}>{c}</li>)}
          </ul>
        </Card>
        <Card title="Allergies">
          <ul className="list-disc list-inside text-sm space-y-1">
            {profile.allergies.map(a=> <li key={a}>{a}</li>)}
          </ul>
        </Card>
      </div>
      <Card title="Emergency">
        <p className="text-sm text-gray-700"><strong>Primary Contact:</strong> {profile.emergency.contact}</p>
        <p className="text-sm text-gray-700"><strong>Phone:</strong> {profile.emergency.phone}</p>
        <p className="text-xs text-gray-400 mt-3">Keep this up to date; used in emergency access.</p>
      </Card>
    </div>
  );
}