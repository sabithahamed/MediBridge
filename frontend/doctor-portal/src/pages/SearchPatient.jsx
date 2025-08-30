import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Card from '../components/Card.jsx'
import Table from '../components/Table.jsx'
import Form from '../components/Form.jsx'
import { dummyPatients } from '../routes/data/dummyData.js'

function SearchPatient() {
  const [searchResults, setSearchResults] = useState(dummyPatients)

  const handleSearch = (e) => {
    e.preventDefault()
    const query = new FormData(e.target).get('query').toLowerCase()
    setSearchResults(
      dummyPatients.filter(p => p.name.toLowerCase().includes(query) || p.id.toString().includes(query))
    )
  }

  const fields = [
    { label: 'Search', name: 'query', type: 'text', placeholder: 'Enter patient name or ID' },
  ]

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Navbar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Search Patient</h1>
          <div className="mb-4">
            <Form fields={fields} onSubmit={handleSearch} buttonText="Search" />
          </div>
          <Card title="Search Results">
            <Table
              headers={['ID', 'Name', 'Age', 'Gender']}
              data={searchResults.map(p => ({
                ID: p.id,
                Name: p.name,
                Age: p.age,
                Gender: p.gender,
              }))}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SearchPatient