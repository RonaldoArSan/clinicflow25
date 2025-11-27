import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, Clock, Star } from 'lucide-react';
import AdvancedSearch from './AdvancedSearch';
import type { SearchResult } from '../hooks/useSearch';

interface SearchViewProps {
  darkMode?: boolean;
}

export default function SearchView({ darkMode: propDarkMode }: SearchViewProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Se receber via props, usar
    if (propDarkMode !== undefined) {
      setDarkMode(propDarkMode);
    } else {
      // Caso contrário, verificar localStorage
      const saved = localStorage.getItem('darkMode');
      if (saved) {
        setDarkMode(JSON.parse(saved));
      }
    }
    
    // Escutar mudanças no localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'darkMode' && e.newValue) {
        setDarkMode(JSON.parse(e.newValue));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [propDarkMode]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

  const popularSearches = [
    'Maria Santos',
    'Consulta cardiologia',
    'Dr. Carlos Silva',
    'Hemograma',
    'Agendamentos hoje',
    'Pacientes ativos',
    'Relatório mensal',
    'Procedimentos'
  ];

  const recentSearches = [
    { query: 'João Pedro', time: '2 min atrás', results: 3 },
    { query: 'Consulta urgente', time: '5 min atrás', results: 7 },
    { query: 'Dr. Ana Costa', time: '1 hora atrás', results: 1 },
    { query: 'Eletrocardiograma', time: '2 horas atrás', results: 12 }
  ];

  const searchTips = [
    {
      title: 'Use palavras-chave específicas',
      description: 'Para encontrar um paciente, use o nome completo ou CPF',
      example: 'Maria Santos Silva ou 123.456.789-01'
    },
    {
      title: 'Filtre por tipo de conteúdo',
      description: 'Use os filtros para buscar apenas pacientes, consultas, etc.',
      example: 'Clique nos botões de tipo acima da busca'
    },
    {
      title: 'Busque por data',
      description: 'Para consultas, use termos como "hoje", "amanhã" ou datas específicas',
      example: 'consultas hoje ou 2024-02-01'
    },
    {
      title: 'Combine termos',
      description: 'Use múltiplas palavras para refinar a busca',
      example: 'cardiologia Dr. Silva'
    }
  ];

  const handleResultSelect = (result: SearchResult) => {
    setSelectedResult(result);
    console.log('Resultado selecionado:', result);
    
    // Aqui você pode implementar a navegação baseada no tipo
    switch (result.type) {
      case 'patient':
        console.log('Navegar para página do paciente:', result.data);
        break;
      case 'appointment':
        console.log('Navegar para página da consulta:', result.data);
        break;
      case 'doctor':
        console.log('Navegar para página do médico:', result.data);
        break;
      case 'procedure':
        console.log('Navegar para página do procedimento:', result.data);
        break;
      case 'document':
        console.log('Abrir documento:', result.data);
        break;
      default:
        console.log('Tipo não reconhecido:', result.type);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className={`
            p-3 rounded-full
            ${darkMode ? 'bg-blue-900/20' : 'bg-blue-100'}
          `}>
            <Search className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className={`text-3xl font-bold mb-2 ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Busca Avançada
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Encontre rapidamente pacientes, consultas, médicos e muito mais
        </p>
      </div>

      {/* Componente de Busca Principal */}
      <div className={`
        p-6 rounded-xl border
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      `}>
        <AdvancedSearch
          darkMode={darkMode}
          onResultSelect={handleResultSelect}
          showTypeFilters={true}
          showAdvancedFilters={true}
          showExportOptions={true}
        />
      </div>

      {/* Seção de Ajuda e Sugestões */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Buscas Populares */}
        <div className={`
          p-6 rounded-lg border
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
              Buscas Populares
            </h3>
          </div>
          
          <div className="space-y-2">
            {popularSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => {
                  // Implementar busca automática
                  console.log('Busca popular:', search);
                }}
                className={`
                  w-full text-left p-2 rounded transition-colors
                  ${darkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-700'
                  }
                `}
              >
                <span className="text-sm">{search}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Buscas Recentes */}
        <div className={`
          p-6 rounded-lg border
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-500" />
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
              Buscas Recentes
            </h3>
          </div>
          
          <div className="space-y-3">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => {
                  console.log('Busca recente:', search.query);
                }}
                className={`
                  w-full text-left p-2 rounded transition-colors
                  ${darkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
                  }
                `}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`font-medium text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {search.query}
                    </p>
                    <p className={`text-xs ${
                      darkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {search.results} resultado{search.results !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <span className={`text-xs ${
                    darkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {search.time}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dicas de Busca */}
        <div className={`
          p-6 rounded-lg border
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500" />
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
              Dicas de Busca
            </h3>
          </div>
          
          <div className="space-y-4">
            {searchTips.map((tip, index) => (
              <div key={index} className="space-y-1">
                <h4 className={`font-medium text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {tip.title}
                </h4>
                <p className={`text-xs ${
                  darkMode ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  {tip.description}
                </p>
                {tip.example && (
                  <code className={`
                    text-xs px-2 py-1 rounded
                    ${darkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-600'}
                  `}>
                    {tip.example}
                  </code>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total de Pacientes', value: '1.234', change: '+12%' },
          { label: 'Consultas Hoje', value: '28', change: '+5%' },
          { label: 'Médicos Ativos', value: '15', change: '0%' },
          { label: 'Documentos', value: '456', change: '+8%' }
        ].map((stat, index) => (
          <div
            key={index}
            className={`
              p-4 rounded-lg border text-center
              ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
            `}
          >
            <div className={`text-2xl font-bold mb-1 ${
              darkMode ? 'text-gray-200' : 'text-gray-900'
            }`}>
              {stat.value}
            </div>
            <div className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {stat.label}
            </div>
            <div className="text-xs text-green-500 mt-1">
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Resultado Selecionado */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`
            w-full max-w-lg rounded-lg shadow-xl
            ${darkMode ? 'bg-gray-800' : 'bg-white'}
          `}>
            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-lg font-semibold ${
                darkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>
                Resultado Selecionado
              </h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-3">
                <div>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Tipo:
                  </span>
                  <span className={`ml-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {selectedResult.type}
                  </span>
                </div>
                
                <div>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Título:
                  </span>
                  <span className={`ml-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {selectedResult.title}
                  </span>
                </div>
                
                {selectedResult.subtitle && (
                  <div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Subtítulo:
                    </span>
                    <span className={`ml-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {selectedResult.subtitle}
                    </span>
                  </div>
                )}
                
                {selectedResult.description && (
                  <div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Descrição:
                    </span>
                    <span className={`ml-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {selectedResult.description}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-end gap-2`}>
              <button
                onClick={() => setSelectedResult(null)}
                className={`
                  px-4 py-2 rounded transition-colors
                  ${darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                `}
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  // Implementar ação específica
                  console.log('Ação para:', selectedResult);
                  setSelectedResult(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Abrir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}