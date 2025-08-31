import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import MyData from '../pages/MyData';
import ReportSymptoms from '../pages/ReportSymptoms';
import MedicationTracker from '../pages/MedicationTracker';
import SharingAudit from '../pages/SharingAudit';


export default function AppRouter() {
return (
<Router>
<Routes>
<Route path="/" element={<Login />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/mydata" element={<MyData />} />
<Route path="/report" element={<ReportSymptoms />} />
<Route path="/medications" element={<MedicationTracker />} />
<Route path="/sharing" element={<SharingAudit />} />
</Routes>
</Router>
);
}