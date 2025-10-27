import React from 'react';
import { ICONS } from '../constants';

const AppointmentsCard: React.FC = () => {
  return (
    <div className="bg-dark-card rounded-lg p-4 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-md font-semibold text-dark-text-primary mb-3">Próximas Citas/Tareas</h3>
        {/* Content for appointments can be added here */}
        <p className="text-sm text-dark-text-secondary">No upcoming tasks.</p>
      </div>
      <button className="mt-4 w-full flex items-center justify-center space-x-2 text-sm text-dark-text-primary bg-dark-border hover:bg-dark-border/70 font-semibold py-2 px-4 rounded-lg transition-colors">
        {ICONS.clock}
        <span>Ver Historial Completo</span>
      </button>
    </div>
  );
};

export default AppointmentsCard;
