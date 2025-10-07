import React from 'react';
import { Calendar, Clock, Plus, Users, CheckCircle, AlertCircle } from 'lucide-react';

interface AppointmentsLayoutProps {
  children: React.ReactNode;
  darkMode?: boolean;
  title?: string;
  todayAppointments?: number;
  pendingAppointments?: number;
  completedToday?: number;
  onAddAppointment?: () => void;
  onFilter?: (filters: any) => void;
}

const AppointmentsLayout: React.FC<AppointmentsLayoutProps> = ({ 
  children, 
  darkMode = false, 
  title = "Agenda de Consultas",
  todayAppointments = 0,
  pendingAppointments = 0,
  completedToday = 0,
  onAddAppointment,
  onFilter
}) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const [selectedView, setSelectedView] = React.useState<'day' | 'week' | 'month'>('day');

  return (
    <div className="space-y-6">
      {/* Header with Calendar Stats */}
      <div className={`
        relative overflow-hidden rounded-2xl p-8
        ${darkMode 
          ? "bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-pink-900/20 border border-gray-700" 
          : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-gray-200"
        }
      `}>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                {title}
              </h1>
              <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {formattedDate}
              </p>
            </div>
            
            <button
              onClick={onAddAppointment}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Nova Consulta</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`
              p-4 rounded-xl
              ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"}
            `}>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${darkMode ? "bg-blue-900/30" : "bg-blue-100"}`}>
                  <Calendar className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {todayAppointments}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Consultas Hoje
                  </div>
                </div>
              </div>
            </div>

            <div className={`
              p-4 rounded-xl
              ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"}
            `}>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${darkMode ? "bg-orange-900/30" : "bg-orange-100"}`}>
                  <Clock className={`w-5 h-5 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {pendingAppointments}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Pendentes
                  </div>
                </div>
              </div>
            </div>

            <div className={`
              p-4 rounded-xl
              ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"}
            `}>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${darkMode ? "bg-green-900/30" : "bg-green-100"}`}>
                  <CheckCircle className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {completedToday}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Concluídas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-20">
          <Calendar className={`w-32 h-32 ${darkMode ? "text-indigo-500/20" : "text-indigo-300/50"}`} />
        </div>
      </div>

      {/* View Controls and Filters */}
      <div className={`
        p-6 rounded-xl border
        ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
      `}>
        <div className="flex items-center justify-between">
          {/* View Selector */}
          <div className="flex items-center space-x-1">
            {(['day', 'week', 'month'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`
                  px-4 py-2 rounded-lg transition-colors text-sm font-medium
                  ${selectedView === view
                    ? darkMode 
                      ? "bg-indigo-900/30 text-indigo-400" 
                      : "bg-indigo-100 text-indigo-700"
                    : darkMode 
                      ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }
                `}
              >
                {view === 'day' ? 'Dia' : view === 'week' ? 'Semana' : 'Mês'}
              </button>
            ))}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center space-x-2">
            <select 
              className={`
                px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm
                ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-900"}
              `}
            >
              <option>Todos os Médicos</option>
              <option>Dr. João Silva</option>
              <option>Dra. Maria Santos</option>
              <option>Dr. Pedro Costa</option>
            </select>
            
            <select 
              className={`
                px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm
                ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-900"}
              `}
            >
              <option>Todos os Status</option>
              <option>Agendado</option>
              <option>Confirmado</option>
              <option>Em Andamento</option>
              <option>Concluído</option>
              <option>Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default AppointmentsLayout;