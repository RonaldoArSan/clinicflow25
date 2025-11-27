import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal,
  Calendar,
  User,
  Stethoscope,
  FileText,
  UserCheck,
  CreditCard,
  Clock,
  ArrowUpDown,
  Grid,
  List,
  Download,
  Share2
} from 'lucide-react';
import { useSearch, type SearchResult, type SearchFilters, type SearchOptions } from '@/hooks/useSearch';

interface AdvancedSearchProps {
  darkMode?: boolean;
  onResultSelect?: (result: SearchResult) => void;
  defaultType?: string;
  showTypeFilters?: boolean;
  showAdvancedFilters?: boolean;
  showExportOptions?: boolean;
  className?: string;
}

export default function AdvancedSearch({ 
  darkMode = false,
  onResultSelect,
  defaultType,
  showTypeFilters = true,
  showAdvancedFilters = true,
  showExportOptions = true,
  className = ""
}: AdvancedSearchProps) {
  const { search, isSearching } = useSearch();
  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState<SearchFilters>({
    types: defaultType ? [defaultType] : undefined
  });
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'name'>('relevance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(20);

  // Buscar quando parâmetros mudarem
  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        setTotalResults(0);
        return;
      }

      const searchOptions: SearchOptions = {
        query,
        filters,
        limit: resultsPerPage * currentPage,
        sortBy,
        sortOrder
      };

      const searchResults = await search(searchOptions);
      setResults(searchResults);
      setTotalResults(searchResults.length);
    };

    const searchTimeout = setTimeout(performSearch, 300);
    return () => clearTimeout(searchTimeout);
  }, [query, filters, sortBy, sortOrder, currentPage, resultsPerPage, search]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'patient':
        return <User className="w-5 h-5 text-blue-500" />;
      case 'appointment':
        return <Calendar className="w-5 h-5 text-green-500" />;
      case 'doctor':
        return <UserCheck className="w-5 h-5 text-purple-500" />;
      case 'procedure':
        return <Stethoscope className="w-5 h-5 text-orange-500" />;
      case 'document':
        return <FileText className="w-5 h-5 text-gray-500" />;
      case 'health_plan':
        return <CreditCard className="w-5 h-5 text-indigo-500" />;
      default:
        return <Search className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      patient: 'Pacientes',
      appointment: 'Consultas',
      doctor: 'Médicos',
      procedure: 'Procedimentos',
      document: 'Documentos',
      health_plan: 'Convênios'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const handleExport = (format: 'csv' | 'pdf' | 'excel') => {
    console.log(`Exportando ${results.length} resultados para ${format.toUpperCase()}`);
    // Implementar lógica de exportação
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', query);
    url.searchParams.set('filters', JSON.stringify(filters));
    
    navigator.clipboard.writeText(url.toString());
    // Mostrar feedback de sucesso
  };

  const renderResult = (result: SearchResult) => {
    if (viewMode === 'grid') {
      return (
        <div
          key={result.id}
          onClick={() => onResultSelect?.(result)}
          className={`
            p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md
            ${darkMode 
              ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
            }
          `}
        >
          <div className="flex items-start gap-3 mb-3">
            {getTypeIcon(result.type)}
            <div className="flex-1">
              <h3 className={`font-medium truncate ${
                darkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>
                {result.title}
              </h3>
              <span className={`
                inline-block px-2 py-1 text-xs rounded-full mt-1
                ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}
              `}>
                {getTypeLabel(result.type)}
              </span>
            </div>
          </div>
          
          {result.subtitle && (
            <p className={`text-sm mb-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {result.subtitle}
            </p>
          )}
          
          {result.description && (
            <p className={`text-xs line-clamp-2 ${
              darkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>
              {result.description}
            </p>
          )}
        </div>
      );
    }

    return (
      <div
        key={result.id}
        onClick={() => onResultSelect?.(result)}
        className={`
          p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm
          ${darkMode 
            ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
            : 'bg-white border-gray-200 hover:bg-gray-50'
          }
        `}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            {getTypeIcon(result.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-medium truncate ${
                darkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>
                {result.title}
              </h3>
              <span className={`
                px-2 py-0.5 text-xs rounded-full flex-shrink-0
                ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}
              `}>
                {getTypeLabel(result.type)}
              </span>
            </div>
            
            {result.subtitle && (
              <p className={`text-sm mb-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {result.subtitle}
              </p>
            )}
            
            {result.description && (
              <p className={`text-sm ${
                darkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                {result.description}
              </p>
            )}
          </div>
          
          <div className="flex-shrink-0">
            <button className={`
              p-2 rounded transition-colors
              ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
            `}>
              <Clock className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Barra de Busca e Controles */}
      <div className="space-y-4">
        {/* Input Principal */}
        <div className="relative">
          <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${
            darkMode ? "text-gray-500" : "text-gray-400"
          }`} />
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite sua busca..."
            className={`
              w-full pl-10 pr-4 py-3 border rounded-lg text-base
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-colors
              ${darkMode 
                ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400" 
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }
            `}
          />
        </div>

        {/* Controles */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Filtros de Tipo */}
            {showTypeFilters && (
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'patient', label: 'Pacientes', icon: User },
                  { value: 'appointment', label: 'Consultas', icon: Calendar },
                  { value: 'doctor', label: 'Médicos', icon: UserCheck },
                  { value: 'procedure', label: 'Procedimentos', icon: Stethoscope }
                ].map(type => (
                  <button
                    key={type.value}
                    onClick={() => {
                      const types = filters.types || [];
                      const isSelected = types.includes(type.value);
                      
                      if (isSelected) {
                        setFilters(prev => ({
                          ...prev,
                          types: types.filter(t => t !== type.value)
                        }));
                      } else {
                        setFilters(prev => ({
                          ...prev,
                          types: [...types, type.value]
                        }));
                      }
                    }}
                    className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
                      ${filters.types?.includes(type.value)
                        ? 'bg-blue-600 text-white'
                        : darkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    <type.icon className="w-4 h-4" />
                    {type.label}
                  </button>
                ))}
              </div>
            )}

            {/* Filtros Avançados */}
            {showAdvancedFilters && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
                  ${showFilters
                    ? 'bg-blue-600 text-white'
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Ordenação */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder];
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
              className={`
                px-3 py-1.5 rounded-lg text-sm border
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-300'
                  : 'bg-white border-gray-300 text-gray-700'
                }
              `}
            >
              <option value="relevance-desc">Mais Relevantes</option>
              <option value="name-asc">Nome A-Z</option>
              <option value="name-desc">Nome Z-A</option>
              <option value="date-desc">Mais Recentes</option>
              <option value="date-asc">Mais Antigos</option>
            </select>

            {/* Modo de Visualização */}
            <div className="flex rounded-lg border overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`
                  p-1.5 transition-colors
                  ${viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`
                  p-1.5 transition-colors
                  ${viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>

            {/* Exportar */}
            {showExportOptions && results.length > 0 && (
              <div className="flex gap-1">
                <button
                  onClick={handleShare}
                  className={`
                    p-1.5 rounded transition-colors
                    ${darkMode 
                      ? 'hover:bg-gray-700 text-gray-400'
                      : 'hover:bg-gray-100 text-gray-600'
                    }
                  `}
                  title="Compartilhar busca"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className={`
                    p-1.5 rounded transition-colors
                    ${darkMode 
                      ? 'hover:bg-gray-700 text-gray-400'
                      : 'hover:bg-gray-100 text-gray-600'
                    }
                  `}
                  title="Exportar resultados"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filtros Avançados */}
      {showFilters && (
        <div className={`
          p-4 rounded-lg border
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}
        `}>
          {/* Implementar filtros avançados aqui */}
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Filtros avançados em desenvolvimento...
          </p>
        </div>
      )}

      {/* Resultados */}
      <div>
        {/* Header dos Resultados */}
        {query.trim() && (
          <div className={`mb-4 pb-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-lg font-semibold ${
                  darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Resultados da busca
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {isSearching ? 'Buscando...' : `${totalResults} resultado${totalResults !== 1 ? 's' : ''} encontrado${totalResults !== 1 ? 's' : ''} para "${query}"`}
                </p>
              </div>
              
              {query.trim() && (
                <button
                  onClick={() => {
                    setQuery('');
                    setResults([]);
                  }}
                  className={`
                    flex items-center gap-2 px-3 py-1 text-sm rounded transition-colors
                    ${darkMode 
                      ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <X className="w-4 h-4" />
                  Limpar
                </button>
              )}
            </div>
          </div>
        )}

        {/* Lista de Resultados */}
        {results.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-3'
          }>
            {results.map(renderResult)}
          </div>
        ) : query.trim() && !isSearching ? (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">Nenhum resultado encontrado</p>
            <p className="text-sm">Tente usar termos diferentes ou verificar a ortografia</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}