import React from 'react';

const SettingsSection: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-dark-card rounded-lg p-6">
        <h2 className="text-xl font-semibold text-dark-text-primary border-b border-dark-border pb-4 mb-4">{title}</h2>
        <div className="space-y-6">{children}</div>
    </div>
);

const Toggle: React.FC<{label: string, description: string, enabled: boolean}> = ({label, description, enabled}) => (
     <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h3 className="font-medium text-dark-text-primary">{label}</h3>
            <p className="text-sm text-dark-text-secondary">{description}</p>
        </div>
        <div className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors flex-shrink-0 ${enabled ? 'bg-accent-cyan' : 'bg-dark-border'}`}>
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}/>
        </div>
    </div>
);


const SettingsView: React.FC = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold text-dark-text-primary mb-6">Configuración</h1>
        <div className="space-y-8 max-w-4xl mx-auto">
            <SettingsSection title="Perfil">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark-text-secondary mb-1">Nombre</label>
                    <input type="text" id="name" defaultValue="Dr. Alan Grant" className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-dark-text-primary focus:ring-accent-cyan focus:border-accent-cyan"/>
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark-text-secondary mb-1">Email</label>
                    <input type="email" id="email" defaultValue="alan.grant@example.com" className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-dark-text-primary focus:ring-accent-cyan focus:border-accent-cyan"/>
                </div>
            </SettingsSection>
            <SettingsSection title="Notificaciones">
                <Toggle label="Notificaciones por Email" description="Recibir resúmenes y alertas importantes por email." enabled={true} />
                <Toggle label="Notificaciones Push" description="Recibir alertas en tiempo real en tus dispositivos." enabled={false} />
                 <Toggle label="Resumen Semanal" description="Recibir un resumen de actividad semanal." enabled={true} />
            </SettingsSection>
            <SettingsSection title="Seguridad">
                 <div>
                    <label htmlFor="password" className="block text-sm font-medium text-dark-text-secondary mb-1">Contraseña Actual</label>
                    <input type="password" id="password" placeholder="••••••••" className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-dark-text-primary focus:ring-accent-cyan focus:border-accent-cyan"/>
                </div>
                 <Toggle label="Autenticación de dos factores (2FA)" description="Añade una capa extra de seguridad a tu cuenta." enabled={true} />
            </SettingsSection>
            
            <div className="flex justify-end">
                <button className="bg-accent-cyan text-dark-bg font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
                    Guardar Cambios
                </button>
            </div>
        </div>
    </div>
  );
};

export default SettingsView;