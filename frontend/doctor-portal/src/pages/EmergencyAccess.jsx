import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Form from '../components/Form.jsx'
import Modal from '../components/Modal.jsx'
import { useAlert } from '../components/Alert.jsx'
import axios from 'axios'
console.log('axios:', axios)

function EmergencyAccess() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { showAlert } = useAlert()
  const [loading, setLoading] = useState(false)

  const fields = [
    { label: 'Justification', name: 'justification', type: 'textarea', placeholder: 'Enter reason for emergency access' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('/api/emergency-access', Object.fromEntries(new FormData(e.target)))
      setIsModalOpen(false)
      showAlert('Emergency access granted', 'success')
    } catch (error) {
      showAlert('Access denied: Unauthorized', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Navbar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Emergency Access</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Request Emergency Access
          </button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Emergency Access Request">
            <Form fields={fields} onSubmit={handleSubmit} buttonText={loading ? 'Submitting...' : 'Submit'} />
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default EmergencyAccess