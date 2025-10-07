import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Clock, User, Phone, Calendar, QrCode } from 'lucide-react';

interface CheckInOutProps {
  darkMode?: boolean;
  appointments: any[];
  onCheckIn?: (appointmentId: number) => void;
  onCheckOut?: (appointmentId: number) => void;
}

const CheckInOut: React.FC<CheckInOutProps> = ({ 
  darkMode = false, 
  appointments,
  onCheckIn,
  onCheckOut 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  // Filter today's appointments
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(apt => apt.date === today);

  // Filter appointments by search term
  const filteredAppointments = todayAppointments.filter(apt => 
    apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (apt.patientCpf && apt.patientCpf.includes(searchTerm))
  );

  const getStatusBadge = (status: string) => {
    const colors = {
      'agendado': darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600',
      'confirmado': darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600',
      'em_atendimento': darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-50 text-yellow-600',
      'concluido': darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-50 text-gray-600',
      'cancelado': darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600'
    };
    return colors[status as keyof typeof colors] || (darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-50 text-gray-600');
  };

  const handleCheckIn = (appointment: any) => {
    if (onCheckIn) {
      onCheckIn(appointment.id);
    }
    // Update local state
    appointment.status = 'confirmado';
    appointment.checkInTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-lg shadow p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
          Check-in / Check-out
        </h2>
        
        {/* Search Bar */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`} />
            <input
              type="text"
              placeholder="Buscar por nome, CPF ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                darkMode 
                  ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-blue-500" 
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>
          <button className={`px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 ${
            darkMode 
              ? "bg-purple-600 hover:bg-purple-700 text-white" 
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}>
            <QrCode className="w-5 h-5" />
          </button>
        </div>

        <p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          {filteredAppointments.length} consultas encontradas para hoje
        </p>
      </div>

      {/* Appointments List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAppointments.length === 0 ? (
          <div className={`rounded-lg shadow p-12 text-center ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}>
            <User className={`w-16 h-16 mx-auto mb-4 ${
              darkMode ? "text-gray-600" : "text-gray-300"
            }`} />
            <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Nenhuma consulta encontrada
            </p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div 
              key={appointment.id}
              className={`rounded-lg shadow p-6 transition-all hover:scale-[1.02] ${
                darkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:shadow-lg"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-3 rounded-full ${
                      darkMode ? "bg-blue-900/30" : "bg-blue-50"
                    }`}>
                      <User className={`w-6 h-6 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}>
                        {appointment.patientName}
                      </h3>
                      <p className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}>
                        {appointment.doctorName}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className={`text-xs mb-1 ${
                        darkMode ? "text-gray-500" : "text-gray-500"
                      }`}>
                        Horário
                      </p>
                      <div className="flex items-center gap-2">
                        <Clock className={`w-4 h-4 ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`} />
                        <p className={`text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}>
                          {appointment.time}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className={`text-xs mb-1 ${
                        darkMode ? "text-gray-500" : "text-gray-500"
                      }`}>
                        Tipo
                      </p>
                      <p className={`text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                        {appointment.type}
                      </p>
                    </div>

                    <div>
                      <p className={`text-xs mb-1 ${
                        darkMode ? "text-gray-500" : "text-gray-500"
                      }`}>
                        Convênio
                      </p>
                      <p className={`text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                        {appointment.healthPlan || 'Particular'}
                      </p>
                    </div>

                    <div>
                      <p className={`text-xs mb-1 ${
                        darkMode ? "text-gray-500" : "text-gray-500"
                      }`}>
                        Status
                      </p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>

                  {appointment.checkInTime && (
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${
                      darkMode ? "bg-green-900/20 text-green-400" : "bg-green-50 text-green-700"
                    }`}>
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Check-in realizado às {appointment.checkInTime}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  {appointment.status === 'agendado' && (
                    <button
                      onClick={() => handleCheckIn(appointment)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2 ${
                        darkMode 
                          ? "bg-green-600 hover:bg-green-700 text-white" 
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Check-in
                    </button>
                  )}
                  
                  {appointment.status === 'confirmado' && (
                    <button
                      onClick={() => onCheckOut && onCheckOut(appointment.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2 ${
                        darkMode 
                          ? "bg-red-600 hover:bg-red-700 text-white" 
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                    >
                      <XCircle className="w-4 h-4" />
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CheckInOut;
