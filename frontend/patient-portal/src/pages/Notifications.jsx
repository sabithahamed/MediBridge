import { useEffect, useState } from 'react';
import Card from '../components/Card';

const seed = [
  { id:1, type:'emergency', message:'Emergency access by Dr. Evans', date:'2025-08-29', read:false },
  { id:2, type:'visit', message:'Upcoming visit on 2025-09-15', date:'2025-08-30', read:false },
  { id:3, type:'medication', message:'You missed a dose: Metformin 500mg', date:'2025-08-28', read:true }
];

const icon = t => ({
  emergency:'fa-triangle-exclamation text-red-600',
  visit:'fa-calendar-check text-green-600',
  medication:'fa-pills text-purple-600'
}[t] || 'fa-bell text-gray-500');

export default function Notifications(){
  const [list,setList]=useState(()=>{
    const saved = localStorage.getItem('patient_notifications');
    return saved? JSON.parse(saved): seed;
  });
  useEffect(()=> {
    localStorage.setItem('patient_notifications', JSON.stringify(list));
  },[list]);
  const markAll=()=> setList(l=> l.map(n=>({...n,read:true})));
  const remove = (id)=> setList(l=> l.filter(n=> n.id!==id));
  return (
    <Card title="Notifications">
      <div className="flex justify-between mb-4">
        <div className="text-sm text-gray-500">{list.filter(n=>!n.read).length} unread</div>
        <button onClick={markAll} className="text-xs text-blue-600 hover:underline">Mark all read</button>
      </div>
      <div className="space-y-3">
        {list.map(n=> (
          <div key={n.id} onClick={()=> setList(l=> l.map(x=> x.id===n.id?{...x,read:true}:x))} className={`group p-4 border rounded-xl bg-white flex items-start gap-3 cursor-pointer hover:shadow ${n.read?'opacity-70':''}`}>
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
              <i className={`fa-solid ${icon(n.type)} text-lg`}></i>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{n.message}</p>
              <p className="text-xs text-gray-500 mt-1">{n.date}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              {!n.read && <span className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded-full font-bold">NEW</span>}
              <button onClick={(e)=> { e.stopPropagation(); remove(n.id); }} className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-red-500 hover:underline">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
