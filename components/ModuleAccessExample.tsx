import React from 'react';
import { useUserContext, usePermissions } from '../hooks/useUserContext';
import { Shield, CheckCircle, XCircle } from 'lucide-react';

/**
 * Componente de exemplo demonstrando o uso do sistema de controle de acesso baseado em módulos
 * 
 * Este componente mostra como:
 * 1. Verificar acesso a módulos específicos
 * 2. Obter lista de módulos acessíveis
 * 3. Usar hooks de permissões
 * 4. Renderizar conteúdo condicional baseado em role
 */
export function ModuleAccessExample() {
  const { 
    currentUser, 
    hasModuleAccess, 
    getAccessibleModules 
  } = useUserContext();

  const {
    canAccessReception,
    canAccessMedical,
    canAccessAdministration,
    isAdmin,
    isReceptionist,
    isFinancial,
    isDoctor,
    canManageFinancial
  } = usePermissions();

  if (!currentUser) {
    return null;
  }

  const accessibleModules = getAccessibleModules();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Controle de Acesso Baseado em Módulos
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Exemplo de uso do sistema de hierarquia simplificada
            </p>
          </div>
        </div>

        {/* Informações do Usuário Atual */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Usuário Atual
          </h3>
          <div className="space-y-1 text-sm">
            <p><strong>Nome:</strong> {currentUser.name}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Role:</strong> {currentUser.role}</p>
            <p><strong>Departamento:</strong> {currentUser.department || 'N/A'}</p>
          </div>
        </div>

        {/* Status de Acesso aos Módulos */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Acesso aos Módulos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Módulo Recepção */}
            <div className={`p-4 rounded-lg border-2 ${
              canAccessReception 
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                : 'border-gray-300 bg-gray-50 dark:bg-gray-800'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  Recepção
                </span>
                {canAccessReception ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {canAccessReception 
                  ? 'Acesso permitido' 
                  : 'Acesso negado'}
              </p>
            </div>

            {/* Módulo Atendimento */}
            <div className={`p-4 rounded-lg border-2 ${
              canAccessMedical 
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                : 'border-gray-300 bg-gray-50 dark:bg-gray-800'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  Atendimento
                </span>
                {canAccessMedical ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {canAccessMedical 
                  ? 'Acesso permitido' 
                  : 'Acesso negado'}
              </p>
            </div>

            {/* Módulo Administração */}
            <div className={`p-4 rounded-lg border-2 ${
              canAccessAdministration 
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                : 'border-gray-300 bg-gray-50 dark:bg-gray-800'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  Administração
                </span>
                {canAccessAdministration ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {canAccessAdministration 
                  ? isFinancial ? 'Acesso ao Financeiro' : 'Acesso completo'
                  : 'Acesso negado'}
              </p>
            </div>
          </div>
        </div>

        {/* Verificações de Role */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Verificações de Role
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <RoleCheck label="Admin" active={isAdmin} />
            <RoleCheck label="Recepcionista" active={isReceptionist} />
            <RoleCheck label="Financeiro" active={isFinancial} />
            <RoleCheck label="Médico" active={isDoctor} />
          </div>
        </div>

        {/* Permissões Específicas */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Permissões Específicas
          </h3>
          <div className="space-y-2">
            <PermissionItem 
              label="Gerenciar Financeiro" 
              granted={canManageFinancial} 
            />
            <PermissionItem 
              label="Acesso Total ao Sistema" 
              granted={isAdmin} 
            />
            <PermissionItem 
              label="Acesso ao Módulo Recepção" 
              granted={canAccessReception} 
            />
            <PermissionItem 
              label="Acesso ao Módulo Atendimento" 
              granted={canAccessMedical} 
            />
          </div>
        </div>

        {/* Módulos Acessíveis */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Módulos Acessíveis
          </h3>
          {accessibleModules.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {accessibleModules.map(module => (
                <span 
                  key={module}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                >
                  {module === 'reception' && '🏥 Recepção'}
                  {module === 'medical' && '👨‍⚕️ Atendimento'}
                  {module === 'administration' && '⚙️ Administração'}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Nenhum módulo acessível
            </p>
          )}
        </div>

        {/* Código de Exemplo */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
            Exemplo de Código
          </h3>
          <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto">
{`// Usando hooks de acesso
const { canAccessReception } = usePermissions();

if (canAccessReception) {
  // Renderizar módulo de recepção
}

// Verificação programática
const { hasModuleAccess } = useUserContext();

if (hasModuleAccess('administration')) {
  // Renderizar funcionalidades administrativas
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares
function RoleCheck({ label, active }: { label: string; active: boolean }) {
  return (
    <div className={`p-2 rounded-lg text-center text-sm ${
      active 
        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
    }`}>
      {label}
    </div>
  );
}

function PermissionItem({ label, granted }: { label: string; granted: boolean }) {
  return (
    <div className="flex items-center space-x-2 text-sm">
      {granted ? (
        <CheckCircle className="w-4 h-4 text-green-600" />
      ) : (
        <XCircle className="w-4 h-4 text-gray-400" />
      )}
      <span className={granted 
        ? 'text-gray-900 dark:text-white' 
        : 'text-gray-500 dark:text-gray-500'
      }>
        {label}
      </span>
    </div>
  );
}

export default ModuleAccessExample;
