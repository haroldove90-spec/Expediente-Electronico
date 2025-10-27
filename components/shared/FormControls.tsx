import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}
export const Input: React.FC<InputProps> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-dark-text-secondary mb-1">{label}</label>
        <input 
            id={id} 
            {...props}
            className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-dark-text-primary focus:ring-accent-cyan focus:border-accent-cyan"
        />
    </div>
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}
export const Textarea: React.FC<TextareaProps> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-dark-text-secondary mb-1">{label}</label>
        <textarea 
            id={id} 
            rows={4}
            {...props}
            className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-dark-text-primary focus:ring-accent-cyan focus:border-accent-cyan"
        />
    </div>
);


interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    children: React.ReactNode;
}
export const Select: React.FC<SelectProps> = ({ label, id, children, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-dark-text-secondary mb-1">{label}</label>
        <select
            id={id}
            {...props}
            className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-dark-text-primary focus:ring-accent-cyan focus:border-accent-cyan"
        >
            {children}
        </select>
    </div>
);

interface FieldsetProps {
    legend: string;
    children: React.ReactNode;
}
export const Fieldset: React.FC<FieldsetProps> = ({ legend, children }) => (
    <fieldset className="border border-dark-border p-4 rounded-md">
        <legend className="text-lg font-semibold text-dark-text-primary px-2">{legend}</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children}
        </div>
    </fieldset>
);
