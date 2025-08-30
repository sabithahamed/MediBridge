import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import MyData from '../pages/MyData'
import ReportSymptoms from '../pages/ReportSymptoms'
import MedicationTracker from '../pages/MedicationTracker'
import SharingAudit from '../pages/SharingAudit'

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/my-data', element: <MyData /> },
  { path: '/report-symptoms', element: <ReportSymptoms /> },
  { path: '/medication-tracker', element: <MedicationTracker /> },
  { path: '/sharing-audit', element: <SharingAudit /> },
])

export default router