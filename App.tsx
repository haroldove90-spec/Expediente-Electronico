
import React from 'react';
import Dashboard from './components/Dashboard';
import { patientData } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-brand-blue-700">EHR Dashboard Pro</h1>
          <div className="flex items-center space-x-4">
             <span className="text-sm font-medium">Dr. Evelyn Reed</span>
             <img className="h-10 w-10 rounded-full" src="https://picsum.photos/id/237/100/100" alt="Doctor avatar" />
          </div>
        </div>
      </header>
      <main className="p-4 sm:p-6 lg:p-8">
        <Dashboard patient={patientData} />
      </main>
    </div>
  );
};

export default App;
