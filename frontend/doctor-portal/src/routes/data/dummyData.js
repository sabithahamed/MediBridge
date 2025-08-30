export const dummyPatientData = {
  Name: 'John Doe',
  Age: 34,
  Gender: 'Male',
  'Blood Type': 'O+',
  Allergies: 'Penicillin, Peanuts',
  Medications: 'Aspirin, Ibuprofen',
  Problems: 'Hypertension, Asthma',
}

export const dummyPatients = [
  { id: 1, name: 'John Doe', age: 34, gender: 'Male' },
  { id: 2, name: 'Jane Smith', age: 28, gender: 'Female' },
  { id: 3, name: 'Bob Johnson', age: 45, gender: 'Male' },
]

export const dummySymptoms = [
  { id: 1, type: 'Headache', severity: 'Moderate', description: 'Persistent pain in temples', startAt: '2025-08-29', endAt: '2025-08-29' },
  { id: 2, type: 'Fever', severity: 'Mild', description: 'Low-grade fever', startAt: '2025-08-28', endAt: '2025-08-28' },
  { id: 3, type: 'Cough', severity: 'Severe', description: 'Dry cough', startAt: '2025-08-27', endAt: '2025-08-28' },
]

export const dummyNotifications = [
  { id: 1, message: 'New symptom reported by John Doe', date: '2025-08-30' },
  { id: 2, message: 'Emergency access requested', date: '2025-08-29' },
]