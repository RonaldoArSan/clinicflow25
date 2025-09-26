import React, { ReactNode } from 'react';
import { Permission, UserRole } from '../types/user';
import { usePermissions } from '../hooks/useUserContext';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  
  // Proteções por permissão
  requiredPermissions?: Permission[];
  requireAllPermissions?: boolean; // true = AND, false = OR (padrão)
  
  // Proteções por papel
  allowedRoles?: UserRole[];
  
  // Componente customizado quando não autorizado
  fallback?: ReactNode;
  
  // Mostrar mensagem de erro padrão
  showErrorMessage?: boolean;
  
  // Classe CSS personalizada
  className?: string;
}

interface AccessDeniedProps {
  reason: 'not-authenticated' | 'insufficient-permissions' | 'role-restricted';
  darkMode?: boolean;
  className?: string;
}

function AccessDenied({ reason, darkMode = false, className = '' }: AccessDeniedProps) {
  const getContent = () => {
    switch (reason) {
      case 'not-authenticated':
        return {
          icon: <Lock className="w-16 h-16 text-gray-400" />,
          title: 'Acesso Negado',
          message: 'Você precisa estar logado para acessar esta funcionalidade.',
          suggestion: 'Faça login para continuar.'
        };
        
      case 'insufficient-permissions':
        return {
          icon: <Shield className="w-16 h-16 text-orange-400" />,
          title: 'Permissões Insuficientes',
          message: 'Você não tem permissão para acessar esta funcionalidade.',
          suggestion: 'Entre em contato com o administrador para solicitar acesso.'
        };
        
      case 'role-restricted':
        return {
          icon: <AlertTriangle className="w-16 h-16 text-red-400" />,
          title: 'Acesso Restrito',
          message: 'Esta funcionalidade é restrita ao seu perfil de usuário.',
          suggestion: 'Verifique com o administrador se você precisa de diferentes permissões.'
        };
        
      default:
        return {
          icon: <Lock className="w-16 h-16 text-gray-400" />,
          title: 'Acesso Negado',
          message: 'Você não tem autorização para acessar esta área.',
          suggestion: 'Entre em contato com o suporte.'
        };
    }
  };

  const content = getContent();

  return (
    <div className={`
      flex flex-col items-center justify-center p-12 text-center
      ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'}
      ${className}
    `}>
      <div className="mb-6">
        {content.icon}
      </div>
      
      <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        {content.title}
      </h2>
      
      <p className={`text-lg mb-2 max-w-md ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {content.message}
      </p>
      
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {content.suggestion}
      </p>
      
      <div className={`mt-8 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Sistema de Gestão Clínica • ClinicFlow25
        </p>
      </div>
    </div>
  );
}

export function ProtectedRoute({
  children,
  requiredPermissions = [],
  requireAllPermissions = false,
  allowedRoles = [],
  fallback,
  showErrorMessage = true,
  className = ''
}: ProtectedRouteProps) {
  const {
    currentUser,
    hasPermission,
    hasRole,
    hasAnyPermission
  } = usePermissions();

  // Verificar se está autenticado
  if (!currentUser) {
    if (fallback) return <>{fallback}</>;
    if (showErrorMessage) {
      return <AccessDenied reason="not-authenticated" className={className} />;
    }
    return null;
  }

  // Verificar roles se especificados
  if (allowedRoles.length > 0) {
    const hasValidRole = allowedRoles.some(role => hasRole(role));
    if (!hasValidRole) {
      if (fallback) return <>{fallback}</>;
      if (showErrorMessage) {
        return <AccessDenied reason="role-restricted" className={className} />;
      }
      return null;
    }
  }

  // Verificar permissões se especificadas
  if (requiredPermissions.length > 0) {
    let hasValidPermissions = false;
    
    if (requireAllPermissions) {
      // Precisa ter TODAS as permissões (AND)
      hasValidPermissions = requiredPermissions.every(permission => hasPermission(permission));
    } else {
      // Precisa ter PELO MENOS UMA permissão (OR)
      hasValidPermissions = hasAnyPermission(requiredPermissions);
    }
    
    if (!hasValidPermissions) {
      if (fallback) return <>{fallback}</>;
      if (showErrorMessage) {
        return <AccessDenied reason="insufficient-permissions" className={className} />;
      }
      return null;
    }
  }

  // Usuário autorizado - renderizar conteúdo
  return <div className={className}>{children}</div>;
}

// Hook para verificações condicionais em componentes
export function useConditionalRender() {
  const permissions = usePermissions();
  
  return {
    ...permissions,
    
    // Renderização condicional
    renderIf: (condition: boolean, component: ReactNode) => condition ? component : null,
    
    renderForPermission: (permission: Permission, component: ReactNode) => 
      permissions.hasPermission(permission) ? component : null,
    
    renderForRole: (role: UserRole, component: ReactNode) => 
      permissions.hasRole(role) ? component : null,
    
    renderForAnyPermission: (permissionList: Permission[], component: ReactNode) => 
      permissions.hasAnyPermission(permissionList) ? component : null,
      
    // Componente inline para proteção
    Protected: ({ 
      requiredPermissions, 
      allowedRoles, 
      children 
    }: { 
      requiredPermissions?: Permission[], 
      allowedRoles?: UserRole[], 
      children: ReactNode 
    }) => (
      <ProtectedRoute 
        requiredPermissions={requiredPermissions} 
        allowedRoles={allowedRoles}
        showErrorMessage={false}
      >
        {children}
      </ProtectedRoute>
    )
  };
}

export default ProtectedRoute;