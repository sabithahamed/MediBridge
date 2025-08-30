import { useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Table from '../components/Table'
import axios from 'axios'
import { useAlert } from '../components/Alert'
import { dummyMedications } from '../data/dummyData'

function MedicationTracker() {
  const { showAlert } = useAlert()
  const [medications, setMedications] = useState(dummyMedications)

  const toggleStatus = async (id, status) => {
    try {
      // Stub API call
      await axios.patch(`/api/medications/${id}`, { status: status === 'Taken' ? 'Missed' : 'Taken' })
      setMedications(medications.map(m => m.id === id ? { ...m, status: status === 'Taken' ? 'Missed' : 'Taken' } : m))
      showAlert('Medication status updated', 'success')
    } catch (error) {
      showAlert('Failed to update status: Unauthorized', 'error')
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Navbar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Medication Tracker</h1>
          <Card title="Medication Plans">
            <Table
              headers={['Medication', 'Time', 'Status', 'Action']}
              data={medications.map(m => ({
                Medication: m.name,
                Time: m.time,
                Status: m.status,
                Action: (
                  <button
                    onClick={() => toggleStatus(m.id, m.status)}
                    className={`px-2 py-1 rounded ${m.status === 'Taken' ? 'bg-red-500' : 'bg-green-500'} text-white`}
                  >
                    Toggle {m.status === 'Taken' ? 'Missed' : 'Taken'}
                  </button>
                ),
              }))}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MedicationTracker