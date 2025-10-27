import React from 'react';
import type { PatientDemographics } from '../types';

interface PatientHeaderProps {
  demographics: PatientDemographics;
}

const PatientHeader: React.FC<PatientHeaderProps> = ({ demographics }) => {
  return (
    <div className="flex items-center space-x-4">
      <img className="h-12 w-12 rounded-full" src={`https://i.pravatar.cc/150?u=${demographics.patientId}`} alt="Patient avatar" />
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-dark-text-primary">
            Patient: {demographics.fullName} - ID: {demographics.patientId}
        </h1>
      </div>
    </div>
  );
};

export default PatientHeader;