import { useState } from 'react';
import Card from '../components/Card';

export default function EmergencySettings(){
  const [info,setInfo]=useState({
    bloodType:'O+',
    primaryContact:'Jane Doe',
    primaryPhone:'+1 555-111-2222',
    conditions:'Hypertension',
    allergies:'Penicillin',
    consentPolicy:'Allow - log & notify'
  });
  const update=(k,v)=> setInfo(i=>({...i,[k]:v}));
  return (
    <Card title="Emergency Settings">
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(info).map(([k,v])=> (
          <div key={k} className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1 capitalize">{k.replace(/([A-Z])/g,' $1')}</label>
            <input value={v} onChange={e=>update(k,e.target.value)} className="p-2 border rounded-lg" />
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-sm text-yellow-700">Emergency access will trigger a notification to you. Settings stored locally for demo.</div>
    </Card>
  );
}
