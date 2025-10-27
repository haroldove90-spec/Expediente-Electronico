import React, { useState } from 'react';
import type { Consultation } from '../types';
import NewConsultationView from './NewConsultationView';

const ConsultationCard: React.FC<{ consultation: Consultation }> = ({ consultation }) => {
    return (
        <div className="bg-dark-card rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-accent-cyan">{consultation.reason}</h3>
                    <p className="text-sm text-dark-text-secondary">{new Date(consultation.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                {/* Actions dropdown can be added here */}
            </div>

            <div>
                <h4 className="font-semibold text-dark-text-primary mb-1">Anamnesis</h4>
                <p className="text-sm text-dark-text-secondary">{consultation.anamnesis}</p>
            </div>

            <div>
                <h4 className="font-semibold text-dark-text-primary mb-1">Examen Físico</h4>
                <p className="text-sm text-dark-text-secondary">
                    <span className="font-medium">Signos Vitales:</span> TA {consultation.physicalExam.vitals.bloodPressure}, FC {consultation.physicalExam.vitals.heartRate}, T {consultation.physicalExam.vitals.temperature}°C, SpO2 {consultation.physicalExam.vitals.oxygenSaturation}%
                </p>
                <p className="text-sm text-dark-text-secondary mt-1">{consultation.physicalExam.findings}</p>
            </div>

            <div>
                <h4 className="font-semibold text-dark-text-primary mb-1">Diagnósticos</h4>
                <ul className="list-disc list-inside text-sm text-dark-text-secondary">
                    {consultation.diagnoses.map(dx => (
                        <li key={dx.code}><span className="text-dark-text-primary">{dx.description} ({dx.code})</span></li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className="font-semibold text-dark-text-primary mb-1">Plan de Tratamiento</h4>
                <p className="text-sm text-dark-text-secondary">{consultation.treatmentPlan}</p>
            </div>
        </div>
    )
}

const ConsultationsView: React.FC<{ consultations: Consultation[] }> = ({ consultations }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Sort consultations by date, newest first
    const sortedConsultations = [...consultations].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const handleAddConsultation = (consultation: Omit<Consultation, 'diagnoses'> & { diagnoses: string }) => {
        // Here you would typically update the patient state
        console.log('New consultation added:', consultation);
        setIsModalOpen(false);
    }
    
    return (
        <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
                <h1 className="text-3xl font-bold text-dark-text-primary">Historial de Consultas</h1>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-accent-cyan text-dark-bg font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto">
                    + Nueva Consulta
                </button>
            </div>

            <div className="space-y-6">
                {sortedConsultations.map((consult, index) => (
                    <ConsultationCard key={index} consultation={consult} />
                ))}
            </div>

            {isModalOpen && (
                <NewConsultationView 
                    onClose={() => setIsModalOpen(false)} 
                    onSubmit={handleAddConsultation} 
                />
            )}
        </div>
    );
};

export default ConsultationsView;
