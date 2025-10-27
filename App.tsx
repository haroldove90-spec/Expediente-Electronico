import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MedicalHistoryView from './components/MedicalHistoryView';
import ConsultationsView from './components/ConsultationsView';
import MedicationsView from './components/MedicationsView';
import LabsAndImagesView from './components/LabsAndImagesView';
import SettingsView from './components/SettingsView';
import NewPatientView from './components/NewPatientView';
import { ICONS, PATIENTS_DATA } from './constants';
import type { Patient, Medication } from './types';

const App: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>(() => {
        try {
            const saved = localStorage.getItem('ehr-patients');
            return saved ? JSON.parse(saved) : PATIENTS_DATA;
        } catch (error) {
            console.error("Failed to parse patients from localStorage", error);
            return PATIENTS_DATA;
        }
    });

    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(patients.length > 0 ? patients[0].demographics.patientId : null);
    const [activeView, setActiveView] = useState('Dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const savePatients = (updatedPatients: Patient[]) => {
        setPatients(updatedPatients);
        localStorage.setItem('ehr-patients', JSON.stringify(updatedPatients));
    };

    useEffect(() => {
        if (!selectedPatientId && patients.length > 0) {
            setSelectedPatientId(patients[0].demographics.patientId);
        }
    }, [patients, selectedPatientId]);

    const handleSelectPatient = (patientId: string) => {
        setSelectedPatientId(patientId);
        setActiveView('Dashboard'); // Reset to dashboard on patient switch
    };

    const handleRegisterNew = () => {
        setActiveView('Register Patient');
    }

    const handleAddNewPatient = (newPatient: Patient) => {
        const updatedPatients = [...patients, newPatient];
        savePatients(updatedPatients);
        setSelectedPatientId(newPatient.demographics.patientId);
        setActiveView('Dashboard');
    }

    const handleAddNewMedication = (newMedication: Medication) => {
        if (!selectedPatientId) return;

        const updatedPatients = patients.map(p => {
            if (p.demographics.patientId === selectedPatientId) {
                // Create a new patient object with the new medication
                return {
                    ...p,
                    medications: [...p.medications, newMedication]
                };
            }
            return p;
        });
        savePatients(updatedPatients);
    };

    const selectedPatient = useMemo(() => {
        return patients.find(p => p.demographics.patientId === selectedPatientId);
    }, [patients, selectedPatientId]);

    const renderContent = () => {
        if (activeView === 'Register Patient') {
            return <NewPatientView onPatientAdded={handleAddNewPatient} />;
        }

        if (!selectedPatient) {
            return (
                <div className="flex items-center justify-center h-full text-center p-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-dark-text-primary">No hay pacientes registrados</h2>
                        <p className="text-dark-text-secondary mt-2">Por favor, registre un nuevo paciente para comenzar.</p>
                        <button 
                            onClick={handleRegisterNew}
                            className="mt-4 bg-accent-cyan text-dark-bg font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                            + Registrar Nuevo Paciente
                        </button>
                    </div>
                </div>
            );
        }

        switch (activeView) {
            case 'Dashboard':
                return <Dashboard patient={selectedPatient} setActiveView={setActiveView} />;
            case 'Historial Médico':
                return <MedicalHistoryView patient={selectedPatient} />;
            case 'Consultas':
                return <ConsultationsView consultations={selectedPatient.consultations} />;
            case 'Medicamentos':
                return <MedicationsView medications={selectedPatient.medications} onAddMedication={handleAddNewMedication} />;
            case 'Laboratorio/Imágenes':
                return <LabsAndImagesView labResults={selectedPatient.labResults} imagingResults={selectedPatient.imagingResults} />;
            case 'Configuración':
                return <SettingsView />;
            default:
                return <Dashboard patient={selectedPatient} setActiveView={setActiveView} />;
        }
    };

    return (
        <div className="bg-dark-bg min-h-screen flex">
            <Sidebar
                activeItem={activeView}
                setActiveItem={setActiveView}
                isOpen={isSidebarOpen}
                setIsOpen={setSidebarOpen}
                patients={patients}
                selectedPatientId={selectedPatientId}
                onSelectPatient={handleSelectPatient}
                onRegisterNew={handleRegisterNew}
            />

            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                {/* Header */}
                <div className="md:hidden flex items-center justify-between mb-6">
                    <button onClick={() => setSidebarOpen(true)} className="text-dark-text-primary">
                        {ICONS.menu}
                    </button>
                    <h1 className="text-xl font-bold text-dark-text-primary">EHR</h1>
                </div>

                {renderContent()}
            </main>
        </div>
    );
};

export default App;