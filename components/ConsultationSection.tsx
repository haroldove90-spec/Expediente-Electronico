import React from 'react';
import type { Diagnosis } from '../types';

interface ActiveDiagnosesCardProps {
  diagnoses: string[];
}

const ActiveDiagnosesCard: React.FC<ActiveDiagnosesCardProps> = ({ diagnoses }) => {
  return (
    <div className="bg-dark-card rounded-lg p-4 h-full">
      <h3 className="text-md font-semibold text-dark-text-primary mb-3">Diagnósticos Activos</h3>
      <ul className="space-y-2">
        {diagnoses.map((dx, index) => (
          <li key={index} className="text-dark-text-secondary border-b border-dark-border pb-1">
            <span className="text-dark-text-primary">{dx}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveDiagnosesCard;
