import React from 'react';
import type { Patient } from '../types';
import PatientHeader from './PatientHeader';
import AlertsCard from './AlertsSection';
import VitalsCard from './HistorySection';
import ActiveDiagnosesCard from './ConsultationSection';
import CurrentMedicationsCard from './MedicationSection';
import LatestResultsCard from './ResultsSection';
import GlucoseTrendCard from './DocumentsSection';
import AppointmentsCard from './SectionCard';

const PlaceholderCard = () => (
    <div className="bg-dark-card rounded-lg p-4 flex items-center justify-center border-2 border-dashed border-dark-border">
        <div className="text-center text-dark-text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            <p className="mt-2 text-sm">Add Widget</p>
        </div>
    </div>
);

interface DashboardProps {
  patient: Patient;
  setActiveView: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ patient, setActiveView }) => {
  const latestConsultation = patient.consultations?.length > 0
    ? [...patient.consultations].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    : null;

  return (
    <div className="text-dark-text-primary">
      <PatientHeader demographics={patient.demographics} />
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-min">
        <div className="lg:col-span-1">
            <AlertsCard alerts={patient.alerts} />
        </div>
        <div className="lg:col-span-1">
            <VitalsCard vitals={latestConsultation?.physicalExam.vitals} date={latestConsultation?.date} />
        </div>
        <div className="lg:col-span-1">
           <PlaceholderCard />
        </div>
        
        <div className="lg:col-span-1">
            <ActiveDiagnosesCard diagnoses={patient.medicalHistory.pathological} />
        </div>

        <div className="lg:col-span-1">
            <CurrentMedicationsCard medications={patient.medications} />
        </div>

        <div className="lg:col-span-1">
            <LatestResultsCard labResults={patient.labResults} imagingResults={patient.imagingResults} />
        </div>

        <div className="lg:col-span-2">
            <GlucoseTrendCard />
        </div>

        <div className="lg:col-span-1">
            <AppointmentsCard onViewHistory={() => setActiveView('Consultas')} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;