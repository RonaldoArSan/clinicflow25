// Hierarquia Simples de Usuários por Módulos - ClinicFlow25

// Tipos de usuário para sistema médico - Hierarquia Simples por Módulos
export type UserRole = 
  | 'admin'              // Administrador - Acesso total
  | 'medical'            // Médico/Profissional - Módulo Atendimento
  | 'reception'          // Usuário Recepção - Módulo Recepção
  | 'financial'          // Usuário Financeiro - Área Financeira do Módulo Administração
  | 'viewer';            // Visualizador - Acesso limitado

// Definir módulo principal por role
export type ModuleAccess = 'reception' | 'medical' | 'administration';

export const ROLE_MODULE_ACCESS: Record<UserRole, ModuleAccess[]> = {
  admin: ['reception', 'medical', 'administration'],        // Acesso total
  medical: ['medical'],                                      // Apenas atendimento
  reception: ['reception'],                                  // Apenas recepção
  financial: ['administration'],                             // Apenas administração (área financeira)
  viewer: ['reception', 'medical', 'administration']        // Leitura em todos (limitado)
};

// Permissões específicas do sistema - Organizadas por Módulo
export type Permission = 
  // === MÓDULO RECEPÇÃO ===
  // Pacientes
  | 'reception:patients:create' 
  | 'reception:patients:read' 
  | 'reception:patients:update' 
  | 'reception:patients:delete'
  
  // Agendamentos
  | 'reception:appointments:create' 
  | 'reception:appointments:read' 
  | 'reception:appointments:update' 
  | 'reception:appointments:delete'
  
  // Check-in/out e Fila
  | 'reception:checkin:manage'
  | 'reception:queue:manage'
  | 'reception:queue:priority'
  
  // === MÓDULO ATENDIMENTO ===
  // Prontuários Médicos
  | 'medical:records:create' 
  | 'medical:records:read' 
  | 'medical:records:update' 
  | 'medical:records:delete'
  
  // Procedimentos e Exames
  | 'medical:procedures:create' 
  | 'medical:procedures:read' 
  | 'medical:procedures:update' 
  | 'medical:procedures:delete'
  
  // Prescrições
  | 'medical:prescriptions:create'
  | 'medical:prescriptions:read'
  | 'medical:prescriptions:update'
  
  // === MÓDULO ADMINISTRAÇÃO ===
  // Financeiro
  | 'admin:financial:create' 
  | 'admin:financial:read' 
  | 'admin:financial:update' 
  | 'admin:financial:delete'
  | 'admin:financial:reports'
  
  // Equipe e Usuários
  | 'admin:team:create' 
  | 'admin:team:read' 
  | 'admin:team:update' 
  | 'admin:team:delete'
  | 'admin:users:manage'
  
  // Relatórios e Analytics
  | 'admin:analytics:read' 
  | 'admin:analytics:export'
  | 'admin:reports:generate'
  
  // Configurações do Sistema
  | 'admin:settings:read' 
  | 'admin:settings:update'
  | 'admin:system:backup'
  | 'admin:system:maintenance'
  
  // === PERMISSÕES GERAIS ===
  // Documentos (todos os módulos)
  | 'documents:create' 
  | 'documents:read' 
  | 'documents:update' 
  | 'documents:delete';

// Interface do usuário principal
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  
  // Informações profissionais
  crm?: string;
  coren?: string;
  specialty?: string;
  department?: string;
  
  // Informações pessoais
  phone?: string;
  avatar?: string;
  
  // Status e configurações
  status: 'active' | 'inactive' | 'suspended';
  isOnline?: boolean;
  lastLogin?: string;
  
  // Configurações pessoais
  preferences: {
    darkMode: boolean;
    language: string;
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
}

// Configuração de papéis e suas permissões - Hierarquia Simples
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  // ADMINISTRADOR - Acesso Total a Todos os Módulos
  admin: [
    // Recepção - Todas
    'reception:patients:create', 'reception:patients:read', 'reception:patients:update', 'reception:patients:delete',
    'reception:appointments:create', 'reception:appointments:read', 'reception:appointments:update', 'reception:appointments:delete',
    'reception:checkin:manage', 'reception:queue:manage', 'reception:queue:priority',
    
    // Atendimento - Todas
    'medical:records:create', 'medical:records:read', 'medical:records:update', 'medical:records:delete',
    'medical:procedures:create', 'medical:procedures:read', 'medical:procedures:update', 'medical:procedures:delete',
    'medical:prescriptions:create', 'medical:prescriptions:read', 'medical:prescriptions:update',
    
    // Administração - Todas
    'admin:financial:create', 'admin:financial:read', 'admin:financial:update', 'admin:financial:delete', 'admin:financial:reports',
    'admin:team:create', 'admin:team:read', 'admin:team:update', 'admin:team:delete', 'admin:users:manage',
    'admin:analytics:read', 'admin:analytics:export', 'admin:reports:generate',
    'admin:settings:read', 'admin:settings:update', 'admin:system:backup', 'admin:system:maintenance',
    
    // Documentos
    'documents:create', 'documents:read', 'documents:update', 'documents:delete'
  ],
  
  // USUÁRIO MÉDICO/PROFISSIONAL - Módulo Atendimento
  medical: [
    // Atendimento - Completo
    'medical:records:create', 'medical:records:read', 'medical:records:update', 'medical:records:delete',
    'medical:procedures:create', 'medical:procedures:read', 'medical:procedures:update', 'medical:procedures:delete',
    'medical:prescriptions:create', 'medical:prescriptions:read', 'medical:prescriptions:update',
    
    // Documentos médicos
    'documents:create', 'documents:read', 'documents:update',
    
    // Leitura básica de outros módulos
    'reception:patients:read', 'reception:appointments:read',
    'admin:team:read'
  ],
  
  // USUÁRIO RECEPÇÃO - Módulo Recepção
  reception: [
    // Recepção - Completo
    'reception:patients:create', 'reception:patients:read', 'reception:patients:update', 'reception:patients:delete',
    'reception:appointments:create', 'reception:appointments:read', 'reception:appointments:update', 'reception:appointments:delete',
    'reception:checkin:manage', 'reception:queue:manage', 'reception:queue:priority',
    
    // Documentos básicos
    'documents:create', 'documents:read', 'documents:update',
    
    // Leitura limitada
    'admin:team:read', 'medical:procedures:read'
  ],
  
  // USUÁRIO FINANCEIRO - Área Financeira do Módulo Administração
  financial: [
    // Administração - Apenas Financeiro
    'admin:financial:create', 'admin:financial:read', 'admin:financial:update', 'admin:financial:delete', 'admin:financial:reports',
    'admin:analytics:read', 'admin:reports:generate',
    
    // Documentos financeiros
    'documents:create', 'documents:read', 'documents:update',
    
    // Leitura básica para contexto
    'reception:patients:read', 'reception:appointments:read',
    'admin:team:read'
  ],
  
  // VISUALIZADOR - Acesso Limitado de Leitura
  viewer: [
    // Apenas leituras básicas em todos os módulos
    'reception:patients:read', 'reception:appointments:read',
    'medical:records:read', 'medical:procedures:read',
    'admin:analytics:read', 'admin:team:read',
    'documents:read'
  ]
};

// Descrições dos papéis - Hierarquia Simples
export const ROLE_DESCRIPTIONS: Record<UserRole, { title: string; description: string; icon: string; module: string }> = {
  admin: {
    title: 'Administrador',
    description: 'Acesso total a todos os módulos do sistema',
    icon: '⚙️',
    module: 'Todos os Módulos'
  },
  medical: {
    title: 'Médico/Profissional',
    description: 'Acesso ao módulo de atendimento médico',
    icon: '👨‍⚕️',
    module: 'Módulo Atendimento'
  },
  reception: {
    title: 'Usuário Recepção',
    description: 'Acesso ao módulo de recepção e atendimento inicial',
    icon: '🏥',
    module: 'Módulo Recepção'
  },
  financial: {
    title: 'Usuário Financeiro',
    description: 'Acesso à área financeira do módulo administração',
    icon: '💰',
    module: 'Módulo Administração (Financeiro)'
  },
  viewer: {
    title: 'Visualizador',
    description: 'Acesso de leitura limitado em todos os módulos',
    icon: '👁️',
    module: 'Todos (Somente Leitura)'
  }
};

// Usuários de exemplo para desenvolvimento - Hierarquia Simples
export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Dr. João Silva',
    email: 'joao.silva@clinica.com.br',
    role: 'admin',
    permissions: ROLE_PERMISSIONS.admin,
    crm: 'CRM/SP 123456',
    specialty: 'Administração',
    department: 'Direção',
    phone: '(11) 99999-1111',
    status: 'active',
    isOnline: true,
    lastLogin: '2025-10-07T14:30:00Z',
    preferences: {
      darkMode: false,
      language: 'pt-BR',
      notifications: {
        email: true,
        push: true,
        sms: false
      }
    }
  },
  {
    id: '2',
    name: 'Dra. Ana Paula Silva',
    email: 'ana.paula@clinica.com.br',
    role: 'medical',
    permissions: ROLE_PERMISSIONS.medical,
    crm: 'CRM/SP 654321',
    specialty: 'Cardiologia',
    department: 'Atendimento Médico',
    phone: '(11) 99999-2222',
    status: 'active',
    isOnline: true,
    lastLogin: '2025-10-07T14:45:00Z',
    preferences: {
      darkMode: true,
      language: 'pt-BR',
      notifications: {
        email: true,
        push: true,
        sms: true
      }
    }
  },
  {
    id: '3',
    name: 'Carla Oliveira',
    email: 'carla.oliveira@clinica.com.br',
    role: 'reception',
    permissions: ROLE_PERMISSIONS.reception,
    department: 'Recepção',
    phone: '(11) 99999-3333',
    status: 'active',
    isOnline: true,
    lastLogin: '2025-10-07T08:00:00Z',
    preferences: {
      darkMode: false,
      language: 'pt-BR',
      notifications: {
        email: true,
        push: true,
        sms: false
      }
    }
  },
  {
    id: '4',
    name: 'Pedro Santos',
    email: 'pedro.santos@clinica.com.br',
    role: 'financial',
    permissions: ROLE_PERMISSIONS.financial,
    department: 'Financeiro',
    phone: '(11) 99999-4444',
    status: 'active',
    isOnline: false,
    lastLogin: '2025-10-07T09:30:00Z',
    preferences: {
      darkMode: false,
      language: 'pt-BR',
      notifications: {
        email: true,
        push: false,
        sms: false
      }
    }
  },
  {
    id: '5',
    name: 'Enf. Maria Santos',
    email: 'maria.santos@clinica.com.br',
    role: 'medical',
    permissions: ROLE_PERMISSIONS.medical,
    coren: 'COREN/SP 123456',
    department: 'Enfermagem',
    phone: '(11) 99999-5555',
    status: 'active',
    isOnline: false,
    lastLogin: '2025-10-07T07:30:00Z',
    preferences: {
      darkMode: false,
      language: 'pt-BR',
      notifications: {
        email: true,
        push: false,
        sms: false
      }
    }
  }
];

// Função para verificar acesso ao módulo
export function hasModuleAccess(userRole: UserRole, module: ModuleAccess): boolean {
  return ROLE_MODULE_ACCESS[userRole]?.includes(module) || false;
}

// Função para obter módulos acessíveis
export function getAccessibleModules(userRole: UserRole): ModuleAccess[] {
  return ROLE_MODULE_ACCESS[userRole] || [];
}

// Função para verificar se é administrador
export function isAdmin(userRole: UserRole): boolean {
  return userRole === 'admin';
}

// Função para verificar se tem acesso financeiro
export function hasFinancialAccess(userRole: UserRole): boolean {
  return userRole === 'admin' || userRole === 'financial';
}

// Função para verificar se é profissional de saúde
export function isHealthProfessional(userRole: UserRole): boolean {
  return userRole === 'medical' || userRole === 'admin';
}