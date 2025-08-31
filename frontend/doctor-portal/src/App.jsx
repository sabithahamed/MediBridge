import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientSummary from "./pages/PatientSummary";
import Notifications from "./pages/Notifications";
import NotificationDetail from "./pages/NotificationDetail";
import EmergencyAccess from "./pages/EmergencyAccess";
import EmergencySummary from "./pages/EmergencySummary"; // <-- IMPORT THE NEW PAGE
import AiAssist from "./pages/AiAssist"; // <-- IMPORT THE NEW PAGE


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
              <Layout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="patients" element={<Patients />} />
                  <Route path="patient/:patientId" element={<PatientSummary />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="notifications/:notificationId" element={<NotificationDetail />} />
                  <Route path="emergency" element={<EmergencyAccess />} />
                  {/* ADD THE NEW ROUTE BELOW */}
                  <Route path="emergency/:patientId" element={<EmergencySummary />} />
                                    <Route path="assist" element={<AiAssist />} /> {/* <-- ADD THIS ROUTE */}
 
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