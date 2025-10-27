import React, { useState } from 'react';
import type { Patient, Medication, Immunization, LabResult, ImagingResult, Consultation, Diagnosis } from '../types';
import { Input, Select, Fieldset, Textarea } from './shared/FormControls';
import { GoogleGenAI } from "@google/genai";
import { blankPatient, blankMedication } from '../constants';
import { ICONS } from '../constants';

interface NewPatientViewProps {
    onPatientAdded: (patient: Patient) => void;
}

const NewPatientView: React.FC<NewPatientViewProps> = ({ onPatientAdded }) => {
    const [patientData, setPatientData] = useState<Patient>(JSON.parse(JSON.stringify(blankPatient)));
    const [summary, setSummary] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDemographicsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setPatientData(prev => ({...prev, demographics: {...prev.demographics, [id]: value }}));
    }

    const handleContactChange = (field: 'contactInfo' | 'emergencyContact', e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setPatientData(prev => ({...prev, demographics: {...prev.demographics, [field]: { ...prev.demographics[field], [id]: value }}}));
    }
    
    const handleHistoryChange = (field: 'pathological' | 'family' | 'nonPathological', value: string) => {
        setPatientData(prev => ({ ...prev, medicalHistory: { ...prev.medicalHistory, [field]: value.split(',').map(s => s.trim()) } }));
    }

    const handleDynamicListChange = <T,>(listName: keyof Patient, index: number, field: keyof T, value: any) => {
        setPatientData(prev => {
            const list = [...prev[listName] as T[]];
            list[index] = { ...list[index], [field]: value };
            return { ...prev, [listName]: list };
        });
    }
    
    const handleHistoryListChange = <T,>(listName: keyof Patient['medicalHistory'], index: number, field: keyof T, value: any) => {
         setPatientData(prev => {
            const list = [...prev.medicalHistory[listName] as T[]];
            list[index] = { ...list[index], [field]: value };
            return { ...prev, medicalHistory: {...prev.medicalHistory, [listName]: list }};
        });
    }

    const handleAddItem = <T,>(listName: keyof Patient, newItem: T) => {
        setPatientData(prev => ({ ...prev, [listName]: [...prev[listName] as T[], newItem] }));
    }
    
     const handleAddHistoryItem = <T,>(listName: keyof Patient['medicalHistory'], newItem: T) => {
        setPatientData(prev => ({ ...prev, medicalHistory: {...prev.medicalHistory, [listName]: [...prev.medicalHistory[listName] as T[], newItem] }}));
    }

    const handleRemoveItem = (listName: keyof Patient, index: number) => {
        setPatientData(prev => ({ ...prev, [listName]: (prev[listName] as any[]).filter((_, i) => i !== index) }));
    }
    
    const handleRemoveHistoryItem = (listName: keyof Patient['medicalHistory'], index: number) => {
        setPatientData(prev => ({ ...prev, medicalHistory: {...prev.medicalHistory, [listName]: (prev.medicalHistory[listName] as any[]).filter((_, i) => i !== index) }}));
    }

    const handleImageUpload = (index: number, file: File) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            handleDynamicListChange<ImagingResult>('imagingResults', index, 'imageDataUrl', reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalPatient = {
            ...patientData,
            demographics: {
                ...patientData.demographics,
                patientId: `P${Date.now().toString().slice(-6)}`,
                age: patientData.demographics.dateOfBirth ? new Date().getFullYear() - new Date(patientData.demographics.dateOfBirth).getFullYear() : 0,
            }
        };
        onPatientAdded(finalPatient);
    };

    const generateSummary = async () => {
        if (!process.env.API_KEY) {
            alert("API key not configured.");
            return;
        }
        setIsGenerating(true);
        setSummary('');
        try {
            const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
            const prompt = `Generate a concise, professional summary for a new patient registration based on this data: ${JSON.stringify(patientData)}. Highlight any missing information that might be important.`;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-pro', contents: prompt });
            setSummary(response.text);
        } catch (error) {
            console.error("Error generating summary:", error);
            alert("Failed to generate summary. See console for details.");
        } finally {
            setIsGenerating(false);
        }
    }


    return (
        <div className="text-dark-text-primary">
            <h1 className="text-3xl font-bold mb-6">Registrar Nuevo Paciente</h1>
            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
                <Fieldset legend="Información Demográfica">
                    <Input label="Nombre Completo" id="fullName" type="text" value={patientData.demographics.fullName} onChange={handleDemographicsChange} required />
                    <Input label="Fecha de Nacimiento" id="dateOfBirth" type="date" value={patientData.demographics.dateOfBirth} onChange={handleDemographicsChange} required />
                    <Select label="Género" id="gender" value={patientData.demographics.gender} onChange={handleDemographicsChange}>
                        <option value="Male">Masculino</option>
                        <option value="Female">Femenino</option>
                        <option value="Other">Otro</option>
                    </Select>
                     <Input label="Dirección" id="address" type="text" value={patientData.demographics.contactInfo.address} onChange={(e) => handleContactChange('contactInfo', e)} />
                     <Input label="Teléfono" id="phone" type="tel" value={patientData.demographics.contactInfo.phone} onChange={(e) => handleContactChange('contactInfo', e)} />
                     <Input label="Email" id="email" type="email" value={patientData.demographics.contactInfo.email} onChange={(e) => handleContactChange('contactInfo', e)} />
                </Fieldset>
                
                <Fieldset legend="Historial Médico">
                     <Textarea label="Antecedentes Patológicos (separados por comas)" id="pathological" value={patientData.medicalHistory.pathological.join(', ')} onChange={(e) => handleHistoryChange('pathological', e.target.value)} />
                     <Textarea label="Antecedentes Familiares (separados por comas)" id="family" value={patientData.medicalHistory.family.join(', ')} onChange={(e) => handleHistoryChange('family', e.target.value)} />
                     <div className="md:col-span-2 space-y-4">
                        <h3 className="text-md font-semibold">Alergias</h3>
                        {patientData.medicalHistory.allergies.map((allergy, index) => (
                             <div key={index} className="flex items-center gap-2">
                                <Input label="" id={`allergy-${index}`} type="text" value={allergy} onChange={(e) => handleHistoryListChange<string[]>('allergies', index, '' as any, e.target.value)} className="flex-grow" />
                                <button type="button" onClick={() => handleRemoveHistoryItem('allergies', index)} className="text-red-500 p-2 mt-1">{ICONS.close}</button>
                             </div>
                        ))}
                         <button type="button" onClick={() => handleAddHistoryItem('allergies', '')} className="text-accent-cyan text-sm">+ Añadir Alergia</button>
                    </div>
                     <div className="md:col-span-2 space-y-4">
                        <h3 className="text-md font-semibold">Inmunizaciones</h3>
                        {patientData.medicalHistory.immunizations.map((item, index) => (
                             <div key={index} className="flex items-center gap-2">
                                <Input label="Vacuna" id={`vaccine-${index}`} type="text" value={item.vaccine} onChange={(e) => handleHistoryListChange<Immunization>('immunizations', index, 'vaccine', e.target.value)} />
                                <Input label="Fecha" id={`vaccine-date-${index}`} type="date" value={item.date} onChange={(e) => handleHistoryListChange<Immunization>('immunizations', index, 'date', e.target.value)} />
                                <button type="button" onClick={() => handleRemoveHistoryItem('immunizations', index)} className="text-red-500 p-2 mt-5">{ICONS.close}</button>
                             </div>
                        ))}
                         <button type="button" onClick={() => handleAddHistoryItem('immunizations', {vaccine: '', date: ''})} className="text-accent-cyan text-sm">+ Añadir Inmunización</button>
                    </div>
                </Fieldset>
                
                 <Fieldset legend="Medicamentos">
                    {patientData.medications.map((med, index) => (
                        <div key={index} className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-dark-border pb-4">
                             <Input label="Nombre" id={`med-name-${index}`} type="text" value={med.name} onChange={e => handleDynamicListChange<Medication>('medications', index, 'name', e.target.value)} />
                             <Input label="Dosis" id={`med-dosage-${index}`} type="text" value={med.dosage} onChange={e => handleDynamicListChange<Medication>('medications', index, 'dosage', e.target.value)} />
                             <Input label="Frecuencia" id={`med-freq-${index}`} type="text" value={med.frequency} onChange={e => handleDynamicListChange<Medication>('medications', index, 'frequency', e.target.value)} />
                             <Input label="Fecha Inicio" id={`med-start-${index}`} type="date" value={med.startDate} onChange={e => handleDynamicListChange<Medication>('medications', index, 'startDate', e.target.value)} />
                             <Select label="Estado" id={`med-status-${index}`} value={med.status} onChange={e => handleDynamicListChange<Medication>('medications', index, 'status', e.target.value)}>
                                <option value="Active">Activo</option>
                                <option value="Inactive">Inactivo</option>
                             </Select>
                             <button type="button" onClick={() => handleRemoveItem('medications', index)} className="text-red-500 justify-self-start md:mt-6">{ICONS.close}</button>
                        </div>
                    ))}
                     <div className="md:col-span-2">
                        <button type="button" onClick={() => handleAddItem('medications', { ...blankMedication })} className="text-accent-cyan text-sm">+ Añadir Medicamento</button>
                    </div>
                </Fieldset>

                <Fieldset legend="Resultados de Imágenes">
                    {patientData.imagingResults.map((img, index) => (
                         <div key={index} className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-dark-border pb-4">
                             <Input label="Nombre del Estudio" id={`img-name-${index}`} type="text" value={img.studyName} onChange={e => handleDynamicListChange<ImagingResult>('imagingResults', index, 'studyName', e.target.value)} />
                             <Input label="Fecha" id={`img-date-${index}`} type="date" value={img.date} onChange={e => handleDynamicListChange<ImagingResult>('imagingResults', index, 'date', e.target.value)} />
                             <Textarea label="Reporte" id={`img-report-${index}`} value={img.report} onChange={e => handleDynamicListChange<ImagingResult>('imagingResults', index, 'report', e.target.value)} />
                             <div>
                                <Input label="Subir Imagen" id={`img-file-${index}`} type="file" accept="image/*" onChange={e => e.target.files && handleImageUpload(index, e.target.files[0])} />
                                {img.imageDataUrl && <img src={img.imageDataUrl} alt="Preview" className="w-24 h-24 object-cover mt-2 rounded"/>}
                             </div>
                              <button type="button" onClick={() => handleRemoveItem('imagingResults', index)} className="text-red-500 justify-self-start">{ICONS.close}</button>
                         </div>
                    ))}
                     <div className="md:col-span-2">
                         <button type="button" onClick={() => handleAddItem('imagingResults', {id: '', studyName: '', date: '', report: '', imageDataUrl: ''})} className="text-accent-cyan text-sm">+ Añadir Resultado de Imagen</button>
                    </div>
                </Fieldset>

                <div className="bg-dark-card p-4 rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                         <h3 className="text-lg font-semibold text-dark-text-primary">AI Summary</h3>
                        <button type="button" onClick={generateSummary} disabled={isGenerating} className="bg-dark-border text-dark-text-primary font-bold py-2 px-4 rounded-lg hover:bg-dark-border/70 disabled:opacity-50">
                            {isGenerating ? 'Generando...' : 'Generar Resumen'}
                        </button>
                    </div>
                   {summary && <div className="text-dark-text-secondary p-4 bg-dark-bg rounded-md whitespace-pre-wrap">{summary}</div>}
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="bg-accent-cyan text-dark-bg font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
                        Registrar Paciente
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewPatientView;