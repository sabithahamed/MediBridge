import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import SearchPatient from "./pages/SearchPatient";
import PatientSummary from "./pages/PatientSummary";
import Notifications from "./pages/Notifications";
import EmergencyAccess from "./pages/EmergencyAccess";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/doctor/*"
          element={
            <ProtectedRoute>
              {/* Layout wraps all doctor routes */}
              <Layout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="search" element={<SearchPatient />} />
                  <Route path="patient/:patientId" element={<PatientSummary />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="emergency" element={<EmergencyAccess />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}