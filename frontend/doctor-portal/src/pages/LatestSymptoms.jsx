import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Card from '../components/Card.jsx'
import Table from '../components/Table.jsx'
import { dummySymptoms } from '../routes/data/dummyData.js'

function LatestSymptoms() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Navbar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Latest Symptoms</h1>
          <Card title="Recent Symptoms">
            <Table
              headers={['ID', 'Type', 'Severity', 'Description', 'Start Date', 'End Date']}
              data={dummySymptoms.map(s => ({
                ID: s.id,
                Type: s.type,
                Severity: s.severity,
                Description: s.description,
                'Start Date': s.startAt,
                'End Date': s.endAt,
              }))}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LatestSymptoms