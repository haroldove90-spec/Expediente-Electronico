import React from 'react';
import type { Patient, Medication, Consultation } from './types';

export const ICONS = {
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    history: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    consultation: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    medication: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a6 6 0 100-12 6 6 0 000 12z" /></svg>,
    lab: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" /></svg>,
    settings: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    menu: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>,
    close: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
    clock: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    checklist: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
};


export const PATIENTS_DATA: Patient[] = [
    {
        demographics: {
            fullName: 'Elena Rodriguez',
            dateOfBirth: '1985-03-15',
            age: 39,
            gender: 'Female',
            patientId: 'P001',
            socialSecurityNumber: 'XXX-XX-1234',
            contactInfo: {
                address: '123 Main St, Anytown, USA',
                phone: '555-123-4567',
                email: 'elena.rodriguez@example.com'
            },
            emergencyContact: {
                name: 'Carlos Rodriguez',
                relationship: 'Husband',
                phone: '555-987-6543'
            }
        },
        medicalHistory: {
            pathological: ['Hypertension (2010)', 'Type 2 Diabetes (2015)', 'Asthma (Childhood)'],
            family: ['Father - Type 2 Diabetes', 'Mother - Hypertension'],
            nonPathological: ['Social drinker (weekends)', 'Non-smoker'],
            allergies: ['Penicillin'],
            immunizations: [
                { vaccine: 'Influenza', date: '2023-10-15' },
                { vaccine: 'Tdap', date: '2022-01-20' }
            ]
        },
        consultations: [
            {
                date: '2024-07-20',
                reason: 'Routine check-up and medication review',
                anamnesis: 'Patient reports good glycemic control. No new complaints. Occasional mild shortness of breath with exercise.',
                physicalExam: {
                    vitals: { bloodPressure: '130/85', heartRate: 75, temperature: 36.8, oxygenSaturation: 98 },
                    findings: 'Lungs clear to auscultation. Heart sounds regular. No peripheral edema.'
                },
                diagnoses: [
                    { code: 'I10', description: 'Essential (primary) hypertension' },
                    { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' }
                ],
                treatmentPlan: 'Continue current medications. Advised to monitor blood pressure at home. Follow up in 3 months.',
                progressNotes: 'Stable condition.'
            }
        ],
        labResults: [
            { id: 'L001', testName: 'HbA1c', date: '2024-07-15', result: '6.8%', referenceRange: '4.0 - 6.0%', isAbnormal: true },
            { id: 'L002', testName: 'Lipid Panel', date: '2024-07-15', result: 'LDL 110 mg/dL', referenceRange: '< 100 mg/dL', isAbnormal: true },
        ],
        imagingResults: [
            { id: 'I001', studyName: 'Chest X-Ray', date: '2023-05-10', report: 'No acute cardiopulmonary process.', imageDataUrl: 'https://source.unsplash.com/random/400x300/?xray' }
        ],
        medications: [
            { name: 'Lisinopril', dosage: '20mg', route: 'Oral', frequency: 'Once daily', startDate: '2010-06-01', status: 'Active' },
            { name: 'Metformin', dosage: '1000mg', route: 'Oral', frequency: 'Twice daily', startDate: '2015-08-20', status: 'Active' },
            { name: 'Atorvastatin', dosage: '40mg', route: 'Oral', frequency: 'Once daily at night', startDate: '2020-01-15', status: 'Active' },
            { name: 'Amoxicillin', dosage: '500mg', route: 'Oral', frequency: 'Every 8 hours', startDate: '2023-02-10', endDate: '2023-02-17', status: 'Inactive' }
        ],
        alerts: [
            { id: 'A001', type: 'Allergy', severity: 'High', message: 'Allergy: Penicillin' },
            { id: 'A002', type: 'Chronic Condition', severity: 'Medium', message: 'Hypertension, Diabetes' }
        ],
        documents: []
    }
];

export const blankMedication: Medication = {
  name: '',
  dosage: '',
  route: 'Oral',
  frequency: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  status: 'Active',
};

export const blankConsultation: Omit<Consultation, 'diagnoses'> & { diagnoses: string } = {
    date: new Date().toISOString().split('T')[0],
    reason: '',
    anamnesis: '',
    physicalExam: {
        vitals: { bloodPressure: '', heartRate: 0, temperature: 0, oxygenSaturation: 0 },
        findings: ''
    },
    diagnoses: '',
    treatmentPlan: '',
    progressNotes: ''
};


export const blankPatient: Patient = {
  demographics: {
    fullName: '',
    dateOfBirth: '',
    age: 0,
    gender: 'Other',
    patientId: '',
    socialSecurityNumber: '',
    contactInfo: {
      address: '',
      phone: '',
      email: '',
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
    },
  },
  medicalHistory: {
    pathological: [],
    family: [],
    nonPathological: [],
    allergies: [''],
    immunizations: [{ vaccine: '', date: '' }],
  },
  consultations: [],
  labResults: [],
  imagingResults: [],
  medications: [],
  alerts: [],
  documents: [],
};