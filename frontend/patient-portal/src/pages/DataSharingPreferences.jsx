import { useState } from 'react';
import Card from '../components/Card';

export default function DataSharingPreferences(){
  const [prefs,setPrefs]=useState({
    shareVitals:true,
    shareMedications:true,
    shareSymptoms:true,
    allowEmergencyByDefault:true,
    notifyOnEmergency:true
  });
  return (
    <Card title="Data Sharing Preferences">
      <div className="space-y-4">
        {Object.entries(prefs).map(([k,v])=> (
          <label key={k} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" checked={v} onChange={()=>setPrefs(p=>({...p,[k]:!p[k]}))} />
            <span className="capitalize text-gray-700 font-medium">{k.replace(/([A-Z])/g,' $1')}</span>
          </label>
        ))}
        <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-700">Changes are stored locally for demo.</div>
      </div>
    </Card>
  );
}
