
import React, { useState } from 'react';
import type { LabResult, ImagingResult } from '../types';
import SectionCard from './SectionCard';
import { ICONS } from '../constants';

interface ResultsSectionProps {
  labResults: LabResult[];
  imagingResults: ImagingResult[];
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ labResults, imagingResults }) => {
  const [activeTab, setActiveTab] = useState('lab');

  return (
    <SectionCard title="Resultados de Laboratorio e Imágenes" icon={ICONS.lab}>
      <div>
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('lab')}
              className={`${
                activeTab === 'lab'
                  ? 'border-brand-blue-500 text-brand-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
            >
              Laboratorio
            </button>
            <button
              onClick={() => setActiveTab('imaging')}
              className={`${
                activeTab === 'imaging'
                  ? 'border-brand-blue-500 text-brand-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
            >
              Imágenes
            </button>
          </nav>
        </div>

        <div className="mt-4">
          {activeTab === 'lab' && (
             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold text-slate-600">Prueba</th>
                            <th className="px-4 py-2 text-left font-semibold text-slate-600">Fecha</th>
                            <th className="px-4 py-2 text-left font-semibold text-slate-600">Resultado</th>
                            <th className="px-4 py-2 text-left font-semibold text-slate-600">Rango de Referencia</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {labResults.map((result) => (
                            <tr key={result.id} className={`${result.isAbnormal ? 'bg-red-50' : ''}`}>
                                <td className="px-4 py-2 font-medium text-slate-800">{result.testName}</td>
                                <td className="px-4 py-2 text-slate-600">{result.date}</td>
                                <td className={`px-4 py-2 font-semibold ${result.isAbnormal ? 'text-red-600' : 'text-slate-800'}`}>{result.result}</td>
                                <td className="px-4 py-2 text-slate-600">{result.referenceRange}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
          )}
          {activeTab === 'imaging' && (
            <div className="space-y-4">
                {imagingResults.map(result => (
                    <div key={result.id} className="flex flex-col sm:flex-row items-start gap-4 p-3 border rounded-lg">
                        <img src={result.thumbnailUrl} alt={result.studyName} className="w-32 h-24 object-cover rounded-md flex-shrink-0"/>
                        <div className="text-sm">
                            <p className="font-bold text-slate-800">{result.studyName}</p>
                            <p className="text-slate-500">{result.date}</p>
                            <p className="mt-2 text-slate-700">{result.report}</p>
                        </div>
                    </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
};

export default ResultsSection;
