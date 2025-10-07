import React from 'react';
import { FileText, Upload, Search, Filter, Download, FolderOpen, File } from 'lucide-react';

interface DocumentsLayoutProps {
  children: React.ReactNode;
  darkMode?: boolean;
  title?: string;
  totalDocuments?: number;
  recentUploads?: number;
  pendingReviews?: number;
  onUploadDocument?: () => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: any) => void;
}

const DocumentsLayout: React.FC<DocumentsLayoutProps> = ({ 
  children, 
  darkMode = false, 
  title = "Documentos Médicos",
  totalDocuments = 0,
  recentUploads = 0,
  pendingReviews = 0,
  onUploadDocument,
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
      {/* Header with Documents Stats */}
      <div className={`
        relative overflow-hidden rounded-2xl p-8
        ${darkMode 
          ? "bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-red-900/20 border border-gray-700" 
          : "bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border border-gray-200"
        }
      `}>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                {title}
              </h1>
              <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Gestão e arquivo de documentos médicos
              </p>
            </div>
            
            <button
              onClick={onUploadDocument}
              className="bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Documento</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`
              p-4 rounded-xl
              ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"}
            `}>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${darkMode ? "bg-amber-900/30" : "bg-amber-100"}`}>
                  <FolderOpen className={`w-5 h-5 ${darkMode ? "text-amber-400" : "text-amber-600"}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {totalDocuments}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Total de Documentos
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
                  <Upload className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {recentUploads}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Uploads Hoje
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
                  <File className={`w-5 h-5 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
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
          <FileText className={`w-32 h-32 ${darkMode ? "text-amber-500/20" : "text-amber-300/50"}`} />
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
              placeholder="Buscar por nome, tipo, paciente, data..."
              className={`
                pl-10 pr-4 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors
                ${darkMode 
                  ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" 
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                }
              `}
            />
          </div>
          
          <select 
            className={`
              px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors
              ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-900"}
            `}
          >
            <option>Todos os Tipos</option>
            <option>Exames</option>
            <option>Receitas</option>
            <option>Laudos</option>
            <option>Atestados</option>
            <option>Relatórios</option>
          </select>
          
          <select 
            className={`
              px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors
              ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-900"}
            `}
          >
            <option>Todos os Pacientes</option>
            <option>João Silva</option>
            <option>Maria Santos</option>
            <option>Pedro Costa</option>
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
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
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

export default DocumentsLayout;