import React, { useState } from 'react';
import { blankPatient } from '../constants';
import type { Patient, PatientDemographics, Immunization, Medication } from '../types';

interface NewPatientViewProps {
  onSave: (patient: Patient) => void;
  onCancel: () => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-dark-card rounded-lg p-6">
    <h2 className="text-xl font-semibold text-dark-text-primary border-b border-dark-border pb-4 mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
  <div>
    <label htmlFor={props.id} className="block text-sm font-medium text-dark-text-secondary mb-1">{label}</label>
    <input {...props} className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-dark-text-primary focus:ring-accent-cyan focus:border-accent-cyan" />
  </div>
);

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.id} className="block text-sm font-medium text-dark-text-secondary mb-1">{label}</label>
        <textarea {...props} rows={3} className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-dark-text-primary focus:ring-accent-cyan focus:border-accent-cyan" />
    </div>
);


const NewPatientView: React.FC<NewPatientViewProps> = ({ onSave, onCancel }) => {
  const [patient, setPatient] = useState<Patient>(blankPatient);

  const handleDemographicsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatient(prev => ({ ...prev, demographics: { ...prev.demographics, [name]: value } }));
  };
  
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient(prev => ({ ...prev, demographics: { ...prev.demographics, contactInfo: { ...prev.demographics.contactInfo, [name]: value } } }));
  };

  const handleEmergencyContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient(prev => ({ ...prev, demographics: { ...prev.demographics, emergencyContact: { ...prev.demographics.emergencyContact, [name]: value } } }));
  };
  
  const handleDynamicListChange = (section: 'pathological' | 'family' | 'nonPathological' | 'allergies', index: number, value: string) => {
    setPatient(prev => {
        const list = [...prev.medicalHistory[section]];
        list[index] = value;
        return { ...prev, medicalHistory: { ...prev.medicalHistory, [section]: list } };
    });
  };

  const addToList = (section: 'pathological' | 'family' | 'nonPathological' | 'allergies') => {
      setPatient(prev => ({ ...prev, medicalHistory: { ...prev.medicalHistory, [section]: [...prev.medicalHistory[section], ''] } }));
  }

  const removeFromList = (section: 'pathological' | 'family' | 'nonPathological' | 'allergies', index: number) => {
      setPatient(prev => ({ ...prev, medicalHistory: { ...prev.medicalHistory, [section]: prev.medicalHistory[section].filter((_, i) => i !== index) } }));
  }

  const handleMedicationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient(prev => {
        const medications = [...prev.medications];
        medications[index] = { ...medications[index], [name]: value, status: 'Active' };
        return { ...prev, medications };
    });
  };

  const addMedication = () => {
    setPatient(prev => ({...prev, medications: [...prev.medications, { name: '', dosage: '', route: '', frequency: '', startDate: '', status: 'Active'}]}));
  }

  const removeMedication = (index: number) => {
    setPatient(prev => ({ ...prev, medications: prev.medications.filter((_, i) => i !== index)}));
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient.demographics.fullName) {
        alert("El nombre completo del paciente es obligatorio.");
        return;
    }
    onSave(patient);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-8">
      <h1 className="text-3xl font-bold text-dark-text-primary">Registrar Nuevo Paciente</h1>
      
      <Section title="1. Datos Demográficos del Paciente">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nombre Completo" name="fullName" value={patient.demographics.fullName} onChange={handleDemographicsChange} required />
          <Input label="Fecha de Nacimiento" name="dateOfBirth" type="date" value={patient.demographics.dateOfBirth} onChange={handleDemographicsChange} />
          <Input label="Edad" name="age" type="number" value={patient.demographics.age} onChange={handleDemographicsChange} />
          <div>
            <label className="block text-sm font-medium text-dark-text-secondary mb-1">Género</label>
            <select name="gender" value={patient.demographics.gender} onChange={handleDemographicsChange} className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-dark-text-primary focus:ring-accent-cyan focus:border-accent-cyan">
              <option value="Male">Masculino</option>
              <option value="Female">Femenino</option>
              <option value="Other">Otro</option>
            </select>
          </div>
          <Input label="Número de Seguridad Social" name="socialSecurityNumber" value={patient.demographics.socialSecurityNumber} onChange={handleDemographicsChange} />
        </div>
        <h3 className="text-lg font-semibold text-dark-text-primary pt-4 mt-4 border-t border-dark-border">Información de Contacto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Dirección" name="address" value={patient.demographics.contactInfo.address} onChange={handleContactChange} />
            <Input label="Teléfono" name="phone" type="tel" value={patient.demographics.contactInfo.phone} onChange={handleContactChange} />
            <Input label="Email" name="email" type="email" value={patient.demographics.contactInfo.email} onChange={handleContactChange} />
        </div>
         <h3 className="text-lg font-semibold text-dark-text-primary pt-4 mt-4 border-t border-dark-border">Contacto de Emergencia</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Nombre" name="name" value={patient.demographics.emergencyContact.name} onChange={handleEmergencyContactChange} />
            <Input label="Relación" name="relationship" value={patient.demographics.emergencyContact.relationship} onChange={handleEmergencyContactChange} />
            <Input label="Teléfono" name="phone" type="tel" value={patient.demographics.emergencyContact.phone} onChange={handleEmergencyContactChange} />
        </div>
      </Section>

      <Section title="2. Historial Médico y Antecedentes">
         <h3 className="font-semibold text-dark-text-primary">Antecedentes (Patológicos, Familiares, etc.)</h3>
        {['pathological', 'family', 'nonPathological', 'allergies'].map(section => (
            <div key={section}>
                <label className="block text-sm font-medium text-dark-text-secondary capitalize mb-2">{section.replace(/([A-Z])/g, ' $1')}</label>
                {patient.medicalHistory[section as keyof typeof patient.medicalHistory].map((item: any, index: number) => (
                     <div key={index} className="flex items-center gap-2 mb-2">
                        <Input type="text" label="" value={item} onChange={e => handleDynamicListChange(section as any, index, e.target.value)} />
                        <button type="button" onClick={() => removeFromList(section as any, index)} className="text-red-500 p-2 rounded-md hover:bg-dark-border mt-1">Eliminar</button>
                    </div>
                ))}
                <button type="button" onClick={() => addToList(section as any)} className="text-accent-cyan text-sm mt-1">+ Agregar</button>
            </div>
        ))}
      </Section>

       <Section title="3. Medicamentos Actuales">
            {patient.medications.map((med, index) => (
                <div key={index} className="p-4 rounded-md border border-dark-border space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                       <Input label="Nombre" name="name" value={med.name} onChange={e => handleMedicationChange(index, e)} />
                       <Input label="Dosis" name="dosage" value={med.dosage} onChange={e => handleMedicationChange(index, e)} />
                       <Input label="Vía/Frecuencia" name="route" value={med.route} onChange={e => handleMedicationChange(index, e)} />
                       <Input label="Fecha Inicio" name="startDate" type="date" value={med.startDate} onChange={e => handleMedicationChange(index, e)} />
                    </div>
                    <button type="button" onClick={() => removeMedication(index)} className="text-red-500 text-sm">Eliminar Medicamento</button>
                </div>
            ))}
            <button type="button" onClick={addMedication} className="text-accent-cyan text-sm mt-2">+ Agregar Medicamento</button>
       </Section>
       
       <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onCancel} className="bg-dark-border text-dark-text-primary font-bold py-2 px-6 rounded-lg hover:bg-dark-border/70 transition-colors">
                Cancelar
            </button>
            <button type="submit" className="bg-accent-cyan text-dark-bg font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
                Guardar Paciente
            </button>
        </div>
    </form>
  );
};

export default NewPatientView;