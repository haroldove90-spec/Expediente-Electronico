
import { Patient } from './types';
import React from 'react';

export const patientData: Patient = {
  demographics: {
    fullName: 'Isabella Montoya',
    dateOfBirth: '1985-05-15',
    age: 39,
    gender: 'Female',
    patientId: 'P-789012',
    socialSecurityNumber: 'XXX-XX-6789',
    contactInfo: {
      address: '456 Oak Avenue, Springfield, IL 62704',
      phone: '555-0123-4567',
      email: 'isabella.m@example.com',
    },
    emergencyContact: {
      name: 'Carlos Montoya',
      relationship: 'Spouse',
      phone: '555-0198-7654',
    },
  },
  medicalHistory: {
    pathological: ['Hypertension (diagnosed 2020)', 'Migraines'],
    family: ['Father with Type 2 Diabetes', 'Mother with Hypertension'],
    nonPathological: ['Non-smoker', 'Occasional alcohol consumption'],
    allergies: ['Penicillin (causes rash)'],
    immunizations: [
      { vaccine: 'Tetanus, Diphtheria, Pertussis (Tdap)', date: '2022-08-10' },
      { vaccine: 'Influenza', date: '2023-10-05' },
    ],
  },
  consultations: [
    {
      date: '2024-07-15',
      reason: 'Follow-up for Hypertension',
      anamnesis: 'Patient reports good adherence to medication. No new complaints. Monitors BP at home, readings are stable.',
      physicalExam: {
        vitals: { bloodPressure: '125/80 mmHg', heartRate: 72, temperature: 36.8, oxygenSaturation: 98 },
        findings: 'Cardiovascular exam normal. Lungs clear. No peripheral edema.',
      },
      diagnoses: [{ code: 'I10', description: 'Essential (primary) hypertension' }],
      treatmentPlan: 'Continue Losartan 50mg daily. Follow up in 3 months. Lifestyle modifications reinforced.',
      progressNotes: 'Patient stable, BP well-controlled.',
    },
    {
      date: '2024-04-10',
      reason: 'Annual Check-up',
      anamnesis: 'General wellness check. Reports occasional migraines, managed with over-the-counter medication.',
      physicalExam: {
        vitals: { bloodPressure: '130/85 mmHg', heartRate: 75, temperature: 37.0, oxygenSaturation: 99 },
        findings: 'General examination within normal limits.',
      },
      diagnoses: [
        { code: 'I10', description: 'Essential (primary) hypertension' },
        { code: 'G43.9', description: 'Migraine, unspecified' }
      ],
      treatmentPlan: 'Initiated Losartan 50mg daily for hypertension. Ordered complete blood count and metabolic panel.',
      progressNotes: 'New diagnosis of hypertension. Patient educated on condition and treatment.',
    },
  ],
  labResults: [
    {
      id: 'lab001',
      testName: 'Complete Blood Count',
      date: '2024-04-12',
      result: 'WBC: 7.5, RBC: 4.8, Hgb: 14.2, Plt: 250k',
      referenceRange: 'WBC: 4.5-11.0, RBC: 4.2-5.4, Hgb: 12.0-16.0, Plt: 150-450k',
      isAbnormal: false,
    },
    {
      id: 'lab002',
      testName: 'Basic Metabolic Panel',
      date: '2024-04-12',
      result: 'Glucose: 95, K+: 4.1, Creatinine: 0.8',
      referenceRange: 'Glucose: 70-100, K+: 3.5-5.0, Creatinine: 0.6-1.2',
      isAbnormal: false,
    },
     {
      id: 'lab003',
      testName: 'Lipid Panel',
      date: '2024-04-12',
      result: 'Total Cholesterol: 210, LDL: 135, HDL: 50',
      referenceRange: 'Total: <200, LDL: <100, HDL: >40',
      isAbnormal: true,
    },
  ],
  imagingResults: [
    {
      id: 'img001',
      studyName: 'Chest X-Ray (PA and Lateral)',
      date: '2023-01-20',
      report: 'Lungs are clear. Heart size is normal. No acute cardiopulmonary abnormalities.',
      thumbnailUrl: 'https://picsum.photos/seed/xray/200/150',
    },
  ],
  medications: [
    { name: 'Losartan', dosage: '50 mg', route: 'Oral', frequency: 'Once daily', startDate: '2024-04-10', status: 'Active' },
    { name: 'Ibuprofen', dosage: '400 mg', route: 'Oral', frequency: 'As needed for headache', startDate: '2023-01-01', status: 'Active' },
    { name: 'Amoxicillin', dosage: '500 mg', route: 'Oral', frequency: 'Every 8 hours', startDate: '2022-11-05', endDate: '2022-11-12', status: 'Inactive' },
  ],
  alerts: [
    { id: 'alert01', type: 'Allergy', severity: 'High', message: 'Allergy to Penicillin' },
    { id: 'alert02', type: 'Chronic Condition', severity: 'Medium', message: 'Hypertension' },
    { id: 'alert03', type: 'Reminder', severity: 'Low', message: 'Next follow-up appointment due in October 2024' },
  ],
  documents: [
    { id: 'doc001', name: 'General Consent Form', type: 'Consent Form', date: '2023-01-15', url: '#' },
    { id: 'doc002', name: 'Referral to Cardiology', type: 'Referral', date: '2020-02-10', url: '#' },
  ],
};

export const ICONS = {
    user: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    history: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    consultation: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    lab: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    medication: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    alert: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    document: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    download: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
};
