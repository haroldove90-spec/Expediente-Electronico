
import React, { useState } from 'react';
import type { Consultation } from '../types';
import SectionCard from './SectionCard';
import { ICONS } from '../constants';

interface ConsultationSectionProps {
  consultations: Consultation[];
}

const ConsultationDetails: React.FC<{ consultation: Consultation }> = ({ consultation }) => (
    <div className="mt-4 space-y-3 text-sm">
        <div><strong className="text-slate-600">Motivo:</strong> {consultation.reason}</div>
        <div><strong className="text-slate-600">Anamnesis:</strong> {consultation.anamnesis}</div>
        <div>
            <strong className="text-slate-600">Exploración Física:</strong>
            <ul className="list-disc list-inside ml-4 mt-1">
                <li><strong>Signos Vitales:</strong> BP: {consultation.physicalExam.vitals.bloodPressure}, FC: {consultation.physicalExam.vitals.heartRate} bpm, Temp: {consultation.physicalExam.vitals.temperature}°C, SpO2: {consultation.physicalExam.vitals.oxygenSaturation}%</li>
                <li><strong>Hallazgos:</strong> {consultation.physicalExam.findings}</li>
            </ul>
        </div>
        <div>
            <strong className="text-slate-600">Diagnóstico(s):</strong>
            <div className="flex flex-wrap gap-2 mt-1">
                {consultation.diagnoses.map(dx => (
                    <span key={dx.code} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{dx.code}: {dx.description}</span>
                ))}
            </div>
        </div>
        <div><strong className="text-slate-600">Plan de Tratamiento:</strong> {consultation.treatmentPlan}</div>
        <div><strong className="text-slate-600">Notas de Evolución:</strong> {consultation.progressNotes}</div>
    </div>
);

const ConsultationSection: React.FC<ConsultationSectionProps> = ({ consultations }) => {
    const [expandedId, setExpandedId] = useState<string | null>(consultations[0]?.date || null);

    const toggleExpansion = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <SectionCard title="Consultas y Evolución Médica" icon={ICONS.consultation}>
            <div className="space-y-4">
                {consultations.map((consult) => (
                    <div key={consult.date} className="border border-slate-200 rounded-lg overflow-hidden">
                        <button 
                            onClick={() => toggleExpansion(consult.date)}
                            className="w-full p-3 text-left bg-slate-50 hover:bg-slate-100 flex justify-between items-center"
                        >
                            <span className="font-semibold text-brand-blue-700">{consult.date}</span>
                            <span className="text-sm font-medium text-slate-600">{consult.reason}</span>
                            <svg className={`h-5 w-5 transform transition-transform ${expandedId === consult.date ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {expandedId === consult.date && (
                            <div className="p-4 border-t border-slate-200">
                                <ConsultationDetails consultation={consult} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </SectionCard>
    );
};

export default ConsultationSection;
