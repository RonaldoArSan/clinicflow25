import React, { useState, useEffect } from 'react';
import { X, Save, Building2, CreditCard, Settings, FileText, Users, Phone, Mail, MapPin } from 'lucide-react';
import { HealthPlan, COVERAGE_TYPES, BILLING_TYPES } from '@/types/healthPlan';
import { useHealthPlans } from '@/hooks/useHealthPlans';

interface HealthPlanFormProps {
  plan?: HealthPlan | null;
  isDark?: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function HealthPlanForm({ plan, isDark = false, onClose, onSave }: HealthPlanFormProps) {
  const { createHealthPlan, updateHealthPlan } = useHealthPlans();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: 'convenio' as 'convenio' | 'particular',
    company: {
      name: '',
      cnpj: '',
      website: '',
      phone: '',
      email: '',
      address: {
        street: '',
        number: '',
        complement: '',
        district: '',
        city: '',
        state: '',
        zipCode: ''
      }
    },
    configuration: {
      allowsScheduling: true,
      requiresAuthorization: false,
      authorizationDays: 0,
      acceptsEmergency: true,
      hasCoParticipation: false,
      coParticipationPercentage: 0,
      minimumAge: 0,
      maximumAge: 120,
      coverageTypes: [] as string[]
    },
    pricing: {
      consultationValue: 0,
      procedureMultiplier: 1.0,
      customPricing: [] as any[]
    },
    contract: {
      contractNumber: '',
      startDate: '',
      endDate: '',
      renewalDate: '',
      paymentTerms: 30,
      billingType: 'monthly' as 'monthly' | 'procedure' | 'capitation',
      contactPerson: {
        name: '',
        phone: '',
        email: '',
        position: ''
      }
    },
    status: 'active' as 'active' | 'inactive' | 'suspended' | 'pending',
    isDefault: false,
    observations: ''
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name,
        code: plan.code,
        type: plan.type,
        company: {
          ...plan.company,
          website: plan.company.website || '',
          address: {
            ...plan.company.address,
            complement: plan.company.address.complement || ''
          }
        },
        configuration: {
          ...plan.configuration,
          coParticipationPercentage: plan.configuration.coParticipationPercentage || 0,
          minimumAge: plan.configuration.minimumAge || 0,
          maximumAge: plan.configuration.maximumAge || 120
        },
        pricing: {
          ...plan.pricing,
          customPricing: plan.pricing.customPricing || []
        },
        contract: {
          ...plan.contract,
          endDate: plan.contract.endDate || ''
        },
        status: plan.status,
        isDefault: plan.isDefault,
        observations: plan.observations || ''
      });
    }
  }, [plan]);

  const handleInputChange = (path: string, value: any) => {
    setFormData(prev => {
      const keys = path.split('.');
      const result = { ...prev };
      let current: any = result;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return result;
    });
  };

  const handleCoverageTypeToggle = (coverageType: string) => {
    const currentTypes = formData.configuration.coverageTypes;
    const newTypes = currentTypes.includes(coverageType)
      ? currentTypes.filter(t => t !== coverageType)
      : [...currentTypes, coverageType];
    
    handleInputChange('configuration.coverageTypes', newTypes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const planData = {
        ...formData,
        createdBy: 'Admin' // Em uma aplicação real, seria o usuário logado
      };

      if (plan) {
        await updateHealthPlan(plan.id, planData);
      } else {
        await createHealthPlan(planData);
      }

      onSave();
    } catch (error) {
      console.error('Erro ao salvar convênio:', error);
      alert('Erro ao salvar convênio');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Dados Básicos', icon: Building2 },
    { id: 'company', label: 'Empresa', icon: Users },
    { id: 'configuration', label: 'Configurações', icon: Settings },
    { id: 'pricing', label: 'Valores', icon: CreditCard },
    { id: 'contract', label: 'Contrato', icon: FileText }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className="text-xl font-semibold">
            {plan ? 'Editar Convênio' : 'Novo Convênio'}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Tabs */}
          <div className={`flex border-b overflow-x-auto ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : isDark
                      ? 'border-transparent text-gray-400 hover:text-gray-300'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Dados Básicos */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Nome do Convênio *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="Ex: UNIMED Regional"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Código *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="Ex: UNI001"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Tipo *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="convenio">Convênio</option>
                      <option value="particular">Particular</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="active">Ativo</option>
                      <option value="inactive">Inativo</option>
                      <option value="suspended">Suspenso</option>
                      <option value="pending">Pendente</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={formData.isDefault}
                    onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isDefault" className={`ml-2 text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Definir como convênio padrão
                  </label>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Observações
                  </label>
                  <textarea
                    rows={3}
                    value={formData.observations}
                    onChange={(e) => handleInputChange('observations', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Observações sobre o convênio..."
                  />
                </div>
              </div>
            )}

            {/* Dados da Empresa */}
            {activeTab === 'company' && formData.type === 'convenio' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Nome da Empresa *
                    </label>
                    <input
                      type="text"
                      required={formData.type === 'convenio'}
                      value={formData.company.name}
                      onChange={(e) => handleInputChange('company.name', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      CNPJ
                    </label>
                    <input
                      type="text"
                      value={formData.company.cnpj}
                      onChange={(e) => handleInputChange('company.cnpj', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <Phone className="w-4 h-4 inline mr-1" />
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={formData.company.phone}
                      onChange={(e) => handleInputChange('company.phone', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="(11) 1234-5678"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <Mail className="w-4 h-4 inline mr-1" />
                      E-mail
                    </label>
                    <input
                      type="email"
                      value={formData.company.email}
                      onChange={(e) => handleInputChange('company.email', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="contato@empresa.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Website
                    </label>
                    <input
                      type="url"
                      value={formData.company.website}
                      onChange={(e) => handleInputChange('company.website', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="https://www.empresa.com"
                    />
                  </div>
                </div>

                {/* Endereço */}
                <div>
                  <h3 className={`text-lg font-medium mb-4 flex items-center ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    <MapPin className="w-5 h-5 mr-2" />
                    Endereço
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Logradouro
                      </label>
                      <input
                        type="text"
                        value={formData.company.address.street}
                        onChange={(e) => handleInputChange('company.address.street', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Número
                      </label>
                      <input
                        type="text"
                        value={formData.company.address.number}
                        onChange={(e) => handleInputChange('company.address.number', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Complemento
                      </label>
                      <input
                        type="text"
                        value={formData.company.address.complement}
                        onChange={(e) => handleInputChange('company.address.complement', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Bairro
                      </label>
                      <input
                        type="text"
                        value={formData.company.address.district}
                        onChange={(e) => handleInputChange('company.address.district', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        CEP
                      </label>
                      <input
                        type="text"
                        value={formData.company.address.zipCode}
                        onChange={(e) => handleInputChange('company.address.zipCode', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder="00000-000"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Cidade
                      </label>
                      <input
                        type="text"
                        value={formData.company.address.city}
                        onChange={(e) => handleInputChange('company.address.city', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Estado
                      </label>
                      <input
                        type="text"
                        value={formData.company.address.state}
                        onChange={(e) => handleInputChange('company.address.state', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder="SP"
                        maxLength={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Configurações */}
            {activeTab === 'configuration' && (
              <div className="space-y-6">
                {/* Configurações Básicas */}
                <div>
                  <h3 className={`text-lg font-medium mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Configurações de Atendimento
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="allowsScheduling"
                        checked={formData.configuration.allowsScheduling}
                        onChange={(e) => handleInputChange('configuration.allowsScheduling', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="allowsScheduling" className={`ml-2 text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Permite agendamento
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="acceptsEmergency"
                        checked={formData.configuration.acceptsEmergency}
                        onChange={(e) => handleInputChange('configuration.acceptsEmergency', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="acceptsEmergency" className={`ml-2 text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Aceita urgência/emergência
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="requiresAuthorization"
                        checked={formData.configuration.requiresAuthorization}
                        onChange={(e) => handleInputChange('configuration.requiresAuthorization', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="requiresAuthorization" className={`ml-2 text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Requer autorização prévia
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hasCoParticipation"
                        checked={formData.configuration.hasCoParticipation}
                        onChange={(e) => handleInputChange('configuration.hasCoParticipation', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="hasCoParticipation" className={`ml-2 text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Possui co-participação
                      </label>
                    </div>
                  </div>
                </div>

                {/* Configurações Numéricas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formData.configuration.requiresAuthorization && (
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Prazo para Autorização (dias)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.configuration.authorizationDays}
                        onChange={(e) => handleInputChange('configuration.authorizationDays', parseInt(e.target.value) || 0)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                  )}

                  {formData.configuration.hasCoParticipation && (
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Co-participação (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.configuration.coParticipationPercentage}
                        onChange={(e) => handleInputChange('configuration.coParticipationPercentage', parseFloat(e.target.value) || 0)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                  )}

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Idade Mínima
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.configuration.minimumAge}
                      onChange={(e) => handleInputChange('configuration.minimumAge', parseInt(e.target.value) || 0)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Idade Máxima
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.configuration.maximumAge}
                      onChange={(e) => handleInputChange('configuration.maximumAge', parseInt(e.target.value) || 0)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Tipos de Cobertura */}
                <div>
                  <h3 className={`text-lg font-medium mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Tipos de Cobertura
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {COVERAGE_TYPES.map(type => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`coverage-${type}`}
                          checked={formData.configuration.coverageTypes.includes(type)}
                          onChange={() => handleCoverageTypeToggle(type)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={`coverage-${type}`} className={`ml-2 text-sm ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Valores */}
            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Valor Consulta (R$) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={formData.pricing.consultationValue}
                      onChange={(e) => handleInputChange('pricing.consultationValue', parseFloat(e.target.value) || 0)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Multiplicador de Procedimentos
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.pricing.procedureMultiplier}
                      onChange={(e) => handleInputChange('pricing.procedureMultiplier', parseFloat(e.target.value) || 1)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                    <p className={`text-sm mt-1 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Fator aplicado aos valores dos procedimentos
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Contrato */}
            {activeTab === 'contract' && formData.type === 'convenio' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Número do Contrato
                    </label>
                    <input
                      type="text"
                      value={formData.contract.contractNumber}
                      onChange={(e) => handleInputChange('contract.contractNumber', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Tipo de Faturamento
                    </label>
                    <select
                      value={formData.contract.billingType}
                      onChange={(e) => handleInputChange('contract.billingType', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      {Object.entries(BILLING_TYPES).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Data de Início
                    </label>
                    <input
                      type="date"
                      value={formData.contract.startDate}
                      onChange={(e) => handleInputChange('contract.startDate', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Data de Renovação
                    </label>
                    <input
                      type="date"
                      value={formData.contract.renewalDate}
                      onChange={(e) => handleInputChange('contract.renewalDate', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Prazo de Pagamento (dias)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.contract.paymentTerms}
                      onChange={(e) => handleInputChange('contract.paymentTerms', parseInt(e.target.value) || 30)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Pessoa de Contato */}
                <div>
                  <h3 className={`text-lg font-medium mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Pessoa de Contato
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Nome
                      </label>
                      <input
                        type="text"
                        value={formData.contract.contactPerson.name}
                        onChange={(e) => handleInputChange('contract.contactPerson.name', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Cargo
                      </label>
                      <input
                        type="text"
                        value={formData.contract.contactPerson.position}
                        onChange={(e) => handleInputChange('contract.contactPerson.position', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={formData.contract.contactPerson.phone}
                        onChange={(e) => handleInputChange('contract.contactPerson.phone', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={formData.contract.contactPerson.email}
                        onChange={(e) => handleInputChange('contract.contactPerson.email', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className={`flex items-center justify-end gap-3 p-6 border-t ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}