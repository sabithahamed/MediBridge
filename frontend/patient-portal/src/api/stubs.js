// Simple client-side stubbed API using Promises to simulate latency
const sleep = (ms) => new Promise(r => setTimeout(r, ms))

export async function loginStub({ username, role }) {
  await sleep(200)
  if (!username) {
    const err = { response: { status: 401, data: { message: 'Invalid credentials' } } }
    throw err
  }
  return { token: 'fake-token-123', user: { username, role } }
}

export async function getPatientSummary() {
  await sleep(150)
  return {
    name: 'Jane Doe',
    dob: '1987-04-02',
    bloodType: 'O+',
    allergies: ['Penicillin'],
    meds: [{ name: 'Atorvastatin', dose: '10mg', schedule: 'Daily' }]
  }
}

export async function getSymptoms() {
  await sleep(150)
  return [
    { id: 1, type: 'Headache', severity: 3, description: 'Mild pain', startAt: '2025-08-10', endAt: null, reportedAt: '2025-08-30' },
    { id: 2, type: 'Cough', severity: 2, description: 'Dry cough', startAt: '2025-08-25', endAt: '2025-08-28', reportedAt: '2025-08-28' }
  ]
}

export async function getMedicationPlans() {
  await sleep(120)
  return [
    { id: 'p1', name: 'Morning', items: [{ name: 'Atorvastatin', taken: true }, { name: 'Aspirin', taken: false }], adherence: 50 },
    { id: 'p2', name: 'Evening', items: [{ name: 'Vitamin D', taken: true }], adherence: 100 }
  ]
}

export async function getSharingAudit() {
  await sleep(100)
  return [
    { id: 1, doctor: 'Dr. Silva', accessedAt: '2025-08-29T09:12:00Z', reason: 'Follow up' },
    { id: 2, doctor: 'Dr. Kumar', accessedAt: '2025-08-25T14:50:00Z', reason: 'Initial consult' }
  ]
}

export async function submitSymptom(payload) {
  await sleep(150)
  return { success: true, symptom: { ...payload, id: Math.floor(Math.random() * 10000), reportedAt: new Date().toISOString() } }
}