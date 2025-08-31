// Extended mock data to support prescriptions, labs, emergency contacts, adherence & sharing flags.
export const patients = [
  {
    id: '1',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    nic: '852345678V',
    latestSymptom: { description: 'Mild dizziness on standing', date: '2025-08-31', severity: 'low' },
    medicalHistory: ['Hypertension','Type 2 Diabetes','Seasonal Rhinitis'],
    medications: ['Metformin 500mg','Lisinopril 10mg','Vitamin D3 1000IU'],
    prescriptions: [
      { id:'rx1', drug:'Metformin', dose:'500mg', frequency:'BID', times:['08:00','20:00'], startDate:'2025-07-15', durationDays:60, endDate:'2025-09-12', totalUnits:120, remainingUnits:48, quantity:1, unit:'tablet', notes:'Monitor HbA1c quarterly' },
      { id:'rx2', drug:'Lisinopril', dose:'10mg', frequency:'OD', times:['09:00'], startDate:'2025-06-20', durationDays:90, endDate:'2025-09-17', totalUnits:90, remainingUnits:25, quantity:1, unit:'tablet', notes:'Target BP <130/80' }
    ],
    labTests: [
      { id:'lab1', name:'HbA1c', status:'Completed', orderedDate:'2025-08-05', result:'6.7%' },
      { id:'lab2', name:'Lipid Panel', status:'Pending', orderedDate:'2025-08-29', result:null }
    ],
    vitals: { heartRate:'76 bpm', bloodPressure:'128/82 mmHg', temperature:'37.2°C', oxygenSaturation:'98%' },
    adherence: 84,
    sharingAllowed: true,
    emergencyContacts:[{ name:'Jane Doe', relation:'Spouse', phone:'+1 555-111-2222' }]
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    nic: '952234567V',
    latestSymptom: { description:'Night cough episodes', date:'2025-08-30', severity:'moderate' },
    medicalHistory: ['Asthma','Iron Deficiency (resolved)'],
    medications: ['Albuterol inhaler','Cetirizine 10mg'],
    prescriptions: [
      { id:'rx3', drug:'Albuterol', dose:'2 puffs', frequency:'PRN', times:[], startDate:'2025-08-10', notes:'Use spacer – max 8 puffs/day' },
      { id:'rx6', drug:'Cetirizine', dose:'10mg', frequency:'OD', times:['21:00'], startDate:'2025-08-20', durationDays:30, endDate:'2025-09-18', totalUnits:30, remainingUnits:19, quantity:1, unit:'tablet' }
    ],
    labTests: [ { id:'lab3', name:'Peak Flow', status:'Completed', orderedDate:'2025-08-18', result:'455 L/min' } ],
    vitals: { heartRate:'82 bpm', bloodPressure:'116/74 mmHg', temperature:'37.0°C', oxygenSaturation:'99%' },
    adherence: 90,
    sharingAllowed: false,
    emergencyContacts:[{ name:'Robert Smith', relation:'Father', phone:'+1 555-333-4444' }]
  },
  {
    id: '3',
    name: 'Robert Johnson',
    age: 68,
    gender: 'Male',
    nic: '651123456V',
    latestSymptom: { description:'Exertional chest tightness', date:'2025-08-29', severity:'high' },
    medicalHistory: ['Coronary Artery Disease','High Cholesterol','Former Smoker'],
    medications: ['Atorvastatin 40mg','Aspirin 81mg','Nitroglycerin SL'],
    prescriptions: [
      { id:'rx4', drug:'Atorvastatin', dose:'40mg', frequency:'OD', times:['22:00'], startDate:'2025-06-01', durationDays:120, endDate:'2025-09-28', totalUnits:120, remainingUnits:30, quantity:1, unit:'tablet', notes:'Taken at night' },
      { id:'rx5', drug:'Aspirin', dose:'81mg', frequency:'OD', times:['08:00'], startDate:'2025-06-01', durationDays:120, endDate:'2025-09-28', totalUnits:120, remainingUnits:33, quantity:1, unit:'tablet', notes:'GI protection considered' },
      { id:'rx7', drug:'Nitroglycerin', dose:'0.4mg', frequency:'PRN', times:[], startDate:'2025-08-25', notes:'Max 3 doses/5min intervals' }
    ],
    labTests: [
      { id:'lab4', name:'ECG', status:'Completed', orderedDate:'2025-08-29', result:'Mild ischemic changes' },
      { id:'lab5', name:'Troponin', status:'Completed', orderedDate:'2025-08-29', result:'Slightly elevated' }
    ],
    vitals: { heartRate:'90 bpm', bloodPressure:'142/88 mmHg', temperature:'36.9°C', oxygenSaturation:'96%' },
    adherence: 65,
    sharingAllowed: true,
    emergencyContacts:[{ name:'Emily Johnson', relation:'Daughter', phone:'+1 555-777-8888' }]
  }
];

export const notifications = [
  { id:1, type:'symptom', message:"Dizziness reported by John Doe", date:'2025-08-31', read:false },
  { id:2, type:'medication', message:"Low remaining units: Metformin (John Doe)", date:'2025-08-31', read:false },
  { id:3, type:'lab', message:"Lipid Panel pending for John Doe", date:'2025-08-31', read:false },
  { id:4, type:'symptom', message:"Night cough escalation (Jane Smith)", date:'2025-08-30', read:true },
  { id:5, type:'lab', message:"ECG result updated (Robert Johnson)", date:'2025-08-29', read:false },
  { id:6, type:'emergency', message:"Emergency access used for Robert Johnson", date:'2025-08-29', read:true },
  { id:7, type:'medication', message:"Aspirin adherence below 70% (Robert Johnson)", date:'2025-08-29', read:false }
];