export const dummyPatientData = {
  Name: 'John Doe',
  Age: 34,
  Gender: 'Male',
  'Blood Type': 'O+',
  Allergies: 'Penicillin, Peanuts',
}

export const dummySymptoms = [
  { id: 1, type: 'Headache', severity: 'Moderate', description: 'Persistent pain in temples', startAt: '2025-08-29', endAt: '2025-08-29' },
  { id: 2, type: 'Fever', severity: 'Mild', description: 'Low-grade fever', startAt: '2025-08-28', endAt: '2025-08-28' },
  { id: 3, type: 'Cough', severity: 'Severe', description: 'Dry cough', startAt: '2025-08-27', endAt: '2025-08-28' },
]

export const dummyMedications = [
  { id: 1, name: 'Aspirin', time: '2025-08-30 08:00', status: 'Taken' },
  { id: 2, name: 'Ibuprofen', time: '2025-08-30 12:00', status: 'Missed' },
  { id: 3, name: 'Paracetamol', time: '2025-08-30 18:00', status: 'Taken' },
]

export const dummyNotifications = [
  { id: 1, message: 'New symptom reported', date: '2025-08-30' },
  { id: 2, message: 'Medication reminder', date: '2025-08-29' },
]

export const dummyAuditLogs = [
  { id: 1, doctor: 'Dr. Smith', date: '2025-08-29', purpose: 'Routine checkup' },
  { id: 2, doctor: 'Dr. Jones', date: '2025-08-28', purpose: 'Emergency access' },
]