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
    const [installPromptEvent, setInstallPromptEvent] = useState<Event | null>(null);

    useEffect(() => {
        // PWA Setup: Create manifest and register service worker dynamically to make the app installable.
        const manifest = {
            "short_name": "HC",
            "name": "Historial Clinico",
            "description": "Un moderno y responsivo tablero de Historial Clínico Electrónico (HCE) para profesionales de la salud.",
            "icons": [{ "src": "/vite.svg", "type": "image/svg+xml", "sizes": "any" }],
            "start_url": ".",
            "display": "standalone",
            "theme_color": "#0F172A",
            "background_color": "#0F172A"
        };
        const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
        const manifestUrl = URL.createObjectURL(manifestBlob);
        const linkEl = document.createElement('link');
        linkEl.rel = 'manifest';
        linkEl.href = manifestUrl;
        document.head.appendChild(linkEl);

        if ('serviceWorker' in navigator) {
            const swCode = `
                const CACHE_NAME = 'historial-clinico-cache-v1';
                const urlsToCache = ['/', '/index.html'];
                self.addEventListener('install', event => {
                    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
                });
                self.addEventListener('fetch', event => {
                    event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
                });
            `;
            const swBlob = new Blob([swCode], { type: 'application/javascript' });
            const swUrl = URL.createObjectURL(swBlob);
            navigator.serviceWorker.register(swUrl)
                .then(reg => console.log('ServiceWorker registered.', reg))
                .catch(err => console.error('ServiceWorker registration failed:', err));
        }

        return () => {
            document.head.removeChild(linkEl);
        };
    }, []);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setInstallPromptEvent(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

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

    const handleInstallClick = () => {
        if (!installPromptEvent) {
            return;
        }
        const promptEvent = installPromptEvent as any;
        promptEvent.prompt();
        promptEvent.userChoice.then((choiceResult: { outcome: string }) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            setInstallPromptEvent(null);
        });
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
                onInstallClick={handleInstallClick}
                canInstall={!!installPromptEvent}
            />

            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                {/* Header */}
                <div className="md:hidden flex items-center justify-between mb-6">
                    <button onClick={() => setSidebarOpen(true)} className="text-dark-text-primary">
                        {ICONS.menu}
                    </button>
                    <h1 className="text-xl font-bold text-dark-text-primary">HC</h1>
                </div>

                {renderContent()}
            </main>
        </div>
    );
};

export default App;