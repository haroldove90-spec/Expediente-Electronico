
import React from 'react';
import type { MedicalHistory } from '../types';
import SectionCard from './SectionCard';
import { ICONS } from '../constants';

interface HistorySectionProps {
  history: MedicalHistory;
}

const HistoryList: React.FC<{ title: string; items: string[] | React.ReactNode[] }> = ({ title, items }) => (
  <div>
    <h3 className="font-semibold text-slate-600 text-sm mb-1">{title}</h3>
    <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const HistorySection: React.FC<HistorySectionProps> = ({ history }) => {
  const immunizationsFormatted = history.immunizations.map(imm => `${imm.vaccine} (${imm.date})`);

  return (
    <SectionCard title="Historial Médico y Antecedentes" icon={ICONS.history}>
      <div className="space-y-4">
        <HistoryList title="Antecedentes Patológicos" items={history.pathological} />
        <HistoryList title="Antecedentes Familiares" items={history.family} />
        <HistoryList title="Antecedentes No Patológicos" items={history.nonPathological} />
        <div>
           <h3 className="font-semibold text-slate-600 text-sm mb-1">Alergias</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
             {history.allergies.map((item, index) => (
                <li key={index} className="text-red-600 font-medium">{item}</li>
             ))}
            </ul>
        </div>
        <HistoryList title="Inmunizaciones" items={immunizationsFormatted} />
      </div>
    </SectionCard>
  );
};

export default HistorySection;
