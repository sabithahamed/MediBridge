import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <div className="flex items-center mb-4">
        <img src="/src/assets/logo.svg" alt="Logo" className="h-8 mr-2" />
        <span className="text-xl font-bold">Doctor Portal</span>
      </div>
      <nav className="space-y-2">
        <NavLink to="/search-patient" className="block p-2 hover:bg-green-200 rounded">Search Patient</NavLink>
        <NavLink to="/patient-summary" className="block p-2 hover:bg-green-200 rounded">Patient Summary</NavLink>
        <NavLink to="/latest-symptoms" className="block p-2 hover:bg-green-200 rounded">Latest Symptoms</NavLink>
        <NavLink to="/emergency-access" className="block p-2 hover:bg-green-200 rounded">Emergency Access</NavLink>
        <NavLink to="/notifications" className="block p-2 hover:bg-green-200 rounded">Notifications</NavLink>
        <NavLink to="/login" className="block p-2 hover:bg-green-200 rounded">Logout</NavLink>
      </nav>
    </div>
  )
}

export default Sidebar