# 📋 Hierarquia Simplificada de Usuários - ClinicFlow25

## 🎯 Visão Geral

Este documento descreve a implementação da hierarquia simplificada de usuários no sistema ClinicFlow25, conforme solicitado.

## 👥 Tipos de Usuários

### 1. **Administrador** (`admin`)
- **Descrição**: Acesso total ao Módulo Administração
- **Ícone**: ⚙️
- **Cor**: Vermelho/Rosa
- **Acesso a Módulos**: 
  - ✅ Administração (completo)
  - ✅ Recepção (completo)
  - ✅ Atendimento (completo)
- **Permissões**:
  - Todas as permissões do sistema
  - Gestão de usuários
  - Configurações do sistema
  - Backup e restauração

### 2. **Recepcionista** (`receptionist`)
- **Descrição**: Acesso ao Módulo Recepção
- **Ícone**: 🏥
- **Cor**: Roxo
- **Acesso a Módulos**: 
  - ✅ Recepção (completo)
  - ❌ Administração
  - ❌ Atendimento
- **Permissões**:
  - Gerenciar pacientes (criar, ler, atualizar)
  - Gerenciar agendamentos (CRUD completo)
  - Criar e visualizar documentos básicos
  - Visualizar equipe médica
  - Visualizar procedimentos

### 3. **Financeiro** (`financial`)
- **Descrição**: Acesso à parte Financeira do Módulo Administração
- **Ícone**: 💰
- **Cor**: Amarelo/Laranja
- **Acesso a Módulos**: 
  - ✅ Administração (somente Financeiro)
  - ❌ Recepção
  - ❌ Atendimento
- **Permissões**:
  - Gerenciar financeiro (CRUD completo)
  - Visualizar relatórios financeiros
  - Visualizar pacientes (contexto financeiro)
  - Visualizar agendamentos (para faturamento)
  - Visualizar procedimentos (para faturamento)

### 4. **Médico/Profissional** (`doctor`)
- **Descrição**: Acesso ao Módulo Atendimento
- **Ícone**: 👨‍⚕️
- **Cor**: Azul
- **Acesso a Módulos**: 
  - ✅ Atendimento (completo)
  - ❌ Administração
  - ❌ Recepção
- **Permissões**:
  - Gerenciar pacientes (CRUD completo)
  - Gerenciar agendamentos (CRUD completo)
  - Gerenciar prontuários médicos (CRUD completo)
  - Gerenciar documentos médicos (CRUD completo)
  - Gerenciar procedimentos (CRUD completo)
  - Visualizar equipe médica
  - Visualizar informações financeiras básicas
  - Visualizar relatórios

### 5. **Enfermeiro** (`nurse`)
- **Descrição**: Suporte aos módulos Recepção e Atendimento
- **Ícone**: 👩‍⚕️
- **Cor**: Verde
- **Acesso a Módulos**: 
  - ✅ Recepção (completo)
  - ✅ Atendimento (limitado)
  - ❌ Administração
- **Permissões**:
  - Gerenciar pacientes (criar, ler, atualizar)
  - Gerenciar agendamentos (criar, ler, atualizar)
  - Atualizar prontuários médicos
  - Criar e visualizar documentos
  - Atualizar procedimentos
  - Visualizar equipe médica

### 6. **Visualizador** (`viewer`)
- **Descrição**: Acesso somente leitura
- **Ícone**: 👁️
- **Cor**: Cinza
- **Acesso a Módulos**: 
  - ❌ Administração
  - ❌ Recepção
  - ❌ Atendimento
- **Permissões**:
  - Apenas visualização de informações básicas

## 🔐 Matriz de Acesso aos Módulos

| Usuário | Recepção | Atendimento | Administração |
|---------|----------|-------------|---------------|
| **Administrador** | ✅ Total | ✅ Total | ✅ Total |
| **Recepcionista** | ✅ Total | ❌ Não | ❌ Não |
| **Financeiro** | ❌ Não | ❌ Não | ✅ Somente Financeiro |
| **Médico/Profissional** | ❌ Não | ✅ Total | ❌ Não |
| **Enfermeiro** | ✅ Total | ⚠️ Limitado | ❌ Não |
| **Visualizador** | ❌ Não | ❌ Não | ❌ Não |

## 🛠️ Implementação Técnica

### Tipos e Interfaces

```typescript
// Tipos de usuário
export type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'financial' | 'viewer';

// Tipos de módulos
export type ModuleType = 'reception' | 'medical' | 'administration';

// Configuração de acesso aos módulos
export const MODULE_ACCESS: Record<ModuleType, UserRole[]> = {
  reception: ['admin', 'receptionist', 'nurse'],
  medical: ['admin', 'doctor', 'nurse'],
  administration: ['admin', 'financial']
};
```

### Funções Auxiliares

```typescript
// Verificar acesso ao módulo
hasModuleAccess(role: UserRole, module: ModuleType): boolean

// Obter módulos acessíveis
getAccessibleModules(role: UserRole): ModuleType[]
```

### Hooks Disponíveis

```typescript
// Hook principal
const { hasModuleAccess, getAccessibleModules } = useUserContext();

// Hook de permissões
const { 
  canAccessReception,
  canAccessMedical,
  canAccessAdministration,
  isAdmin,
  isReceptionist,
  isFinancial,
  isDoctor
} = usePermissions();
```

## 📝 Usuários de Exemplo

O sistema inclui os seguintes usuários de exemplo para desenvolvimento:

1. **Dr. João Silva** (admin) - joao.silva@clinica.com.br
2. **Dra. Ana Paula Silva** (doctor) - ana.paula@clinica.com.br
3. **Enf. Maria Santos** (nurse) - maria.santos@clinica.com.br
4. **Carla Oliveira** (receptionist) - carla.oliveira@clinica.com.br
5. **Roberto Costa** (financial) - roberto.costa@clinica.com.br

## ✨ Benefícios da Implementação

1. **Simplicidade**: Hierarquia clara e fácil de entender
2. **Segurança**: Controle de acesso baseado em módulos
3. **Flexibilidade**: Fácil adicionar novos roles ou módulos
4. **Manutenibilidade**: Código organizado e bem documentado
5. **Escalabilidade**: Estrutura preparada para crescimento

## 🚀 Próximos Passos

Para utilizar a hierarquia simplificada:

1. Use os hooks `useUserContext()` e `usePermissions()` para verificar acesso
2. Implemente navegação condicional baseada em `hasModuleAccess()`
3. Filtre funcionalidades baseando-se nas permissões do usuário
4. Crie dashboards específicos por tipo de usuário

## 📖 Exemplos de Uso

### Verificar Acesso ao Módulo

```typescript
import { useUserContext } from '../hooks/useUserContext';

function MyComponent() {
  const { hasModuleAccess } = useUserContext();
  
  if (hasModuleAccess('reception')) {
    // Mostrar conteúdo do módulo de recepção
  }
}
```

### Navegação Condicional

```typescript
import { usePermissions } from '../hooks/useUserContext';

function Navigation() {
  const { 
    canAccessReception,
    canAccessMedical,
    canAccessAdministration 
  } = usePermissions();
  
  return (
    <>
      {canAccessReception && <ReceptionLink />}
      {canAccessMedical && <MedicalLink />}
      {canAccessAdministration && <AdminLink />}
    </>
  );
}
```

### Controle de Funcionalidades

```typescript
import { usePermissions } from '../hooks/useUserContext';

function FinancialSection() {
  const { canManageFinancial, isFinancial, isAdmin } = usePermissions();
  
  if (!canManageFinancial && !isAdmin) {
    return <AccessDenied />;
  }
  
  return <FinancialDashboard />;
}
```
