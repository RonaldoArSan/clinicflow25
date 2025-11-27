import React, { useState } from 'react';
import { 
  Search, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Clock,
  UserPlus,
  X,
  CheckCircle
} from 'lucide-react';

interface Patient {
  id: string | number;
  name: string;
  phone: string;
  email?: string;
  cpf?: string;
  birthDate?: string;
  address?: string;
}

interface PatientSearchModalProps {
  darkMode: boolean;
  patients: Patient[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPatient: (patient: Patient) => void;
  onCreateNew: () => void;
}

const PatientSearchModal: React.FC<PatientSearchModalProps> = ({
  darkMode,
  patients = [],
  isOpen,
  onClose,
  onSelectPatient,
  onCreateNew
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'phone' | 'cpf'>('name');

  if (!isOpen) return null;

  // Filtrar pacientes baseado na busca
  const filteredPatients = patients.filter(patient => {
    const term = searchTerm.toLowerCase();
    switch (searchType) {
      case 'name':
        return patient.name.toLowerCase().includes(term);
      case 'phone':
        return patient.phone.includes(searchTerm);
      case 'cpf':
        return patient.cpf?.includes(searchTerm) || false;
      default:
        return patient.name.toLowerCase().includes(term) ||
               patient.phone.includes(searchTerm) ||
               (patient.cpf?.includes(searchTerm) || false);
    }
  });

  const handlePatientSelect = (patient: Patient) => {
    onSelectPatient(patient);
    onClose();
  };

  const handleCreateNew = () => {
    onCreateNew();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-lg shadow-xl ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}>
          <h2 className={`text-xl font-semibold ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}>
            Buscar Paciente para Check-in
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-opacity-80 transition-colors ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Buscar por ${searchType === 'name' ? 'nome' : searchType === 'phone' ? 'telefone' : 'CPF'}...`}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  autoFocus
                />
              </div>
            </div>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as 'name' | 'phone' | 'cpf')}
              className={`px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode 
                  ? "bg-gray-700 border-gray-600 text-gray-100" 
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="name">Nome</option>
              <option value="phone">Telefone</option>
              <option value="cpf">CPF</option>
            </select>
          </div>

          {/* Create New Button */}
          <div className="flex justify-end">
            <button
              onClick={handleCreateNew}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Cadastrar Novo Paciente</span>
            </button>
          </div>
        </div>

        {/* Results */}
        <div className={`border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="max-h-96 overflow-y-auto">
            {filteredPatients.length === 0 ? (
              <div className="p-6 text-center">
                <User className={`w-12 h-12 mx-auto mb-4 ${
                  darkMode ? "text-gray-600" : "text-gray-400"
                }`} />
                <p className={`text-lg font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Nenhum paciente encontrado
                </p>
                <p className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  Tente buscar com um termo diferente ou cadastre um novo paciente.
                </p>
              </div>
            ) : (
              <div className="space-y-2 p-4">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => handlePatientSelect(patient)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-opacity-80 ${
                      darkMode 
                        ? "bg-gray-700 border-gray-600 hover:bg-gray-600" 
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className={`font-semibold ${
                            darkMode ? "text-gray-100" : "text-gray-900"
                          }`}>
                            {patient.name}
                          </h3>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Phone className={`w-4 h-4 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`} />
                            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                              {patient.phone}
                            </span>
                          </div>
                          
                          {patient.email && (
                            <div className="flex items-center space-x-2">
                              <Mail className={`w-4 h-4 ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`} />
                              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                                {patient.email}
                              </span>
                            </div>
                          )}
                          
                          {patient.birthDate && (
                            <div className="flex items-center space-x-2">
                              <Calendar className={`w-4 h-4 ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`} />
                              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                                {new Date(patient.birthDate).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                          )}
                          
                          {patient.address && (
                            <div className="flex items-center space-x-2">
                              <MapPin className={`w-4 h-4 ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`} />
                              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                                {patient.address}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <button className="ml-4 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                        Selecionar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSearchModal;