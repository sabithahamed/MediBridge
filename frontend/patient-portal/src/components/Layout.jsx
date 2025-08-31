import React from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'

function LinkItem({ to, children }) {
  return (
    <NavLink to={to} className={({ isActive }) => isActive ? 'block px-3 py-2 rounded bg-primary text-white' : 'block px-3 py-2 rounded hover:bg-slate-100'}>
      {children}
    </NavLink>
  )
}

export default function Layout() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-4 text-xl font-semibold">Patient Portal</div>
        <nav className="p-3 space-y-1">
          <LinkItem to="/dashboard">Dashboard</LinkItem>
          <LinkItem to="/my-data">My Data</LinkItem>
          <LinkItem to="/report">Report Symptoms</LinkItem>
          <LinkItem to="/meds">Medication Tracker</LinkItem>
          <LinkItem to="/sharing">Sharing & Audit</LinkItem>
        </nav>
        <div className="p-4">
          <button className="w-full py-2 rounded bg-red-500 text-white" onClick={() => { localStorage.removeItem('mb_token'); navigate('/login') }}>Logout</button>
        </div>
      </aside>

      <main className="flex-1 p-4">
        <header className="flex items-center justify-between mb-4">
          <div className="md:hidden">
            <button className="px-3 py-2 rounded bg-primary text-white">Menu</button>
          </div>
          <h1 className="text-2xl font-semibold">MediBridge — Patient</h1>
          <div className="text-sm text-slate-600">Simulated session</div>
        </header>

        <Outlet />
      </main>
    </div>
  )
}