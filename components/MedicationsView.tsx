import React, { useState } from 'react';
import type { Medication } from '../types';

const MedicationsView: React.FC<{ medications: Medication[] }> = ({ medications }) => {
  const [activeTab, setActiveTab] = useState<'Active' | 'Inactive'>('Active');
  
  const filteredMeds = medications.filter(m => m.status === activeTab);

  return (
    <div>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
            <h1 className="text-3xl font-bold text-dark-text-primary">Medicamentos</h1>
            <button className="bg-accent-cyan text-dark-bg font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto">
            + Nuevo Medicamento
            </button>
        </div>

        <div className="mb-4 border-b border-dark-border">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                    onClick={() => setActiveTab('Active')}
                    className={`${
                        activeTab === 'Active'
                        ? 'border-accent-cyan text-accent-cyan'
                        : 'border-transparent text-dark-text-secondary hover:text-dark-text-primary hover:border-dark-border'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                    Activos
                </button>
                 <button
                    onClick={() => setActiveTab('Inactive')}
                    className={`${
                        activeTab === 'Inactive'
                        ? 'border-accent-cyan text-accent-cyan'
                        : 'border-transparent text-dark-text-secondary hover:text-dark-text-primary hover:border-dark-border'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                    Inactivos
                </button>
            </nav>
        </div>

        <div className="bg-dark-card rounded-lg shadow">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-dark-text-secondary">
                    <thead className="text-xs text-dark-text-primary uppercase bg-dark-card">
                        <tr>
                            <th scope="col" className="px-6 py-3">Medicamento</th>
                            <th scope="col" className="px-6 py-3">Dosis</th>
                            <th scope="col" className="px-6 py-3">Vía / Frecuencia</th>
                            <th scope="col" className="px-6 py-3">Fecha de Inicio</th>
                            <th scope="col" className="px-6 py-3">Fecha de Fin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMeds.map((med, i) => (
                            <tr key={i} className="border-b border-dark-border hover:bg-dark-border/20">
                                <th scope="row" className="px-6 py-4 font-medium text-dark-text-primary whitespace-nowrap">{med.name}</th>
                                <td className="px-6 py-4">{med.dosage}</td>
                                <td className="px-6 py-4">{med.route}</td>
                                <td className="px-6 py-4">{new Date(med.startDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{med.endDate ? new Date(med.endDate).toLocaleDateString() : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default MedicationsView;