import { useState, useCallback, useEffect } from 'react';
import { HealthPlan, HealthPlanFilter, HealthPlanStats, Authorization } from '@/types/healthPlan';

// Mock data para demonstração
const MOCK_HEALTH_PLANS: HealthPlan[] = [
  {
    id: 1,
    name: 'UNIMED Regional',
    code: 'UNI001',
    type: 'convenio',
    company: {
      name: 'Unimed Regional Cooperativa',
      cnpj: '12.345.678/0001-90',
      website: 'https://www.unimed.com.br',
      phone: '(11) 3333-4444',
      email: 'contato@unimed.com.br',
      address: {
        street: 'Av. Paulista',
        number: '1000',
        complement: '10º andar',
        district: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01310-100'
      }
    },
    configuration: {
      allowsScheduling: true,
      requiresAuthorization: true,
      authorizationDays: 3,
      acceptsEmergency: true,
      hasCoParticipation: true,
      coParticipationPercentage: 20,
      minimumAge: 0,
      maximumAge: 120,
      coverageTypes: ['Consultas', 'Exames Laboratoriais', 'Exames de Imagem', 'Cirurgias', 'Urgência/Emergência']
    },
    pricing: {
      consultationValue: 150.00,
      procedureMultiplier: 1.2,
      customPricing: []
    },
    contract: {
      contractNumber: 'UNI2024001',
      startDate: '2024-01-01',
      renewalDate: '2024-12-31',
      paymentTerms: 30,
      billingType: 'monthly',
      contactPerson: {
        name: 'Maria Silva',
        phone: '(11) 3333-4455',
        email: 'maria.silva@unimed.com.br',
        position: 'Gerente de Relacionamento'
      }
    },
    status: 'active',
    isDefault: false,
    observations: 'Principal convênio da clínica',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    createdBy: 'Admin',
    statistics: {
      totalPatients: 450,
      monthlyRevenue: 67500.00,
      averageConsultationValue: 150.00,
      pendingAuthorizations: 12
    }
  },
  {
    id: 2,
    name: 'SulAmérica Saúde',
    code: 'SUL001',
    type: 'convenio',
    company: {
      name: 'SulAmérica Seguros de Saúde S.A.',
      cnpj: '98.765.432/0001-10',
      website: 'https://www.sulamerica.com.br',
      phone: '(11) 4000-5555',
      email: 'saude@sulamerica.com.br',
      address: {
        street: 'Rua da Consolação',
        number: '247',
        district: 'Consolação',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01301-000'
      }
    },
    configuration: {
      allowsScheduling: true,
      requiresAuthorization: false,
      authorizationDays: 0,
      acceptsEmergency: true,
      hasCoParticipation: false,
      coverageTypes: ['Consultas', 'Exames Laboratoriais', 'Exames de Imagem']
    },
    pricing: {
      consultationValue: 180.00,
      procedureMultiplier: 1.0,
      customPricing: []
    },
    contract: {
      contractNumber: 'SUL2024001',
      startDate: '2024-01-01',
      renewalDate: '2024-12-31',
      paymentTerms: 45,
      billingType: 'procedure',
      contactPerson: {
        name: 'João Santos',
        phone: '(11) 4000-5566',
        email: 'joao.santos@sulamerica.com.br',
        position: 'Analista de Credenciamento'
      }
    },
    status: 'active',
    isDefault: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
    createdBy: 'Admin',
    statistics: {
      totalPatients: 230,
      monthlyRevenue: 41400.00,
      averageConsultationValue: 180.00,
      pendingAuthorizations: 0
    }
  },
  {
    id: 3,
    name: 'Particular',
    code: 'PART001',
    type: 'particular',
    company: {
      name: 'Atendimento Particular',
      cnpj: '',
      phone: '',
      email: '',
      address: {
        street: '',
        number: '',
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
      coverageTypes: ['Consultas', 'Exames Laboratoriais', 'Exames de Imagem', 'Cirurgias', 'Urgência/Emergência']
    },
    pricing: {
      consultationValue: 200.00,
      procedureMultiplier: 1.0,
      customPricing: []
    },
    contract: {
      contractNumber: '',
      startDate: '2024-01-01',
      renewalDate: '2024-12-31',
      paymentTerms: 0,
      billingType: 'procedure',
      contactPerson: {
        name: '',
        phone: '',
        email: '',
        position: ''
      }
    },
    status: 'active',
    isDefault: true,
    observations: 'Atendimento particular padrão',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'System',
    statistics: {
      totalPatients: 180,
      monthlyRevenue: 36000.00,
      averageConsultationValue: 200.00,
      pendingAuthorizations: 0
    }
  }
];

export function useHealthPlans() {
  const [healthPlans, setHealthPlans] = useState<HealthPlan[]>(MOCK_HEALTH_PLANS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filtrar convênios
  const filterHealthPlans = useCallback((filter: HealthPlanFilter) => {
    return healthPlans.filter(plan => {
      if (filter.status && plan.status !== filter.status) return false;
      if (filter.type && plan.type !== filter.type) return false;
      if (filter.hasContract !== undefined && filter.hasContract && !plan.contract.contractNumber) return false;
      if (filter.search) {
        const search = filter.search.toLowerCase();
        return (
          plan.name.toLowerCase().includes(search) ||
          plan.code.toLowerCase().includes(search) ||
          plan.company.name.toLowerCase().includes(search)
        );
      }
      return true;
    });
  }, [healthPlans]);

  // Buscar convênio por ID
  const getHealthPlanById = useCallback((id: number) => {
    return healthPlans.find(plan => plan.id === id);
  }, [healthPlans]);

  // Criar novo convênio
  const createHealthPlan = useCallback(async (data: Omit<HealthPlan, 'id' | 'createdAt' | 'updatedAt' | 'statistics'>) => {
    setLoading(true);
    setError(null);
    
    try {
      const newPlan: HealthPlan = {
        ...data,
        id: Math.max(...healthPlans.map(p => p.id)) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        statistics: {
          totalPatients: 0,
          monthlyRevenue: 0,
          averageConsultationValue: data.pricing.consultationValue,
          pendingAuthorizations: 0
        }
      };
      
      setHealthPlans(prev => [...prev, newPlan]);
      return newPlan;
    } catch (err) {
      setError('Erro ao criar convênio');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [healthPlans]);

  // Atualizar convênio
  const updateHealthPlan = useCallback(async (id: number, data: Partial<HealthPlan>) => {
    setLoading(true);
    setError(null);
    
    try {
      setHealthPlans(prev => prev.map(plan => 
        plan.id === id 
          ? { ...plan, ...data, updatedAt: new Date().toISOString() }
          : plan
      ));
    } catch (err) {
      setError('Erro ao atualizar convênio');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Excluir convênio
  const deleteHealthPlan = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const plan = getHealthPlanById(id);
      if (plan?.statistics?.totalPatients && plan.statistics.totalPatients > 0) {
        throw new Error('Não é possível excluir convênio com pacientes vinculados');
      }
      
      setHealthPlans(prev => prev.filter(plan => plan.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir convênio');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getHealthPlanById]);

  // Definir convênio padrão
  const setDefaultHealthPlan = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      setHealthPlans(prev => prev.map(plan => ({
        ...plan,
        isDefault: plan.id === id,
        updatedAt: new Date().toISOString()
      })));
    } catch (err) {
      setError('Erro ao definir convênio padrão');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Alternar status do convênio
  const toggleHealthPlanStatus = useCallback(async (id: number) => {
    const plan = getHealthPlanById(id);
    if (!plan) return;
    
    const newStatus = plan.status === 'active' ? 'inactive' : 'active';
    await updateHealthPlan(id, { status: newStatus });
  }, [getHealthPlanById, updateHealthPlan]);

  // Obter estatísticas gerais
  const getHealthPlanStats = useCallback((): HealthPlanStats => {
    const total = healthPlans.length;
    const active = healthPlans.filter(p => p.status === 'active').length;
    const inactive = total - active;
    const totalPatients = healthPlans.reduce((sum, p) => sum + (p.statistics?.totalPatients || 0), 0);
    const monthlyRevenue = healthPlans.reduce((sum, p) => sum + (p.statistics?.monthlyRevenue || 0), 0);
    const pendingAuthorizations = healthPlans.reduce((sum, p) => sum + (p.statistics?.pendingAuthorizations || 0), 0);
    
    return {
      total,
      active,
      inactive,
      totalPatients,
      monthlyRevenue,
      pendingAuthorizations
    };
  }, [healthPlans]);

  // Buscar convênios ativos
  const getActiveHealthPlans = useCallback(() => {
    return healthPlans.filter(plan => plan.status === 'active');
  }, [healthPlans]);

  // Buscar convênio padrão
  const getDefaultHealthPlan = useCallback(() => {
    return healthPlans.find(plan => plan.isDefault);
  }, [healthPlans]);

  return {
    healthPlans,
    loading,
    error,
    filterHealthPlans,
    getHealthPlanById,
    createHealthPlan,
    updateHealthPlan,
    deleteHealthPlan,
    setDefaultHealthPlan,
    toggleHealthPlanStatus,
    getHealthPlanStats,
    getActiveHealthPlans,
    getDefaultHealthPlan
  };
}