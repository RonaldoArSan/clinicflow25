import React from 'react';
import { 
  Users, 
  Stethoscope, 
  Settings,
  Building2,
  UserCheck,
  Calendar
} from 'lucide-react';
import { useUserContext } from '../../hooks/useUserContext';

export type ModuleType = 'reception' | 'medical' | 'administration';

interface ModuleNavigationProps {
  currentModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
  darkMode?: boolean;
}

// Definir quais roles podem acessar cada módulo
const MODULE_PERMISSIONS = {
  reception: ['receptionist', 'admin', 'nurse', 'doctor'],
  medical: ['doctor', 'nurse', 'admin'],
  administration: ['admin', 'doctor'] // apenas funções gerenciais
};

const MODULES = [
  {
    id: 'reception' as ModuleType,
    name: 'Recepção',
    description: 'Agendamentos, pacientes e atendimento inicial',
    icon: Building2,
    color: 'blue'
  },
  {
    id: 'medical' as ModuleType,
    name: 'Atendimento',
    description: 'Prontuários, procedimentos e atividades médicas',
    icon: Stethoscope,
    color: 'green'
  },
  {
    id: 'administration' as ModuleType,
    name: 'Administração',
    description: 'Gestão, financeiro e relatórios estratégicos',
    icon: Settings,
    color: 'purple'
  }
];

export default function ModuleNavigation({ 
  currentModule, 
  onModuleChange, 
  darkMode = false 
}: ModuleNavigationProps) {
  const { currentUser } = useUserContext();

  // Filtrar módulos baseado nas permissões do usuário
  const availableModules = MODULES.filter(module => 
    MODULE_PERMISSIONS[module.id]?.includes(currentUser?.role || '')
  );

  const getModuleColors = (moduleColor: string, isActive: boolean) => {
    const colors = {
      blue: {
        active: darkMode 
          ? 'bg-blue-900/30 text-blue-400 border-blue-400' 
          : 'bg-blue-100 text-blue-700 border-blue-500',
        inactive: darkMode 
          ? 'text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 border-transparent' 
          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 border-transparent'
      },
      green: {
        active: darkMode 
          ? 'bg-green-900/30 text-green-400 border-green-400' 
          : 'bg-green-100 text-green-700 border-green-500',
        inactive: darkMode 
          ? 'text-gray-400 hover:text-green-400 hover:bg-green-900/20 border-transparent' 
          : 'text-gray-600 hover:text-green-600 hover:bg-green-50 border-transparent'
      },
      purple: {
        active: darkMode 
          ? 'bg-purple-900/30 text-purple-400 border-purple-400' 
          : 'bg-purple-100 text-purple-700 border-purple-500',
        inactive: darkMode 
          ? 'text-gray-400 hover:text-purple-400 hover:bg-purple-900/20 border-transparent' 
          : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50 border-transparent'
      }
    };

    return colors[moduleColor as keyof typeof colors]?.[isActive ? 'active' : 'inactive'] || colors.blue.inactive;
  };

  return (
    <div className={`
      border-b transition-colors
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1">
          {availableModules.map((module) => {
            const Icon = module.icon;
            const isActive = currentModule === module.id;
            
            return (
              <button
                key={module.id}
                onClick={() => onModuleChange(module.id)}
                className={`
                  flex items-center space-x-3 px-4 py-3 border-b-2 transition-all duration-200
                  ${getModuleColors(module.color, isActive)}
                `}
                title={module.description}
              >
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">{module.name}</div>
                  <div className="text-xs opacity-75 hidden sm:block">
                    {module.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}