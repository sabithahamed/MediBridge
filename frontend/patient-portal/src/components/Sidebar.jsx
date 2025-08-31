// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

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
      
      <nav className="flex flex-col gap-4 flex-grow">
        <Link to="/dashboard" className="flex items-center gap-4 text-lg font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors">
          <i className="fa-solid fa-house w-6 text-center text-blue-500"></i> Dashboard
        </Link>
        <Link to="/mydata" className="flex items-center gap-4 text-lg font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors">
          <i className="fa-solid fa-user-circle w-6 text-center text-blue-500"></i> My Data
        </Link>
        <Link to="/report-symptoms" className="flex items-center gap-4 text-lg font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors">
          <i className="fa-solid fa-notes-medical w-6 text-center text-blue-500"></i> Report Symptoms
        </Link>
        <Link to="/medication" className="flex items-center gap-4 text-lg font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors">
          <i className="fa-solid fa-pills w-6 text-center text-blue-500"></i> Medication Tracker
        </Link>
        <Link to="/sharing" className="flex items-center gap-4 text-lg font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors">
          <i className="fa-solid fa-share-alt w-6 text-center text-blue-500"></i> Sharing & Audit
        </Link>
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