
import React from 'react';
import type { PatientDemographics } from '../types';
import SectionCard from './SectionCard';
import { ICONS } from '../constants';

interface PatientHeaderProps {
  demographics: PatientDemographics;
}

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
      <p className="text-xs text-slate-500 font-medium">{label}</p>
      <p className="text-sm text-slate-800">{value}</p>
    </div>
);


const PatientHeader: React.FC<PatientHeaderProps> = ({ demographics }) => {
  return (
    <SectionCard title="Datos Demográficos del Paciente" icon={ICONS.user}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div>
                <p className="text-sm text-slate-500">Nombre Completo</p>
                <p className="text-xl font-bold text-brand-blue-700">{demographics.fullName}</p>
            </div>
             <InfoItem label="Fecha de Nacimiento" value={`${demographics.dateOfBirth} (${demographics.age} años)`} />
             <InfoItem label="Género" value={demographics.gender} />
             <InfoItem label="ID Paciente" value={demographics.patientId} />
             <InfoItem label="Teléfono" value={demographics.contactInfo.phone} />
             <InfoItem label="Email" value={demographics.contactInfo.email} />
             <div className="col-span-2">
                <InfoItem label="Dirección" value={demographics.contactInfo.address} />
             </div>
             <div className="col-span-2">
                <InfoItem label="Contacto de Emergencia" value={`${demographics.emergencyContact.name} (${demographics.emergencyContact.relationship}) - ${demographics.emergencyContact.phone}`} />
             </div>
        </div>
    </SectionCard>
  );
};

export default PatientHeader;
