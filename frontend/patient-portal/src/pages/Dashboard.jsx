import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Table from '../components/Table'
import { dummySymptoms, dummyMedications, dummyNotifications } from '../data/dummyData'

function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Navbar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card title="Latest Symptoms">
              <Table
                headers={['Type', 'Severity', 'Description', 'Date']}
                data={dummySymptoms.slice(0, 3).map(s => ({
                  Type: s.type,
                  Severity: s.severity,
                  Description: s.description,
                  Date: s.startAt,
                }))}
              />
            </Card>
            <Card title="Medication Tracker Summary">
              <Table
                headers={['Medication', 'Status', 'Time']}
                data={dummyMedications.slice(0, 3).map(m => ({
                  Medication: m.name,
                  Status: m.status,
                  Time: m.time,
                }))}
              />
            </Card>
            <Card title="Notifications">
              <Table
                headers={['Message', 'Date']}
                data={dummyNotifications.map(n => ({
                  Message: n.message,
                  Date: n.date,
                }))}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard