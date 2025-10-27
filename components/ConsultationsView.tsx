import React from 'react';
import type { Consultation } from '../types';

const ConsultationCard: React.FC<{ consultation: Consultation }> = ({ consultation }) => {
    return (
        <div className="bg-dark-card rounded-lg p-6 border-l-4 border-accent-cyan">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-dark-text-secondary">{new Date(consultation.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <h2 className="text-xl font-bold text-dark-text-primary mt-1">{consultation.reason}</h2>
                </div>
                <button className="text-xs bg-dark-border text-dark-text-primary px-3 py-1 rounded-full hover:bg-dark-border/70">Ver Detalles</button>
            </div>
            <div className="mt-4 pt-4 border-t border-dark-border">
                <h3 className="font-semibold text-dark-text-primary">Diagnóstico Principal</h3>
                <p className="text-dark-text-secondary">{consultation.diagnoses[0].description} ({consultation.diagnoses[0].code})</p>
                <h3 className="font-semibold text-dark-text-primary mt-3">Plan de Tratamiento</h3>
                <p className="text-dark-text-secondary">{consultation.treatmentPlan}</p>
            </div>
        </div>
    )
}


const ConsultationsView: React.FC<{ consultations: Consultation[] }> = ({ consultations }) => {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-dark-text-primary">Consultas</h1>
        <button className="bg-accent-cyan text-dark-bg font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto">
          + Nueva Consulta
        </button>
      </div>
      <div className="space-y-6">
        {consultations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((c, i) => (
            <ConsultationCard key={i} consultation={c} />
        ))}
      </div>
    </div>
  );
};

export default ConsultationsView;