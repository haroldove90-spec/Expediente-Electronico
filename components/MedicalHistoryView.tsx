import React from 'react';
import type { Patient } from '../types';

const Section: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
    <div className="bg-dark-card rounded-lg p-6">
        <h2 className="text-xl font-semibold text-dark-text-primary mb-4">{title}</h2>
        {children}
    </div>
);

const MedicalHistoryView: React.FC<{ patient: Patient }> = ({ patient }) => {
  const { pathological, family, nonPathological, allergies, immunizations } = patient.medicalHistory;

  return (
    <div>
        <h1 className="text-3xl font-bold text-dark-text-primary mb-6">Historial Médico Completo</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Section title="Antecedentes Patológicos">
                <ul className="list-disc list-inside space-y-2 text-dark-text-secondary">
                    {pathological.map((item, i) => <li key={i}><span className="text-dark-text-primary">{item}</span></li>)}
                </ul>
            </Section>
            <Section title="Antecedentes Familiares">
                 <ul className="list-disc list-inside space-y-2 text-dark-text-secondary">
                    {family.map((item, i) => <li key={i}><span className="text-dark-text-primary">{item}</span></li>)}
                </ul>
            </Section>
            <Section title="Antecedentes No Patológicos">
                 <ul className="list-disc list-inside space-y-2 text-dark-text-secondary">
                    {nonPathological.map((item, i) => <li key={i}><span className="text-dark-text-primary">{item}</span></li>)}
                </ul>
            </Section>
            <Section title="Alergias">
                 <ul className="list-disc list-inside space-y-2 text-red-400">
                    {allergies.map((item, i) => <li key={i}><span className="font-bold">{item}</span></li>)}
                </ul>
            </Section>
            <div className="md:col-span-2">
                <Section title="Inmunizaciones">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-dark-border">
                                    <th className="p-2">Vacuna</th>
                                    <th className="p-2">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {immunizations.map((item, i) => (
                                    <tr key={i} className="border-b border-dark-border/50">
                                        <td className="p-2 text-dark-text-primary">{item.vaccine}</td>
                                        <td className="p-2 text-dark-text-secondary">{new Date(item.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Section>
            </div>
        </div>
    </div>
  );
};

export default MedicalHistoryView;
