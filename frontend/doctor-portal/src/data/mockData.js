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
    medications: ["Metformin 500mg", "Lisinopril 10mg"]
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
    medications: ["Albuterol inhaler"]
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
    medications: ["Atorvastatin 40mg", "Aspirin 81mg"]
  }
];

export const notifications = [
  { id: 1, message: "New symptom reported by John Doe", date: "2025-08-30", read: false },
  { id: 2, message: "Emergency access requested by Nurse Williams", date: "2025-08-29", read: true },
  { id: 3, message: "Lab results available for Jane Smith", date: "2025-08-28", read: false },
];