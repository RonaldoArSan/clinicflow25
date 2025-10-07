import React, { useState } from 'react';
import { 
  UserCheck, 
  Search, 
  Clock, 
  CheckCircle, 
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Plus,
  QrCode,
  Smartphone
} from 'lucide-react';

interface CheckinViewProps {
  darkMode: boolean;
  appointments: any[];
  patients: any[];
  onCheckIn: (patientId: string, appointmentId?: string) => void;
}

const CheckinView: React.FC<CheckinViewProps> = ({
  darkMode,
  appointments = [],
  patients = [],
  onCheckIn
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [checkInMethod, setCheckInMethod] = useState<'search' | 'qr' | 'appointment'>('search');

  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(apt => 
    apt.date === today && apt.status !== 'completed'
  );

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf?.includes(searchTerm) ||
    patient.phone?.includes(searchTerm)
  );

  const handleCheckIn = (patient: any, appointment?: any) => {
    onCheckIn(patient.id, appointment?.id);
    setSelectedPatient(null);
    setSearchTerm('');
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-800' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'} rounded-lg border p-6`}>
        <div className="flex items-center space-x-3">
          <UserCheck className={`w-8 h-8 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
              Check-in de Pacientes
            </h2>
            <p className={`${darkMode ? 'text-green-400/80' : 'text-green-600/80'}`}>
              Registre a chegada dos pacientes na clínica
            </p>
          </div>
        </div>
      </div>

      {/* Métodos de Check-in */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Método de Check-in
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setCheckInMethod('appointment')}
            className={`p-4 rounded-lg border-2 transition-all ${
              checkInMethod === 'appointment'
                ? darkMode 
                  ? 'border-blue-500 bg-blue-900/20 text-blue-400'
                  : 'border-blue-500 bg-blue-50 text-blue-700'
                : darkMode
                  ? 'border-gray-600 hover:border-gray-500 text-gray-300'
                  : 'border-gray-300 hover:border-gray-400 text-gray-700'
            }`}
          >
            <Calendar className="w-6 h-6 mx-auto mb-2" />
            <span className="block text-sm font-medium">Por Consulta</span>
            <span className="block text-xs opacity-80 mt-1">Consultas agendadas</span>
          </button>

          <button
            onClick={() => setCheckInMethod('search')}
            className={`p-4 rounded-lg border-2 transition-all ${
              checkInMethod === 'search'
                ? darkMode 
                  ? 'border-blue-500 bg-blue-900/20 text-blue-400'
                  : 'border-blue-500 bg-blue-50 text-blue-700'
                : darkMode
                  ? 'border-gray-600 hover:border-gray-500 text-gray-300'
                  : 'border-gray-300 hover:border-gray-400 text-gray-700'
            }`}
          >
            <Search className="w-6 h-6 mx-auto mb-2" />
            <span className="block text-sm font-medium">Buscar Paciente</span>
            <span className="block text-xs opacity-80 mt-1">CPF, nome ou telefone</span>
          </button>

          <button
            onClick={() => setCheckInMethod('qr')}
            className={`p-4 rounded-lg border-2 transition-all ${
              checkInMethod === 'qr'
                ? darkMode 
                  ? 'border-blue-500 bg-blue-900/20 text-blue-400'
                  : 'border-blue-500 bg-blue-50 text-blue-700'
                : darkMode
                  ? 'border-gray-600 hover:border-gray-500 text-gray-300'
                  : 'border-gray-300 hover:border-gray-400 text-gray-700'
            }`}
          >
            <QrCode className="w-6 h-6 mx-auto mb-2" />
            <span className="block text-sm font-medium">QR Code</span>
            <span className="block text-xs opacity-80 mt-1">Código do paciente</span>
          </button>
        </div>

        {/* Check-in por Consulta Agendada */}
        {checkInMethod === 'appointment' && (
          <div className="space-y-4">
            <h4 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Consultas de Hoje
            </h4>
            
            {todayAppointments.length > 0 ? (
              <div className="space-y-3">
                {todayAppointments.map((appointment, index) => (
                  <div 
                    key={index}
                    className={`${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'} border rounded-lg p-4`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                        }`}>
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <h5 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {appointment.patientName}
                          </h5>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {appointment.time} • {appointment.doctorName}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            {appointment.specialty} • {appointment.type}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmado'
                            ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                            : darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {appointment.status === 'confirmado' ? 'Confirmado' : 'Agendado'}
                        </span>
                        
                        <button
                          onClick={() => handleCheckIn(appointment.patient, appointment)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          <UserCheck className="w-4 h-4 inline mr-1" />
                          Check-in
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Nenhuma consulta agendada para hoje
              </p>
            )}
          </div>
        )}

        {/* Check-in por Busca */}
        {checkInMethod === 'search' && (
          <div className="space-y-4">
            <div className="relative">
              <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Buscar por nome, CPF ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {searchTerm && (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredPatients.map((patient, index) => (
                  <div 
                    key={index}
                    className={`${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'} border rounded-lg p-4`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'
                        }`}>
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <h5 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {patient.name}
                          </h5>
                          <div className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {patient.cpf && (
                              <p className="flex items-center">
                                <span className="mr-1">📄</span> {patient.cpf}
                              </p>
                            )}
                            {patient.phone && (
                              <p className="flex items-center">
                                <Phone className="w-3 h-3 mr-1" /> {patient.phone}
                              </p>
                            )}
                            {patient.email && (
                              <p className="flex items-center">
                                <Mail className="w-3 h-3 mr-1" /> {patient.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleCheckIn(patient)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <UserCheck className="w-4 h-4 inline mr-1" />
                        Check-in
                      </button>
                    </div>
                  </div>
                ))}
                
                {filteredPatients.length === 0 && (
                  <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Nenhum paciente encontrado
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Check-in por QR Code */}
        {checkInMethod === 'qr' && (
          <div className="text-center py-12">
            <QrCode className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <h4 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Scanner QR Code
            </h4>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
              Posicione o código QR do paciente na câmera
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <Smartphone className="w-5 h-5 inline mr-2" />
              Abrir Scanner
            </button>
          </div>
        )}
      </div>

      {/* Check-ins Recentes */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          ✅ Check-ins de Hoje
        </h3>
        
        <div className="space-y-3">
          {/* Lista de check-ins seria carregada aqui */}
          <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Nenhum check-in realizado hoje
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckinView;