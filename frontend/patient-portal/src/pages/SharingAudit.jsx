import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Table from '../components/Table'
import { dummyAuditLogs } from '../data/dummyData'

function SharingAudit() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Navbar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Sharing & Audit</h1>
          <Card title="Data Access Logs">
            <Table
              headers={['Doctor', 'Date', 'Purpose']}
              data={dummyAuditLogs.map(log => ({
                Doctor: log.doctor,
                Date: log.date,
                Purpose: log.purpose,
              }))}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SharingAudit