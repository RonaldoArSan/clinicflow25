import React, { useState } from 'react';
import { FileText, Search, Filter, Plus, Calendar, User, Stethoscope, X, UserCheck, Clock } from 'lucide-react';
import { MedicalRecord, Patient, Doctor } from '../types';

interface MedicalRecordsViewProps {
  darkMode?: boolean;
  medicalRecords: MedicalRecord[];
  selectedRecord: MedicalRecord | null;
  setSelectedRecord: (record: MedicalRecord | null) => void;
  showNewRecordModal?: boolean;
  setShowNewRecordModal?: (show: boolean) => void;
  patients?: Patient[];
  medicalTeam?: Doctor[];
}

const MedicalRecordsView: React.FC<MedicalRecordsViewProps> = ({ 
  darkMode = false, 
  medicalRecords, 
  selectedRecord, 
  setSelectedRecord,
  showNewRecordModal = false,
  setShowNewRecordModal,
  patients = [],
  medicalTeam = []
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // Filtrar prontuários
  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = 
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.symptoms.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || record.status === statusFilter;
    const matchesPriority = !priorityFilter || record.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });
  const getPriorityColor = (priority: string) => {
    if (darkMode) {
      switch (priority) {
        case "alta":
          return "text-red-400 bg-red-900/30";
        case "média":
          return "text-yellow-400 bg-yellow-900/30";
        case "baixa":
          return "text-green-400 bg-green-900/30";
        default:
          return "text-gray-400 bg-gray-700/30";
      }
    } else {
      switch (priority) {
        case "alta":
          return "text-red-600 bg-red-50";
        case "média":
          return "text-yellow-600 bg-yellow-50";
        case "baixa":
          return "text-green-600 bg-green-50";
        default:
          return "text-gray-600 bg-gray-50";
      }
    }
  };

  const getStatusColor = (status: string) => {
    if (darkMode) {
      switch (status) {
        case "finalizado":
          return "text-green-400 bg-green-900/30";
        case "em andamento":
          return "text-blue-400 bg-blue-900/30";
        case "pendente":
          return "text-yellow-400 bg-yellow-900/30";
        default:
          return "text-gray-400 bg-gray-700/30";
      }
    } else {
      switch (status) {
        case "finalizado":
          return "text-green-600 bg-green-50";
        case "em andamento":
          return "text-blue-600 bg-blue-50";
        case "pendente":
          return "text-yellow-600 bg-yellow-50";
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
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Gerencie os prontuários e histórico médico dos pacientes
          </p>
        </div>
      
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6 border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total de Prontuários</p>
              <p className="text-2xl font-semibold">{medicalRecords.length}</p>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6 border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Stethoscope className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Finalizados</p>
              <p className="text-2xl font-semibold">
                {medicalRecords.filter(record => record.status === 'finalizado').length}
              </p>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6 border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Pendentes</p>
              <p className="text-2xl font-semibold">
                {medicalRecords.filter(record => record.status === 'pendente').length}
              </p>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6 border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <User className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Prioridade Alta</p>
              <p className="text-2xl font-semibold">
                {medicalRecords.filter(record => record.priority === 'alta').length}
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
                placeholder="Buscar por paciente, médico ou diagnóstico..."
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? "bg-gray-700 border-gray-600 text-white" 
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="">Todos os Status</option>
            <option value="finalizado">Finalizado</option>
            <option value="em andamento">Em Andamento</option>
            <option value="pendente">Pendente</option>
          </select>
          <select 
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? "bg-gray-700 border-gray-600 text-white" 
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="">Todas as Prioridades</option>
            <option value="alta">Alta</option>
            <option value="média">Média</option>
            <option value="baixa">Baixa</option>
          </select>
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid gap-6">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className={`${
              darkMode 
                ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
                : "bg-white border-gray-200 hover:shadow-md"
            } p-6 rounded-lg shadow-sm border transition-all cursor-pointer`}
            onClick={() => setSelectedRecord(record)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <h3 className="text-lg font-semibold">{record.patientName}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(record.priority)}`}>
                    {record.priority}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Médico</p>
                    <p className="font-medium">{record.doctor}</p>
                  </div>
                  <div>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Data</p>
                    <p className="font-medium">{new Date(record.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Tipo</p>
                    <p className="font-medium">{record.type}</p>
                  </div>
                  <div>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Diagnóstico</p>
                    <p className="font-medium">{record.diagnosis}</p>
                  </div>
                  <div>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Sintomas</p>
                    <p className="font-medium">{record.symptoms}</p>
                  </div>
                  <div>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Tratamento</p>
                    <p className="font-medium">{record.treatment}</p>
                  </div>
                </div>
                {record.observations && (
                  <div className="mt-4">
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>Observações</p>
                    <p className="text-sm mt-1">{record.observations}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRecords.length === 0 && (
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-8 rounded-lg shadow text-center border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <FileText size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
          <h3 className="text-lg font-medium mb-2">
            {searchTerm || statusFilter || priorityFilter 
              ? "Nenhum prontuário encontrado" 
              : "Nenhum prontuário cadastrado"
            }
          </h3>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            {searchTerm || statusFilter || priorityFilter 
              ? "Tente ajustar os filtros de busca para encontrar prontuários." 
              : "Comece criando um novo prontuário médico para seus pacientes."
            }
          </p>
          {!searchTerm && !statusFilter && !priorityFilter && setShowNewRecordModal && (
            <button
              onClick={() => setShowNewRecordModal(true)}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2 mx-auto"
            >
              <Plus size={16} />
              <span>Criar Primeiro Prontuário</span>
            </button>
          )}
        </div>
      )}

      {/* New Medical Record Modal */}
      {showNewRecordModal && setShowNewRecordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Novo Prontuário Médico</h2>
                <button
                  onClick={() => setShowNewRecordModal(false)}
                  className={`${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} transition-colors`}
                >
                  <X size={24} />
                </button>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  // Aqui seria implementada a lógica para salvar o prontuário
                  console.log('Novo prontuário criado');
                  setShowNewRecordModal(false);
                }}
                className="space-y-6"
              >
                {/* Informações Básicas */}
                <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Informações Básicas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Paciente *
                      </label>
                      <select
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Selecione o paciente</option>
                        {patients.map((patient) => (
                          <option key={patient.id} value={patient.id}>
                            {patient.name} - {patient.cpf}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Médico Responsável *
                      </label>
                      <select
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Selecione o médico</option>
                        {medicalTeam.filter(member => member.role?.includes('Médico')).map((doctor) => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.specialty}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Data do Atendimento *
                      </label>
                      <input
                        type="date"
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        defaultValue={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Tipo de Consulta *
                      </label>
                      <select
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Selecione o tipo</option>
                        <option value="Consulta de Rotina">Consulta de Rotina</option>
                        <option value="Consulta de Urgência">Consulta de Urgência</option>
                        <option value="Consulta de Retorno">Consulta de Retorno</option>
                        <option value="Exame Clínico">Exame Clínico</option>
                        <option value="Procedimento">Procedimento</option>
                        <option value="Cirurgia">Cirurgia</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Status *
                      </label>
                      <select
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="pendente">Pendente</option>
                        <option value="em andamento">Em Andamento</option>
                        <option value="finalizado">Finalizado</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Prioridade *
                      </label>
                      <select
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="baixa">Baixa</option>
                        <option value="média">Média</option>
                        <option value="alta">Alta</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Anamnese e Sintomas */}
                <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Stethoscope className="w-5 h-5 mr-2" />
                    Anamnese e Sintomas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Queixa Principal *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Descreva a queixa principal do paciente..."
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        História da Doença Atual *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Descreva o histórico da doença atual..."
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Sintomas Relatados *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Liste os sintomas apresentados pelo paciente..."
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        darkMode 
                          ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Exame Físico */}
                <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <UserCheck className="w-5 h-5 mr-2" />
                    Exame Físico
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Pressão Arterial
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 120/80 mmHg"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Temperatura
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 36.5°C"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Frequência Cardíaca
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 75 bpm"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Achados do Exame Físico
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Descreva os achados do exame físico..."
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        darkMode 
                          ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Diagnóstico e Tratamento */}
                <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Diagnóstico e Tratamento
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Diagnóstico *
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Descreva o diagnóstico..."
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Tratamento Prescrito *
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Descreva o tratamento prescrito..."
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Medicações Prescritas
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Liste as medicações prescritas (uma por linha)..."
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        darkMode 
                          ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Observações e Acompanhamento */}
                <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Observações e Acompanhamento
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Observações Gerais
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Observações adicionais sobre o atendimento..."
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Plano de Acompanhamento
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Descreva o plano de acompanhamento do paciente..."
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                          darkMode 
                            ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Data do Retorno
                    </label>
                    <input
                      type="date"
                      className={`w-full md:w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode 
                          ? "bg-gray-600 border-gray-500 text-white" 
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <button
                    type="button"
                    onClick={() => setShowNewRecordModal(false)}
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
                    <FileText size={16} />
                    <span>Salvar Prontuário</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Medical Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Detalhes do Prontuário</h2>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className={`${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} transition-colors`}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Informações do Paciente</h3>
                  <div className="space-y-3">
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Nome do Paciente</label>
                      <p className="mt-1">{selectedRecord.patientName}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Médico Responsável</label>
                      <p className="mt-1">{selectedRecord.doctor}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Data do Atendimento</label>
                      <p className="mt-1">{new Date(selectedRecord.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Tipo de Consulta</label>
                      <p className="mt-1">{selectedRecord.type}</p>
                    </div>
                    <div className="flex space-x-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedRecord.status)}`}>
                        {selectedRecord.status}
                      </span>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(selectedRecord.priority)}`}>
                        {selectedRecord.priority}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Detalhes Clínicos</h3>
                  <div className="space-y-3">
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Sintomas Relatados</label>
                      <p className="mt-1">{selectedRecord.symptoms}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Diagnóstico</label>
                      <p className="mt-1">{selectedRecord.diagnosis}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Tratamento Prescrito</label>
                      <p className="mt-1">{selectedRecord.treatment}</p>
                    </div>
                    {selectedRecord.medications && selectedRecord.medications.length > 0 && (
                      <div>
                        <label className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Medicações</label>
                        <ul className="mt-1 space-y-1">
                          {selectedRecord.medications.map((medication, index) => (
                            <li key={index} className="text-sm">• {medication}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedRecord.observations && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Observações Adicionais</h3>
                  <p className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}>
                    {selectedRecord.observations}
                  </p>
                </div>
              )}

              {selectedRecord.followUp && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Acompanhamento</h3>
                  <p className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}>
                    {selectedRecord.followUp}
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className={`px-4 py-2 border rounded-lg transition-colors ${
                    darkMode 
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Fechar
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Editar Prontuário
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsView;