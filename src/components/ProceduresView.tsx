import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, DollarSign, Clock, FileText, X, Stethoscope } from 'lucide-react';
import { Procedure } from '../types';

interface ProceduresViewProps {
  darkMode?: boolean;
  procedures: Procedure[];
  selectedProcedure: Procedure | null;
  setSelectedProcedure: (procedure: Procedure | null) => void;
  showNewProcedureModal?: boolean;
  setShowNewProcedureModal?: (show: boolean) => void;
}

const ProceduresView: React.FC<ProceduresViewProps> = ({ 
  darkMode = false, 
  procedures, 
  selectedProcedure, 
  setSelectedProcedure,
  showNewProcedureModal = false,
  setShowNewProcedureModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Categorias únicas dos procedimentos
  const categories = Array.from(new Set(procedures.map(proc => proc.category)));

  // Filtrar procedimentos
  const filteredProcedures = procedures.filter(procedure => {
    const matchesSearch = procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procedure.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procedure.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || procedure.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    if (darkMode) {
      switch (category) {
        case "Consultas":
          return "text-blue-400 bg-blue-900/30";
        case "Exames":
          return "text-green-400 bg-green-900/30";
        case "Cirurgias":
          return "text-red-400 bg-red-900/30";
        case "Tratamentos":
          return "text-purple-400 bg-purple-900/30";
        default:
          return "text-gray-400 bg-gray-700/30";
      }
    } else {
      switch (category) {
        case "Consultas":
          return "text-blue-600 bg-blue-50";
        case "Exames":
          return "text-green-600 bg-green-50";
        case "Cirurgias":
          return "text-red-600 bg-red-50";
        case "Tratamentos":
          return "text-purple-600 bg-purple-50";
        default:
          return "text-gray-600 bg-gray-50";
      }
    }
  };

  return (
    <div className={`space-y-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Procedimentos</h1>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Gerencie procedimentos médicos, preços e códigos
          </p>
        </div>
       </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6 border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Stethoscope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total de Procedimentos</p>
              <p className="text-2xl font-semibold">{procedures.length}</p>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6 border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Consultas</p>
              <p className="text-2xl font-semibold">
                {procedures.filter(proc => proc.category === 'Consultas').length}
              </p>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6 border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Exames</p>
              <p className="text-2xl font-semibold">
                {procedures.filter(proc => proc.category === 'Exames').length}
              </p>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6 border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Clock className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Valor Médio</p>
              <p className="text-2xl font-semibold">
                R$ {Math.round(procedures.reduce((acc, proc) => acc + proc.price, 0) / procedures.length || 0).toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6 border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"}`} size={20} />
              <input
                type="text"
                placeholder="Buscar por nome, código ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? "bg-gray-700 border-gray-600 text-white" 
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="">Todas as Categorias</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button className={`p-2 rounded-lg transition-colors ${
            darkMode 
              ? "hover:bg-gray-700 text-gray-400" 
              : "hover:bg-gray-100 text-gray-500"
          }`}>
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Procedures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProcedures.map((procedure) => (
          <div
            key={procedure.id}
            className={`${
              darkMode 
                ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
                : "bg-white border-gray-200 hover:shadow-md"
            } p-6 rounded-lg shadow-sm border transition-all cursor-pointer`}
            onClick={() => setSelectedProcedure(procedure)}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-lg">{procedure.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(procedure.category)}`}>
                      {procedure.category}
                    </span>
                  </div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>
                    Código: <span className="font-medium">{procedure.code}</span>
                  </p>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {procedure.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle edit action
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode 
                        ? "hover:bg-gray-700 text-gray-400" 
                        : "hover:bg-gray-100 text-gray-500"
                    }`}
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle delete action
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode 
                        ? "hover:bg-red-900/30 text-red-400" 
                        : "hover:bg-red-50 text-red-500"
                    }`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <DollarSign size={16} className={`${darkMode ? "text-green-400" : "text-green-600"}`} />
                    <span className={`font-semibold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                      R$ {procedure.price.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} className={`${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                    <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {procedure.duration}min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProcedures.length === 0 && (
        <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-12 rounded-lg shadow-sm border text-center`}>
          <Stethoscope size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
          <h3 className={`text-lg font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {searchTerm || selectedCategory 
              ? "Nenhum procedimento encontrado" 
              : "Nenhum procedimento cadastrado"
            }
          </h3>
          <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {searchTerm || selectedCategory 
              ? "Tente ajustar os filtros de busca para encontrar procedimentos." 
              : "Comece criando seu primeiro procedimento médico no sistema."
            }
          </p>
          {!searchTerm && !selectedCategory && setShowNewProcedureModal && (
            <button
              onClick={() => setShowNewProcedureModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2 mx-auto"
            >
              <Plus size={16} />
              <span>Criar Primeiro Procedimento</span>
            </button>
          )}
        </div>
      )}

      {/* Procedure Detail Modal */}
      {selectedProcedure && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Detalhes do Procedimento</h2>
                <button
                  onClick={() => setSelectedProcedure(null)}
                  className={`${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} transition-colors`}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Stethoscope className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedProcedure.name}</h3>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(selectedProcedure.category)}`}>
                        {selectedProcedure.category}
                      </span>
                      <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Código: {selectedProcedure.code}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Informações Básicas</h4>
                    <div className="space-y-3">
                      <div>
                        <label className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Nome do Procedimento</label>
                        <p className="mt-1">{selectedProcedure.name}</p>
                      </div>
                      <div>
                        <label className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Código</label>
                        <p className="mt-1 font-mono text-lg">{selectedProcedure.code}</p>
                      </div>
                      <div>
                        <label className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Categoria</label>
                        <span className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(selectedProcedure.category)}`}>
                          {selectedProcedure.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Valores e Tempo</h4>
                    <div className="space-y-3">
                      <div>
                        <label className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Preço</label>
                        <p className="mt-1 text-2xl font-bold text-green-600">
                          R$ {selectedProcedure.price.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <label className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Duração Estimada</label>
                        <p className="mt-1 text-lg font-semibold">
                          {selectedProcedure.duration} minutos
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Descrição</h4>
                  <p className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg leading-relaxed`}>
                    {selectedProcedure.description}
                  </p>
                </div>

                <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}>
                  <h4 className="text-lg font-semibold mb-3">Resumo Financeiro</h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Valor Base</p>
                      <p className="text-xl font-bold text-green-600">
                        R$ {selectedProcedure.price.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Por Minuto</p>
                      <p className="text-xl font-bold text-blue-600">
                        R$ {Math.round(selectedProcedure.price / selectedProcedure.duration).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setSelectedProcedure(null)}
                  className={`px-4 py-2 border rounded-lg transition-colors ${
                    darkMode 
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Fechar
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Editar Procedimento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Procedure Modal */}
      {showNewProcedureModal && setShowNewProcedureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Novo Procedimento</h2>
                <button
                  onClick={() => setShowNewProcedureModal(false)}
                  className={`${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} transition-colors`}
                >
                  <X size={24} />
                </button>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  // Aqui seria implementada a lógica para salvar o procedimento
                  console.log('Novo procedimento criado');
                  setShowNewProcedureModal(false);
                }}
                className="space-y-6"
              >
                {/* Informações Básicas */}
                <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Stethoscope className="w-5 h-5 mr-2" />
                    Informações Básicas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Nome do Procedimento *
                      </label>
                      <input
                        type="text"
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="Ex: Consulta Cardiológica"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Código *
                      </label>
                      <input
                        type="text"
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="Ex: CONS001"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Categoria *
                      </label>
                      <select
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Selecione uma categoria</option>
                        <option value="Consultas">Consultas</option>
                        <option value="Exames">Exames</option>
                        <option value="Cirurgias">Cirurgias</option>
                        <option value="Tratamentos">Tratamentos</option>
                        <option value="Terapias">Terapias</option>
                        <option value="Diagnósticos">Diagnósticos</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Valores e Duração */}
                <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Valores e Duração
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Preço (R$) *
                      </label>
                      <div className="relative">
                        <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          R$
                        </span>
                        <input
                          type="number"
                          required
                          min="0"
                          step="0.01"
                          className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            darkMode 
                              ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="250.00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Duração (minutos) *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          required
                          min="5"
                          max="480"
                          step="5"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            darkMode 
                              ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="30"
                        />
                        <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          min
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Valor por Minuto (calc.)
                      </label>
                      <div className={`px-3 py-2 border rounded-lg ${
                        darkMode 
                          ? "bg-gray-600 border-gray-500 text-gray-300" 
                          : "bg-gray-100 border-gray-300 text-gray-600"
                      }`}>
                        <span className="text-sm">R$ --/min</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descrição e Detalhes */}
                <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Descrição e Detalhes
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Descrição Completa *
                      </label>
                      <textarea
                        required
                        rows={4}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="Descreva detalhadamente o procedimento, incluindo preparações necessárias, materiais utilizados, etapas do procedimento, etc."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Preparação Necessária
                        </label>
                        <textarea
                          rows={3}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                            darkMode 
                              ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="Ex: Jejum de 12 horas, suspender medicamentos..."
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Observações Importantes
                        </label>
                        <textarea
                          rows={3}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                            darkMode 
                              ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="Contraindicações, efeitos colaterais, cuidados pós-procedimento..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Configurações Adicionais */}
                <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Configurações Adicionais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Status
                      </label>
                      <select
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                        <option value="descontinuado">Descontinuado</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Requer Agendamento
                      </label>
                      <select
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Prioridade
                      </label>
                      <select
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="normal">Normal</option>
                        <option value="alta">Alta</option>
                        <option value="urgente">Urgente</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className={`flex items-center space-x-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="text-sm">Este procedimento está coberto por convênios</span>
                    </label>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <button
                    type="button"
                    onClick={() => setShowNewProcedureModal(false)}
                    className={`px-6 py-2 border rounded-lg transition-colors ${
                      darkMode 
                        ? "border-gray-500 text-gray-300 hover:bg-gray-700" 
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>Salvar Procedimento</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProceduresView;