import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import MedicalHistoryView from './components/MedicalHistoryView';
import ConsultationsView from './components/ConsultationsView';
import MedicationsView from './components/MedicationsView';
import LabsAndImagesView from './components/LabsAndImagesView';
import SettingsView from './components/SettingsView';
import { patientData, ICONS } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="relative flex min-h-screen font-sans bg-dark-bg">
      <Sidebar 
        activeItem={activeView} 
        setActiveItem={setActiveView}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen} 
      />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 text-dark-text-primary overflow-y-auto">
        <div className="md:hidden flex justify-between items-center mb-4 pb-4 border-b border-dark-border">
            <h1 className="text-xl font-bold text-dark-text-primary">EHR Dashboard</h1>
            <button onClick={() => setSidebarOpen(true)} className="text-dark-text-secondary">
                {ICONS.menu}
            </button>
        </div>
        {renderView()}
      </main>
    </div>
  );
};

export default App;