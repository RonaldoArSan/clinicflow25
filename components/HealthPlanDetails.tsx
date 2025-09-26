import React from 'react';
import { X, Edit2, Building2, CreditCard, Settings, FileText, Users, Phone, Mail, MapPin, Calendar, Clock, Shield, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { HealthPlan, HEALTH_PLAN_STATUS, HEALTH_PLAN_TYPES, BILLING_TYPES } from '@/types/healthPlan';

interface HealthPlanDetailsProps {
  plan: HealthPlan;
  isDark?: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export default function HealthPlanDetails({ plan, isDark = false, onClose, onEdit }: HealthPlanDetailsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'inactive':
        return <XCircle className="w-5 h-5 text-gray-500" />;
      case 'suspended':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center">
            <Building2 className="w-6 h-6 mr-3 text-blue-500" />
            <div>
              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {plan.code} • {HEALTH_PLAN_TYPES[plan.type]}
                {plan.isDefault && (
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    Padrão
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              title="Editar"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna 1 - Informações Básicas */}
            <div className="space-y-6">
              {/* Status e Informações Gerais */}
              <div className={`p-4 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Status e Informações
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Status:</span>
                    <div className="flex items-center">
                      {getStatusIcon(plan.status)}
                      <span className="ml-2">{HEALTH_PLAN_STATUS[plan.status]}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Tipo:</span>
                    <span>{HEALTH_PLAN_TYPES[plan.type]}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Criado em:</span>
                    <span>{formatDate(plan.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Atualizado:</span>
                    <span>{formatDate(plan.updatedAt)}</span>
                  </div>
                </div>
              </div>

              {/* Estatísticas */}
              {plan.statistics && (
                <div className={`p-4 rounded-lg border ${
                  isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <h3 className="font-semibold mb-3">Estatísticas</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Pacientes:</span>
                      <span className="font-medium">{plan.statistics.totalPatients}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Receita Mensal:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(plan.statistics.monthlyRevenue)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Valor Médio:</span>
                      <span className="font-medium">
                        {formatCurrency(plan.statistics.averageConsultationValue)}
                      </span>
                    </div>
                    {plan.statistics.pendingAuthorizations > 0 && (
                      <div className="flex items-center justify-between">
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Autorizações Pendentes:</span>
                        <span className="font-medium text-yellow-600">
                          {plan.statistics.pendingAuthorizations}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Valores */}
              <div className={`p-4 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className="font-semibold mb-3 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Valores
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Consulta:</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(plan.pricing.consultationValue)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Multiplicador:</span>
                    <span>{plan.pricing.procedureMultiplier}x</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna 2 - Empresa e Contato */}
            <div className="space-y-6">
              {plan.type === 'convenio' && (
                <>
                  {/* Dados da Empresa */}
                  <div className={`p-4 rounded-lg border ${
                    isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Empresa
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Nome:
                        </label>
                        <p className="font-medium">{plan.company.name}</p>
                      </div>
                      {plan.company.cnpj && (
                        <div>
                          <label className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            CNPJ:
                          </label>
                          <p>{plan.company.cnpj}</p>
                        </div>
                      )}
                      {plan.company.phone && (
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{plan.company.phone}</span>
                        </div>
                      )}
                      {plan.company.email && (
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{plan.company.email}</span>
                        </div>
                      )}
                      {plan.company.website && (
                        <div>
                          <a 
                            href={plan.company.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {plan.company.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Endereço */}
                  {(plan.company.address.street || plan.company.address.city) && (
                    <div className={`p-4 rounded-lg border ${
                      isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <h3 className="font-semibold mb-3 flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Endereço
                      </h3>
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {plan.company.address.street && (
                          <p>{plan.company.address.street}, {plan.company.address.number}</p>
                        )}
                        {plan.company.address.complement && (
                          <p>{plan.company.address.complement}</p>
                        )}
                        {plan.company.address.district && (
                          <p>{plan.company.address.district}</p>
                        )}
                        {(plan.company.address.city || plan.company.address.state) && (
                          <p>{plan.company.address.city} - {plan.company.address.state}</p>
                        )}
                        {plan.company.address.zipCode && (
                          <p>CEP: {plan.company.address.zipCode}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Pessoa de Contato */}
                  {plan.contract.contactPerson.name && (
                    <div className={`p-4 rounded-lg border ${
                      isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <h3 className="font-semibold mb-3">Pessoa de Contato</h3>
                      <div className="space-y-2">
                        <p className="font-medium">{plan.contract.contactPerson.name}</p>
                        {plan.contract.contactPerson.position && (
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {plan.contract.contactPerson.position}
                          </p>
                        )}
                        {plan.contract.contactPerson.phone && (
                          <div className="flex items-center text-sm">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{plan.contract.contactPerson.phone}</span>
                          </div>
                        )}
                        {plan.contract.contactPerson.email && (
                          <div className="flex items-center text-sm">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{plan.contract.contactPerson.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Coluna 3 - Configurações e Contrato */}
            <div className="space-y-6">
              {/* Configurações */}
              <div className={`p-4 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Configurações
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Permite agendamento:
                    </span>
                    <span className={plan.configuration.allowsScheduling ? 'text-green-600' : 'text-red-600'}>
                      {plan.configuration.allowsScheduling ? 'Sim' : 'Não'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Requer autorização:
                    </span>
                    <span className={plan.configuration.requiresAuthorization ? 'text-yellow-600' : 'text-green-600'}>
                      {plan.configuration.requiresAuthorization ? 'Sim' : 'Não'}
                    </span>
                  </div>
                  {plan.configuration.requiresAuthorization && (
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Prazo autorização:
                      </span>
                      <span>{plan.configuration.authorizationDays} dias</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Aceita emergência:
                    </span>
                    <span className={plan.configuration.acceptsEmergency ? 'text-green-600' : 'text-red-600'}>
                      {plan.configuration.acceptsEmergency ? 'Sim' : 'Não'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Co-participação:
                    </span>
                    <span className={plan.configuration.hasCoParticipation ? 'text-yellow-600' : 'text-green-600'}>
                      {plan.configuration.hasCoParticipation 
                        ? `${plan.configuration.coParticipationPercentage}%` 
                        : 'Não'
                      }
                    </span>
                  </div>
                  {(plan.configuration.minimumAge || plan.configuration.maximumAge) && (
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Idade:
                      </span>
                      <span>
                        {plan.configuration.minimumAge || 0} - {plan.configuration.maximumAge || 120} anos
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tipos de Cobertura */}
              {plan.configuration.coverageTypes.length > 0 && (
                <div className={`p-4 rounded-lg border ${
                  isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <h3 className="font-semibold mb-3">Tipos de Cobertura</h3>
                  <div className="flex flex-wrap gap-2">
                    {plan.configuration.coverageTypes.map(type => (
                      <span 
                        key={type} 
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contrato */}
              {plan.type === 'convenio' && plan.contract.contractNumber && (
                <div className={`p-4 rounded-lg border ${
                  isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Contrato
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Número:
                      </label>
                      <p className="font-medium">{plan.contract.contractNumber}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Tipo de faturamento:
                      </span>
                      <span>{BILLING_TYPES[plan.contract.billingType]}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Prazo pagamento:
                      </span>
                      <span>{plan.contract.paymentTerms} dias</span>
                    </div>
                    {plan.contract.startDate && (
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Início:
                        </span>
                        <span>{formatDate(plan.contract.startDate)}</span>
                      </div>
                    )}
                    {plan.contract.renewalDate && (
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Renovação:
                        </span>
                        <span>{formatDate(plan.contract.renewalDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Observações */}
              {plan.observations && (
                <div className={`p-4 rounded-lg border ${
                  isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <h3 className="font-semibold mb-3">Observações</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {plan.observations}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}