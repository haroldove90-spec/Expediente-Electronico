import React from 'react';
import type { Patient, Medication } from './types';

export const ICONS = {
    menu: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>,
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    history: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    consultation: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    medication: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    lab: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h8a2 2 0 002-2v-4a2 2 0 00-2-2h-8a2 2 0 00-2 2v4a2 2 0 002 2z" /></svg>,
    settings: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    close: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
    clock: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    checklist: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    install: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
    purchase: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
};

export const PATIENTS_DATA: Patient[] = [
    {
        demographics: {
            fullName: 'Elena Rodriguez',
            dateOfBirth: '1985-05-15',
            age: new Date().getFullYear() - 1985,
            gender: 'Female',
            patientId: 'P001',
            socialSecurityNumber: 'XXX-XX-1234',
            contactInfo: {
                address: '123 Main St, Anytown, USA',
                phone: '555-123-4567',
                email: 'elena.rodriguez@example.com',
            },
            emergencyContact: {
                name: 'Carlos Rodriguez',
                relationship: 'Spouse',
                phone: '555-987-6543',
            },
        },
        medicalHistory: {
            pathological: ['Hypertension', 'Type 2 Diabetes'],
            family: ['Father with Type 2 Diabetes', 'Mother with Hypertension'],
            nonPathological: ['Social drinker', 'Non-smoker'],
            allergies: ['Penicillin'],
            immunizations: [
                { vaccine: 'COVID-19 (Pfizer)', date: '2023-11-20' },
                { vaccine: 'Influenza', date: '2023-10-15' },
            ],
        },
        consultations: [
            {
                date: '2024-05-10',
                reason: 'Follow-up for Diabetes',
                anamnesis: 'Patient reports good glycemic control, no new symptoms.',
                physicalExam: {
                    vitals: {
                        bloodPressure: '130/80',
                        heartRate: 75,
                        temperature: 36.8,
                        oxygenSaturation: 98,
                    },
                    findings: 'No abnormal findings.',
                },
                diagnoses: [
                    { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' },
                    { code: 'I10', description: 'Essential (primary) hypertension' },
                ],
                treatmentPlan: 'Continue current medication. Diet and exercise recommended. Follow up in 3 months.',
                progressNotes: 'Stable condition.',
            },
        ],
        labResults: [
            { id: 'lab001', testName: 'HbA1c', date: '2024-05-10', result: '6.8%', referenceRange: '4.0 - 6.0%', isAbnormal: true },
            { id: 'lab002', testName: 'Cholesterol', date: '2024-05-10', result: '190 mg/dL', referenceRange: '< 200 mg/dL', isAbnormal: false },
        ],
        imagingResults: [
            { 
                id: 'img001', 
                studyName: 'Radiografía Lateral de Cráneo', 
                date: '2024-03-12', 
                report: 'Estructuras óseas del cráneo sin alteraciones visibles.', 
                imageDataUrl: 'https://estudidentalbarcelona.com/wp-content/uploads/2018/01/radiografia-lateral-craneo.jpg' 
            },
        ],
        medications: [
            { name: 'Metformin', dosage: '500mg', route: 'Oral', frequency: 'Twice daily', startDate: '2022-01-15', status: 'Active' },
            { name: 'Lisinopril', dosage: '10mg', route: 'Oral', frequency: 'Once daily', startDate: '2021-06-01', status: 'Active' },
        ],
        alerts: [
            { id: 'alert001', type: 'Allergy', severity: 'High', message: 'Allergy: Penicillin' },
            { id: 'alert002', type: 'Chronic Condition', severity: 'Medium', message: 'Type 2 Diabetes' },
        ],
        documents: [],
    },
];

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
        allergies: [],
        immunizations: [],
    },
    consultations: [],
    labResults: [],
    imagingResults: [],
    medications: [],
    alerts: [],
    documents: [],
};

export const blankMedication: Medication = {
    name: '',
    dosage: '',
    route: 'Oral',
    frequency: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    status: 'Active',
};