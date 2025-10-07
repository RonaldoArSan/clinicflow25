// Tipos de usuário para sistema médico
// Hierarquia simplificada conforme solicitação:
// - admin: Acesso total ao Módulo Administração
// - receptionist: Acesso ao Módulo Recepção
// - financial: Acesso à parte Financeira do Módulo Administração
// - medical_professional (doctor): Acesso ao Módulo Atendimento Médico
export type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'financial' | 'viewer';

// Permissões específicas do sistema
export type Permission = 
  // Pacientes
  | 'patients:create' 
  | 'patients:read' 
  | 'patients:update' 
  | 'patients:delete'
  
  // Consultas/Agendamentos
  | 'appointments:create' 
  | 'appointments:read' 
  | 'appointments:update' 
  | 'appointments:delete'
  
  // Prontuários Médicos
  | 'medical-records:create' 
  | 'medical-records:read' 
  | 'medical-records:update' 
  | 'medical-records:delete'
  
  // Documentos
  | 'documents:create' 
  | 'documents:read' 
  | 'documents:update' 
  | 'documents:delete'
  
  // Equipe Médica
  | 'team:create' 
  | 'team:read' 
  | 'team:update' 
  | 'team:delete'
  
  // Procedimentos
  | 'procedures:create' 
  | 'procedures:read' 
  | 'procedures:update' 
  | 'procedures:delete'
  
  // Financeiro
  | 'financial:create' 
  | 'financial:read' 
  | 'financial:update' 
  | 'financial:delete'
  
  // Relatórios
  | 'analytics:read' 
  | 'analytics:export'
  
  // Configurações
  | 'settings:read' 
  | 'settings:update'
  
  // Administração
  | 'admin:users' 
  | 'admin:system' 
  | 'admin:backup';

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

// Configuração de papéis e suas permissões padrão
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    // Todas as permissões
    'patients:create', 'patients:read', 'patients:update', 'patients:delete',
    'appointments:create', 'appointments:read', 'appointments:update', 'appointments:delete',
    'medical-records:create', 'medical-records:read', 'medical-records:update', 'medical-records:delete',
    'documents:create', 'documents:read', 'documents:update', 'documents:delete',
    'team:create', 'team:read', 'team:update', 'team:delete',
    'procedures:create', 'procedures:read', 'procedures:update', 'procedures:delete',
    'financial:create', 'financial:read', 'financial:update', 'financial:delete',
    'analytics:read', 'analytics:export',
    'settings:read', 'settings:update',
    'admin:users', 'admin:system', 'admin:backup'
  ],
  
  doctor: [
    // Pacientes: total
    'patients:create', 'patients:read', 'patients:update', 'patients:delete',
    // Consultas: total
    'appointments:create', 'appointments:read', 'appointments:update', 'appointments:delete',
    // Prontuários: total
    'medical-records:create', 'medical-records:read', 'medical-records:update', 'medical-records:delete',
    // Documentos: total
    'documents:create', 'documents:read', 'documents:update', 'documents:delete',
    // Procedimentos: total
    'procedures:create', 'procedures:read', 'procedures:update', 'procedures:delete',
    // Equipe: apenas leitura
    'team:read',
    // Financeiro: apenas leitura dos próprios
    'financial:read',
    // Relatórios: leitura
    'analytics:read'
  ],
  
  nurse: [
    // Pacientes: CRUD
    'patients:create', 'patients:read', 'patients:update',
    // Consultas: CRUD
    'appointments:create', 'appointments:read', 'appointments:update',
    // Prontuários: leitura e alguns updates
    'medical-records:read', 'medical-records:update',
    // Documentos: CRUD
    'documents:create', 'documents:read', 'documents:update',
    // Procedimentos: alguns
    'procedures:read', 'procedures:update',
    // Equipe: leitura
    'team:read'
  ],
  
  receptionist: [
    // Pacientes: CRUD
    'patients:create', 'patients:read', 'patients:update',
    // Consultas: CRUD
    'appointments:create', 'appointments:read', 'appointments:update', 'appointments:delete',
    // Documentos: básicos
    'documents:create', 'documents:read', 'documents:update',
    // Equipe: leitura
    'team:read',
    // Procedimentos: leitura
    'procedures:read'
  ],
  
  financial: [
    // Acesso exclusivo à parte financeira do módulo administração
    'financial:create', 'financial:read', 'financial:update', 'financial:delete',
    // Relatórios financeiros
    'analytics:read',
    // Pacientes: apenas leitura para contexto financeiro
    'patients:read',
    // Consultas: apenas leitura para faturamento
    'appointments:read',
    // Procedimentos: leitura para faturamento
    'procedures:read'
  ],
  
  viewer: [
    // Apenas leituras básicas
    'patients:read',
    'appointments:read',
    'medical-records:read',
    'documents:read',
    'team:read',
    'procedures:read',
    'analytics:read'
  ]
};

// Descrições dos papéis
export const ROLE_DESCRIPTIONS: Record<UserRole, { title: string; description: string; icon: string }> = {
  admin: {
    title: 'Administrador',
    description: 'Acesso total ao Módulo Administração',
    icon: '⚙️'
  },
  doctor: {
    title: 'Médico/Profissional',
    description: 'Acesso ao Módulo Atendimento - prontuários e procedimentos médicos',
    icon: '👨‍⚕️'
  },
  nurse: {
    title: 'Enfermeiro',
    description: 'Gestão de pacientes, alguns procedimentos e acompanhamento',
    icon: '👩‍⚕️'
  },
  receptionist: {
    title: 'Recepcionista',
    description: 'Acesso ao Módulo Recepção - agendamentos e cadastros',
    icon: '🏥'
  },
  financial: {
    title: 'Financeiro',
    description: 'Acesso à parte Financeira do Módulo Administração',
    icon: '💰'
  },
  viewer: {
    title: 'Visualizador',
    description: 'Acesso somente leitura para consultas e relatórios',
    icon: '👁️'
  }
};

// Usuários de exemplo para desenvolvimento
export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Dr. João Silva',
    email: 'joao.silva@clinica.com.br',
    role: 'admin',
    permissions: ROLE_PERMISSIONS.admin,
    crm: 'CRM/SP 123456',
    specialty: 'Clínica Geral',
    department: 'Administração',
    phone: '(11) 99999-1111',
    status: 'active',
    isOnline: true,
    lastLogin: '2025-09-26T14:30:00Z',
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
    role: 'doctor',
    permissions: ROLE_PERMISSIONS.doctor,
    crm: 'CRM/SP 654321',
    specialty: 'Cardiologia',
    department: 'Clínica Médica',
    phone: '(11) 99999-2222',
    status: 'active',
    isOnline: true,
    lastLogin: '2025-09-26T14:45:00Z',
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
    name: 'Enf. Maria Santos',
    email: 'maria.santos@clinica.com.br',
    role: 'nurse',
    permissions: ROLE_PERMISSIONS.nurse,
    coren: 'COREN/SP 123456',
    department: 'Enfermagem',
    phone: '(11) 99999-3333',
    status: 'active',
    isOnline: false,
    lastLogin: '2025-09-26T08:00:00Z',
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
    id: '4',
    name: 'Carla Oliveira',
    email: 'carla.oliveira@clinica.com.br',
    role: 'receptionist',
    permissions: ROLE_PERMISSIONS.receptionist,
    department: 'Recepção',
    phone: '(11) 99999-4444',
    status: 'active',
    isOnline: true,
    lastLogin: '2025-09-26T07:30:00Z',
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
    id: '5',
    name: 'Roberto Costa',
    email: 'roberto.costa@clinica.com.br',
    role: 'financial',
    permissions: ROLE_PERMISSIONS.financial,
    department: 'Financeiro',
    phone: '(11) 99999-5555',
    status: 'active',
    isOnline: true,
    lastLogin: '2025-09-26T08:15:00Z',
    preferences: {
      darkMode: false,
      language: 'pt-BR',
      notifications: {
        email: true,
        push: true,
        sms: true
      }
    }
  }
];

// Tipos de módulos do sistema
export type ModuleType = 'reception' | 'medical' | 'administration';

// Configuração de acesso aos módulos por role
export const MODULE_ACCESS: Record<ModuleType, UserRole[]> = {
  reception: ['admin', 'receptionist', 'nurse'],
  medical: ['admin', 'doctor', 'nurse'],
  administration: ['admin', 'financial']
};

// Helper function para verificar acesso ao módulo
export function hasModuleAccess(role: UserRole, module: ModuleType): boolean {
  return MODULE_ACCESS[module].includes(role);
}

// Helper function para obter módulos acessíveis por um role
export function getAccessibleModules(role: UserRole): ModuleType[] {
  return (Object.keys(MODULE_ACCESS) as ModuleType[]).filter(
    module => MODULE_ACCESS[module].includes(role)
  );
}