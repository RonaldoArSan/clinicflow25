import React from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText,
  UserCheck,
  Phone,
  Plus,
  Timer,
  Activity
} from 'lucide-react';

interface ReceptionDashboardProps {
  darkMode: boolean;
  appointments: any[];
  patients: any[];
  queue: any[];
  onNavigate: (view: string) => void;
}

const ReceptionDashboard: React.FC<ReceptionDashboardProps> = ({
  darkMode,
  appointments = [],
  patients = [],
  queue = [],
  onNavigate
}) => {
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(apt => apt.date === today);
  const waitingPatients = queue.filter(p => p.status === 'waiting');
  const inServicePatients = queue.filter(p => p.status === 'in_service');
  
  // Métricas rápidas
  const metrics = [
    {
      id: 'today-appointments',
      title: 'Consultas Hoje',
      value: todayAppointments.length,
      icon: Calendar,
      color: 'blue',
      action: () => onNavigate('appointments')
    },
    {
      id: 'waiting-queue',
      title: 'Fila de Espera',
      value: waitingPatients.length,
      icon: Timer,
      color: 'orange',
      action: () => onNavigate('queue')
    },
    {
      id: 'in-service',
      title: 'Em Atendimento',
      value: inServicePatients.length,
      icon: Activity,
      color: 'green',
      action: () => onNavigate('queue')
    },
    {
      id: 'total-patients',
      title: 'Total Pacientes',
      value: patients.length,
      icon: Users,
      color: 'purple',
      action: () => onNavigate('patients')
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return darkMode 
          ? 'bg-blue-900/20 border-blue-800 text-blue-400' 
          : 'bg-blue-50 border-blue-200 text-blue-600';
      case 'orange':
        return darkMode 
          ? 'bg-orange-900/20 border-orange-800 text-orange-400' 
          : 'bg-orange-50 border-orange-200 text-orange-600';
      case 'green':
        return darkMode 
          ? 'bg-green-900/20 border-green-800 text-green-400' 
          : 'bg-green-50 border-green-200 text-green-600';
      case 'purple':
        return darkMode 
          ? 'bg-purple-900/20 border-purple-800 text-purple-400' 
          : 'bg-purple-50 border-purple-200 text-purple-600';
      default:
        return darkMode 
          ? 'bg-gray-700 border-gray-600 text-gray-300' 
          : 'bg-gray-50 border-gray-200 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho da Recepção */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-800' : 'bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200'} rounded-lg border p-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-cyan-300' : 'text-cyan-700'}`}>
              🏥 Central de Recepção
            </h2>
            <p className={`mt-1 ${darkMode ? 'text-cyan-400/80' : 'text-cyan-600/80'}`}>
              Gestão de atendimento e fluxo de pacientes
            </p>
          </div>
          <div className={`text-right ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
            <p className="text-sm">Hoje</p>
            <p className="text-lg font-bold">{new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
      </div>

      {/* Métricas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <button
              key={metric.id}
              onClick={metric.action}
              className={`${getColorClasses(metric.color)} p-4 rounded-lg border transition-all hover:scale-105 text-left`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-80">{metric.title}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                </div>
                <Icon className="w-8 h-8 opacity-60" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Próximas Consultas */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            📅 Próximas Consultas
          </h3>
          <button 
            onClick={() => onNavigate('appointments')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Ver todas
          </button>
        </div>
        
        <div className="space-y-3">
          {todayAppointments.slice(0, 5).map((appointment, index) => (
            <div 
              key={index}
              className={`${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'} border rounded-lg p-3`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    appointment.status === 'confirmado' ? 'bg-green-500' :
                    appointment.status === 'agendado' ? 'bg-blue-500' :
                    'bg-gray-400'
                  }`} />
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {appointment.patientName}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {appointment.doctorName} • {appointment.specialty}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {appointment.time}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {appointment.type}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {todayAppointments.length === 0 && (
            <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Nenhuma consulta agendada para hoje
            </p>
          )}
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          ⚡ Ações Rápidas
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button 
            onClick={() => onNavigate('checkin')}
            className={`${darkMode ? 'bg-blue-900/30 hover:bg-blue-900/50 text-blue-400' : 'bg-blue-100 hover:bg-blue-200 text-blue-700'} p-4 rounded-lg transition-colors text-center`}
          >
            <UserCheck className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Check-in</span>
          </button>
          
          <button 
            onClick={() => onNavigate('appointments')}
            className={`${darkMode ? 'bg-green-900/30 hover:bg-green-900/50 text-green-400' : 'bg-green-100 hover:bg-green-200 text-green-700'} p-4 rounded-lg transition-colors text-center`}
          >
            <Plus className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Nova Consulta</span>
          </button>
          
          <button 
            onClick={() => onNavigate('patients')}
            className={`${darkMode ? 'bg-purple-900/30 hover:bg-purple-900/50 text-purple-400' : 'bg-purple-100 hover:bg-purple-200 text-purple-700'} p-4 rounded-lg transition-colors text-center`}
          >
            <Users className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Novo Paciente</span>
          </button>
          
          <button 
            onClick={() => onNavigate('contacts')}
            className={`${darkMode ? 'bg-orange-900/30 hover:bg-orange-900/50 text-orange-400' : 'bg-orange-100 hover:bg-orange-200 text-orange-700'} p-4 rounded-lg transition-colors text-center`}
          >
            <Phone className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Contatos</span>
          </button>
        </div>
      </div>

      {/* Status da Fila */}
      {queue.length > 0 && (
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              ⏱️ Status da Fila
            </h3>
            <button 
              onClick={() => onNavigate('queue')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Gerenciar fila
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`${darkMode ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200'} border rounded-lg p-4 text-center`}>
              <Timer className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <p className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                {waitingPatients.length}
              </p>
              <p className={`text-sm ${darkMode ? 'text-yellow-400/80' : 'text-yellow-600/80'}`}>
                Aguardando
              </p>
            </div>
            
            <div className={`${darkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'} border rounded-lg p-4 text-center`}>
              <Activity className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              <p className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {inServicePatients.length}
              </p>
              <p className={`text-sm ${darkMode ? 'text-green-400/80' : 'text-green-600/80'}`}>
                Em Atendimento
              </p>
            </div>
            
            <div className={`${darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4 text-center`}>
              <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <p className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {queue.filter(p => p.status === 'completed').length}
              </p>
              <p className={`text-sm ${darkMode ? 'text-blue-400/80' : 'text-blue-600/80'}`}>
                Concluídos
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceptionDashboard;