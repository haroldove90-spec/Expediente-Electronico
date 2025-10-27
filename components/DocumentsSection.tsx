
import React from 'react';
import type { Document } from '../types';
import SectionCard from './SectionCard';
import { ICONS } from '../constants';

interface DocumentsSectionProps {
  documents: Document[];
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ documents }) => {
  return (
    <SectionCard title="Documentos Adjuntos" icon={ICONS.document}>
      <ul className="divide-y divide-slate-200">
        {documents.map((doc) => (
          <li key={doc.id} className="py-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-slate-800">{doc.name}</p>
              <p className="text-xs text-slate-500">{doc.type} - {doc.date}</p>
            </div>
            <a href={doc.url} download className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-brand-blue-600 transition-colors">
                <span className="sr-only">Download</span>
                {ICONS.download}
            </a>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
};

export default DocumentsSection;
