import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <div className="flex items-center mb-4">
        <img src="/src/assets/logo.svg" alt="Logo" className="h-8 mr-2" />
        <span className="text-xl font-bold">Patient Portal</span>
      </div>
      <nav className="space-y-2">
        <NavLink to="/dashboard" className="block p-2 hover:bg-blue-200 rounded">Dashboard</NavLink>
        <NavLink to="/my-data" className="block p-2 hover:bg-blue-200 rounded">My Data</NavLink>
        <NavLink to="/report-symptoms" className="block p-2 hover:bg-blue-200 rounded">Report Symptoms</NavLink>
        <NavLink to="/medication-tracker" className="block p-2 hover:bg-blue-200 rounded">Medication Tracker</NavLink>
        <NavLink to="/sharing-audit" className="block p-2 hover:bg-blue-200 rounded">Sharing & Audit</NavLink>
        <NavLink to="/login" className="block p-2 hover:bg-blue-200 rounded">Logout</NavLink>
      </nav>
    </div>
  )
}

export default Sidebar