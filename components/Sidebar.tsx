import React from 'react';
import { ICONS } from '../constants';

interface SidebarProps {
    activeItem: string;
    setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
    const navItems = [
        { name: 'Dashboard', icon: ICONS.dashboard },
        { name: 'Historial Médico', icon: ICONS.history },
        { name: 'Consultas', icon: ICONS.consultation },
        { name: 'Medicamentos', icon: ICONS.medication },
        { name: 'Laboratorio/Imágenes', icon: ICONS.lab },
        { name: 'Configuración', icon: ICONS.settings },
    ];

    return (
        <aside className="w-60 bg-dark-card flex-shrink-0 flex flex-col">
            <div className="p-4 flex items-center space-x-3 border-b border-dark-border">
                {ICONS.menu}
                <h1 className="text-xl font-bold text-dark-text-primary">EHR</h1>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navItems.map(item => (
                        <li key={item.name}>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveItem(item.name);
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
    );
}

export default Sidebar;
