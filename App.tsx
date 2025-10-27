
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import MedicalHistoryView from './components/MedicalHistoryView';
import ConsultationsView from './components/ConsultationsView';
import MedicationsView from './components/MedicationsView';
import LabsAndImagesView from './components/LabsAndImagesView';
import SettingsView from './components/SettingsView';
import NewPatientView from './components/NewPatientView';
import { patientData, ICONS } from './constants';
import type { Patient } from './types';

const App: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      const storedPatients = localStorage.getItem('ehr_patients');
      if (storedPatients && JSON.parse(storedPatients).length > 0) {
        const parsedPatients = JSON.parse(storedPatients);
        setPatients(parsedPatients);
        setSelectedPatientId(parsedPatients[0].demographics.patientId);
      } else {
        // Seed with default data if nothing in storage or it's empty
        setPatients([patientData]);
        setSelectedPatientId(patientData.demographics.patientId);
        localStorage.setItem('ehr_patients', JSON.stringify([patientData]));
      }
    } catch (error) {
        console.error("Failed to parse patients from localStorage", error);
        // Fallback to default patient data
        setPatients([patientData]);
        setSelectedPatientId(patientData.demographics.patientId);
    }
  }, []);

  useEffect(() => {
    // Persist patients to localStorage whenever the list changes
    if (patients.length > 0) {
        localStorage.setItem('ehr_patients', JSON.stringify(patients));
    }
  }, [patients]);
  
  // FIX: The original signature was incompatible with the `onSave` prop of `NewPatientView`,
  // causing TypeScript errors. Changed to accept a `Patient` object directly.
  const handleAddNewPatient = (newPatientData: Patient) => {
    const newPatient: Patient = {
        ...newPatientData,
        demographics: {
            ...newPatientData.demographics,
            patientId: `P${Date.now()}` // Assign a unique ID
        }
    };
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    setSelectedPatientId(newPatient.demographics.patientId);
    setActiveView('Dashboard');
  };

  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setActiveView('Dashboard');
    setSidebarOpen(false);
  }

  const selectedPatient = patients.find(p => p.demographics.patientId === selectedPatientId);

  const renderView = () => {
    if (activeView === 'Register Patient') {
      return <NewPatientView onSave={handleAddNewPatient} onCancel={() => setActiveView('Dashboard')} />;
    }

    if (!selectedPatient) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h2 className="text-2xl font-semibold text-dark-text-primary mb-4">No hay paciente seleccionado</h2>
          <p className="text-dark-text-secondary mb-6">Por favor, seleccione un paciente de la lista o registre uno nuevo.</p>
          <button 
            onClick={() => setActiveView('Register Patient')}
            className="bg-accent-cyan text-dark-bg font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
            Registrar Nuevo Paciente
          </button>
        </div>
      );
    }
    
    switch (activeView) {
      case 'Dashboard':
        return <Dashboard patient={selectedPatient} />;
      case 'Historial Médico':
        return <MedicalHistoryView patient={selectedPatient} />;
      case 'Consultas':
        return <ConsultationsView consultations={selectedPatient.consultations} />;
      case 'Medicamentos':
        return <MedicationsView medications={selectedPatient.medications} />;
      case 'Laboratorio/Imágenes':
        return <LabsAndImagesView labResults={selectedPatient.labResults} imagingResults={selectedPatient.imagingResults} />;
      case 'Configuración':
        return <SettingsView />;
      default:
        return <Dashboard patient={selectedPatient} />;
    }
  };

  return (
    <div className="relative flex min-h-screen font-sans bg-dark-bg">
      <Sidebar 
        activeItem={activeView} 
        setActiveItem={setActiveView}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen} 
        patients={patients}
        selectedPatientId={selectedPatientId}
        onSelectPatient={handleSelectPatient}
        onRegisterNew={() => setActiveView('Register Patient')}
      />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 text-dark-text-primary overflow-y-auto h-screen">
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