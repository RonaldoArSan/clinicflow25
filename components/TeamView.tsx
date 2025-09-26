import React, { useState } from 'react';
import { UserPlus, Search, Filter, Mail, Phone, Calendar, Star, X, Users } from 'lucide-react';
import { Doctor } from '../types';

interface TeamViewProps {
  darkMode: boolean;
  medicalTeam: Doctor[];
  selectedMember: Doctor | null;
  setSelectedMember: (member: Doctor | null) => void;
  showNewMemberModal?: boolean;
  setShowNewMemberModal?: (show: boolean) => void;
}

const TeamView: React.FC<TeamViewProps> = ({ 
  darkMode, 
  medicalTeam, 
  selectedMember, 
  setSelectedMember,
  showNewMemberModal = false,
  setShowNewMemberModal 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Função para filtrar membros da equipe
  const filteredMembers = medicalTeam.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || member.role === selectedRole;
    const matchesStatus = !selectedStatus || member.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Estatísticas da equipe
  const teamStats = {
    total: medicalTeam.length,
    active: medicalTeam.filter(m => m.status === 'ativo').length,
    doctors: medicalTeam.filter(m => m.role?.includes('Médico')).length,
    nurses: medicalTeam.filter(m => m.role?.includes('Enfermeiro')).length
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas da Equipe */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-4 rounded-lg shadow`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>Total de Membros</p>
              <p className="text-2xl font-bold text-blue-600">{teamStats.total}</p>
            </div>
            <Users className="text-blue-600" size={24} />
          </div>
        </div>

        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-4 rounded-lg shadow`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>Ativos</p>
              <p className="text-2xl font-bold text-green-600">{teamStats.active}</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>

        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-4 rounded-lg shadow`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>Médicos</p>
              <p className="text-2xl font-bold text-purple-600">{teamStats.doctors}</p>
            </div>
            <UserPlus className="text-purple-600" size={24} />
          </div>
        </div>

        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-4 rounded-lg shadow`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>Enfermeiros</p>
              <p className="text-2xl font-bold text-orange-600">{teamStats.nurses}</p>
            </div>
            <UserPlus className="text-orange-600" size={24} />
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-4 rounded-lg shadow`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nome ou especialidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? "bg-gray-700 border-gray-600 text-white" 
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode 
                  ? "bg-gray-700 border-gray-600 text-white" 
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="">Todas as funções</option>
              <option value="Médico Clínico Geral">Clínico Geral</option>
              <option value="Médico Cardiologista">Cardiologista</option>
              <option value="Médico Endocrinologista">Endocrinologista</option>
              <option value="Enfermeiro">Enfermeiro</option>
              <option value="Recepcionista">Recepcionista</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode 
                  ? "bg-gray-700 border-gray-600 text-white" 
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="">Todos os status</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
              <option value="férias">Em Férias</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Membros da Equipe */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className={`${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"} 
                       p-4 rounded-lg shadow cursor-pointer transition-colors border-l-4 ${
                         member.status === 'ativo' ? 'border-green-500' : 
                         member.status === 'férias' ? 'border-yellow-500' : 'border-red-500'
                       }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>
                  {member.role}
                </p>
                <p className={`${darkMode ? "text-gray-500" : "text-gray-500"} text-xs`}>
                  {member.specialty}
                </p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs ${
                member.status === 'ativo' 
                  ? 'bg-green-100 text-green-800' 
                  : member.status === 'férias'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {member.status}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              {member.email && (
                <div className="flex items-center space-x-2">
                  <Mail size={14} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                  <span className={darkMode ? "text-gray-300" : "text-gray-700"}>{member.email}</span>
                </div>
              )}
              {member.phone && (
                <div className="flex items-center space-x-2">
                  <Phone size={14} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                  <span className={darkMode ? "text-gray-300" : "text-gray-700"}>{member.phone}</span>
                </div>
              )}
              {member.appointmentsToday && (
                <div className="flex items-center space-x-2">
                  <Calendar size={14} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                  <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                    {member.appointmentsToday} consultas hoje
                  </span>
                </div>
              )}
              {member.rating && (
                <div className="flex items-center space-x-2">
                  <Star size={14} className="text-yellow-500" />
                  <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                    {member.rating}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-8 rounded-lg shadow text-center`}>
          <Users size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
          <h3 className="text-lg font-medium mb-2">Nenhum membro encontrado</h3>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Tente ajustar os filtros ou o termo de busca.
          </p>
        </div>
      )}

      {/* Modal de Detalhes do Membro */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {selectedMember.role} - {selectedMember.specialty}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    selectedMember.status === 'ativo' 
                      ? 'bg-green-100 text-green-800' 
                      : selectedMember.status === 'férias'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedMember.status}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className={`${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} transition-colors`}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações de Contato</h3>
                  
                  {selectedMember.email && (
                    <div className="flex items-center space-x-3">
                      <Mail size={20} className="text-blue-600" />
                      <div>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Email</p>
                        <p>{selectedMember.email}</p>
                      </div>
                    </div>
                  )}

                  {selectedMember.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone size={20} className="text-green-600" />
                      <div>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Telefone</p>
                        <p>{selectedMember.phone}</p>
                      </div>
                    </div>
                  )}

                  {selectedMember.crm && (
                    <div className="flex items-center space-x-3">
                      <UserPlus size={20} className="text-purple-600" />
                      <div>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>CRM</p>
                        <p>{selectedMember.crm}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações Profissionais</h3>
                  
                  {selectedMember.appointmentsToday && (
                    <div className="flex items-center space-x-3">
                      <Calendar size={20} className="text-orange-600" />
                      <div>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Consultas Hoje</p>
                        <p>{selectedMember.appointmentsToday}</p>
                      </div>
                    </div>
                  )}

                  {selectedMember.rating && (
                    <div className="flex items-center space-x-3">
                      <Star size={20} className="text-yellow-500" />
                      <div>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Avaliação</p>
                        <p>{selectedMember.rating} ⭐</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <Users size={20} className="text-indigo-600" />
                    <div>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Especialidade</p>
                      <p>{selectedMember.specialty}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Novo Membro - Controlado pelo componente pai */}
      {showNewMemberModal && setShowNewMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Adicionar Novo Membro</h2>
                <button
                  onClick={() => setShowNewMemberModal(false)}
                  className={`${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} transition-colors`}
                >
                  <X size={24} />
                </button>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  // Aqui seria implementada a lógica para adicionar o membro
                  console.log('Novo membro adicionado');
                  setShowNewMemberModal(false);
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Informações Básicas */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informações Pessoais</h3>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-700 border-gray-600 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        placeholder="Ex: Dr. João Silva"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Função/Cargo *
                      </label>
                      <select
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-700 border-gray-600 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Selecione uma função</option>
                        <option value="Médico Clínico Geral">Médico Clínico Geral</option>
                        <option value="Médico Cardiologista">Médico Cardiologista</option>
                        <option value="Médico Endocrinologista">Médico Endocrinologista</option>
                        <option value="Médico Pediatra">Médico Pediatra</option>
                        <option value="Médico Ginecologista">Médico Ginecologista</option>
                        <option value="Enfermeiro">Enfermeiro</option>
                        <option value="Técnico de Enfermagem">Técnico de Enfermagem</option>
                        <option value="Fisioterapeuta">Fisioterapeuta</option>
                        <option value="Psicólogo">Psicólogo</option>
                        <option value="Nutricionista">Nutricionista</option>
                        <option value="Recepcionista">Recepcionista</option>
                        <option value="Auxiliar Administrativo">Auxiliar Administrativo</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Especialidade *
                      </label>
                      <input
                        type="text"
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-700 border-gray-600 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        placeholder="Ex: Cardiologia"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Status *
                      </label>
                      <select
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-700 border-gray-600 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <option value="">Selecione o status</option>
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                        <option value="férias">Em Férias</option>
                      </select>
                    </div>
                  </div>

                  {/* Informações Profissionais e Contato */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informações Profissionais</h3>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        CRM (para médicos)
                      </label>
                      <input
                        type="text"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-700 border-gray-600 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        placeholder="Ex: CRM/SP 123456"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        COREN (para enfermeiros)
                      </label>
                      <input
                        type="text"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-700 border-gray-600 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        placeholder="Ex: COREN/SP 123456"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-700 border-gray-600 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        placeholder="Ex: joao.silva@clinica.com"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? "bg-gray-700 border-gray-600 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        placeholder="Ex: (11) 99999-9999"
                      />
                    </div>
                  </div>
                </div>

                {/* Informações Adicionais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Consultas por Dia (opcional)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode 
                          ? "bg-gray-700 border-gray-600 text-white" 
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                      placeholder="Ex: 8"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Avaliação Inicial (opcional)
                    </label>
                    <select
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode 
                          ? "bg-gray-700 border-gray-600 text-white" 
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value="">Selecione uma avaliação</option>
                      <option value="5.0">⭐⭐⭐⭐⭐ (5.0)</option>
                      <option value="4.8">⭐⭐⭐⭐⭐ (4.8)</option>
                      <option value="4.5">⭐⭐⭐⭐⭐ (4.5)</option>
                      <option value="4.0">⭐⭐⭐⭐☆ (4.0)</option>
                      <option value="3.5">⭐⭐⭐☆☆ (3.5)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowNewMemberModal(false)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      darkMode 
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700" 
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <UserPlus size={16} />
                    <span>Adicionar Membro</span>
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

export default TeamView;