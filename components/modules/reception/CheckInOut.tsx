import React, { useState } from 'react';
import { 
  Search, 
  UserCheck, 
  UserX, 
  Clock, 
  Calendar,
  QrCode,
  CheckCircle2,
  AlertCircle,
  User,
  Phone,
  MapPin
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  cpf?: string;
  phone?: string;
  email?: string;
  appointment?: {
    id: string;
    time: string;
    doctor: string;
    type: string;
    status: 'agendado' | 'confirmado' | 'em_atendimento' | 'finalizado';
  };
  checkinTime?: string;
  status: 'aguardando_checkin' | 'checked_in' | 'em_atendimento' | 'finalizado';
}

interface CheckInOutProps {
  darkMode?: boolean;
  patients: Patient[];
  onCheckIn: (patientId: string) => void;
  onCheckOut: (patientId: string) => void;
}

export default function CheckInOut({ 
  darkMode = false, 
  patients = [],
  onCheckIn,
  onCheckOut 
}: CheckInOutProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);

  // Filtrar pacientes com base na busca
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf?.includes(searchTerm) ||
    patient.phone?.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    if (darkMode) {
      switch (status) {
        case "aguardando_checkin":
          return "text-yellow-400 bg-yellow-900/30";
        case "checked_in":
          return "text-blue-400 bg-blue-900/30";
        case "em_atendimento":
          return "text-green-400 bg-green-900/30";
        case "finalizado":
          return "text-gray-400 bg-gray-700";
        default:
          return "text-gray-400 bg-gray-700";
      }
    } else {
      switch (status) {
        case "aguardando_checkin":
          return "text-yellow-600 bg-yellow-50";
        case "checked_in":
          return "text-blue-600 bg-blue-50";
        case "em_atendimento":
          return "text-green-600 bg-green-50";
        case "finalizado":
          return "text-gray-600 bg-gray-50";
        default:
          return "text-gray-600 bg-gray-50";
      }
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "aguardando_checkin":
        return "Aguardando Check-in";
      case "checked_in":
        return "Check-in Realizado";
      case "em_atendimento":
        return "Em Atendimento";
      case "finalizado":
        return "Finalizado";
      default:
        return "Desconhecido";
    }
  };

  const handleCheckIn = (patient: Patient) => {
    onCheckIn(patient.id);
    setSelectedPatient(null);
  };

  const handleCheckOut = (patient: Patient) => {
    onCheckOut(patient.id);
    setSelectedPatient(null);
  };

  return (
    <div className="space-y-6">
      {/* Header com busca */}
      <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          <h1 className={`text-xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
            Check-in / Check-out
          </h1>
          
          <button
            onClick={() => setShowQRScanner(!showQRScanner)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
              ${darkMode 
                ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }
            `}
          >
            <QrCode className="w-4 h-4" />
            <span>Escanear QR Code</span>
          </button>
        </div>

        {/* Barra de busca */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              w-full pl-10 pr-4 py-3 rounded-lg border transition-colors
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20
            `}
          />
        </div>

        {showQRScanner && (
          <div className={`mt-4 p-4 rounded-lg border-2 border-dashed ${darkMode ? "border-gray-600 bg-gray-700/30" : "border-gray-300 bg-gray-50"}`}>
            <div className="text-center">
              <QrCode className={`w-16 h-16 mx-auto mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Scanner QR Code será implementado aqui
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Lista de pacientes */}
      <div className="grid gap-4">
        {filteredPatients.length === 0 ? (
          <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-8 rounded-lg shadow-sm border text-center transition-colors`}>
            <User className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-gray-400" : "text-gray-400"}`} />
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {searchTerm ? 'Nenhum paciente encontrado' : 'Nenhum paciente para check-in hoje'}
            </p>
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <div 
              key={patient.id}
              className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                      {patient.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                      {getStatusText(patient.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                      <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                        {patient.phone || 'Não informado'}
                      </span>
                    </div>
                    
                    {patient.appointment && (
                      <>
                        <div className="flex items-center space-x-2">
                          <Clock className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                          <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                            {patient.appointment.time}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <User className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                          <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                            {patient.appointment.doctor}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {patient.checkinTime && (
                    <div className="mt-2 flex items-center space-x-2 text-sm">
                      <CheckCircle2 className={`w-4 h-4 ${darkMode ? "text-green-400" : "text-green-500"}`} />
                      <span className={`${darkMode ? "text-green-400" : "text-green-600"}`}>
                        Check-in realizado às {patient.checkinTime}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 ml-4">
                  {patient.status === 'aguardando_checkin' && (
                    <button
                      onClick={() => handleCheckIn(patient)}
                      className={`
                        flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                        ${darkMode 
                          ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }
                      `}
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Check-in</span>
                    </button>
                  )}
                  
                  {(patient.status === 'checked_in' || patient.status === 'em_atendimento') && (
                    <button
                      onClick={() => handleCheckOut(patient)}
                      className={`
                        flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                        ${darkMode 
                          ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' 
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }
                      `}
                    >
                      <UserX className="w-4 h-4" />
                      <span>Check-out</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => setSelectedPatient(patient)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                      ${darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    <User className="w-4 h-4" />
                    <span>Detalhes</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de detalhes do paciente */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow-xl max-w-md w-full mx-4`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
              Detalhes do Paciente
            </h3>
            
            <div className="space-y-3">
              <div>
                <span className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Nome:</span>
                <p className={darkMode ? "text-gray-200" : "text-gray-900"}>{selectedPatient.name}</p>
              </div>
              
              <div>
                <span className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>CPF:</span>
                <p className={darkMode ? "text-gray-200" : "text-gray-900"}>{selectedPatient.cpf || 'Não informado'}</p>
              </div>
              
              <div>
                <span className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Telefone:</span>
                <p className={darkMode ? "text-gray-200" : "text-gray-900"}>{selectedPatient.phone || 'Não informado'}</p>
              </div>
              
              <div>
                <span className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Status:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPatient.status)}`}>
                  {getStatusText(selectedPatient.status)}
                </span>
              </div>
              
              {selectedPatient.appointment && (
                <div className="border-t pt-3 mt-3">
                  <h4 className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>Consulta Agendada</h4>
                  <div className="text-sm space-y-1">
                    <p><span className={darkMode ? "text-gray-400" : "text-gray-600"}>Horário:</span> {selectedPatient.appointment.time}</p>
                    <p><span className={darkMode ? "text-gray-400" : "text-gray-600"}>Médico:</span> {selectedPatient.appointment.doctor}</p>
                    <p><span className={darkMode ? "text-gray-400" : "text-gray-600"}>Tipo:</span> {selectedPatient.appointment.type}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setSelectedPatient(null)}
                className={`
                  flex-1 px-4 py-2 rounded-lg transition-colors
                  ${darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}