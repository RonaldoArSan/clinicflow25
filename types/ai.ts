// Sistema de Análise de IA para ClinicFlow25
export interface AIAnalysisData {
  userId: string;
  timestamp: number;
  action: string;
  module: string;
  duration: number;
  context: Record<string, any>;
  success: boolean;
  errorDetails?: string;
}

export interface AIInsight {
  id: string;
  type: 'efficiency' | 'financial' | 'clinical' | 'workflow' | 'patient-care';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impact: string;
  recommendation: string;
  estimatedValue?: number;
  implementationDifficulty: 'easy' | 'medium' | 'hard';
  category: string;
  confidence: number; // 0-100
  generatedAt: number;
  status: 'new' | 'viewed' | 'implemented' | 'dismissed';
}

export interface AIMetrics {
  userProductivity: {
    averageTaskTime: number;
    taskCompletionRate: number;
    errorRate: number;
    mostUsedFeatures: string[];
    timeSpentByModule: Record<string, number>;
  };
  clinicalEfficiency: {
    averageConsultationTime: number;
    patientThroughput: number;
    procedureUtilization: Record<string, number>;
    scheduleOptimization: number;
  };
  financialPerformance: {
    revenuePerHour: number;
    procedureProfitability: Record<string, number>;
    paymentDelays: number;
    costsOptimization: number;
  };
  patientExperience: {
    waitingTimes: number;
    appointmentNoShowRate: number;
    patientSatisfactionScore: number;
    communicationEffectiveness: number;
  };
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: number;
  context?: string;
  suggestions?: AISuggestion[];
  metadata?: Record<string, any>;
}

export interface AISuggestion {
  id: string;
  type: 'action' | 'navigation' | 'optimization' | 'information';
  title: string;
  description: string;
  action?: () => void;
  confidence: number;
}

export interface AIPersona {
  name: string;
  role: string;
  specialization: string[];
  personality: string;
  avatar: string;
  capabilities: string[];
}

// Personas de IA disponíveis
export const AI_PERSONAS: Record<string, AIPersona> = {
  clinical: {
    name: "Dr. Ana IA",
    role: "Assistente Clínico",
    specialization: ["Diagnóstico", "Protocolos Médicos", "Análise Clínica"],
    personality: "Precisa, empática e orientada para qualidade do cuidado",
    avatar: "👩‍⚕️",
    capabilities: [
      "Análise de padrões clínicos",
      "Sugestões de protocolos",
      "Otimização de atendimento",
      "Alertas médicos"
    ]
  },
  administrative: {
    name: "Carlos IA",
    role: "Assistente Administrativo",
    specialization: ["Gestão", "Processos", "Eficiência Operacional"],
    personality: "Organizado, eficiente e orientado para resultados",
    avatar: "👨‍💼",
    capabilities: [
      "Otimização de agendamentos",
      "Análise de fluxos",
      "Gestão de recursos",
      "Relatórios gerenciais"
    ]
  },
  financial: {
    name: "Sofia IA",
    role: "Assistente Financeiro",
    specialization: ["Finanças", "Análise de Custos", "Rentabilidade"],
    personality: "Analítica, detalhista e orientada para crescimento",
    avatar: "👩‍💰",
    capabilities: [
      "Análise financeira",
      "Otimização de preços",
      "Controle de custos",
      "Projeções de receita"
    ]
  },
  support: {
    name: "Alex IA",
    role: "Assistente de Suporte",
    specialization: ["Ajuda", "Treinamento", "Resolução de Problemas"],
    personality: "Paciente, didático e sempre disponível",
    avatar: "🤖",
    capabilities: [
      "Suporte técnico",
      "Treinamento de usuários",
      "Resolução de dúvidas",
      "Guias passo-a-passo"
    ]
  }
};

// Dados mock de insights gerados pela IA
export const MOCK_AI_INSIGHTS: AIInsight[] = [
  {
    id: "insight-001",
    type: "efficiency",
    priority: "high",
    title: "Otimização de Agendamentos Detectada",
    description: "A IA identificou que 23% dos agendamentos têm intervalos desnecessários, resultando em 2.3 horas de tempo ocioso por dia.",
    impact: "Potencial aumento de 18% na capacidade de atendimento",
    recommendation: "Implementar agendamento inteligente com base em duração real dos procedimentos e padrões históricos.",
    estimatedValue: 12500,
    implementationDifficulty: "medium",
    category: "Produtividade",
    confidence: 87,
    generatedAt: Date.now() - 3600000,
    status: "new"
  },
  {
    id: "insight-002",
    type: "financial",
    priority: "critical",
    title: "Procedimentos Subvalorizados Identificados",
    description: "Análise de mercado indica que 4 procedimentos estão com preços 15-30% abaixo da média regional.",
    impact: "Potencial aumento de receita de R$ 8.400/mês",
    recommendation: "Ajustar preços dos procedimentos: Eletrocardiograma (+25%), Consulta Cardiológica (+18%), Hemograma (+15%).",
    estimatedValue: 8400,
    implementationDifficulty: "easy",
    category: "Receita",
    confidence: 92,
    generatedAt: Date.now() - 7200000,
    status: "new"
  },
  {
    id: "insight-003",
    type: "clinical",
    priority: "medium",
    title: "Padrão de No-Show Identificado",
    description: "Pacientes com consultas agendadas às segundas-feiras têm 34% mais chance de não comparecer.",
    impact: "Redução potencial de 40% no no-show rate",
    recommendation: "Implementar lembretes específicos para segundas-feiras e oferecer horários alternativos preferenciais.",
    estimatedValue: 3200,
    implementationDifficulty: "easy",
    category: "Atendimento",
    confidence: 78,
    generatedAt: Date.now() - 10800000,
    status: "viewed"
  },
  {
    id: "insight-004",
    type: "workflow",
    priority: "high",
    title: "Gargalo no Fluxo de Documentos",
    description: "A IA detectou que 68% do tempo gasto no módulo de documentos é para localizar arquivos específicos.",
    impact: "Economia de 45 minutos/dia por usuário",
    recommendation: "Implementar sistema de tags automáticas e busca semântica nos documentos médicos.",
    estimatedValue: 5600,
    implementationDifficulty: "hard",
    category: "Eficiência",
    confidence: 84,
    generatedAt: Date.now() - 14400000,
    status: "new"
  },
  {
    id: "insight-005",
    type: "patient-care",
    priority: "medium",
    title: "Oportunidade de Seguimento Personalizado",
    description: "Pacientes com condições crônicas mostram 60% mais engagement quando recebem lembretes personalizados.",
    impact: "Melhoria de 25% na adesão ao tratamento",
    recommendation: "Criar sistema de lembretes automáticos baseados no perfil e histórico médico do paciente.",
    estimatedValue: 4200,
    implementationDifficulty: "medium",
    category: "Cuidado ao Paciente",
    confidence: 91,
    generatedAt: Date.now() - 18000000,
    status: "new"
  }
];

export const MOCK_AI_METRICS: AIMetrics = {
  userProductivity: {
    averageTaskTime: 3.2, // minutos
    taskCompletionRate: 94.5, // porcentagem
    errorRate: 2.1, // porcentagem
    mostUsedFeatures: ["Agendamentos", "Pacientes", "Prontuários", "Relatórios"],
    timeSpentByModule: {
      "appointments": 35,
      "patients": 25,
      "records": 20,
      "documents": 10,
      "analytics": 10
    }
  },
  clinicalEfficiency: {
    averageConsultationTime: 28.5, // minutos
    patientThroughput: 16.8, // pacientes/dia
    procedureUtilization: {
      "Consulta Geral": 85,
      "Exames": 72,
      "Procedimentos": 68
    },
    scheduleOptimization: 78.2 // porcentagem
  },
  financialPerformance: {
    revenuePerHour: 245.50, // R$/hora
    procedureProfitability: {
      "Consulta Cardiológica": 180.0,
      "Eletrocardiograma": 95.0,
      "Hemograma": 62.5
    },
    paymentDelays: 12.3, // dias médios
    costsOptimization: 67.8 // porcentagem
  },
  patientExperience: {
    waitingTimes: 14.2, // minutos
    appointmentNoShowRate: 8.5, // porcentagem
    patientSatisfactionScore: 4.7, // 0-5
    communicationEffectiveness: 82.4 // porcentagem
  }
};

// Mock de conversas com IA
export const MOCK_CHAT_HISTORY: ChatMessage[] = [
  {
    id: "msg-001",
    type: "user",
    content: "Como posso otimizar meus agendamentos?",
    timestamp: Date.now() - 300000,
  },
  {
    id: "msg-002",
    type: "ai",
    content: "Analisando seus dados, identifiquei algumas oportunidades de otimização:\n\n1. **Redução de intervalos**: Você tem uma média de 15 minutos entre consultas, mas seus procedimentos duram em média 28 minutos. Recomendo ajustar para 30-35 minutos.\n\n2. **Agendamento inteligente**: Segundas-feiras têm 34% mais no-show. Que tal oferecer confirmação automática no domingo?\n\n3. **Sequenciamento otimizado**: Agrupar procedimentos similares pode economizar 20% do tempo de preparação.",
    timestamp: Date.now() - 290000,
    suggestions: [
      {
        id: "sug-001",
        type: "action",
        title: "Implementar Agendamento Inteligente",
        description: "Configurar intervalos automáticos baseados em dados históricos",
        confidence: 87
      },
      {
        id: "sug-002",
        type: "navigation",
        title: "Ver Relatório de Agendamentos",
        description: "Analisar padrões detalhados de agendamento",
        confidence: 95
      }
    ]
  }
];

export default {
  AI_PERSONAS,
  MOCK_AI_INSIGHTS,
  MOCK_AI_METRICS,
  MOCK_CHAT_HISTORY
};