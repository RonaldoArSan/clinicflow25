// Tipos para gerenciamento de convênios/planos de saúde

export interface HealthPlan {
  id: number;
  name: string;
  code: string;
  type: 'convenio' | 'particular';
  
  // Informações da empresa
  company: {
    name: string;
    cnpj: string;
    website?: string;
    phone: string;
    email: string;
    address: {
      street: string;
      number: string;
      complement?: string;
      district: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  
  // Configurações do plano
  configuration: {
    allowsScheduling: boolean;
    requiresAuthorization: boolean;
    authorizationDays: number;
    acceptsEmergency: boolean;
    hasCoParticipation: boolean;
    coParticipationPercentage?: number;
    minimumAge?: number;
    maximumAge?: number;
    coverageTypes: string[];
  };
  
  // Valores e tabelas
  pricing: {
    consultationValue: number;
    procedureMultiplier: number;
    customPricing: ProcedurePricing[];
  };
  
  // Dados contratuais
  contract: {
    contractNumber: string;
    startDate: string;
    endDate?: string;
    renewalDate: string;
    paymentTerms: number; // dias
    billingType: 'monthly' | 'procedure' | 'capitation';
    contactPerson: {
      name: string;
      phone: string;
      email: string;
      position: string;
    };
  };
  
  // Status e configurações
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  isDefault: boolean;
  observations?: string;
  
  // Auditoria
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  
  // Estatísticas
  statistics?: {
    totalPatients: number;
    monthlyRevenue: number;
    averageConsultationValue: number;
    pendingAuthorizations: number;
  };
}

export interface ProcedurePricing {
  procedureId: number;
  procedureCode: string;
  procedureName: string;
  price: number;
  covered: boolean;
  requiresAuthorization: boolean;
  coParticipation?: number;
}

export interface HealthPlanFilter {
  status?: string;
  type?: string;
  search?: string;
  hasContract?: boolean;
}

export interface HealthPlanStats {
  total: number;
  active: number;
  inactive: number;
  totalPatients: number;
  monthlyRevenue: number;
  pendingAuthorizations: number;
}

// Dados para autorização de procedimentos
export interface Authorization {
  id: number;
  healthPlanId: number;
  healthPlanName: string;
  patientId: number;
  patientName: string;
  procedureId: number;
  procedureName: string;
  doctorId: number;
  doctorName: string;
  requestDate: string;
  authorizationNumber?: string;
  status: 'pending' | 'approved' | 'denied' | 'expired';
  validUntil?: string;
  observations?: string;
  attachments?: string[];
}

export const HEALTH_PLAN_TYPES = {
  convenio: 'Convênio',
  particular: 'Particular'
} as const;

export const HEALTH_PLAN_STATUS = {
  active: 'Ativo',
  inactive: 'Inativo',
  suspended: 'Suspenso',
  pending: 'Pendente'
} as const;

export const BILLING_TYPES = {
  monthly: 'Mensal',
  procedure: 'Por Procedimento',
  capitation: 'Capitação'
} as const;

export const COVERAGE_TYPES = [
  'Consultas',
  'Exames Laboratoriais',
  'Exames de Imagem',
  'Cirurgias',
  'Internações',
  'Urgência/Emergência',
  'Fisioterapia',
  'Psicologia',
  'Nutrição',
  'Odontologia'
] as const;