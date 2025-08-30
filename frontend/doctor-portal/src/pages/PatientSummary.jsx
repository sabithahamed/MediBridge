import Navbar from '../components/Navbar.jsx'
import Card from '../components/Card.jsx'
import Table from '../components/Table.jsx'
import { dummyPatientData } from '../routes/data/dummyData.js'

function PatientSummary() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Navbar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Patient Summary</h1>
          <Card title="Patient Details">
            <Table
              headers={['Name', 'Age', 'Gender', 'Blood Type', 'Allergies', 'Medications', 'Problems']}
              data={[{
                Name: dummyPatientData.Name,
                Age: dummyPatientData.Age,
                Gender: dummyPatientData.Gender,
                'Blood Type': dummyPatientData['Blood Type'],
                Allergies: dummyPatientData.Allergies,
                Medications: dummyPatientData.Medications,
                Problems: dummyPatientData.Problems,
              }]}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PatientSummary