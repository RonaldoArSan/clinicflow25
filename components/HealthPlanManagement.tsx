import React, { useState } from 'react';
import { Plus, Search, Filter, Building2, CreditCard, Users, TrendingUp, AlertCircle, Eye, Edit2, Trash2, MoreVertical, Power } from 'lucide-react';
import { useHealthPlans } from '@/hooks/useHealthPlans';
import { HealthPlan, HealthPlanFilter, HEALTH_PLAN_STATUS, HEALTH_PLAN_TYPES } from '@/types/healthPlan';
import HealthPlanForm from './HealthPlanForm';
import HealthPlanDetails from './HealthPlanDetails';

interface HealthPlanManagementProps {
  isDark?: boolean;
}

export default function HealthPlanManagement({ isDark = false }: HealthPlanManagementProps) {
  const {
    healthPlans,
    loading,
    error,
    filterHealthPlans,
    getHealthPlanById,
    deleteHealthPlan,
    toggleHealthPlanStatus,
    setDefaultHealthPlan,
    getHealthPlanStats
  } = useHealthPlans();

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<HealthPlanFilter>({});
  const [selectedPlan, setSelectedPlan] = useState<HealthPlan | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editingPlan, setEditingPlan] = useState<HealthPlan | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const stats = getHealthPlanStats();
  const filteredPlans = filterHealthPlans({ ...filter, search: searchTerm });

  const handleEdit = (plan: HealthPlan) => {
    setEditingPlan(plan);
    setShowForm(true);
    setActiveDropdown(null);
  };

  const handleView = (plan: HealthPlan) => {
    setSelectedPlan(plan);
    setShowDetails(true);
    setActiveDropdown(null);
  };

  const handleDelete = async (plan: HealthPlan) => {
    if (window.confirm(`Tem certeza que deseja excluir o convênio "${plan.name}"?`)) {
      try {
        await deleteHealthPlan(plan.id);
        setActiveDropdown(null);
      } catch (error) {
        console.error('Erro ao excluir convênio:', error);
        alert('Erro ao excluir convênio. Verifique se não há pacientes vinculados.');
      }
    }
  };

  const handleToggleStatus = async (plan: HealthPlan) => {
    try {
      await toggleHealthPlanStatus(plan.id);
      setActiveDropdown(null);
    } catch (error) {
      console.error('Erro ao alterar status:', error);
    }
  };

  const handleSetDefault = async (plan: HealthPlan) => {
    try {
      await setDefaultHealthPlan(plan.id);
      setActiveDropdown(null);
    } catch (error) {
      console.error('Erro ao definir padrão:', error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className={`space-y-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {/* Header com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total de Convênios</p>
              <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
            </div>
            <Building2 className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Ativos</p>
              <p className={`text-3xl font-bold text-green-500`}>{stats.active}</p>
            </div>
            <CreditCard className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Pacientes</p>
              <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.totalPatients}</p>
            </div>
            <Users className="w-8 h-8 text-indigo-500" />
          </div>
        </div>

        <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Receita Mensal</p>
              <p className={`text-3xl font-bold text-emerald-500`}>{formatCurrency(stats.monthlyRevenue)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Alertas */}
      {stats.pendingAuthorizations > 0 && (
        <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
          <p className="text-yellow-800">
            Existem {stats.pendingAuthorizations} autorizações pendentes que precisam de atenção.
          </p>
        </div>
      )}

      {/* Controles */}
      <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Gerenciar Convênios
          </h2>
          <button
            onClick={() => {
              setEditingPlan(null);
              setShowForm(true);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Convênio
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar convênios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filter.status || ''}
              onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value || undefined }))}
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="">Todos os Status</option>
              {Object.entries(HEALTH_PLAN_STATUS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>

            <select
              value={filter.type || ''}
              onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value as any || undefined }))}
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="">Todos os Tipos</option>
              {Object.entries(HEALTH_PLAN_TYPES).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Convênio
                </th>
                <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Tipo
                </th>
                <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Status
                </th>
                <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Pacientes
                </th>
                <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Valor Consulta
                </th>
                <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Receita Mensal
                </th>
                <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan) => (
                <tr 
                  key={plan.id} 
                  className={`border-b hover:bg-opacity-50 transition-colors ${
                    isDark 
                      ? 'border-gray-700 hover:bg-gray-700' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <td className="py-3 px-4">
                    <div>
                      <div className="flex items-center">
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {plan.name}
                          {plan.isDefault && (
                            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              Padrão
                            </span>
                          )}
                        </p>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {plan.code} • {plan.company.name}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      plan.type === 'convenio'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {HEALTH_PLAN_TYPES[plan.type]}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      plan.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : plan.status === 'inactive'
                        ? 'bg-gray-100 text-gray-800'
                        : plan.status === 'suspended'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {HEALTH_PLAN_STATUS[plan.status]}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {plan.statistics?.totalPatients || 0}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {formatCurrency(plan.pricing.consultationValue)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {formatCurrency(plan.statistics?.monthlyRevenue || 0)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === plan.id ? null : plan.id)}
                        className={`p-2 rounded-lg hover:bg-opacity-80 transition-colors ${
                          isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                        }`}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeDropdown === plan.id && (
                        <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-10 ${
                          isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
                        }`}>
                          <div className="py-1">
                            <button
                              onClick={() => handleView(plan)}
                              className={`flex items-center w-full px-4 py-2 text-sm hover:bg-opacity-80 transition-colors ${
                                isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Visualizar
                            </button>
                            <button
                              onClick={() => handleEdit(plan)}
                              className={`flex items-center w-full px-4 py-2 text-sm hover:bg-opacity-80 transition-colors ${
                                isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <Edit2 className="w-4 h-4 mr-2" />
                              Editar
                            </button>
                            <button
                              onClick={() => handleToggleStatus(plan)}
                              className={`flex items-center w-full px-4 py-2 text-sm hover:bg-opacity-80 transition-colors ${
                                isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <Power className="w-4 h-4 mr-2" />
                              {plan.status === 'active' ? 'Desativar' : 'Ativar'}
                            </button>
                            {!plan.isDefault && (
                              <button
                                onClick={() => handleSetDefault(plan)}
                                className={`flex items-center w-full px-4 py-2 text-sm hover:bg-opacity-80 transition-colors ${
                                  isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <CreditCard className="w-4 h-4 mr-2" />
                                Definir como Padrão
                              </button>
                            )}
                            <hr className={`my-1 ${isDark ? 'border-gray-600' : 'border-gray-200'}`} />
                            <button
                              onClick={() => handleDelete(plan)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPlans.length === 0 && (
            <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <Building2 className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p>Nenhum convênio encontrado</p>
              <p className="text-sm mt-1">
                {searchTerm || filter.status || filter.type 
                  ? 'Tente ajustar os filtros de busca'
                  : 'Cadastre o primeiro convênio para começar'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showForm && (
        <HealthPlanForm
          plan={editingPlan}
          isDark={isDark}
          onClose={() => {
            setShowForm(false);
            setEditingPlan(null);
          }}
          onSave={() => {
            setShowForm(false);
            setEditingPlan(null);
          }}
        />
      )}

      {showDetails && selectedPlan && (
        <HealthPlanDetails
          plan={selectedPlan}
          isDark={isDark}
          onClose={() => {
            setShowDetails(false);
            setSelectedPlan(null);
          }}
          onEdit={() => {
            setShowDetails(false);
            setEditingPlan(selectedPlan);
            setShowForm(true);
          }}
        />
      )}

      {/* Click outside to close dropdown */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
}