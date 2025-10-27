import React from 'react';
import { ICONS } from '../constants';

const GlucoseTrendCard: React.FC = () => {
  return (
    <div className="bg-dark-card rounded-lg p-4 h-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold text-dark-text-primary">Tendencia de Glucosa (mg/dL)</h3>
        <button className="text-dark-text-secondary hover:text-white">
            {ICONS.close}
        </button>
      </div>
      <div className="w-full h-48">
        <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="0" x2="0" y2="100" stroke="#334155" strokeWidth="0.5" />
          <line x1="0" y1="100" x2="300" y2="100" stroke="#334155" strokeWidth="0.5" />

          {/* Data path */}
          <path
            d="M 0 60 Q 20 40, 40 50 T 80 55 Q 100 80, 120 70 T 160 65 Q 180 50, 200 60 T 240 75 Q 260 90, 280 85 T 300 88"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="2"
          />
          {/* Data points */}
           <circle cx="40" cy="50" r="2" fill="#22D3EE" />
           <circle cx="120" cy="70" r="2" fill="#22D3EE" />
           <circle cx="200" cy="60" r="2" fill="#22D3EE" />
           <circle cx="280" cy="85" r="2" fill="#22D3EE" />

            {/* X-axis labels */}
            <text x="40" y="110" fill="#94A3B8" fontSize="8" textAnchor="middle">21:00</text>
            <text x="120" y="110" fill="#94A3B8" fontSize="8" textAnchor="middle">23:16</text>
            <text x="200" y="110" fill="#94A3B8" fontSize="8" textAnchor="middle">28:26</text>
            <text x="280" y="110" fill="#94A3B8" fontSize="8" textAnchor="middle">29:10</text>
            
             {/* Y-axis labels */}
            <text x="-10" y="8" fill="#94A3B8" fontSize="8" textAnchor="end">2</text>
            <text x="-10" y="28" fill="#94A3B8" fontSize="8" textAnchor="end">4</text>
            <text x="-10" y="48" fill="#94A3B8" fontSize="8" textAnchor="end">18</text>
            <text x="-10" y="68" fill="#94A3B8" fontSize="8" textAnchor="end">6</text>
            <text x="-10" y="98" fill="#94A3B8" fontSize="8" textAnchor="end">0</text>
        </svg>
      </div>
    </div>
  );
};

export default GlucoseTrendCard;
