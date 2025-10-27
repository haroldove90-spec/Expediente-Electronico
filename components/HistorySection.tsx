import React from 'react';
import type { VitalSigns } from '../types';

interface VitalsCardProps {
  vitals: VitalSigns;
  date: string;
}

const VitalsCard: React.FC<VitalsCardProps> = ({ vitals, date }) => {
  return (
    <div className="bg-dark-card rounded-lg p-4 h-full">
      <h3 className="text-md font-semibold text-dark-text-primary mb-3">Signos Vitales Recientes</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-dark-text-primary">
        <div className="text-lg">TA: <span className="font-bold">{vitals.bloodPressure}</span> mlHg</div>
        <div className="text-lg">Temp: <span className="font-bold">{vitals.temperature}</span>°C</div>
        <div className="text-lg">FC: <span className="font-bold">{vitals.heartRate}</span> lpm</div>
        <div className="text-lg"><span className="font-bold">{vitals.oxygenSaturation}</span>%</div>
      </div>
       <div className="grid grid-cols-2 gap-4 text-dark-text-secondary text-xs mt-2">
            <span>{new Date(date).toLocaleDateString()}</span>
            <span className="text-right">{new Date(date).toLocaleDateString()}</span>
       </div>
    </div>
  );
};

export default VitalsCard;
