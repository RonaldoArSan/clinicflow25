import React from 'react';
import { Users, Calendar, DollarSign, Star, User, Bell } from 'lucide-react';
import StatCard from './StatCard';
import { useSimpleNotifications } from '@/hooks/useSimpleNotifications';

interface DashboardProps {
  darkMode?: boolean;
  analytics: {
    activePatients: number;
    todayAppointments: number;
    monthRevenue: number;
    patientSatisfaction: number;
    monthlyGrowth: {
      patients: number;
      appointments: number;
      revenue: number;
      satisfaction: number;
    };
    appointmentsBySpecialty: Record<string, number>;
  };
  appointments: any[];
  patients: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ darkMode = false, analytics, appointments, patients }) => {
  const { createNotification } = useSimpleNotifications();

  const testNotification = () => {
    createNotification({
      title: 'Nova Consulta Agendada',
      message: `Consulta com Dr. Silva marcada para ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
      type: 'appointment',
      priority: 'normal'
    });
  };
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
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pacientes Ativos"
          value={analytics.activePatients.toLocaleString()}
          change={analytics.monthlyGrowth.patients}
          icon={Users}
          color="blue"
          darkMode={darkMode}
        />
        <StatCard
          title="Consultas Hoje"
          value={analytics.todayAppointments}
          icon={Calendar}
          color="green"
          darkMode={darkMode}
        />
        <StatCard
          title="Receita Mensal"
          value={analytics.monthRevenue.toLocaleString()}
          change={analytics.monthlyGrowth.revenue}
          icon={DollarSign}
          color="purple"
          prefix="R$ "
          darkMode={darkMode}
        />
        <StatCard
          title="Satisfação"
          value={analytics.patientSatisfaction.toFixed(1)}
          change={analytics.monthlyGrowth.satisfaction}
          icon={Star}
          color="yellow"
          suffix="/5.0"
          darkMode={darkMode}
        />
      </div>

      {/* Botão de Teste de Notificação */}
      <div className="flex justify-center">
        
      </div>

      {/* Today's Appointments and Recent Patients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
            Consultas de Hoje
          </h2>
          <div className="space-y-3">
            {appointments.filter((apt) => apt.date === "2024-02-01").map((appointment) => (
              <div 
                key={appointment.id} 
                className={`flex items-center justify-between p-3 ${darkMode ? "bg-gray-700" : "bg-gray-50"} rounded-lg transition-colors`}
              >
                <div>
                  <h4 className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                    {appointment.patientName}
                  </h4>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {appointment.time} - {appointment.type}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {appointment.doctorName}
                  </p>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Patients */}
        <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
            Pacientes Recentes
          </h2>
          <div className="space-y-3">
            {patients.slice(0, 3).map((patient) => (
              <div 
                key={patient.id} 
                className={`flex items-center space-x-4 p-3 ${darkMode ? "bg-gray-700" : "bg-gray-50"} rounded-lg transition-colors`}
              >
                <div className="flex-shrink-0">
                  <User className={`w-8 h-8 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                    {patient.name}
                  </h4>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {patient.healthPlan}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {patient.lastVisit}
                  </p>
                  {patient.chronicConditions.length > 0 && (
                    <span className={`text-xs ${darkMode ? "text-red-400" : "text-red-600"}`}>
                      ● Acompanhamento
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments by Specialty and Weekly Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments by Specialty */}
        <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
            Consultas por Especialidade
          </h2>
          <div className="space-y-3">
            {Object.entries(analytics.appointmentsBySpecialty).map(([specialty, count]) => (
              <div key={specialty} className="flex items-center justify-between">
                <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {specialty}
                </span>
                <div className="flex items-center space-x-2">
                  <div className={`w-20 ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2`}>
                    <div
                      className={`${darkMode ? "bg-blue-500" : "bg-blue-600"} h-2 rounded-full`}
                      style={{ width: `${(count / 50) * 100}%` }}
                    />
                  </div>
                  <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Metrics */}
        <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
            Métricas da Semana
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className={`${darkMode ? "bg-blue-900/20 border border-blue-800/30" : "bg-blue-50"} p-4 rounded-lg`}>
              <h3 className={`font-medium ${darkMode ? "text-blue-300" : "text-blue-900"}`}>
                Consultas
              </h3>
              <p className={`text-2xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                89
              </p>
              <p className={`text-sm ${darkMode ? "text-blue-400/80" : "text-blue-600"}`}>
                Esta semana
              </p>
            </div>
            <div className={`${darkMode ? "bg-green-900/20 border border-green-800/30" : "bg-green-50"} p-4 rounded-lg`}>
              <h3 className={`font-medium ${darkMode ? "text-green-300" : "text-green-900"}`}>
                Receita
              </h3>
              <p className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                R$ 2.800
              </p>
              <p className={`text-sm ${darkMode ? "text-green-400/80" : "text-green-600"}`}>
                Hoje
              </p>
            </div>
            <div className={`${darkMode ? "bg-purple-900/20 border border-purple-800/30" : "bg-purple-50"} p-4 rounded-lg`}>
              <h3 className={`font-medium ${darkMode ? "text-purple-300" : "text-purple-900"}`}>
                Valor Médio
              </h3>
              <p className={`text-2xl font-bold ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
                R$ 220
              </p>
              <p className={`text-sm ${darkMode ? "text-purple-400/80" : "text-purple-600"}`}>
                Por consulta
              </p>
            </div>
            <div className={`${darkMode ? "bg-yellow-900/20 border border-yellow-800/30" : "bg-yellow-50"} p-4 rounded-lg`}>
              <h3 className={`font-medium ${darkMode ? "text-yellow-300" : "text-yellow-900"}`}>
                Novos Pacientes
              </h3>
              <p className={`text-2xl font-bold ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}>
                23
              </p>
              <p className={`text-sm ${darkMode ? "text-yellow-400/80" : "text-yellow-600"}`}>
                Este mês
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;