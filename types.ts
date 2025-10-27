
export interface Patient {
  demographics: PatientDemographics;
  medicalHistory: MedicalHistory;
  consultations: Consultation[];
  labResults: LabResult[];
  imagingResults: ImagingResult[];
  medications: Medication[];
  alerts: Alert[];
  documents: Document[];
}

export interface PatientDemographics {
  fullName: string;
  dateOfBirth: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  patientId: string;
  socialSecurityNumber: string;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface MedicalHistory {
  pathological: string[];
  family: string[];
  nonPathological: string[];
  allergies: string[];
  immunizations: Immunization[];
}

export interface Immunization {
  vaccine: string;
  date: string;
}

export interface Consultation {
  date: string;
  reason: string;
  anamnesis: string;
  physicalExam: {
    vitals: VitalSigns;
    findings: string;
  };
  diagnoses: Diagnosis[];
  treatmentPlan: string;
  progressNotes: string;
}

export interface VitalSigns {
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
}

export interface Diagnosis {
  code: string;
  description: string;
}

export interface LabResult {
  id: string;
  testName: string;
  date: string;
  result: string;
  referenceRange: string;
  isAbnormal: boolean;
}

export interface ImagingResult {
  id: string;
  studyName: string;
  date: string;
  report: string;
  thumbnailUrl: string;
}

export interface Medication {
  name: string;
  dosage: string;
  route: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: 'Active' | 'Inactive';
}

export interface Alert {
  id: string;
  type: 'Allergy' | 'Chronic Condition' | 'Reminder';
  severity: 'High' | 'Medium' | 'Low';
  message: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'Consent Form' | 'Discharge Summary' | 'Referral';
  date: string;
  url: string;
}
