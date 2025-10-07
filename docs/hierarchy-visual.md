# 🎨 Visualização da Hierarquia Simplificada

## 📊 Diagrama de Acesso aos Módulos

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLINICFLOW25 - MÓDULOS                       │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   📥 RECEPÇÃO    │  │  👨‍⚕️ ATENDIMENTO  │  │  ⚙️ ADMINISTRAÇÃO │
│                  │  │                  │  │                  │
│ • Agendamentos   │  │ • Prontuários    │  │ • Financeiro     │
│ • Check-in       │  │ • Procedimentos  │  │ • Relatórios     │
│ • Fila de Espera │  │ • Prescrições    │  │ • Configurações  │
│ • Pacientes      │  │ • Evolução       │  │ • Usuários       │
└──────────────────┘  └──────────────────┘  └──────────────────┘
        ↓                     ↓                      ↓
```

## 👥 Matriz de Acesso por Usuário

```
┌──────────────────────────────────────────────────────────────────────┐
│ 👤 ADMINISTRADOR (admin)                                     ⚙️ │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ Email: joao.silva@clinica.com.br                                    │
│ Acesso: ✅ Recepção  ✅ Atendimento  ✅ Administração (COMPLETO)    │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│ 👤 RECEPCIONISTA (receptionist)                              🏥 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ Email: carla.oliveira@clinica.com.br                                │
│ Acesso: ✅ Recepção  ❌ Atendimento  ❌ Administração               │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│ 👤 FINANCEIRO (financial)                                    💰 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ Email: roberto.costa@clinica.com.br                                 │
│ Acesso: ❌ Recepção  ❌ Atendimento  ✅ Administração (FINANCEIRO)  │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│ 👤 MÉDICO/PROFISSIONAL (doctor)                              👨‍⚕️ │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ Email: ana.paula@clinica.com.br                                     │
│ Acesso: ❌ Recepção  ✅ Atendimento  ❌ Administração               │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│ 👤 ENFERMEIRO (nurse)                                        👩‍⚕️ │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ Email: maria.santos@clinica.com.br                                  │
│ Acesso: ✅ Recepção  ⚠️ Atendimento (LIMITADO)  ❌ Administração    │
└──────────────────────────────────────────────────────────────────────┘
```

## 🔐 Fluxo de Verificação de Acesso

```
┌────────────────┐
│   USUÁRIO      │
│    LOGIN       │
└────────┬───────┘
         │
         ↓
┌────────────────────────┐
│  Verificar ROLE        │
│  (admin, receptionist, │
│   financial, doctor)   │
└────────┬───────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│  Consultar MODULE_ACCESS               │
│  {                                     │
│    reception: [admin, receptionist,    │
│                nurse]                  │
│    medical: [admin, doctor, nurse]     │
│    administration: [admin, financial]  │
│  }                                     │
└────────┬───────────────────────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│  hasModuleAccess(role, module)         │
│  ↓                                     │
│  ✅ true  → Permitir acesso            │
│  ❌ false → Negar acesso               │
└────────────────────────────────────────┘
```

## 🎯 Casos de Uso

### 1️⃣ Recepcionista tentando acessar Recepção
```
Role: receptionist
Módulo: reception
MODULE_ACCESS.reception = [admin, receptionist, nurse]
receptionist ∈ [admin, receptionist, nurse] ✅
RESULTADO: ✅ ACESSO PERMITIDO
```

### 2️⃣ Recepcionista tentando acessar Administração
```
Role: receptionist
Módulo: administration
MODULE_ACCESS.administration = [admin, financial]
receptionist ∉ [admin, financial] ❌
RESULTADO: ❌ ACESSO NEGADO
```

### 3️⃣ Financeiro tentando acessar Administração
```
Role: financial
Módulo: administration
MODULE_ACCESS.administration = [admin, financial]
financial ∈ [admin, financial] ✅
RESULTADO: ✅ ACESSO PERMITIDO (somente parte financeira)
```

### 4️⃣ Médico tentando acessar Atendimento
```
Role: doctor
Módulo: medical
MODULE_ACCESS.medical = [admin, doctor, nurse]
doctor ∈ [admin, doctor, nurse] ✅
RESULTADO: ✅ ACESSO PERMITIDO
```

## 📋 Tabela de Permissões Detalhadas

| Permissão | Admin | Receptionist | Financial | Doctor | Nurse |
|-----------|:-----:|:------------:|:---------:|:------:|:-----:|
| **Pacientes** |
| Criar | ✅ | ✅ | ❌ | ✅ | ✅ |
| Ler | ✅ | ✅ | ✅ | ✅ | ✅ |
| Atualizar | ✅ | ✅ | ❌ | ✅ | ✅ |
| Deletar | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Agendamentos** |
| Criar | ✅ | ✅ | ❌ | ✅ | ✅ |
| Ler | ✅ | ✅ | ✅ | ✅ | ✅ |
| Atualizar | ✅ | ✅ | ❌ | ✅ | ✅ |
| Deletar | ✅ | ✅ | ❌ | ✅ | ❌ |
| **Prontuários** |
| Criar | ✅ | ❌ | ❌ | ✅ | ❌ |
| Ler | ✅ | ❌ | ❌ | ✅ | ✅ |
| Atualizar | ✅ | ❌ | ❌ | ✅ | ✅ |
| Deletar | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Financeiro** |
| Criar | ✅ | ❌ | ✅ | ❌ | ❌ |
| Ler | ✅ | ❌ | ✅ | ✅ | ❌ |
| Atualizar | ✅ | ❌ | ✅ | ❌ | ❌ |
| Deletar | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Configurações** |
| Ler | ✅ | ❌ | ❌ | ❌ | ❌ |
| Atualizar | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Usuários** |
| Gerenciar | ✅ | ❌ | ❌ | ❌ | ❌ |

## 🎨 Cores dos Badges

```css
Administrador     ⚙️  → Vermelho/Rosa    (from-red-500 to-pink-600)
Médico/Profiss.   👨‍⚕️ → Azul            (from-blue-500 to-blue-600)
Enfermeiro        👩‍⚕️ → Verde           (from-green-500 to-green-600)
Recepcionista     🏥  → Roxo            (from-purple-500 to-purple-600)
Financeiro        💰  → Amarelo/Laranja (from-yellow-500 to-orange-600)
Visualizador      👁️  → Cinza           (from-gray-500 to-gray-600)
```

## 🔄 Fluxo de Trabalho Típico

### Dia na Recepção
```
08:00 │ Carla (Recepcionista) faz login
      │ ↓
      │ ✅ Acessa Módulo Recepção
      │ ↓
08:15 │ Registra check-in de pacientes
      │ ↓
09:00 │ Agenda consultas do dia
      │ ↓
10:30 │ Atualiza fila de espera
      │ ↓
      │ ❌ Não pode acessar Administração
      │ ❌ Não pode acessar Atendimento
```

### Dia no Atendimento
```
09:00 │ Dra. Ana (Médica) faz login
      │ ↓
      │ ✅ Acessa Módulo Atendimento
      │ ↓
09:30 │ Consulta prontuário do paciente
      │ ↓
10:00 │ Registra evolução médica
      │ ↓
11:00 │ Prescreve medicamentos
      │ ↓
      │ ❌ Não pode acessar Administração
      │ ❌ Não pode acessar Recepção
```

### Dia na Administração (Financeiro)
```
08:00 │ Roberto (Financeiro) faz login
      │ ↓
      │ ✅ Acessa Módulo Administração (Financeiro)
      │ ↓
09:00 │ Gera relatórios financeiros
      │ ↓
10:00 │ Analisa faturamento
      │ ↓
11:00 │ Atualiza valores de procedimentos
      │ ↓
      │ ❌ Não pode acessar outras partes da Administração
      │ ❌ Não pode acessar Recepção
      │ ❌ Não pode acessar Atendimento
```

## 🎓 Lições Aprendidas

### ✅ Pontos Fortes
- Hierarquia clara e intuitiva
- Controle de acesso granular
- Fácil manutenção
- Escalável para novos módulos/roles

### 🎯 Práticas Recomendadas
- Sempre usar `hasModuleAccess()` antes de renderizar módulos
- Utilizar hooks `usePermissions()` para verificações comuns
- Manter a matriz MODULE_ACCESS atualizada
- Documentar alterações em permissões

### 🚀 Possíveis Expansões
- Adicionar permissões temporárias
- Implementar delegação de acesso
- Criar roles customizados
- Sistema de auditoria de acessos
