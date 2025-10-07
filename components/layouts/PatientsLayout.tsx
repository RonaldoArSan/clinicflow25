import React from 'react';
import { Users, UserPlus, Search, Filter, Download } from 'lucide-react';

interface PatientsLayoutProps {
  children: React.ReactNode;
  darkMode?: boolean;
  title?: string;
  totalPatients?: number;
  activePatients?: number;
  newPatientsThisMonth?: number;
  onSearch?: (query: string) => void;
  onFilter?: (filters: any) => void;
  onAddPatient?: () => void;
}

const PatientsLayout: React.FC<PatientsLayoutProps> = ({ 
  children, 
  darkMode = false, 
  title = "Gestão de Pacientes",
  totalPatients = 0,
  activePatients = 0,
  newPatientsThisMonth = 0,
  onSearch,
  onFilter,
  onAddPatient
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <div className="space-y-6">
      {/* Header with Patient Stats */}
      <div className={`
        relative overflow-hidden rounded-2xl p-8
        ${darkMode 
          ? "bg-gradient-to-br from-emerald-900/20 via-blue-900/10 to-teal-900/20 border border-gray-700" 
          : "bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 border border-gray-200"
        }
      `}>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                {title}
              </h1>
              <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Cadastro e acompanhamento de pacientes
              </p>
            </div>
            
            <button
              onClick={onAddPatient}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <UserPlus className="w-5 h-5" />
              <span>Novo Paciente</span>
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
                  <Users className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {totalPatients}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Total de Pacientes
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
                  <Users className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {activePatients}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Pacientes Ativos
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
                  <UserPlus className={`w-5 h-5 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {newPatientsThisMonth}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Novos este Mês
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-20">
          <Users className={`w-32 h-32 ${darkMode ? "text-emerald-500/20" : "text-emerald-300/50"}`} />
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className={`
        p-6 rounded-xl border
        ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
      `}>
        <form onSubmit={handleSearch} className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome, CPF, telefone ou e-mail..."
              className={`
                pl-10 pr-4 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors
                ${darkMode 
                  ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" 
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                }
              `}
            />
          </div>
          
          <button
            type="button"
            onClick={() => onFilter?.({})}
            className={`
              p-3 border rounded-lg transition-colors
              ${darkMode 
                ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" 
                : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            <Filter className="w-5 h-5" />
          </button>
          
          <button
            type="button"
            className={`
              p-3 border rounded-lg transition-colors
              ${darkMode 
                ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" 
                : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            <Download className="w-5 h-5" />
          </button>
          
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default PatientsLayout;