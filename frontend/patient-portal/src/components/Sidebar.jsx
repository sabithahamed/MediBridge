// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.reload();
  };
  // Get patient name from localStorage or fallback
  const patientName = localStorage.getItem("patientName") || "Patient";

  return (
    <div className="w-64 bg-white text-gray-800 flex flex-col p-6 shadow-xl border-r border-gray-200">
      <div className="flex items-center gap-2 mb-2 justify-center">
        <img src="/MediBridge.svg" alt="MediBridge Logo" className="h-10 w-10" />
        <h2 className="text-3xl font-bold text-gray-800">MediBridge</h2>
      </div>
      <p className="text-center text-sm mb-8 text-gray-600 border-b pb-4">{patientName} Portal</p>
      
      <nav className="flex flex-col gap-4 flex-grow">
  <Link to="/dashboard" className="flex items-center gap-4 text-lg font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
          <i className="fa-solid fa-house w-6 text-center text-blue-500"></i> Dashboard
        </Link>
  <Link to="/mydata" className="flex items-center gap-4 text-lg font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
          <i className="fa-solid fa-user-circle w-6 text-center text-blue-500"></i> My Data
        </Link>
  <Link to="/report-symptoms" className="flex items-center gap-4 text-lg font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
          <i className="fa-solid fa-notes-medical w-6 text-center text-blue-500"></i> Report Symptoms
        </Link>
  <Link to="/medication" className="flex items-center gap-4 text-lg font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
          <i className="fa-solid fa-pills w-6 text-center text-blue-500"></i> Medication Tracker
        </Link>
  <Link to="/prescriptions" className="flex items-center gap-4 text-lg font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
          <i className="fa-solid fa-file-prescription w-6 text-center text-blue-500"></i> Prescriptions
        </Link>
  <Link to="/labreports" className="flex items-center gap-4 text-lg font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
          <i className="fa-solid fa-vials w-6 text-center text-blue-500"></i> Lab Reports
        </Link>
  <Link to="/consent" className="flex items-center gap-4 text-lg font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
          <i className="fa-solid fa-user-shield w-6 text-center text-blue-500"></i> Consent Permissions
        </Link>
  <Link to="/preferences" className="flex items-center gap-4 text-lg font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
          <i className="fa-solid fa-sliders w-6 text-center text-blue-500"></i> Sharing Preferences
        </Link>
  <Link to="/emergency" className="flex items-center gap-4 text-lg font-medium p-3 rounded-lg hover:bg-red-100 transition-colors cursor-pointer">
          <i className="fa-solid fa-exclamation-triangle w-6 text-center text-red-500"></i> Emergency Access
        </Link>
  <Link to="/sharing" className="flex items-center gap-4 text-lg font-medium p-3 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
          <i className="fa-solid fa-share-alt w-6 text-center text-blue-500"></i> Sharing & Audit
        </Link>
      </nav>
      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-4 text-lg font-medium p-3 rounded-lg bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 cursor-pointer border-2 border-red-400"
        >
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      </div>
    </div>
  );
}