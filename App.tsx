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

    const [activeView, setActiveView] = useState('Dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
        patients.length > 0 ? patients[0].demographics.patientId : null
    );
     const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isAppInstalled, setIsAppInstalled] = useState(false);


    // Persist patients to localStorage
    useEffect(() => {
        localStorage.setItem('ehr-patients', JSON.stringify(patients));
    }, [patients]);
    
    // Check installation status
    useEffect(() => {
        const handleAppInstalled = () => {
            setIsAppInstalled(true);
            setDeferredPrompt(null);
        };
        
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsAppInstalled(true);
        }

        window.addEventListener('appinstalled', handleAppInstalled);
        return () => window.removeEventListener('appinstalled', handleAppInstalled);
    }, []);

    // Listen for the browser's install prompt
    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            if (!isAppInstalled) {
                 setDeferredPrompt(e);
            }
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, [isAppInstalled]);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            await deferredPrompt.userChoice;
            setDeferredPrompt(null);
        }
    };

    const handlePatientAdded = (newPatient: Patient) => {
        setPatients(prev => [...prev, newPatient]);
        setSelectedPatientId(newPatient.demographics.patientId);
        setActiveView('Dashboard');
    };

    const handleAddMedication = (newMedication: Medication) => {
         if (!selectedPatientId) return;
        setPatients(prev => prev.map(p => {
            if (p.demographics.patientId === selectedPatientId) {
                return { ...p, medications: [...p.medications, newMedication] };
            }
            return p;
        }));
    };

    const selectedPatient = useMemo(() => 
        patients.find(p => p.demographics.patientId === selectedPatientId),
        [patients, selectedPatientId]
    );

    const renderActiveView = () => {
        if (!selectedPatient) {
            if (activeView !== 'Register Patient') {
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <h2 className="text-2xl font-semibold mb-4">No hay pacientes seleccionados</h2>
                        <p className="text-dark-text-secondary mb-6">Por favor, registre un nuevo paciente para comenzar.</p>
                        <button 
                            onClick={() => setActiveView('Register Patient')}
                            className="bg-accent-cyan text-dark-bg font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
                            Registrar Paciente
                        </button>
                    </div>
                );
            }
        }
        
        switch (activeView) {
            case 'Dashboard':
                return selectedPatient && <Dashboard patient={selectedPatient} setActiveView={setActiveView} />;
            case 'Historial Médico':
                return selectedPatient && <MedicalHistoryView patient={selectedPatient} />;
            case 'Consultas':
                return selectedPatient && <ConsultationsView consultations={selectedPatient.consultations} />;
            case 'Medicamentos':
                return selectedPatient && <MedicationsView medications={selectedPatient.medications} onAddMedication={handleAddMedication} />;
            case 'Laboratorio/Imágenes':
                return selectedPatient && <LabsAndImagesView labResults={selectedPatient.labResults} imagingResults={selectedPatient.imagingResults} />;
            case 'Configuración':
                return <SettingsView />;
            case 'Register Patient':
                return <NewPatientView onPatientAdded={handlePatientAdded} />;
            default:
                return selectedPatient && <Dashboard patient={selectedPatient} setActiveView={setActiveView}/>;
        }
    };
    
    const showInstallButton = !!deferredPrompt && !isAppInstalled;

    return (
        <div className="flex h-screen bg-dark-bg text-dark-text-primary">
            <Sidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                activeItem={activeView}
                setActiveItem={setActiveView}
                patients={patients}
                selectedPatientId={selectedPatientId}
                onSelectPatient={setSelectedPatientId}
                onRegisterNew={() => setActiveView('Register Patient')}
                onInstallClick={handleInstallClick}
                isInstallable={showInstallButton}
            />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                <button onClick={() => setIsSidebarOpen(true)} className="md:hidden mb-4 text-dark-text-secondary">
                   {ICONS.menu}
                </button>
                {renderActiveView()}
            </main>
        </div>
    );
};

export default App;
