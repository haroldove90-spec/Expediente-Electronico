
import React from 'react';

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center space-x-3">
        <div className="text-brand-blue-600">
          {icon}
        </div>
        <h2 className="text-lg font-semibold text-slate-700">{title}</h2>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default SectionCard;
