import React from 'react';
import { Users, Clock, FileText, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import StatCard from './StatCard';

interface ReceptionDashboardProps {
  darkMode?: boolean;
  appointments: any[];
  patients: any[];
  checkInsToday?: number;
  waitingQueueSize?: number;
  documentsToday?: number;
}

const ReceptionDashboard: React.FC<ReceptionDashboardProps> = ({ 
  darkMode = false, 
  appointments, 
  patients,
  checkInsToday = 0,
  waitingQueueSize = 0,
  documentsToday = 0
}) => {
  // Filter today's appointments
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(apt => apt.date === today);
  const upcomingAppointments = todayAppointments.filter(apt => 
    apt.status === 'agendado' || apt.status === 'confirmado'
  ).slice(0, 5);

  const getStatusColor = (status: string) => {
    if (darkMode) {
      switch (status) {
        case "agendado":
          return "text-blue-400 bg-blue-900/30";
        case "confirmado":
          return "text-green-400 bg-green-900/30";
        case "concluido":
          return "text-gray-400 bg-gray-700";
        case "cancelado":
          return "text-red-400 bg-red-900/30";
        default:
          return "text-gray-400 bg-gray-700";
      }
    } else {
      switch (status) {
        case "agendado":
          return "text-blue-600 bg-blue-50";
        case "confirmado":
          return "text-green-600 bg-green-50";
        case "concluido":
          return "text-gray-600 bg-gray-50";
        case "cancelado":
          return "text-red-600 bg-red-50";
        default:
          return "text-gray-600 bg-gray-50";
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Reception Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Check-ins Hoje"
          value={checkInsToday}
          icon={CheckCircle}
          color="green"
          darkMode={darkMode}
        />
        <StatCard
          title="Consultas Hoje"
          value={todayAppointments.length}
          icon={Calendar}
          color="blue"
          darkMode={darkMode}
        />
        <StatCard
          title="Fila de Espera"
          value={waitingQueueSize}
          icon={Clock}
          color="yellow"
          darkMode={darkMode}
        />
        <StatCard
          title="Documentos Hoje"
          value={documentsToday}
          icon={FileText}
          color="purple"
          darkMode={darkMode}
        />
      </div>

      {/* Upcoming Appointments */}
      <div className={`rounded-lg shadow transition-colors ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-bold ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}>
              Próximas Consultas
            </h3>
            <span className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              {upcomingAppointments.length} agendamentos
            </span>
          </div>
          
          <div className="space-y-3">
            {upcomingAppointments.length === 0 ? (
              <div className={`text-center py-8 ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}>
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhuma consulta agendada para hoje</p>
              </div>
            ) : (
              upcomingAppointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                    darkMode ? "bg-gray-700/50 hover:bg-gray-700" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        darkMode ? "bg-blue-900/30" : "bg-blue-50"
                      }`}>
                        <Users className={`w-4 h-4 ${
                          darkMode ? "text-blue-400" : "text-blue-600"
                        }`} />
                      </div>
                      <div>
                        <h4 className={`font-medium ${
                          darkMode ? "text-gray-200" : "text-gray-900"
                        }`}>
                          {appointment.patientName}
                        </h4>
                        <p className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                          {appointment.doctorName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                        {appointment.time}
                      </p>
                      <p className={`text-xs ${
                        darkMode ? "text-gray-500" : "text-gray-500"
                      }`}>
                        {appointment.type}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className={`p-6 rounded-lg text-left transition-all hover:scale-105 ${
          darkMode 
            ? "bg-gradient-to-br from-green-900/30 to-green-800/20 hover:from-green-900/40 hover:to-green-800/30 border border-green-700/30" 
            : "bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border border-green-200"
        }`}>
          <CheckCircle className={`w-8 h-8 mb-3 ${darkMode ? "text-green-400" : "text-green-600"}`} />
          <h4 className={`font-semibold mb-1 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
            Check-in
          </h4>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Realizar check-in de pacientes
          </p>
        </button>

        <button className={`p-6 rounded-lg text-left transition-all hover:scale-105 ${
          darkMode 
            ? "bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 hover:from-yellow-900/40 hover:to-yellow-800/30 border border-yellow-700/30" 
            : "bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 border border-yellow-200"
        }`}>
          <Clock className={`w-8 h-8 mb-3 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
          <h4 className={`font-semibold mb-1 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
            Fila de Espera
          </h4>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Gerenciar fila de espera
          </p>
        </button>

        <button className={`p-6 rounded-lg text-left transition-all hover:scale-105 ${
          darkMode 
            ? "bg-gradient-to-br from-blue-900/30 to-blue-800/20 hover:from-blue-900/40 hover:to-blue-800/30 border border-blue-700/30" 
            : "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200"
        }`}>
          <Calendar className={`w-8 h-8 mb-3 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
          <h4 className={`font-semibold mb-1 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
            Agendamentos
          </h4>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Ver agenda do dia
          </p>
        </button>
      </div>
    </div>
  );
};

export default ReceptionDashboard;
