import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Shield, 
  Clock,
  Bell,
  Search
} from 'lucide-react';
import { useUserContext } from '../hooks/useUserContext';
import { UserRole } from '../types/user';
import { useClinicSettings } from '../hooks/useData';

interface UserHeaderProps {
  darkMode?: boolean;
  className?: string;
  onToggleDarkMode?: () => void;
}

function UserAvatar({ user, size = 'md' }: { user: any, size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-sm', 
    lg: 'w-12 h-12 text-base'
  };

  const initials = user.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`
      ${sizeClasses[size]}
      rounded-full bg-gradient-to-br from-blue-500 to-purple-600
      flex items-center justify-center text-white font-semibold
      shadow-sm
    `}>
      {initials}
    </div>
  );
}

function RoleBadge({ role, darkMode }: { role: UserRole, darkMode: boolean }) {
  const getRoleConfig = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return {
          label: 'Administrador',
          color: 'from-red-500 to-pink-600',
          textColor: 'text-white'
        };
      case 'doctor':
        return {
          label: 'Médico',
          color: 'from-blue-500 to-blue-600',
          textColor: 'text-white'
        };
      case 'nurse':
        return {
          label: 'Enfermeiro(a)',
          color: 'from-green-500 to-green-600',
          textColor: 'text-white'
        };
      case 'receptionist':
        return {
          label: 'Recepcionista',
          color: 'from-purple-500 to-purple-600',
          textColor: 'text-white'
        };
      case 'viewer':
        return {
          label: 'Visualizador',
          color: 'from-gray-500 to-gray-600',
          textColor: 'text-white'
        };
      default:
        return {
          label: 'Usuário',
          color: 'from-gray-400 to-gray-500',
          textColor: 'text-white'
        };
    }
  };

  const config = getRoleConfig(role);

  return (
    <span className={`
      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
      bg-gradient-to-r ${config.color} ${config.textColor}
      shadow-sm
    `}>
      <Shield className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
}

export function UserHeader({ darkMode = false, className = '', onToggleDarkMode }: UserHeaderProps) {
  const { currentUser, logout } = useUserContext();
  const { clinicSettings } = useClinicSettings();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!currentUser) {
    return null;
  }

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <div className={`
      flex items-center justify-between px-4 py-3 border-b h-16
      ${darkMode 
        ? 'bg-gray-800 border-gray-700 text-gray-200' 
        : 'bg-white border-gray-200 text-gray-700'
      }
      ${className}
    `}>
      {/* Logo e Nome da Clínica */}
      <div className="flex items-center space-x-3">
        {clinicSettings.logo ? (
          <img 
            src={clinicSettings.logo} 
            alt="Logo da Clínica" 
            className="h-6 w-auto"
          />
        ) : (
          <div className={`w-6 h-6 ${darkMode ? "bg-blue-600" : "bg-blue-600"} rounded flex items-center justify-center`}>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
            </svg>
          </div>
        )}
        <div className="hidden sm:block">
          <h1 className={`text-base font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {(clinicSettings.fantasyName || clinicSettings.name || 'ClinicFlow25').length > 20 
              ? (clinicSettings.fantasyName || clinicSettings.name || 'ClinicFlow25').substring(0, 20) + '...'
              : (clinicSettings.fantasyName || clinicSettings.name || 'ClinicFlow25')
            }
          </h1>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Sistema de Gestão Clínica
          </p>
        </div>
      </div>

      {/* Informações do Usuário */}
      <div className="flex items-center space-x-3">
        {/* Busca */}
        <div className="relative hidden md:block">
          <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
          <input
            type="text"
            placeholder="Buscar pacientes..."
            className={`pl-9 pr-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 text-sm transition-colors ${
              darkMode 
                ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" 
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
          />
        </div>

        {/* Toggle Modo Escuro */}
        {onToggleDarkMode && (
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? "text-yellow-400 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"
            }`}
            title={darkMode ? "Modo Claro" : "Modo Escuro"}
          >
            {darkMode ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        )}

        {/* Notificações */}
        <button className={`
          p-2 rounded-lg hover:bg-opacity-80 transition-colors relative
          ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
        `}>
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3 h-3 text-xs flex items-center justify-center">
            3
          </span>
        </button>

        {/* Dropdown do Usuário */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`
              flex items-center space-x-2 p-1.5 rounded-lg transition-colors
              ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
              ${isDropdownOpen ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}
            `}
          >
            <UserAvatar user={currentUser} size="sm" />
            
            <div className="text-left hidden md:block">
              <div className="flex items-center space-x-2">
                <span className={`font-medium text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {currentUser.name.split(' ')[0]} {/* Apenas primeiro nome */}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <RoleBadge role={currentUser.role} darkMode={darkMode} />
              </div>
            </div>
            
            <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className={`
              absolute right-0 mt-2 w-72 rounded-lg shadow-lg border z-50
              ${darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
              }
            `}>
              {/* Informações do Usuário */}
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-3 mb-3">
                  <UserAvatar user={currentUser} size="lg" />
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {currentUser.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentUser.email}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Perfil:
                    </span>
                    <RoleBadge role={currentUser.role} darkMode={darkMode} />
                  </div>
                  
                  {currentUser.department && (
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Departamento:
                      </span>
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {currentUser.department}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 text-xs">
                    <Clock className={`w-3 h-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>
                      Último acesso: Hoje às 14:30
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <button className={`
                  flex items-center space-x-3 w-full p-3 rounded-lg transition-colors text-left
                  ${darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'}
                `}>
                  <User className="w-4 h-4" />
                  <span>Meu Perfil</span>
                </button>
                
                <button className={`
                  flex items-center space-x-3 w-full p-3 rounded-lg transition-colors text-left
                  ${darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'}
                `}>
                  <Settings className="w-4 h-4" />
                  <span>Configurações</span>
                </button>
                
                <hr className={`my-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                
                <button
                  onClick={handleLogout}
                  className={`
                    flex items-center space-x-3 w-full p-3 rounded-lg transition-colors text-left
                    ${darkMode 
                      ? 'hover:bg-red-900 hover:bg-opacity-20 text-red-400' 
                      : 'hover:bg-red-50 text-red-600'
                    }
                  `}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair do Sistema</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay para fechar dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}

export default UserHeader;