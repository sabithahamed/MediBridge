export const patients = [
  { 
    id: "1", 
    name: "John Doe", 
    age: 45,
    gender: "Male",
    latestSymptom: { 
      description: "Headache and fever", 
      date: "2025-08-30" 
    },
    medicalHistory: ["Hypertension", "Type 2 Diabetes"],
    medications: ["Metformin 500mg", "Lisinopril 10mg"],
    vitals: { // <-- ADDED THIS SECTION
      heartRate: "78 bpm",
      bloodPressure: "130/85 mmHg",
      temperature: "37.5°C",
      oxygenSaturation: "98%"
    }

  },
  { 
    id: "2", 
    name: "Jane Smith", 
    age: 32,
    gender: "Female",
    latestSymptom: { 
      description: "Cough and sore throat", 
      date: "2025-08-29" 
    },
    medicalHistory: ["Asthma"],
    medications: ["Albuterol inhaler"],
    vitals: { // <-- ADDED THIS SECTION
      heartRate: "85 bpm",
      bloodPressure: "118/76 mmHg",
      temperature: "37.1°C",
      oxygenSaturation: "99%"
    }

  },
  { 
    id: "3", 
    name: "Robert Johnson", 
    age: 68,
    gender: "Male",
    latestSymptom: { 
      description: "Chest pain and shortness of breath", 
      date: "2025-08-28" 
    },
    medicalHistory: ["Coronary Artery Disease", "High Cholesterol"],
    medications: ["Atorvastatin 40mg", "Aspirin 81mg"],
    vitals: { // <-- ADDED THIS SECTION
      heartRate: "92 bpm",
      bloodPressure: "145/90 mmHg",
      temperature: "37.0°C",
      oxygenSaturation: "95%"
    }
  }
];

export const notifications = [

  { id: 1, type: 'symptom', message: "New symptom reported by John Doe: Headache and fever", date: "2025-08-30", read: false },
  { id: 2, type: 'emergency', message: "Emergency access to Jane Smith's record by Dr. Evans", date: "2025-08-29", read: true },
  { id: 3, type: 'lab', message: "Lab results are available for Jane Smith's recent test", date: "2025-08-28", read: false },
  { id: 4, type: 'medication', message: "Robert Johnson missed a scheduled medication: Atorvastatin 40mg", date: "2025-08-28", read: false },
  { id: 5, type: 'appointment', message: "Appointment reminder: John Doe in 1 hour", date: "2025-08-30", read: true },
  { id: 6, type: 'symptom', message: "High severity symptom 'Chest pain' reported by Robert Johnson", date: "2025-08-28", read: false },

];