
import React from 'react';
import type { Alert } from '../types';
import SectionCard from './SectionCard';
import { ICONS } from '../constants';

interface AlertsSectionProps {
  alerts: Alert[];
}

const alertStyles = {
  High: 'bg-red-100 border-red-500 text-red-800',
  Medium: 'bg-yellow-100 border-yellow-500 text-yellow-800',
  Low: 'bg-blue-100 border-blue-500 text-blue-800',
};

const alertIcons = {
    Allergy: '💊',
    'Chronic Condition': '❤️',
    Reminder: '⏰'
}

const AlertsSection: React.FC<AlertsSectionProps> = ({ alerts }) => {
  return (
    <SectionCard title="Alertas y Recordatorios" icon={ICONS.alert}>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${alertStyles[alert.severity]}`}>
            <p className="font-bold flex items-center">
                <span className="mr-2">{alertIcons[alert.type]}</span>
                {alert.type}
            </p>
            <p className="text-sm">{alert.message}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default AlertsSection;
