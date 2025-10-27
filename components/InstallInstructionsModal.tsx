import React from 'react';
import { ICONS } from '../constants';

interface InstallInstructionsModalProps {
    onClose: () => void;
}

const InstallInstructionsModal: React.FC<InstallInstructionsModalProps> = ({ onClose }) => {
    const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        // Updated to be more robust for iPad on iOS 13+
        return /iphone|ipad|ipod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    };

    const renderInstructions = () => {
        if (isIos()) {
            return (
                <>
                    <p className="mb-2">Para instalar la aplicación en tu dispositivo iOS:</p>
                    <ol className="list-decimal list-inside space-y-3">
                        <li>
                            Toca el botón de <strong>Compartir</strong> en la barra de herramientas de Safari.
                            <div className="text-center my-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4-4 4m4-4v12" /></svg>
                            </div>
                        </li>
                        <li>Desplázate hacia abajo y selecciona <strong>"Agregar a la pantalla de inicio"</strong>.</li>
                        <li>Confirma tocando <strong>"Agregar"</strong> en la esquina superior derecha.</li>
                    </ol>
                </>
            );
        }
        // Generic instructions for other browsers
        return (
            <>
                <p className="mb-2">Para instalar la aplicación, busca en el menú de tu navegador (usualmente indicado por tres puntos o líneas) la opción "Instalar aplicación" o "Agregar a la pantalla de inicio".</p>
                <p>Esto te permitirá acceder a la aplicación directamente desde tu dispositivo, como cualquier otra app.</p>
            </>
        );
    };

    return (
         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-dark-card rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b border-dark-border">
                    <h2 className="text-xl font-bold text-dark-text-primary">Instalar Aplicación</h2>
                    <button onClick={onClose} className="text-dark-text-secondary hover:text-white">
                        {ICONS.close}
                    </button>
                </div>
                <div className="p-6 text-dark-text-secondary space-y-4">
                   {renderInstructions()}
                </div>
                 <div className="flex justify-end p-4 bg-dark-bg/50 rounded-b-lg">
                    <button onClick={onClose} className="bg-accent-cyan text-dark-bg font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
                        Entendido
                    </button>
                </div>
            </div>
            <style>{`
              @keyframes fade-in {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
              }
              .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default InstallInstructionsModal;
