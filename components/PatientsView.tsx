import React from 'react';
import { UserPlus, Search, Filter, Download, X } from 'lucide-react';
import PatientCard from './PatientCard';
import { Patient } from '../types';

interface PatientsViewProps {
  darkMode?: boolean;
  patients: Patient[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
}

const PatientsView: React.FC<PatientsViewProps> = ({ 
  darkMode = false, 
  patients, 
  selectedPatient, 
  setSelectedPatient 
}) => {
  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
              <input
                type="text"
                placeholder="Buscar pacientes..."
                className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  darkMode 
                    ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" 
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>
            <select className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"
            }`}>
              <option>Todos os convênios</option>
              <option>Unimed</option>
              <option>Bradesco Saúde</option>
              <option>Particular</option>
            </select>
            <select className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"
            }`}>
              <option>Todos os status</option>
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className={`p-2 ${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"} transition-colors`}>
              <Filter className="w-5 h-5" />
            </button>
            <button className={`p-2 ${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"} transition-colors`}>
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((patient) => (
            <PatientCard 
              key={patient.id} 
              patient={patient} 
              onClick={setSelectedPatient} 
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto transition-colors`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Prontuário do Paciente
              </h2>
              <button
                onClick={() => setSelectedPatient(null)}
                className={`${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} transition-colors`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Patient Information */}
              <div className="md:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      Nome Completo
                    </label>
                    <p className={`${darkMode ? "text-gray-100" : "text-gray-900"} font-medium`}>
                      {selectedPatient.name}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      CPF
                    </label>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {selectedPatient.cpf}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      Data de Nascimento
                    </label>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {selectedPatient.birthDate}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      Tipo Sanguíneo
                    </label>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {selectedPatient.bloodType}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      Telefone
                    </label>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {selectedPatient.phone}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      E-mail
                    </label>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {selectedPatient.email}
                    </p>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                    Endereço
                  </label>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {selectedPatient.address}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      Convênio
                    </label>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {selectedPatient.healthPlan}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      Número do Plano
                    </label>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {selectedPatient.planNumber || "N/A"}
                    </p>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
                    Contato de Emergência
                  </label>
                  <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-3 rounded-lg transition-colors`}>
                    <p className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                      {selectedPatient.emergencyContact.name}
                    </p>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {selectedPatient.emergencyContact.relationship}
                    </p>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {selectedPatient.emergencyContact.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
                    Condições Crônicas
                  </label>
                  {selectedPatient.chronicConditions.length > 0 ? (
                    <div className="space-y-1">
                      {selectedPatient.chronicConditions.map((condition, index) => (
                        <span 
                          key={index}
                          className={`block px-2 py-1 rounded text-sm ${
                            darkMode ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className={`${darkMode ? "text-gray-500" : "text-gray-500"} text-sm`}>
                      Nenhuma condição crônica
                    </p>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
                    Alergias
                  </label>
                  {selectedPatient.allergies.length > 0 ? (
                    <div className="space-y-1">
                      {selectedPatient.allergies.map((allergy, index) => (
                        <span 
                          key={index}
                          className={`block px-2 py-1 rounded text-sm ${
                            darkMode ? "bg-yellow-900/30 text-yellow-400" : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          ⚠️ {allergy}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className={`${darkMode ? "text-gray-500" : "text-gray-500"} text-sm`}>
                      Nenhuma alergia conhecida
                    </p>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                    Última Consulta
                  </label>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {selectedPatient.lastVisit}
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                    Observações
                  </label>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>
                    {selectedPatient.notes}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setSelectedPatient(null)}
                className={`px-4 py-2 ${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"} transition-colors`}
              >
                Fechar
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Agendar Consulta
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Editar Dados
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsView;