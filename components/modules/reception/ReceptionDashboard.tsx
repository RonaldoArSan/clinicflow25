import React from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  UserPlus,
  CalendarPlus,
  Activity
} from 'lucide-react';
import StatCard from '../../StatCard';

interface ReceptionDashboardProps {
  darkMode?: boolean;
  analytics: {
    todayAppointments: number;
    waitingPatients: number;
    checkedInPatients: number;
    newPatients: number;
    scheduledAppointments: number;
    completedAppointments: number;
  };
  appointments: any[];
  waitingQueue: any[];
}

export default function ReceptionDashboard({ 
  darkMode = false, 
  analytics,
  appointments = [],
  waitingQueue = []
}: ReceptionDashboardProps) {

  const getStatusColor = (status: string) => {
    if (darkMode) {
      switch (status) {
        case "aguardando":
          return "text-yellow-400 bg-yellow-900/30";
        case "em_atendimento":
          return "text-blue-400 bg-blue-900/30";
        case "finalizado":
          return "text-green-400 bg-green-900/30";
        default:
          return "text-gray-400 bg-gray-700";
      }
    } else {
      switch (status) {
        case "aguardando":
          return "text-yellow-600 bg-yellow-50";
        case "em_atendimento":
          return "text-blue-600 bg-blue-50";
        case "finalizado":
          return "text-green-600 bg-green-50";
        default:
          return "text-gray-600 bg-gray-50";
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    if (darkMode) {
      switch (priority) {
        case "alta":
          return "border-l-red-500 bg-red-900/10";
        case "media":
          return "border-l-yellow-500 bg-yellow-900/10";
        case "baixa":
          return "border-l-green-500 bg-green-900/10";
        default:
          return "border-l-gray-500 bg-gray-900/10";
      }
    } else {
      switch (priority) {
        case "alta":
          return "border-l-red-500 bg-red-50";
        case "media":
          return "border-l-yellow-500 bg-yellow-50";
        case "baixa":
          return "border-l-green-500 bg-green-50";
        default:
          return "border-l-gray-300 bg-gray-50";
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid - Métricas da Recepção */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Consultas Hoje"
          value={analytics.todayAppointments.toString()}
          icon={Calendar}
          color="blue"
          darkMode={darkMode}
        />
        <StatCard
          title="Pacientes Aguardando"
          value={analytics.waitingPatients.toString()}
          icon={Clock}
          color="yellow"
          darkMode={darkMode}
        />
        <StatCard
          title="Check-ins Realizados"
          value={analytics.checkedInPatients.toString()}
          icon={CheckCircle2}
          color="green"
          darkMode={darkMode}
        />
        <StatCard
          title="Novos Pacientes"
          value={analytics.newPatients.toString()}
          icon={UserPlus}
          color="purple"
          darkMode={darkMode}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximas Consultas */}
        <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
              Próximas Consultas
            </h2>
            <CalendarPlus className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
          </div>
          
          <div className="space-y-3">
            {appointments.slice(0, 5).map((appointment, index) => (
              <div 
                key={appointment.id || index} 
                className={`flex items-center justify-between p-3 rounded-lg border-l-4 ${getPriorityColor(appointment.priority || 'baixa')}`}
              >
                <div className="flex-1">
                  <h4 className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                    {appointment.patientName}
                  </h4>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {appointment.time} - {appointment.doctorName}
                  </p>
                  <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                    {appointment.type}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status === 'agendado' ? 'Agendado' : 
                     appointment.status === 'confirmado' ? 'Confirmado' :
                     appointment.status === 'em_atendimento' ? 'Em Atendimento' : 'Finalizado'}
                  </span>
                </div>
              </div>
            ))}
            
            {appointments.length === 0 && (
              <div className={`text-center py-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhuma consulta agendada para hoje</p>
              </div>
            )}
          </div>
        </div>

        {/* Fila de Espera */}
        <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
              Fila de Espera
            </h2>
            <div className="flex items-center space-x-2">
              <Activity className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-500"}`} />
              <span className={`text-sm font-medium ${darkMode ? "text-green-400" : "text-green-500"}`}>
                {waitingQueue.length} aguardando
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            {waitingQueue.slice(0, 5).map((patient, index) => (
              <div 
                key={patient.id || index} 
                className={`flex items-center space-x-3 p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"} transition-colors`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  index === 0 ? 'bg-red-500 text-white' :
                  index === 1 ? 'bg-yellow-500 text-white' :
                  index === 2 ? 'bg-green-500 text-white' :
                  darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                    {patient.name}
                  </h4>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Chegada: {patient.checkinTime || '09:30'}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {patient.waitTime || '15 min'}
                  </p>
                  {patient.priority === 'alta' && (
                    <AlertCircle className="w-4 h-4 text-red-500 ml-2" />
                  )}
                </div>
              </div>
            ))}
            
            {waitingQueue.length === 0 && (
              <div className={`text-center py-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhum paciente na fila de espera</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resumo Rápido */}
      <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
          Resumo do Dia
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`text-center p-4 rounded-lg ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}`}>
            <Calendar className={`w-8 h-8 mx-auto mb-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <p className={`text-2xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
              {analytics.scheduledAppointments}
            </p>
            <p className={`text-sm ${darkMode ? "text-blue-400/80" : "text-blue-600"}`}>
              Agendadas
            </p>
          </div>
          
          <div className={`text-center p-4 rounded-lg ${darkMode ? "bg-green-900/20" : "bg-green-50"}`}>
            <CheckCircle2 className={`w-8 h-8 mx-auto mb-2 ${darkMode ? "text-green-400" : "text-green-600"}`} />
            <p className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
              {analytics.completedAppointments}
            </p>
            <p className={`text-sm ${darkMode ? "text-green-400/80" : "text-green-600"}`}>
              Concluídas
            </p>
          </div>
          
          <div className={`text-center p-4 rounded-lg ${darkMode ? "bg-yellow-900/20" : "bg-yellow-50"}`}>
            <Clock className={`w-8 h-8 mx-auto mb-2 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
            <p className={`text-2xl font-bold ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}>
              {waitingQueue.length}
            </p>
            <p className={`text-sm ${darkMode ? "text-yellow-400/80" : "text-yellow-600"}`}>
              Aguardando
            </p>
          </div>
          
          <div className={`text-center p-4 rounded-lg ${darkMode ? "bg-purple-900/20" : "bg-purple-50"}`}>
            <UserPlus className={`w-8 h-8 mx-auto mb-2 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
            <p className={`text-2xl font-bold ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
              {analytics.newPatients}
            </p>
            <p className={`text-sm ${darkMode ? "text-purple-400/80" : "text-purple-600"}`}>
              Novos Pacientes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}