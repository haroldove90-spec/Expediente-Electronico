import { Patient } from './types';
import React from 'react';

export const patientData: Patient = {
  demographics: {
    fullName: 'Juan Pérez',
    dateOfBirth: '1968-03-22',
    age: 56,
    gender: 'Male',
    patientId: '789012',
    socialSecurityNumber: 'XXX-XX-1234',
    contactInfo: {
      address: '123 Main St, Anytown, USA 12345',
      phone: '555-123-4567',
      email: 'juan.perez@example.com',
    },
    emergencyContact: {
      name: 'Maria Pérez',
      relationship: 'Spouse',
      phone: '555-987-6543',
    },
  },
  medicalHistory: {
    pathological: ['Diabetes Mellitus Tipo 2', 'Hipertensión', 'Dislipidemia'],
    family: ['Padre con enfermedad cardíaca', 'Madre con Diabetes Mellitus Tipo 2'],
    nonPathological: ['No fumador', 'Consume alcohol ocasionalmente'],
    allergies: ['Penicilina'],
    immunizations: [
      { vaccine: 'Influenza', date: '2023-10-15' },
      { vaccine: 'Tétanos/Difteria/Tos ferina (Tdap)', date: '2022-08-20' },
      { vaccine: 'Neumococo', date: '2021-05-10' },
    ],
  },
  consultations: [
    {
      date: '2024-05-10',
      reason: 'Control de Diabetes',
      anamnesis: 'Paciente refiere buen control general. Sigue plan de alimentación y medicación.',
      physicalExam: {
        vitals: { bloodPressure: '120/80', heartRate: 72, temperature: 36.8, oxygenSaturation: 98 },
        findings: 'Sin hallazgos agudos. Pulsos pedios presentes y simétricos.',
      },
      diagnoses: [{ code: 'E11.9', description: 'Diabetes mellitus tipo 2 no complicada' }],
      treatmentPlan: 'Continuar con medicación actual. Se solicita Hemoglobina Glicosilada (HbA1c). Próxima cita en 3 meses.',
      progressNotes: 'Estable.',
    },
    {
      date: '2024-02-12',
      reason: 'Control de Hipertensión',
      anamnesis: 'Paciente refiere mareos ocasionales. Se ajusta dosis de antihipertensivo.',
      physicalExam: {
        vitals: { bloodPressure: '135/85', heartRate: 75, temperature: 37.0, oxygenSaturation: 99 },
        findings: 'Ritmo cardíaco regular, sin soplos.',
      },
      diagnoses: [{ code: 'I10', description: 'Hipertensión esencial (primaria)' }],
      treatmentPlan: 'Aumentar Losartán a 50mg c/12h. Monitoreo de presión arterial en casa.',
      progressNotes: 'Pendiente de revaloración con nuevo esquema.',
    },
     {
      date: '2023-11-20',
      reason: 'Chequeo General Anual',
      anamnesis: 'Paciente asintomático. Se realiza chequeo de rutina.',
      physicalExam: {
        vitals: { bloodPressure: '130/82', heartRate: 68, temperature: 36.5, oxygenSaturation: 98 },
        findings: 'Examen físico dentro de límites normales.',
      },
      diagnoses: [
          { code: 'E11.9', description: 'Diabetes mellitus tipo 2' },
          { code: 'I10', description: 'Hipertensión esencial (primaria)' }
        ],
      treatmentPlan: 'Se solicitan laboratorios de control. Se refuerzan medidas higiénico-dietéticas.',
      progressNotes: 'Paciente en buenas condiciones generales.',
    },
  ],
  labResults: [
    {
      id: 'lab001',
      testName: 'Glucosa',
      date: '2024-05-10',
      result: '130 mg/dL',
      referenceRange: '70-100',
      isAbnormal: true,
    },
    {
      id: 'lab002',
      testName: 'HbA1c',
      date: '2024-05-10',
      result: '7.2 %',
      referenceRange: '4.0-5.6',
      isAbnormal: true,
    },
    {
      id: 'lab003',
      testName: 'Colesterol Total',
      date: '2024-02-12',
      result: '210 mg/dL',
      referenceRange: '< 200',
      isAbnormal: true,
    },
     {
      id: 'lab004',
      testName: 'Creatinina',
      date: '2024-02-12',
      result: '0.9 mg/dL',
      referenceRange: '0.7-1.2',
      isAbnormal: false,
    }
  ],
  imagingResults: [
    {
      id: 'img001',
      studyName: 'Rx Tórax',
      date: '2024-01-15',
      report: 'Sin hallazgos patológicos agudos. Índice cardiotorácico normal.',
      thumbnailUrl: 'https://picsum.photos/seed/xray/200/150',
    },
    {
      id: 'img002',
      studyName: 'Ultrasonido Abdominal',
      date: '2023-08-05',
      report: 'Hígado con esteatosis leve. Resto de órganos sin alteraciones.',
      thumbnailUrl: 'https://picsum.photos/seed/ultrasound/200/150',
    },
     {
      id: 'img003',
      studyName: 'Electrocardiograma',
      date: '2024-02-12',
      report: 'Ritmo sinusal, 75 lpm, sin signos de isquemia aguda.',
      thumbnailUrl: 'https://picsum.photos/seed/ekg/200/150',
    },
  ],
  medications: [
    { name: 'Metformina', dosage: '850mg', route: 'c/12h', frequency: '', startDate: '2020-01-01', status: 'Active' },
    { name: 'Losartán', dosage: '50mg', route: 'c/24h', frequency: '', startDate: '2021-03-01', status: 'Active' },
    { name: 'Atorvastatina', dosage: '20mg', route: 'c/24h', frequency: '', startDate: '2023-11-20', status: 'Active' },
    { name: 'Aspirina', dosage: '100mg', route: 'c/24h', frequency: '', startDate: '2021-03-01', status: 'Active' },
    { name: 'Amoxicilina', dosage: '500mg', route: 'c/8h', frequency: '', startDate: '2023-04-01', endDate: '2023-04-08', status: 'Inactive' },
  ],
  alerts: [
    { id: 'alert01', type: 'Allergy', severity: 'High', message: 'ALERGIA: PENICILINA!' },
    { id: 'alert02', type: 'Chronic Condition', severity: 'Medium', message: 'Diagnóstico: Diabetes Mellitus Tipo 2' },
    { id: 'alert03', type: 'Reminder', severity: 'Low', message: 'Próxima cita: 10/08/2024, Dr. House (Control)' },
  ],
  documents: [
    { id: 'doc001', name: 'Consentimiento Informado General', type: 'Consent Form', date: '2022-01-15', url: '#' },
  ],
};

export const ICONS = {
    user: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    history: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v1.586m0 0v1.586m0-1.586h0m-6.364 2.876l1.118 1.118m0-1.118l-1.118 1.118m11.118-1.118l-1.118 1.118m0 0l1.118 1.118M12 21.75c-5.122 0-9.25-4.128-9.25-9.25S6.878 3.25 12 3.25s9.25 4.128 9.25 9.25-4.128 9.25-9.25 9.25z" /></svg>,
    consultation: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-3-5v5m-3-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    lab: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    medication: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    settings: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    menu: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>,
    plus: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>,
    checklist: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    clock: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    close: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
};
