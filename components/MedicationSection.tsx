import React from 'react';
import type { Medication } from '../types';

interface CurrentMedicationsCardProps {
  medications: Medication[];
}

const CurrentMedicationsCard: React.FC<CurrentMedicationsCardProps> = ({ medications }) => {
  const activeMeds = medications.filter(m => m.status === 'Active');
  
  return (
    <div className="bg-dark-card rounded-lg p-4 h-full">
      <h3 className="text-md font-semibold text-dark-text-primary mb-3">Medicamentos Actuales</h3>
      <div className="space-y-1 text-sm">
        {activeMeds.map((med) => (
          <div key={`${med.name}-${med.dosage}`} className="flex justify-between border-b border-dark-border py-1">
            <span className="text-dark-text-primary">{med.name} {med.dosage}</span>
            <span className="text-dark-text-secondary">{med.route}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentMedicationsCard;
