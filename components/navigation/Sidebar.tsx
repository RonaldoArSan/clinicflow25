import React from 'react';
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Clipboard, 
  Stethoscope, 
  FileText, 
  UserCheck, 
  DollarSign, 
  TrendingUp, 
  Brain, 
  Settings,
  Timer,
  Activity,
  Phone,
  Star
} from 'lucide-react';
import { useUserContext } from '../../hooks/useUserContext';
import { UserRole } from '../../types/user';

export interface SidebarProps {
  darkMode: boolean;
  currentView: string;
  onViewChange: (view: string) => void;
  collapsed?: boolean;
}

// Definir itens de menu por role
const getMenuItemsByRole = (role: UserRole) => {
  const baseItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, roles: ['admin', 'doctor', 'nurse'] },
    { id: "reception-dashboard", label: "Recepção", icon: Activity, roles: ['receptionist'] },
    { id: "appointments", label: "Agendamentos", icon: Calendar, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
    { id: "patients", label: "Pacientes", icon: Users, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
    { id: "checkin", label: "Check-in", icon: UserCheck, roles: ['receptionist'] },
    { id: "queue", label: "Fila de Espera", icon: Timer, roles: ['receptionist', 'nurse'] },
    { id: "records", label: "Prontuários", icon: Clipboard, roles: ['admin', 'doctor', 'nurse'] },
    { id: "procedures", label: "Procedimentos", icon: Stethoscope, roles: ['admin', 'doctor', 'nurse'] },
    { id: "documents", label: "Documentos", icon: FileText, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
    { id: "contacts", label: "Contatos", icon: Phone, roles: ['receptionist', 'admin'] },
    { id: "team", label: "Equipe Médica", icon: UserCheck, roles: ['admin', 'doctor'] },
    { id: "financial", label: "Financeiro", icon: DollarSign, roles: ['admin', 'receptionist'] },
    { id: "analytics", label: "Relatórios", icon: TrendingUp, roles: ['admin', 'doctor'] },
    { id: "ai-insights", label: "Insights IA", icon: Brain, roles: ['admin', 'doctor'] },
    { id: "settings", label: "Configurações", icon: Settings, roles: ['admin'] }
  ];

  return baseItems.filter(item => item.roles.includes(role));
};

const Sidebar: React.FC<SidebarProps> = ({
  darkMode,
  currentView,
  onViewChange,
  collapsed = false
}) => {
  const { currentUser } = useUserContext();
  
  if (!currentUser) return null;

  const menuItems = getMenuItemsByRole(currentUser.role);

  // Determinar qual dashboard mostrar baseado na role
  const getDashboardView = () => {
    if (currentUser.role === 'receptionist') {
      return 'reception-dashboard';
    }
    return 'dashboard';
  };

  // Se a view atual é dashboard mas o usuário é recepcionista, ajustar
  const adjustedCurrentView = currentView === 'dashboard' && currentUser.role === 'receptionist' 
    ? 'reception-dashboard' 
    : currentView;

  return (
    <aside className={`
      ${collapsed ? 'w-16' : 'w-64'} 
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
      border-r transition-all duration-300 h-full overflow-y-auto
    `}>
      <div className="flex flex-col h-full">
        {/* Header do sidebar */}
        <div className={`p-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
          {!collapsed && (
            <div>
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                ClinicFlow
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentUser.role === 'admin' && 'Administração'}
                {currentUser.role === 'doctor' && 'Área Médica'}
                {currentUser.role === 'nurse' && 'Enfermagem'}
                {currentUser.role === 'receptionist' && 'Recepção'}
                {currentUser.role === 'viewer' && 'Visualização'}
              </p>
            </div>
          )}
        </div>

        {/* Menu principal */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = adjustedCurrentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  // Se for dashboard e o usuário for recepcionista, navegar para reception-dashboard
                  if (item.id === 'dashboard' && currentUser.role === 'receptionist') {
                    onViewChange('reception-dashboard');
                  } else if (item.id === 'reception-dashboard') {
                    onViewChange('reception-dashboard');
                  } else {
                    onViewChange(item.id);
                  }
                }}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors
                  ${isActive 
                    ? darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700' 
                    : darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-100' : 'text-gray-700 hover:bg-gray-100'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Informações do usuário */}
        {!collapsed && (
          <div className={`p-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t`}>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <span className="text-sm font-medium">
                  {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {currentUser.name}
                </p>
                <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentUser.specialty || currentUser.department || 
                   (currentUser.role === 'admin' ? 'Administrador' :
                    currentUser.role === 'doctor' ? 'Médico' :
                    currentUser.role === 'nurse' ? 'Enfermeiro' :
                    currentUser.role === 'receptionist' ? 'Recepcionista' : 'Usuário')}
                </p>
              </div>
            </div>
            
            {/* Status online */}
            {currentUser.isOnline && (
              <div className="mt-2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Online
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;