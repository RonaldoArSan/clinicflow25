// Tipos de usuário para sistema médico
export type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'viewer';

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
    // Financeiro: básico
    'financial:create', 'financial:read', 'financial:update',
    // Equipe: leitura
    'team:read',
    // Procedimentos: leitura
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
    description: 'Acesso total ao sistema, configurações e gestão de usuários',
    icon: '⚙️'
  },
  doctor: {
    title: 'Médico',
    description: 'Acesso completo a prontuários, prescrições e consultas médicas',
    icon: '👨‍⚕️'
  },
  nurse: {
    title: 'Enfermeiro',
    description: 'Gestão de pacientes, alguns procedimentos e acompanhamento',
    icon: '👩‍⚕️'
  },
  receptionist: {
    title: 'Recepcionista',
    description: 'Agendamentos, cadastro de pacientes e gestão administrativa',
    icon: '🏥'
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
  }
];