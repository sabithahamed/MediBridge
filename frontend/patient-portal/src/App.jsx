import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import MyData from "./pages/MyData";
import ReportSymptoms from "./pages/ReportSymptoms";
import MedicationTracker from "./pages/MedicationTracker";
import SharingAudit from "./pages/SharingAudit";
import Sidebar from "./components/Sidebar";
import ForgotPassword from "./pages/ForgotPassword";
import Prescriptions from "./pages/Prescriptions";
import LabReports from "./pages/LabReports";
import EmergencyAccessNotification from "./pages/EmergencyAccessNotification";
import ConsentPermissions from "./pages/ConsentPermissions";
import SharingPreferences from "./pages/SharingPreferences";

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
                  <Route path="/report-symptoms" element={<ReportSymptoms />} />
                  <Route path="/medication" element={<MedicationTracker />} />
                  <Route path="/sharing" element={<SharingAudit />} />
                  <Route path="/prescriptions" element={<Prescriptions />} />
                  <Route path="/labreports" element={<LabReports />} />
                  <Route path="/emergency" element={<EmergencyAccessNotification />} />
                  <Route path="/consent" element={<ConsentPermissions />} />
                  <Route path="/preferences" element={<SharingPreferences />} />
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
