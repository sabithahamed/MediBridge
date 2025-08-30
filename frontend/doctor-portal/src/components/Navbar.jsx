import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  const navItems = [
    { label: 'Search Patient', path: '/search-patient' },
    { label: 'Patient Summary', path: '/patient-summary' },
    { label: 'Latest Symptoms', path: '/latest-symptoms' },
    { label: 'Emergency Access', path: '/emergency-access' },
    { label: 'Notifications', path: '/notifications' },
    { label: 'Logout', path: '/login' },
  ]

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/src/assets/logo.svg" alt="Logo" className="h-8 mr-2" />
          <span className="font-bold text-xl">Doctor Portal</span>
        </div>
        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className="hover:bg-blue-700 px-3 py-2 rounded"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar