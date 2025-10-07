import React from 'react';
import { Calendar, Users, FileText, Star, TrendingUp } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  darkMode?: boolean;
  title?: string;
  subtitle?: string;
  analytics?: {
    activePatients: number;
    todayAppointments: number;
    monthRevenue: number;
    patientSatisfaction: number;
  };
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  darkMode = false, 
  title = "Dashboard Clínico",
  subtitle = "Visão geral das atividades da clínica",
  analytics
}) => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className={`
        relative overflow-hidden rounded-2xl p-8
        ${darkMode 
          ? "bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-teal-900/20 border border-gray-700" 
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 border border-gray-200"
        }
      `}>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                {title}
              </h1>
              <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {subtitle}
              </p>
            </div>
            
            {/* Quick Stats */}
            {analytics && (
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                    {analytics.activePatients}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Pacientes Ativos
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                    {analytics.todayAppointments}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Consultas Hoje
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
                    {analytics.patientSatisfaction}%
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Satisfação
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-20">
          <div className={`w-32 h-32 rounded-full ${darkMode ? "bg-blue-500/10" : "bg-blue-200/50"}`} />
        </div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 opacity-20">
          <div className={`w-24 h-24 rounded-full ${darkMode ? "bg-purple-500/10" : "bg-purple-200/50"}`} />
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;