import React from 'react';
import { ICONS } from '../constants';

interface SidebarProps {
    activeItem: string;
    setActiveItem: (item: string) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem, isOpen, setIsOpen }) => {
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
        setIsOpen(false);
    }

    return (
        <>
            <aside className={`fixed inset-y-0 left-0 z-30 w-60 bg-dark-card flex-shrink-0 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex items-center justify-between border-b border-dark-border">
                    <div className="flex items-center space-x-3">
                        {ICONS.menu}
                        <h1 className="text-xl font-bold text-dark-text-primary">EHR</h1>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="md:hidden text-dark-text-secondary">
                        {ICONS.close}
                    </button>
                </div>
                <nav className="flex-1 p-4">
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
                    </ul>
                </nav>
            </aside>
            {isOpen && <div className="fixed inset-0 bg-black/60 z-20 md:hidden" onClick={() => setIsOpen(false)}></div>}
        </>
    );
}

export default Sidebar;