import React from 'react';
import type { Alert } from '../types';

interface AlertsCardProps {
  alerts: Alert[];
}

const AlertsCard: React.FC<AlertsCardProps> = ({ alerts }) => {
  const highAlert = alerts.find(a => a.severity === 'High');
  const otherAlerts = alerts.filter(a => a.severity !== 'High');

  return (
    <div className="bg-dark-card rounded-lg p-4 h-full">
      {highAlert && (
        <div className="bg-red-500 text-white font-bold text-center p-3 rounded-md mb-3 text-lg">
          {highAlert.message}
        </div>
      )}
      <ul className="space-y-2 text-sm text-dark-text-secondary list-disc list-inside">
        {otherAlerts.map(alert => (
            <li key={alert.id}><span className="text-dark-text-primary">{alert.message}</span></li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsCard;
