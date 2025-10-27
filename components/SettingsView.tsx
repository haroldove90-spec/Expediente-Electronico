import React, { useState } from 'react';

const SettingsSection: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-dark-card rounded-lg p-6">
        <h2 className="text-xl font-semibold text-dark-text-primary border-b border-dark-border pb-4 mb-4">{title}</h2>
        <div className="space-y-6">{children}</div>
    </div>
);

interface ToggleProps {
    label: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
}
const Toggle: React.FC<ToggleProps> = ({label, description, enabled, onToggle}) => (
     <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h3 className="font-medium text-dark-text-primary">{label}</h3>
            <p className="text-sm text-dark-text-secondary">{description}</p>
        </div>
        <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={onToggle}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-card focus:ring-accent-cyan ${enabled ? 'bg-accent-cyan' : 'bg-dark-border'}`}
        >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}/>
        </button>
    </div>
);


const SettingsView: React.FC = () => {
    const [profile, setProfile] = useState({
        name: 'Dr. Alan Grant',
        email: 'alan.grant@example.com',
    });
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        summary: true,
    });
    const [security, setSecurity] = useState({
        password: '',
        twoFactor: true,
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile(prev => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleSaveChanges = () => {
        // In a real app, this would make an API call.
        // For now, we'll just log it and maybe show an alert.
        console.log('Saving changes:', { profile, notifications, security });
        alert('Cambios guardados (simulado).');
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-dark-text-primary mb-6">Configuración</h1>
            <div className="space-y-8 max-w-4xl mx-auto">
                <SettingsSection title="Perfil">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-dark-text-secondary mb-1">Nombre</label>
                        <input type="text" id="name" value={profile.name} onChange={handleProfileChange} className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-dark-text-primary focus:ring-accent-cyan focus:border-accent-cyan"/>
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-dark-text-secondary mb-1">Email</label>
                        <input type="email" id="email" value={profile.email} onChange={handleProfileChange} className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-dark-text-primary focus:ring-accent-cyan focus:border-accent-cyan"/>
                    </div>
                </SettingsSection>
                <SettingsSection title="Notificaciones">
                    <Toggle 
                        label="Notificaciones por Email" 
                        description="Recibir resúmenes y alertas importantes por email." 
                        enabled={notifications.email}
                        onToggle={() => setNotifications(p => ({...p, email: !p.email}))} 
                    />
                    <Toggle 
                        label="Notificaciones Push" 
                        description="Recibir alertas en tiempo real en tus dispositivos." 
                        enabled={notifications.push}
                        onToggle={() => setNotifications(p => ({...p, push: !p.push}))} 
                    />
                     <Toggle 
                        label="Resumen Semanal" 
                        description="Recibir un resumen de actividad semanal." 
                        enabled={notifications.summary}
                        onToggle={() => setNotifications(p => ({...p, summary: !p.summary}))} 
                    />
                </SettingsSection>
                <SettingsSection title="Seguridad">
                     <div>
                        <label htmlFor="password" className="block text-sm font-medium text-dark-text-secondary mb-1">Contraseña Actual</label>
                        <input 
                            type="password" 
                            id="password"
                            value={security.password}
                            onChange={(e) => setSecurity(p => ({...p, password: e.target.value}))}
                            placeholder="••••••••" 
                            className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-dark-text-primary focus:ring-accent-cyan focus:border-accent-cyan"
                        />
                    </div>
                     <Toggle 
                        label="Autenticación de dos factores (2FA)" 
                        description="Añade una capa extra de seguridad a tu cuenta." 
                        enabled={security.twoFactor}
                        onToggle={() => setSecurity(p => ({...p, twoFactor: !p.twoFactor}))}
                    />
                </SettingsSection>
            
                <div className="flex justify-end">
                    <button 
                        onClick={handleSaveChanges}
                        className="bg-accent-cyan text-dark-bg font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;