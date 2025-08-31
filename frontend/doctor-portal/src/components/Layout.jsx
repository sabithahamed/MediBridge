import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Layout({ children }) {
  const { handleLogout } = useContext(AuthContext);

  const navLinks = [
    { path: "/doctor/dashboard", name: "Dashboard", icon: "fa-tachometer-alt" },
    // MODIFIED LINE BELOW
    { path: "/doctor/patients", name: "Patients", icon: "fa-users" },
    { path: "/doctor/notifications", name: "Notifications", icon: "fa-bell" },
    { path: "/doctor/emergency", name: "Emergency Access", icon: "fa-user-secret" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl border-r border-gray-200 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <i className="fa-solid fa-user-doctor text-3xl text-blue-600"></i>
          <h2 className="text-3xl font-bold text-gray-800">Doctor Portal</h2>
        </div>
        <p className="text-center text-sm mb-8 text-gray-600 border-b pb-4">MediBridge</p>
        <nav className="flex flex-col gap-4 flex-grow">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-4 text-lg font-medium p-3 rounded-lg transition-colors ${
                  isActive ? "bg-blue-100 text-blue-600" : "hover:bg-blue-50"
                }`
              }
            >
              <i className={`fa-solid ${link.icon} w-6 text-center text-blue-500`}></i> {link.name}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-6 w-full flex items-center justify-center gap-4 text-lg font-medium p-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}