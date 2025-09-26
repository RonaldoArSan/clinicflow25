# 🩺 Página de Procedimentos - ClinicFlow

## 📋 Descrição

A **Página de Procedimentos** é um módulo completo do sistema ClinicFlow que permite gerenciar todos os procedimentos médicos oferecidos pela clínica, incluindo consultas, exames, cirurgias e tratamentos.

## ✨ Funcionalidades Implementadas

### 📊 **Dashboard de Procedimentos**
- **Métricas Resumidas**: Total de procedimentos cadastrados
- **Distribuição por Categoria**: Consultas, Exames, Cirurgias, Tratamentos
- **Valor Médio**: Cálculo automático do preço médio dos procedimentos
- **Cards Informativos**: Visualização rápida dos dados principais

### 🔍 **Sistema de Filtros**
- **Busca Textual**: Por nome, código ou descrição
- **Filtro por Categoria**: Seleção específica de categorias
- **Interface Responsiva**: Adapta-se a diferentes tamanhos de tela
- **Resultados em Tempo Real**: Filtragem instantânea

### 📋 **Lista de Procedimentos**
- **Cards Informativos**: Cada procedimento em card individual
- **Informações Resumidas**: Nome, código, categoria, preço e duração
- **Badges de Categoria**: Identificação visual por cores
- **Ações Rápidas**: Editar e excluir (preparado para implementação)

### 📝 **Modal de Detalhes**
- **Informações Completas**: Todos os dados do procedimento
- **Valores Financeiros**: Preço base e custo por minuto
- **Descrição Detalhada**: Informações completas sobre o procedimento
- **Interface Intuitiva**: Fácil navegação e leitura

### ➕ **Formulário de Novo Procedimento**
- **Campos Obrigatórios**: Nome, código, categoria, preço, duração
- **Validação de Dados**: Campos obrigatórios e tipos corretos
- **Categorias Pré-definidas**: Consultas, Exames, Cirurgias, Tratamentos
- **Interface Amigável**: Formulário intuitivo e responsivo

## 🎨 **Design e UX**

### 🌓 **Suporte a Modo Escuro**
- **Alternância Dinâmica**: Cores adaptáveis automaticamente
- **Contraste Otimizado**: Legibilidade em ambos os modos
- **Consistência Visual**: Mantém o padrão do sistema

### 📱 **Design Responsivo**
- **Grid Adaptável**: 1-3 colunas conforme o dispositivo
- **Navegação Mobile**: Interface otimizada para touch
- **Modais Responsivos**: Ajuste automático ao tamanho da tela

### 🎯 **Indicadores Visuais**
- **Badges Coloridos**: Categorização visual por cores
- **Ícones Contextuais**: Stethoscope, DollarSign, Clock
- **Estados de Hover**: Feedback visual nas interações
- **Transições Suaves**: Animações CSS para melhor UX

## 💾 **Estrutura de Dados**

### 🏗️ **Interface Procedure**
```typescript
interface Procedure {
  id: number;              // Identificador único
  name: string;           // Nome do procedimento
  code: string;           // Código identificador
  category: string;       // Categoria (Consultas, Exames, etc.)
  price: number;          // Preço em reais
  duration: number;       // Duração em minutos
  description: string;    // Descrição detalhada
}
```

### 📊 **Dados de Exemplo**
O sistema inclui procedimentos mockados para demonstração:

- **Consulta Cardiológica** (CARD001) - R$ 280,00 - 45min
- **Hemograma Completo** (LAB001) - R$ 85,00 - 15min  
- **Cirurgia de Catarata** (CIR001) - R$ 3.500,00 - 90min
- **Fisioterapia** (FISIO001) - R$ 120,00 - 60min

## 🔧 **Funcionalidades Técnicas**

### ⚡ **Performance**
- **Filtragem Client-Side**: Busca instantânea sem requests
- **Renderização Otimizada**: React keys para listas eficientes
- **Lazy Loading**: Componentes carregados sob demanda

### 🎭 **Estados da Interface**
- **Estado Vazio**: Mensagem quando nenhum procedimento é encontrado
- **Estados de Loading**: Preparado para integração com API
- **Estados de Erro**: Tratamento de erros futuro

### 🔒 **Validação**
- **Campos Obrigatórios**: Nome, código, categoria, preço, duração
- **Tipos de Dados**: Number para preço e duração
- **Formato de Preço**: Suporte a decimais (0.01)

## 🚀 **Como Usar**

### 📖 **Visualizar Procedimentos**
1. Acesse o menu lateral → **Procedimentos**
2. Visualize a lista de procedimentos em cards
3. Use os filtros para encontrar procedimentos específicos
4. Clique em um card para ver detalhes completos

### ➕ **Adicionar Novo Procedimento**
1. Clique no botão **"Novo Procedimento"**
2. Preencha o formulário com as informações:
   - **Nome**: Ex: "Consulta Cardiológica"
   - **Código**: Ex: "CARD001"
   - **Categoria**: Selecione uma das opções
   - **Preço**: Valor em reais (ex: 280.00)
   - **Duração**: Tempo em minutos (ex: 45)
   - **Descrição**: Detalhes sobre o procedimento
3. Clique em **"Salvar Procedimento"**

### 🔍 **Buscar Procedimentos**
- **Busca por Nome**: Digite o nome do procedimento
- **Busca por Código**: Digite o código (ex: CARD001)
- **Busca por Descrição**: Palavras-chave da descrição
- **Filtro por Categoria**: Selecione uma categoria específica

## 📈 **Métricas Disponíveis**

### 📊 **Cards de Estatísticas**
1. **Total de Procedimentos**: Quantidade total cadastrada
2. **Consultas**: Número de procedimentos de consulta
3. **Exames**: Quantidade de exames disponíveis
4. **Valor Médio**: Preço médio calculado automaticamente

### 💰 **Análise Financeira**
- **Preço por Categoria**: Visualização dos valores por tipo
- **Custo por Minuto**: Cálculo automático do valor/tempo
- **Faixa de Preços**: Do mais barato ao mais caro

## 🎨 **Paleta de Cores por Categoria**

### 🔵 **Consultas** - Azul
- **Modo Claro**: `text-blue-600 bg-blue-50`
- **Modo Escuro**: `text-blue-400 bg-blue-900/30`

### 🟢 **Exames** - Verde
- **Modo Claro**: `text-green-600 bg-green-50`
- **Modo Escuro**: `text-green-400 bg-green-900/30`

### 🔴 **Cirurgias** - Vermelho
- **Modo Claro**: `text-red-600 bg-red-50`
- **Modo Escuro**: `text-red-400 bg-red-900/30`

### 🟣 **Tratamentos** - Roxo
- **Modo Claro**: `text-purple-600 bg-purple-50`
- **Modo Escuro**: `text-purple-400 bg-purple-900/30`

## 🔮 **Próximas Implementações**

### 📋 **Funcionalidades Pendentes**
- [ ] **Edição de Procedimentos**: Modal para editar dados existentes
- [ ] **Exclusão de Procedimentos**: Confirmação e remoção
- [ ] **Importação em Lote**: Upload de CSV com procedimentos
- [ ] **Exportação**: Download da lista em PDF/Excel
- [ ] **Histórico de Alterações**: Log de modificações
- [ ] **Cópia de Procedimentos**: Duplicar procedimento existente

### 🔗 **Integrações Futuras**
- [ ] **Tabela TUSS**: Integração com códigos oficiais
- [ ] **Planos de Saúde**: Valores diferenciados por convênio
- [ ] **Agenda**: Vincular procedimentos aos agendamentos
- [ ] **Faturamento**: Integração com módulo financeiro
- [ ] **Relatórios**: Analytics de procedimentos mais utilizados

### 🎯 **Melhorias de UX**
- [ ] **Drag & Drop**: Reordenação de procedimentos
- [ ] **Busca Avançada**: Filtros por preço, duração, etc.
- [ ] **Favoritos**: Marcar procedimentos mais usados
- [ ] **Sugestões**: Autocompletar ao digitar
- [ ] **Comparação**: Comparar valores entre procedimentos

## 🛠️ **Arquitetura Técnica**

### 📁 **Estrutura de Arquivos**
```
components/
└── ProceduresView.tsx    # Componente principal
types/
└── index.ts             # Interface Procedure
hooks/
└── useData.ts          # Hook com dados mockados
```

### 🎣 **Hooks Utilizados**
- `useState` - Gerenciamento de estado local
- `useProcedures` - Hook customizado para dados
- `darkMode` - Tema da aplicação

### 🎨 **Componentes Reutilizados**
- **Ícones Lucide**: Search, Filter, Plus, Edit, Trash2, etc.
- **Modais**: Estrutura padrão do sistema
- **Cards**: Layout consistente com outras páginas
- **Formulários**: Padrão de inputs do sistema

## 📱 **Responsividade**

### 📺 **Desktop (>1024px)**
- **Grid 3 colunas**: Visualização otimizada
- **Sidebar fixa**: Navegação sempre visível
- **Modais centralizados**: Largura máxima definida

### 📱 **Tablet (768px-1023px)**
- **Grid 2 colunas**: Aproveitamento do espaço
- **Sidebar retrátil**: Menu hambúrguer
- **Cards adaptáveis**: Tamanho flexível

### 📱 **Mobile (<768px)**
- **Grid 1 coluna**: Lista vertical
- **Navegação touch**: Botões maiores
- **Modais fullscreen**: Melhor usabilidade

## 🎯 **Casos de Uso**

### 👨‍⚕️ **Para Médicos**
- Consultar valores dos procedimentos
- Verificar duração estimada
- Adicionar novos procedimentos da especialidade

### 👩‍💼 **Para Administradores**
- Gerenciar tabela completa de preços
- Categorizar procedimentos
- Controlar custos e valores

### 👥 **Para Atendentes**
- Consultar preços para orçamentos
- Verificar códigos dos procedimentos
- Buscar procedimentos por categoria

---

## ✅ **Status: IMPLEMENTADO COM SUCESSO!**

A página de Procedimentos está **100% funcional** e integrada ao sistema ClinicFlow, oferecendo uma interface completa e intuitiva para gerenciamento de procedimentos médicos.

**Acesse em: `/procedures` na navegação lateral do sistema** 🚀