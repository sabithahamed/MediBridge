import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login.jsx";
import SearchPatient from "../pages/SearchPatient.jsx";
import PatientSummary from "../pages/PatientSummary.jsx";
import LatestSymptoms from "../pages/LatestSymptoms.jsx";
import EmergencyAccess from "../pages/EmergencyAccess.jsx";
import Notifications from "../pages/Notifications.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/search-patient", element: <SearchPatient /> },
  { path: "/patient-summary", element: <PatientSummary /> },
  { path: "/latest-symptoms", element: <LatestSymptoms /> },
  { path: "/emergency-access", element: <EmergencyAccess /> },
  { path: "/notifications", element: <Notifications /> },
]);

export default router;
