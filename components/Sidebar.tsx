import React from 'react';
import { ICONS } from '../constants';
import type { Patient } from '../types';

interface SidebarProps {
    activeItem: string;
    setActiveItem: (item: string) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    patients: Patient[];
    selectedPatientId: string | null;
    onSelectPatient: (patientId: string) => void;
    onRegisterNew: () => void;
    onInstallClick: () => void;
    isInstallable: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    activeItem, setActiveItem, isOpen, setIsOpen,
    patients, selectedPatientId, onSelectPatient, onRegisterNew,
    onInstallClick, isInstallable
}) => {
    const navItems = [
        { name: 'Dashboard', icon: ICONS.dashboard },
        { name: 'Historial Médico', icon: ICONS.history },
        { name: 'Consultas', icon: ICONS.consultation },
        { name: 'Medicamentos', icon: ICONS.medication },
        { name: 'Laboratorio/Imágenes', icon: ICONS.lab },
        { name: 'Configuración', icon: ICONS.settings },
    ];

    const handleItemClick = (name: string) => {
        setActiveItem(name);
        if (name !== 'Register Patient') {
            setIsOpen(false);
        }
    }
    
    const handleRegisterClick = () => {
        onRegisterNew();
        setIsOpen(false);
    }

    const handleInstallButtonClick = () => {
        onInstallClick();
    };

    return (
        <>
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-dark-card flex-shrink-0 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex items-center justify-between border-b border-dark-border">
                    <div className="flex items-center space-x-3">
                        {ICONS.menu}
                        <h1 className="text-xl font-bold text-dark-text-primary">HC</h1>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="md:hidden text-dark-text-secondary">
                        {ICONS.close}
                    </button>
                </div>
                
                <div className="p-4 space-y-4 border-b border-dark-border">
                     <div>
                        <label htmlFor="patient-select" className="block text-sm font-medium text-dark-text-secondary mb-1">Paciente Actual</label>
                        <select 
                            id="patient-select"
                            value={selectedPatientId || ''}
                            onChange={(e) => onSelectPatient(e.target.value)}
                            className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-dark-text-primary focus:ring-accent-cyan focus:border-accent-cyan"
                        >
                            {patients.map(p => (
                                <option key={p.demographics.patientId} value={p.demographics.patientId}>
                                    {p.demographics.fullName}
                                </option>
                            ))}
                        </select>
                     </div>
                     <button 
                        onClick={handleRegisterClick}
                        className="w-full bg-accent-cyan text-dark-bg font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity text-sm">
                        + Registrar Nuevo Paciente
                    </button>
                </div>

                <nav className="flex-1 p-4 overflow-y-auto flex flex-col justify-between">
                    <div>
                        <ul className="space-y-2">
                            {navItems.map(item => (
                                <li key={item.name}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleItemClick(item.name);
                                        }}
                                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                            activeItem === item.name 
                                            ? 'bg-dark-border text-white' 
                                            : 'text-dark-text-secondary hover:bg-dark-border hover:text-white'
                                        }`}
                                    >
                                        {item.icon}
                                        <span className="font-medium">{item.name}</span>
                                    </a>
                                </li>
                            ))}
                            {isInstallable && (
                                <li>
                                    <button
                                        onClick={handleInstallButtonClick}
                                        className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left text-dark-text-secondary hover:bg-dark-border hover:text-white"
                                    >
                                        {ICONS.install}
                                        <span className="font-medium">Instalar App</span>
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <div className="mt-6 pt-4 border-t border-dark-border">
                            <a
                                href="https://wa.me/5624222449"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3 p-3 rounded-lg transition-colors bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan/20"
                            >
                                {ICONS.purchase}
                                <span className="font-medium">Adquirir esta app</span>
                            </a>
                             <p className="text-xs text-center text-dark-text-secondary/80 mt-3">
                                Desarrollada por Harold Anguiano para App Design
                            </p>
                        </div>
                    </div>
                </nav>
            </aside>
            {isOpen && <div className="fixed inset-0 bg-black/60 z-20 md:hidden" onClick={() => setIsOpen(false)}></div>}
        </>
    );
}

export default Sidebar;