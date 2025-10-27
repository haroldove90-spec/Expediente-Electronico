import React from 'react';
import type { LabResult, ImagingResult } from '../types';

const LabsAndImagesView: React.FC<{ labResults: LabResult[], imagingResults: ImagingResult[] }> = ({ labResults, imagingResults }) => {
  return (
    <div>
        <h1 className="text-3xl font-bold text-dark-text-primary mb-6">Laboratorio e Imágenes</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Lab Results */}
            <div>
                <h2 className="text-xl font-semibold text-dark-text-primary mb-4">Resultados de Laboratorio</h2>
                <div className="bg-dark-card rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-dark-text-secondary">
                             <thead className="text-xs text-dark-text-primary uppercase bg-dark-card">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Prueba</th>
                                    <th scope="col" className="px-6 py-3">Resultado</th>
                                    <th scope="col" className="px-6 py-3">Rango de Referencia</th>
                                    <th scope="col" className="px-6 py-3">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {labResults.length > 0 ? labResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((lab) => (
                                    <tr key={lab.id} className="border-t border-dark-border hover:bg-dark-border/20">
                                        <th scope="row" className="px-6 py-4 font-medium text-dark-text-primary whitespace-nowrap">{lab.testName}</th>
                                        <td className={`px-6 py-4 font-bold ${lab.isAbnormal ? 'text-orange-400' : 'text-dark-text-primary'}`}>{lab.result}</td>
                                        <td className="px-6 py-4">{lab.referenceRange}</td>
                                        <td className="px-6 py-4">{new Date(lab.date).toLocaleDateString()}</td>
                                    </tr>
                                )) : (
                                     <tr><td colSpan={4} className="text-center py-8 text-dark-text-secondary">No hay resultados de laboratorio.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Imaging Results */}
            <div>
                <h2 className="text-xl font-semibold text-dark-text-primary mb-4">Resultados de Imágenes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {imagingResults.length > 0 ? imagingResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(img => (
                        <div key={img.id} className="bg-dark-card rounded-lg shadow overflow-hidden group">
                            <img src={img.imageDataUrl} alt={img.studyName} className="w-full h-32 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-dark-text-primary">{img.studyName}</h3>
                                <p className="text-xs text-dark-text-secondary">{new Date(img.date).toLocaleDateString()}</p>
                                <p className="text-sm text-dark-text-secondary mt-2 truncate">{img.report}</p>
                                <a href={img.imageDataUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-accent-cyan mt-2 inline-block opacity-0 group-hover:opacity-100 transition-opacity">Ver imagen completa</a>
                            </div>
                        </div>
                    )) : (
                        <div className="sm:col-span-2 text-center py-8 text-dark-text-secondary bg-dark-card rounded-lg">No hay resultados de imágenes.</div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default LabsAndImagesView;