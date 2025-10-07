import React from 'react';
import { BarChart3, TrendingUp, PieChart, Calendar, Download, Filter } from 'lucide-react';

interface AnalyticsLayoutProps {
  children: React.ReactNode;
  darkMode?: boolean;
  title?: string;
  totalRevenue?: number;
  monthlyGrowth?: number;
  reportsPeriod?: string;
  onGenerateReport?: () => void;
  onFilter?: (filters: any) => void;
}

const AnalyticsLayout: React.FC<AnalyticsLayoutProps> = ({ 
  children, 
  darkMode = false, 
  title = "Relatórios e Análises",
  totalRevenue = 0,
  monthlyGrowth = 0,
  reportsPeriod = "Últimos 30 dias",
  onGenerateReport,
  onFilter
}) => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<'week' | 'month' | 'quarter' | 'year'>('month');

  return (
    <div className="space-y-6">
      {/* Header with Analytics Overview */}
      <div className={`
        relative overflow-hidden rounded-2xl p-8
        ${darkMode 
          ? "bg-gradient-to-br from-violet-900/20 via-indigo-900/10 to-blue-900/20 border border-gray-700" 
          : "bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 border border-gray-200"
        }
      `}>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                {title}
              </h1>
              <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Análises detalhadas e relatórios gerenciais
              </p>
            </div>
            
            <button
              onClick={onGenerateReport}
              className="bg-violet-600 text-white px-6 py-3 rounded-xl hover:bg-violet-700 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>Gerar Relatório</span>
            </button>
          </div>

          {/* Analytics Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`
              p-4 rounded-xl
              ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"}
            `}>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${darkMode ? "bg-green-900/30" : "bg-green-100"}`}>
                  <TrendingUp className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    R$ {totalRevenue.toLocaleString()}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Receita Total
                  </div>
                </div>
              </div>
            </div>

            <div className={`
              p-4 rounded-xl
              ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"}
            `}>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${darkMode ? "bg-blue-900/30" : "bg-blue-100"}`}>
                  <BarChart3 className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    +{monthlyGrowth}%
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Crescimento Mensal
                  </div>
                </div>
              </div>
            </div>

            <div className={`
              p-4 rounded-xl
              ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"}
            `}>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${darkMode ? "bg-purple-900/30" : "bg-purple-100"}`}>
                  <Calendar className={`w-5 h-5 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                </div>
                <div>
                  <div className={`text-sm font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {reportsPeriod}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Período Analisado
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-20">
          <BarChart3 className={`w-32 h-32 ${darkMode ? "text-violet-500/20" : "text-violet-300/50"}`} />
        </div>
      </div>

      {/* Report Controls */}
      <div className={`
        p-6 rounded-xl border
        ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
      `}>
        <div className="flex items-center justify-between">
          {/* Period Selector */}
          <div className="flex items-center space-x-1">
            <span className={`text-sm font-medium mr-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Período:
            </span>
            {(['week', 'month', 'quarter', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`
                  px-4 py-2 rounded-lg transition-colors text-sm font-medium
                  ${selectedPeriod === period
                    ? darkMode 
                      ? "bg-violet-900/30 text-violet-400" 
                      : "bg-violet-100 text-violet-700"
                    : darkMode 
                      ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }
                `}
              >
                {period === 'week' ? 'Semana' : 
                 period === 'month' ? 'Mês' :
                 period === 'quarter' ? 'Trimestre' : 'Ano'}
              </button>
            ))}
          </div>

          {/* Report Type Filters */}
          <div className="flex items-center space-x-2">
            <select 
              className={`
                px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors text-sm
                ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-900"}
              `}
            >
              <option>Todos os Relatórios</option>
              <option>Financeiro</option>
              <option>Pacientes</option>
              <option>Consultas</option>
              <option>Produtividade</option>
            </select>
            
            <button
              onClick={() => onFilter?.({})}
              className={`
                p-2 border rounded-lg transition-colors
                ${darkMode 
                  ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" 
                  : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              <Filter className="w-5 h-5" />
            </button>
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

export default AnalyticsLayout;