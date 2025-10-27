
import React from 'react';
import type { Medication } from '../types';
import SectionCard from './SectionCard';
import { ICONS } from '../constants';

interface MedicationSectionProps {
  medications: Medication[];
}

const MedicationSection: React.FC<MedicationSectionProps> = ({ medications }) => {
  return (
    <SectionCard title="Medicamentos y Prescripciones" icon={ICONS.medication}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-slate-600">Medicamento</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-600">Dosis</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-600">Frecuencia</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-600">Fecha de Inicio</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-600">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {medications.map((med) => (
              <tr key={med.name}>
                <td className="px-4 py-2 font-medium text-slate-800">{med.name}</td>
                <td className="px-4 py-2 text-slate-600">{med.dosage} {med.route}</td>
                <td className="px-4 py-2 text-slate-600">{med.frequency}</td>
                <td className="px-4 py-2 text-slate-600">{med.startDate}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      med.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {med.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
};

export default MedicationSection;
