import React from 'react';
import { FileText, Upload, Search, Filter, Download, FolderOpen } from 'lucide-react';

interface MedicalRecordsLayoutProps {
  children: React.ReactNode;
  darkMode?: boolean;
  title?: string;
  totalRecords?: number;
  recentRecords?: number;
  pendingReviews?: number;
  onAddRecord?: () => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: any) => void;
}

const MedicalRecordsLayout: React.FC<MedicalRecordsLayoutProps> = ({ 
  children, 
  darkMode = false, 
  title = "Prontuários Médicos",
  totalRecords = 0,
  recentRecords = 0,
  pendingReviews = 0,
  onAddRecord,
  onSearch,
  onFilter
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <div className="space-y-6">
      {/* Header with Medical Records Stats */}
      <div className={`
        relative overflow-hidden rounded-2xl p-8
        ${darkMode 
          ? "bg-gradient-to-br from-teal-900/20 via-cyan-900/10 to-blue-900/20 border border-gray-700" 
          : "bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 border border-gray-200"
        }
      `}>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                {title}
              </h1>
              <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Gestão e acompanhamento de prontuários médicos
              </p>
            </div>
            
            <button
              onClick={onAddRecord}
              className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <FileText className="w-5 h-5" />
              <span>Novo Prontuário</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`
              p-4 rounded-xl
              ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"}
            `}>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${darkMode ? "bg-teal-900/30" : "bg-teal-100"}`}>
                  <FolderOpen className={`w-5 h-5 ${darkMode ? "text-teal-400" : "text-teal-600"}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {totalRecords}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Total de Prontuários
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
                  <FileText className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {recentRecords}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Atualizados Hoje
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
                  <Upload className={`w-5 h-5 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {pendingReviews}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Pendentes Revisão
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-20">
          <FileText className={`w-32 h-32 ${darkMode ? "text-teal-500/20" : "text-teal-300/50"}`} />
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
              placeholder="Buscar por paciente, diagnóstico, CID, médico..."
              className={`
                pl-10 pr-4 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors
                ${darkMode 
                  ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" 
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                }
              `}
            />
          </div>
          
          <select 
            className={`
              px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors
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
              px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors
              ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-900"}
            `}
          >
            <option>Todos os Períodos</option>
            <option>Última semana</option>
            <option>Último mês</option>
            <option>Últimos 3 meses</option>
            <option>Este ano</option>
          </select>
          
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
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
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

export default MedicalRecordsLayout;