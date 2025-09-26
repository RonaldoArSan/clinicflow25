import React from 'react';
import { MapPin, Phone, Calendar, User } from 'lucide-react';
import { Patient } from '../types';

interface PatientCardProps {
  patient: Patient;
  onClick: (patient: Patient) => void;
  darkMode?: boolean;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onClick, darkMode = false }) => {
  return (
    <div
      className={`${
        darkMode 
          ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
          : "bg-white border-gray-200 hover:shadow-md"
      } p-4 rounded-lg shadow-sm border transition-all cursor-pointer`}
      onClick={() => onClick(patient)}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
            {patient.name}
          </h3>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {patient.healthPlan}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
            Tipo: {patient.bloodType}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            patient.status === "ativo" 
              ? darkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"
              : darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
          }`}>
            {patient.status}
          </span>
        </div>
      </div>

      <div className={`space-y-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>{patient.address}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4" />
          <span>{patient.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Última consulta: {patient.lastVisit}</span>
        </div>
      </div>

      <div className="mt-3">
        {patient.chronicConditions.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {patient.chronicConditions.map((condition, index) => (
              <span 
                key={index} 
                className={`px-2 py-1 rounded-full text-xs ${
                  darkMode ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-700"
                }`}
              >
                {condition}
              </span>
            ))}
          </div>
        )}
        {patient.allergies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {patient.allergies.map((allergy, index) => (
              <span 
                key={index} 
                className={`px-2 py-1 rounded-full text-xs ${
                  darkMode ? "bg-yellow-900/30 text-yellow-400" : "bg-yellow-100 text-yellow-700"
                }`}
              >
                ⚠️ {allergy}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientCard;