// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.reload();
  };

  return (
    <div className="w-64 bg-white text-gray-800 flex flex-col p-6 shadow-xl border-r border-gray-200">
      <div className="flex items-center gap-2 mb-2 justify-center">
        <i className="fa-solid fa-bridge text-3xl text-blue-600"></i>
        <h2 className="text-3xl font-bold text-gray-800">MediBridge</h2>
      </div>
      <p className="text-center text-sm mb-8 text-gray-600 border-b pb-4">Patient Portal</p>
      
      <nav className="flex flex-col gap-1 flex-grow">
        {[
          {to:'/dashboard', label:'Dashboard', icon:'fa-house'},
          {to:'/mydata', label:'My Data', icon:'fa-user-circle'},
          {to:'/prescriptions', label:'Prescriptions', icon:'fa-prescription-bottle-medical'},
            {to:'/report-symptoms', label:'Report Symptoms', icon:'fa-notes-medical'},
          {to:'/medication', label:'Medication Tracker', icon:'fa-pills'},
          {to:'/notifications', label:'Notifications', icon:'fa-bell'},
          {to:'/data-preferences', label:'Data Preferences', icon:'fa-sliders'},
          {to:'/manage-doctors', label:'Manage Doctors', icon:'fa-user-doctor'},
          {to:'/emergency-settings', label:'Emergency Settings', icon:'fa-triangle-exclamation'},
          {to:'/sharing', label:'Sharing & Audit', icon:'fa-share-nodes'}
        ].map(item => (
          <NavLink key={item.to} to={item.to}
            className={({isActive}) => `group flex items-center gap-4 text-sm font-medium px-4 py-3 rounded-lg relative overflow-hidden transition-all ${isActive? 'text-blue-700 bg-blue-50 shadow-inner':'text-gray-700 hover:text-blue-700 hover:bg-blue-50'} `}>
            {({isActive}) => (
              <>
                <span className={`absolute left-0 top-0 h-full w-1 rounded-r-full transition-all ${isActive? 'bg-blue-500':'bg-transparent group-hover:bg-blue-300'}`}></span>
                <i className={`fa-solid ${item.icon} w-5 text-center text-base ${isActive? 'text-blue-600':'text-blue-400 group-hover:text-blue-500'}`}></i>
                <span className="tracking-wide">{item.label}</span>
                {isActive && <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">ACTIVE</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-4 text-lg font-medium p-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      </div>
    </div>
  );
}