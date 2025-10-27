import React, { useState } from 'react';
import { Input, Textarea } from './shared/FormControls';
import { ICONS } from '../constants';

interface NewConsultationViewProps {
    onClose: () => void;
    onSubmit: (data: any) => void;
}

const NewConsultationView: React.FC<NewConsultationViewProps> = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        reason: '',
        anamnesis: '',
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        oxygenSaturation: '',
        findings: '',
        diagnoses: '',
        treatmentPlan: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-dark-card rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b border-dark-border">
                    <h2 className="text-xl font-bold text-dark-text-primary">Registrar Nueva Consulta</h2>
                    <button onClick={onClose} className="text-dark-text-secondary hover:text-white">
                        {ICONS.close}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Fecha" id="date" type="date" value={formData.date} onChange={handleChange} required />
                        <Input label="Motivo de Consulta" id="reason" type="text" value={formData.reason} onChange={handleChange} required />
                    </div>

                    <Textarea label="Anamnesis" id="anamnesis" value={formData.anamnesis} onChange={handleChange} />
                    
                    <fieldset className="border border-dark-border p-4 rounded-md">
                        <legend className="text-md font-semibold text-dark-text-primary px-2">Examen Físico</legend>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                             <Input label="TA (mlHg)" id="bloodPressure" type="text" value={formData.bloodPressure} onChange={handleChange} />
                             <Input label="FC (lpm)" id="heartRate" type="number" value={formData.heartRate} onChange={handleChange} />
                             <Input label="Temp (°C)" id="temperature" type="number" step="0.1" value={formData.temperature} onChange={handleChange} />
                             <Input label="SpO2 (%)" id="oxygenSaturation" type="number" value={formData.oxygenSaturation} onChange={handleChange} />
                        </div>
                         <div className="mt-4">
                            <Textarea label="Hallazgos" id="findings" value={formData.findings} onChange={handleChange} />
                        </div>
                    </fieldset>

                     <Textarea label="Diagnósticos (separados por comas)" id="diagnoses" value={formData.diagnoses} onChange={handleChange} />
                     <Textarea label="Plan de Tratamiento" id="treatmentPlan" value={formData.treatmentPlan} onChange={handleChange} />

                    <div className="flex justify-end pt-4 border-t border-dark-border mt-6">
                        <button type="button" onClick={onClose} className="mr-4 bg-dark-border text-dark-text-primary font-bold py-2 px-6 rounded-lg hover:bg-dark-border/70">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-accent-cyan text-dark-bg font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
                            Guardar Consulta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewConsultationView;
