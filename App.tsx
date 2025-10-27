import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import MedicalHistoryView from './components/MedicalHistoryView';
import ConsultationsView from './components/ConsultationsView';
import MedicationsView from './components/MedicationsView';
import LabsAndImagesView from './components/LabsAndImagesView';
import SettingsView from './components/SettingsView';
import { patientData } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('Dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <Dashboard patient={patientData} />;
      case 'Historial Médico':
        return <MedicalHistoryView patient={patientData} />;
      case 'Consultas':
        return <ConsultationsView consultations={patientData.consultations} />;
      case 'Medicamentos':
        return <MedicationsView medications={patientData.medications} />;
      case 'Laboratorio/Imágenes':
        return <LabsAndImagesView labResults={patientData.labResults} imagingResults={patientData.imagingResults} />;
      case 'Configuración':
        return <SettingsView />;
      default:
        return <Dashboard patient={patientData} />;
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar activeItem={activeView} setActiveItem={setActiveView} />
      <main className="flex-1 p-6 lg:p-8 bg-dark-bg text-dark-text-primary overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
