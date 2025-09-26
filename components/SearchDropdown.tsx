import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Filter, 
  Clock, 
  Trash2,
  Calendar,
  User,
  Stethoscope,
  FileText,
  UserCheck,
  CreditCard,
  ChevronDown,
  Loader2,
  ArrowRight,
  History
} from 'lucide-react';
import { useSearch, type SearchResult, type SearchFilters } from '@/hooks/useSearch';

interface SearchDropdownProps {
  darkMode?: boolean;
  placeholder?: string;
  onResultSelect?: (result: SearchResult) => void;
  className?: string;
}

export default function SearchDropdown({ 
  darkMode = false, 
  placeholder = "Buscar pacientes, consultas, médicos...",
  onResultSelect,
  className = ""
}: SearchDropdownProps) {
  const {
    search,
    quickSearch,
    isSearching,
    recentSearches,
    getSearchSuggestions,
    removeFromHistory,
    clearSearchHistory
  } = useSearch();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Busca automática quando query muda
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.trim()) {
        const searchResults = await search({ 
          query, 
          filters, 
          limit: 10 
        });
        setResults(searchResults);
        setSuggestions([]);
      } else {
        setResults([]);
        setSuggestions(getSearchSuggestions(''));
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query, filters, search, getSearchSuggestions]);

  // Sugestões quando foco no input
  useEffect(() => {
    if (isOpen && !query.trim()) {
      setSuggestions(getSearchSuggestions(''));
    } else if (query.trim()) {
      setSuggestions(getSearchSuggestions(query));
    }
  }, [query, isOpen, getSearchSuggestions]);

  // Fechar dropdown quando clica fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      const items = [...suggestions, ...results];
      const maxIndex = items.length - 1;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, maxIndex));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, -1));
          break;
        case 'Enter':
          event.preventDefault();
          if (selectedIndex >= 0) {
            if (selectedIndex < suggestions.length) {
              // Selecionou uma sugestão
              const suggestion = suggestions[selectedIndex];
              setQuery(suggestion);
              inputRef.current?.focus();
            } else {
              // Selecionou um resultado
              const result = results[selectedIndex - suggestions.length];
              handleResultSelect(result);
            }
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, suggestions, results]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'patient':
        return <User className="w-4 h-4 text-blue-500" />;
      case 'appointment':
        return <Calendar className="w-4 h-4 text-green-500" />;
      case 'doctor':
        return <UserCheck className="w-4 h-4 text-purple-500" />;
      case 'procedure':
        return <Stethoscope className="w-4 h-4 text-orange-500" />;
      case 'document':
        return <FileText className="w-4 h-4 text-gray-500" />;
      case 'health_plan':
        return <CreditCard className="w-4 h-4 text-indigo-500" />;
      default:
        return <Search className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      patient: 'Paciente',
      appointment: 'Consulta',
      doctor: 'Médico',
      procedure: 'Procedimento',
      document: 'Documento',
      health_plan: 'Convênio'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const handleResultSelect = (result: SearchResult) => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(-1);
    onResultSelect?.(result);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  };

  const highlightText = (text: string, highlights: string[] = []) => {
    if (!highlights.length) return text;
    
    let highlightedText = text;
    highlights.forEach(highlight => {
      const regex = new RegExp(`(${highlight})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>');
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Input de Busca */}
      <div className={`
        relative flex items-center
        ${darkMode ? 'bg-gray-700' : 'bg-white'}
      `}>
        <Search className={`w-4 h-4 absolute left-3 z-10 ${
          darkMode ? "text-gray-500" : "text-gray-400"
        }`} />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-12 py-2 border rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-colors text-sm
            ${darkMode 
              ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" 
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }
          `}
        />

        <div className="absolute right-2 flex items-center gap-1">
          {isSearching && (
            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
          )}
          
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setResults([]);
                inputRef.current?.focus();
              }}
              className={`p-1 rounded transition-colors ${
                darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
              }`}
            >
              <X className="w-3 h-3" />
            </button>
          )}
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-1 rounded transition-colors ${
              darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
            } ${showFilters ? (darkMode ? 'bg-gray-600' : 'bg-gray-100') : ''}`}
          >
            <Filter className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className={`
          absolute top-full left-0 right-0 mt-1 p-4 rounded-lg border shadow-lg z-50
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="space-y-3">
            <div>
              <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Tipo de Conteúdo
              </label>
              <div className="mt-1 flex flex-wrap gap-2">
                {[
                  { value: 'patient', label: 'Pacientes' },
                  { value: 'appointment', label: 'Consultas' },
                  { value: 'doctor', label: 'Médicos' },
                  { value: 'procedure', label: 'Procedimentos' },
                  { value: 'document', label: 'Documentos' }
                ].map(type => (
                  <label key={type.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.types?.includes(type.value) || false}
                      onChange={(e) => {
                        const types = filters.types || [];
                        if (e.target.checked) {
                          setFilters(prev => ({
                            ...prev,
                            types: [...types, type.value]
                          }));
                        } else {
                          setFilters(prev => ({
                            ...prev,
                            types: types.filter(t => t !== type.value)
                          }));
                        }
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setFilters({})}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Limpar
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dropdown de Resultados */}
      {isOpen && (
        <div className={`
          absolute top-full left-0 right-0 mt-1 max-h-96 overflow-y-auto rounded-lg border shadow-lg z-40
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          {/* Sugestões de Busca */}
          {!query.trim() && suggestions.length > 0 && (
            <div className="p-2">
              <div className={`flex items-center gap-2 px-2 py-1 text-xs font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <History className="w-3 h-3" />
                Buscas Recentes
                {suggestions.length > 0 && (
                  <button
                    onClick={clearSearchHistory}
                    className={`ml-auto text-xs hover:underline ${
                      darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    Limpar
                  </button>
                )}
              </div>
              
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 text-left rounded transition-colors
                    ${selectedIndex === index 
                      ? (darkMode ? 'bg-gray-700' : 'bg-gray-100')
                      : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50')
                    }
                  `}
                >
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className={`flex-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {suggestion}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromHistory(suggestion);
                    }}
                    className={`p-1 rounded transition-colors ${
                      darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                    }`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </button>
              ))}
            </div>
          )}

          {/* Resultados da Busca */}
          {results.length > 0 && (
            <div className="p-2">
              {query.trim() && (
                <div className={`px-2 py-1 text-xs font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                </div>
              )}
              
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultSelect(result)}
                  className={`
                    w-full flex items-start gap-3 px-3 py-3 text-left rounded transition-colors
                    ${selectedIndex === suggestions.length + index 
                      ? (darkMode ? 'bg-gray-700' : 'bg-gray-100')
                      : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50')
                    }
                  `}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getTypeIcon(result.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium truncate ${
                        darkMode ? 'text-gray-200' : 'text-gray-900'
                      }`}>
                        {result.highlight ? 
                          highlightText(result.title, result.highlight) : 
                          result.title
                        }
                      </h4>
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
                      <p className={`text-xs truncate ${
                        darkMode ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        {result.description}
                      </p>
                    )}
                  </div>
                  
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                </button>
              ))}
            </div>
          )}

          {/* Estado vazio */}
          {query.trim() && results.length === 0 && !isSearching && (
            <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Nenhum resultado encontrado para "{query}"</p>
              <p className="text-xs mt-1">Tente usar termos diferentes ou verifique a ortografia</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}