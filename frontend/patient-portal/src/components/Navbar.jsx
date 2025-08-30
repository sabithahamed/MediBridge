import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/src/assets/logo.svg" alt="Logo" className="h-8 mr-2" />
          <span className="text-xl font-bold">Patient Portal</span>
        </div>
        <div className="space-x-4">
          <NavLink to="/dashboard" className="hover:underline">Dashboard</NavLink>
          <NavLink to="/my-data" className="hover:underline">My Data</NavLink>
          <NavLink to="/report-symptoms" className="hover:underline">Report Symptoms</NavLink>
          <NavLink to="/medication-tracker" className="hover:underline">Medication Tracker</NavLink>
          <NavLink to="/sharing-audit" className="hover:underline">Sharing & Audit</NavLink>
          <NavLink to="/login" className="hover:underline">Logout</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar