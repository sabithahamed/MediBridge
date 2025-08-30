import { useState } from 'react'
import Navbar from '../components/Navbar'
import Form from '../components/Form'
import axios from 'axios'
import { useAlert } from '../components/Alert'

function ReportSymptoms() {
  const { showAlert } = useAlert()
  const [loading, setLoading] = useState(false)

  const fields = [
    { label: 'Type', name: 'type', type: 'text', placeholder: 'e.g., Headache' },
    { label: 'Severity', name: 'severity', type: 'text', placeholder: 'e.g., Mild, Moderate, Severe' },
    { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Describe your symptoms' },
    { label: 'Start Date', name: 'startAt', type: 'datetime-local', placeholder: 'Start date and time' },
    { label: 'End Date', name: 'endAt', type: 'datetime-local', placeholder: 'End date and time' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Stub API call
      await axios.post('/api/symptoms', Object.fromEntries(new FormData(e.target)))
      showAlert('Symptoms reported successfully', 'success')
    } catch (error) {
      showAlert('Failed to report symptoms: Unauthorized', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Navbar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Report Symptoms</h1>
          <div className="max-w-lg">
            <Form fields={fields} onSubmit={handleSubmit} buttonText={loading ? 'Submitting...' : 'Submit'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportSymptoms