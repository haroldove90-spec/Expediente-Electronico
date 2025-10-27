
import React from 'react';
import type { Patient } from '../types';
import PatientHeader from './PatientHeader';
import AlertsSection from './AlertsSection';
import HistorySection from './HistorySection';
import ConsultationSection from './ConsultationSection';
import ResultsSection from './ResultsSection';
import MedicationSection from './MedicationSection';
import DocumentsSection from './DocumentsSection';

interface DashboardProps {
  patient: Patient;
}

const Dashboard: React.FC<DashboardProps> = ({ patient }) => {
  return (
    <div className="space-y-6">
      <PatientHeader demographics={patient.demographics} />
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-1 xl:col-span-1 space-y-6">
          <AlertsSection alerts={patient.alerts} />
          <HistorySection history={patient.medicalHistory} />
        </div>

        {/* Main Content Column */}
        <div className="lg:col-span-2 xl:col-span-3 space-y-6">
          <ConsultationSection consultations={patient.consultations} />
          <ResultsSection labResults={patient.labResults} imagingResults={patient.imagingResults} />
          <MedicationSection medications={patient.medications} />
          <DocumentsSection documents={patient.documents} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
