import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Table from '../components/Table'
import { dummyNotifications } from '../routes/data/dummyData.js'

function Notifications() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Navbar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Notifications</h1>
          <Card title="Recent Notifications">
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
  )
}

export default Notifications