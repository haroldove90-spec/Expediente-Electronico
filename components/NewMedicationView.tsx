import React, { useState } from 'react';
import type { Medication } from '../types';
import { Input, Select, Textarea } from './shared/FormControls';
import { ICONS, blankMedication } from '../constants';

interface NewMedicationViewProps {
    onClose: () => void;
    onSubmit: (medication: Medication) => void;
}

const NewMedicationView: React.FC<NewMedicationViewProps> = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState<Medication>(blankMedication);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-dark-card rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b border-dark-border">
                    <h2 className="text-xl font-bold text-dark-text-primary">Añadir Nuevo Medicamento</h2>
                    <button onClick={onClose} className="text-dark-text-secondary hover:text-white">
                        {ICONS.close}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
                    <Input label="Nombre del Medicamento" id="name" type="text" value={formData.name} onChange={handleChange} required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Dosis" id="dosage" type="text" value={formData.dosage} onChange={handleChange} />
                        <Input label="Frecuencia" id="frequency" type="text" value={formData.frequency} onChange={handleChange} />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select label="Vía" id="route" value={formData.route} onChange={handleChange}>
                            <option value="Oral">Oral</option>
                            <option value="Intravenous">Intravenosa</option>
                            <option value="Topical">Tópica</option>
                             <option value="Subcutaneous">Subcutánea</option>
                        </Select>
                         <Select label="Estado" id="status" value={formData.status} onChange={handleChange}>
                            <option value="Active">Activo</option>
                            <option value="Inactive">Inactivo</option>
                        </Select>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Fecha de Inicio" id="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
                        <Input label="Fecha de Fin (Opcional)" id="endDate" type="date" value={formData.endDate} onChange={handleChange} />
                    </div>
                    

                    <div className="flex justify-end pt-4 border-t border-dark-border mt-6">
                        <button type="button" onClick={onClose} className="mr-4 bg-dark-border text-dark-text-primary font-bold py-2 px-6 rounded-lg hover:bg-dark-border/70">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-accent-cyan text-dark-bg font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
                            Guardar Medicamento
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewMedicationView;