import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import MyData from '../pages/MyData';
import ReportSymptoms from '../pages/ReportSymptoms';
import MedicationTracker from '../pages/MedicationTracker';
import SharingAudit from '../pages/SharingAudit';
import Prescriptions from '../pages/Prescriptions';
import LabReports from '../pages/LabReports';
import ConsentPermissions from '../pages/ConsentPermissions';
import SharingPreferences from '../pages/SharingPreferences';
import EmergencyAccessNotification from '../pages/EmergencyAccessNotification';


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
	<Route path="/prescriptions" element={<Prescriptions />} />
	<Route path="/labreports" element={<LabReports />} />
	<Route path="/consent" element={<ConsentPermissions />} />
	<Route path="/preferences" element={<SharingPreferences />} />
	<Route path="/emergency" element={<EmergencyAccessNotification />} />
</Routes>
</Router>
);
}