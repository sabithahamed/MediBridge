import { useState } from 'react';
import Card from '../components/Card';

const initial = [
  { id:'d1', name:'Dr. Silva', specialty:'Cardiology', access:true, lastAccess:'2025-08-29 09:12' },
  { id:'d2', name:'Dr. Kumar', specialty:'Endocrinology', access:true, lastAccess:'2025-08-25 14:50' },
  { id:'d3', name:'Dr. Patel', specialty:'Pulmonology', access:false, lastAccess:'—' }
];

export default function ManageDoctors(){
  const [list,setList]=useState(initial);
  const toggle = (id)=> setList(l=> l.map(d=> d.id===id?{...d, access:!d.access}:d));
  return (
    <Card title="Manage Doctor Access">
      <div className="space-y-4">
        {list.map(d=> (
          <div key={d.id} className="p-4 border rounded-xl flex items-center justify-between bg-white">
            <div>
              <p className="font-semibold text-gray-800">{d.name} <span className="text-sm text-gray-500">({d.specialty})</span></p>
              <p className="text-xs text-gray-500">Last Access: {d.lastAccess}</p>
            </div>
            <button onClick={()=>toggle(d.id)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${d.access? 'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{d.access? 'Granted':'Revoked'}</button>
          </div>
        ))}
        <div className="text-xs text-gray-500">Audit trail is viewable under Sharing Audit.</div>
      </div>
    </Card>
  );
}
