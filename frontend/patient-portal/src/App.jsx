import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import MyData from "./pages/MyData";
import ReportSymptoms from "./pages/ReportSymptoms";
import MedicationTracker from "./pages/MedicationTracker";
import SharingAudit from "./pages/SharingAudit";
import DataSharingPreferences from "./pages/DataSharingPreferences";
import ManageDoctors from "./pages/ManageDoctors";
import EmergencySettings from "./pages/EmergencySettings";
import Prescriptions from "./pages/Prescriptions";
import Notifications from "./pages/Notifications";
import Sidebar from "./components/Sidebar";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(localStorage.getItem("auth") === "true");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected routes */}
      {isAuthenticated ? (
        <Route
          path="/*"
          element={
            <div className="flex min-h-screen bg-gray-100">
              <Sidebar />
              <div className="flex-1 p-8 overflow-y-auto">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/mydata" element={<MyData />} />
                  <Route path="/prescriptions" element={<Prescriptions />} />
                  <Route path="/report-symptoms" element={<ReportSymptoms />} />
                  <Route path="/medication" element={<MedicationTracker />} />
                  <Route path="/data-preferences" element={<DataSharingPreferences />} />
                  <Route path="/manage-doctors" element={<ManageDoctors />} />
                  <Route path="/emergency-settings" element={<EmergencySettings />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/sharing" element={<SharingAudit />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </div>
            </div>
          }
        />
      ) : (
        <Route path="/*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
}

export default App;
