import React from 'react';
import { Calendar, Star, Clock, RefreshCw, Download } from 'lucide-react';
import StatCard from './StatCard';

interface AnalyticsViewProps {
  darkMode?: boolean;
  analytics: {
    totalPatients: number;
    activePatients: number;
    patientSatisfaction: number;
    monthlyGrowth: {
      patients: number;
      satisfaction: number;
    };
    appointmentsBySpecialty: Record<string, number>;
  };
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ darkMode = false, analytics }) => {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Taxa de Ocupação"
          value="87"
          change={5}
          icon={Calendar}
          color="blue"
          suffix="%"
          darkMode={darkMode}
        />
        <StatCard
          title="Satisfação Pacientes"
          value={analytics.patientSatisfaction.toFixed(1)}
          change={analytics.monthlyGrowth.satisfaction}
          icon={Star}
          color="yellow"
          suffix="/5.0"
          darkMode={darkMode}
        />
        <StatCard
          title="Tempo Médio Consulta"
          value="28"
          icon={Clock}
          color="green"
          suffix=" min"
          darkMode={darkMode}
        />
        <StatCard
          title="Taxa de Retorno"
          value="73"
          change={3}
          icon={RefreshCw}
          color="purple"
          suffix="%"
          darkMode={darkMode}
        />
      </div>

      {/* Charts and Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments by Specialty */}
        <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
            Consultas por Especialidade (Este Mês)
          </h2>
          <div className="space-y-3">
            {Object.entries(analytics.appointmentsBySpecialty).map(([specialty, count]) => (
              <div key={specialty} className="flex items-center justify-between">
                <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {specialty}
                </span>
                <div className="flex items-center space-x-2">
                  <div className={`w-24 ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2`}>
                    <div
                      className="bg-blue-600 h-2 rounded-full"
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

        {/* Peak Hours */}
        <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
            Horários de Pico
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                08:00 - 10:00
              </span>
              <div className="flex items-center space-x-2">
                <div className={`w-20 ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2`}>
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "80%" }} />
                </div>
                <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                  16 consultas
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                10:00 - 12:00
              </span>
              <div className="flex items-center space-x-2">
                <div className={`w-20 ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2`}>
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "65%" }} />
                </div>
                <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                  13 consultas
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                14:00 - 16:00
              </span>
              <div className="flex items-center space-x-2">
                <div className={`w-20 ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2`}>
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "90%" }} />
                </div>
                <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                  18 consultas
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                16:00 - 18:00
              </span>
              <div className="flex items-center space-x-2">
                <div className={`w-20 ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2`}>
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: "55%" }} />
                </div>
                <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                  11 consultas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Indicators */}
      <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
          Indicadores de Qualidade
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`${darkMode ? "bg-green-900/20 border border-green-800/30" : "bg-green-50"} p-4 rounded-lg`}>
            <h3 className={`font-medium ${darkMode ? "text-green-300" : "text-green-900"}`}>
              Pontualidade
            </h3>
            <p className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
              92%
            </p>
            <p className={`text-sm ${darkMode ? "text-green-400/80" : "text-green-600"}`}>
              Consultas no horário
            </p>
          </div>
          <div className={`${darkMode ? "bg-blue-900/20 border border-blue-800/30" : "bg-blue-50"} p-4 rounded-lg`}>
            <h3 className={`font-medium ${darkMode ? "text-blue-300" : "text-blue-900"}`}>
              Absenteísmo
            </h3>
            <p className={`text-2xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
              8%
            </p>
            <p className={`text-sm ${darkMode ? "text-blue-400/80" : "text-blue-600"}`}>
              Faltas não justificadas
            </p>
          </div>
          <div className={`${darkMode ? "bg-purple-900/20 border border-purple-800/30" : "bg-purple-50"} p-4 rounded-lg`}>
            <h3 className={`font-medium ${darkMode ? "text-purple-300" : "text-purple-900"}`}>
              Recomendação
            </h3>
            <p className={`text-2xl font-bold ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
              96%
            </p>
            <p className={`text-sm ${darkMode ? "text-purple-400/80" : "text-purple-600"}`}>
              Pacientes recomendariam
            </p>
          </div>
          <div className={`${darkMode ? "bg-yellow-900/20 border border-yellow-800/30" : "bg-yellow-50"} p-4 rounded-lg`}>
            <h3 className={`font-medium ${darkMode ? "text-yellow-300" : "text-yellow-900"}`}>
              Tempo de Espera
            </h3>
            <p className={`text-2xl font-bold ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}>
              12 min
            </p>
            <p className={`text-sm ${darkMode ? "text-yellow-400/80" : "text-yellow-600"}`}>
              Tempo médio
            </p>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
          Exportar Relatórios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <Download className="w-5 h-5 text-blue-600" />
            <span className="text-blue-600">Relatório Mensal</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <Download className="w-5 h-5 text-green-600" />
            <span className="text-green-600">Análise Financeira</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <Download className="w-5 h-5 text-purple-600" />
            <span className="text-purple-600">Métricas de Qualidade</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;