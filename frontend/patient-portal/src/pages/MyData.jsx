import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Table from '../components/Table'
import { dummyPatientData } from '../data/dummyData'

function MyData() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Navbar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">My Data</h1>
          <Card title="Patient Summary">
            <Table
              headers={['Field', 'Value']}
              data={Object.entries(dummyPatientData).map(([key, value]) => ({
                Field: key,
                Value: value,
              }))}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MyData