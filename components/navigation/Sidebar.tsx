import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X,
  Home,
  Users,
  Calendar,
  FileText,
  Stethoscope,
  DollarSign,
  Settings,
  BarChart3,
  UserCheck,
  Clipboard,
  Upload,
  Shield,
  Eye,
  Building2,
  Clock,
  UserPlus,
  Receipt,
  Archive,
  Brain,
  Phone,
  CheckSquare,
  CreditCard,
  PieChart,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useUserContext } from '../../hooks/useUserContext';
import { UserRole } from '../../types/user';

interface SidebarProps {
  darkMode?: boolean;
  currentView: string;
  onViewChange: (view: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

// Definir itens de menu específicos por role
const getMenuItemsByRole = (role: UserRole) => {
  const commonItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, color: "blue" }
  ];

  switch (role) {
    case 'admin':
      return [
        ...commonItems,
        { id: "patients", label: "Pacientes", icon: Users, color: "emerald" },
        { id: "appointments", label: "Agenda", icon: Calendar, color: "indigo" },
        { id: "records", label: "Prontuários", icon: Clipboard, color: "teal" },
        { id: "procedures", label: "Procedimentos", icon: Stethoscope, color: "cyan" },
        { id: "documents", label: "Documentos", icon: FileText, color: "amber" },
        { id: "team", label: "Equipe", icon: UserCheck, color: "purple" },
        { id: "financial", label: "Financeiro", icon: DollarSign, color: "green" },
        { id: "analytics", label: "Relatórios", icon: BarChart3, color: "violet" },
        { id: "ai-insights", label: "IA Insights", icon: Brain, color: "pink" },
        { id: "settings", label: "Configurações", icon: Settings, color: "gray" }
      ];
      
    case 'medical':
      return [
        ...commonItems,
        { id: "appointments", label: "Minha Agenda", icon: Calendar, color: "indigo" },
        { id: "patients", label: "Meus Pacientes", icon: Users, color: "emerald" },
        { id: "records", label: "Prontuários", icon: Clipboard, color: "teal" },
        { id: "procedures", label: "Procedimentos", icon: Stethoscope, color: "cyan" },
        { id: "documents", label: "Laudos & Receitas", icon: FileText, color: "amber" },
        { id: "ai-insights", label: "Suporte IA", icon: Brain, color: "pink" },
        { id: "analytics", label: "Meus Relatórios", icon: Activity, color: "violet" }
      ];
      
    case 'reception':
      return [
        ...commonItems,
        { id: "checkin", label: "Check-in/out", icon: CheckSquare, color: "blue" },
        { id: "appointments", label: "Agendamentos", icon: Calendar, color: "indigo" },
        { id: "patients", label: "Cadastro Pacientes", icon: UserPlus, color: "emerald" },
        { id: "queue", label: "Fila de Espera", icon: Clock, color: "orange" },
        { id: "documents", label: "Documentos", icon: Upload, color: "amber" },
        { id: "contacts", label: "Contatos", icon: Phone, color: "green" }
      ];
      
    case 'financial':
      return [
        ...commonItems,
        { id: "financial", label: "Controle Financeiro", icon: DollarSign, color: "green" },
        { id: "billing", label: "Faturamento", icon: Receipt, color: "blue" },
        { id: "payments", label: "Pagamentos", icon: CreditCard, color: "purple" },
        { id: "analytics", label: "Relatórios Financeiros", icon: PieChart, color: "violet" },
        { id: "revenue", label: "Receitas", icon: TrendingUp, color: "emerald" },
        { id: "expenses", label: "Despesas", icon: Archive, color: "red" }
      ];
      
    case 'viewer':
      return [
        ...commonItems,
        { id: "appointments", label: "Visualizar Agenda", icon: Eye, color: "gray" },
        { id: "patients", label: "Visualizar Pacientes", icon: Users, color: "gray" },
        { id: "reports", label: "Relatórios", icon: BarChart3, color: "gray" }
      ];
      
    default:
      return commonItems;
  }
};

const getRoleInfo = (role: UserRole) => {
  switch (role) {
    case 'admin':
      return {
        title: 'Administrador',
        subtitle: 'Acesso completo ao sistema',
        color: 'from-red-500 to-pink-600',
        icon: Shield
      };
    case 'medical':
      return {
        title: 'Médico/Profissional',
        subtitle: 'Módulo de atendimento médico',
        color: 'from-blue-500 to-cyan-600',
        icon: Stethoscope
      };
    case 'reception':
      return {
        title: 'Recepção',
        subtitle: 'Atendimento e cadastros',
        color: 'from-emerald-500 to-teal-600',
        icon: Building2
      };
    case 'financial':
      return {
        title: 'Financeiro',
        subtitle: 'Gestão financeira',
        color: 'from-green-500 to-emerald-600',
        icon: DollarSign
      };
    case 'viewer':
      return {
        title: 'Visualizador',
        subtitle: 'Acesso de consulta',
        color: 'from-gray-500 to-gray-600',
        icon: Eye
      };
    default:
      return {
        title: 'Usuário',
        subtitle: 'Sistema médico',
        color: 'from-blue-500 to-blue-600',
        icon: Users
      };
  }
};

const Sidebar: React.FC<SidebarProps> = ({
  darkMode = false,
  currentView,
  onViewChange,
  isCollapsed,
  onToggleCollapse,
  isMobile = false,
  isOpen = true,
  onClose
}) => {
  const { currentUser } = useUserContext();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  if (!currentUser) return null;

  const menuItems = getMenuItemsByRole(currentUser.role);
  const roleInfo = getRoleInfo(currentUser.role);
  const RoleIcon = roleInfo.icon;

  // Auto-collapse em mobile
  useEffect(() => {
    if (isMobile && currentView) {
      onClose?.();
    }
  }, [currentView, isMobile, onClose]);

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-72';
  const sidebarTranslate = isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0';

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 ${sidebarWidth} 
        ${darkMode ? "bg-gray-900" : "bg-white"} 
        shadow-2xl transform transition-all duration-300 ease-in-out
        ${sidebarTranslate}
        lg:translate-x-0 lg:static lg:inset-0 lg:z-0
        border-r ${darkMode ? "border-gray-700" : "border-gray-200"}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`
            p-4 ${darkMode ? "border-gray-700" : "border-gray-200"} border-b
            ${isCollapsed ? 'px-2' : 'px-6'}
          `}>
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center space-x-3">
                  <div className={`
                    p-2 rounded-lg bg-gradient-to-r ${roleInfo.color}
                  `}>
                    <RoleIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className={`font-bold text-sm ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                      {roleInfo.title}
                    </h2>
                    <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {roleInfo.subtitle}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Toggle Button */}
              <button
                onClick={onToggleCollapse}
                className={`
                  p-2 rounded-lg transition-colors hidden lg:block
                  ${darkMode 
                    ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }
                  ${isCollapsed ? 'mx-auto' : ''}
                `}
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>

              {/* Mobile Close Button */}
              {isMobile && (
                <button
                  onClick={onClose}
                  className={`
                    p-2 rounded-lg transition-colors lg:hidden
                    ${darkMode 
                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }
                  `}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              const isHovered = hoveredItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-left 
                    transition-all duration-200 group relative
                    ${isCollapsed ? 'justify-center px-2' : ''}
                    ${isActive 
                      ? `bg-gradient-to-r ${roleInfo.color} text-white shadow-lg` 
                      : darkMode 
                        ? "text-gray-300 hover:bg-gray-800 hover:text-gray-100" 
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={`
                    w-5 h-5 transition-transform duration-200
                    ${isHovered ? 'scale-110' : 'scale-100'}
                    ${isActive ? 'text-white' : ''}
                  `} />
                  
                  {!isCollapsed && (
                    <span className="font-medium text-sm">
                      {item.label}
                    </span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && isHovered && (
                    <div className={`
                      absolute left-full ml-2 px-3 py-2 rounded-lg shadow-lg z-50
                      ${darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-900 text-white"}
                      text-sm font-medium whitespace-nowrap
                    `}>
                      {item.label}
                      <div className={`
                        absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1
                        w-2 h-2 rotate-45
                        ${darkMode ? "bg-gray-800" : "bg-gray-900"}
                      `} />
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Info Footer */}
          <div className={`
            p-4 ${darkMode ? "border-gray-700" : "border-gray-200"} border-t
            ${isCollapsed ? 'px-2' : 'px-4'}
          `}>
            {!isCollapsed ? (
              <div className="flex items-center space-x-3">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-white font-medium
                  bg-gradient-to-r ${roleInfo.color}
                `}>
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                    {currentUser.name}
                  </p>
                  <p className={`text-xs truncate ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {currentUser.email || 'usuario@clinica.com'}
                  </p>
                </div>
                <div className={`
                  w-3 h-3 rounded-full 
                  ${currentUser.isOnline ? 'bg-green-500' : 'bg-gray-400'}
                `} />
              </div>
            ) : (
              <div className="flex justify-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-xs
                  bg-gradient-to-r ${roleInfo.color}
                `}>
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;