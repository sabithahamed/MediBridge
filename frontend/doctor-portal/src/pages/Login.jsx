import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../components/Alert'
import Form from '../components/Form'

function Login() {
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const [role, setRole] = useState('doctor')

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get('username')
    const password = formData.get('password')

    if (username === 'doctor' && password === 'password') {
      navigate('/search-patient')
    } else {
      showAlert('Invalid credentials', 'error')
    }
  }

  const fields = [
    { label: 'Username', name: 'username', type: 'text', placeholder: 'Enter username' },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter password' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Doctor Portal Login</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="doctor">Doctor</option>
          </select>
        </div>
        <Form fields={fields} onSubmit={handleSubmit} buttonText="Login" />
      </div>
    </div>
  )
}

export default Login