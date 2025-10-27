import React from 'react';
import type { LabResult, ImagingResult } from '../types';
import { ICONS } from '../constants';

interface LatestResultsCardProps {
  labResults: LabResult[];
  imagingResults: ImagingResult[];
}

const LatestResultsCard: React.FC<LatestResultsCardProps> = ({ labResults, imagingResults }) => {
  const latestLab = labResults.find(r => r.isAbnormal);
  const latestImaging = imagingResults[0];

  return (
    <div className="bg-dark-card rounded-lg p-4 h-full">
      <h3 className="text-md font-semibold text-dark-text-primary mb-3">Últimos Resultados de Lab/Imágenes</h3>
      <div className="space-y-3">
        {latestLab && (
            <div className="bg-dark-border/50 p-2 rounded-md flex items-center space-x-3">
                <div className="text-accent-cyan">{ICONS.checklist}</div>
                <div>
                    <p className="text-sm font-semibold text-orange-400">
                        {latestLab.testName}: {latestLab.result} (Elevado)
                    </p>
                    {latestImaging && (
                         <p className="text-xs text-dark-text-secondary">{latestImaging.studyName} "{latestImaging.report}"</p>
                    )}
                </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestResultsCard;
