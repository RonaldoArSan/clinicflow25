import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  AIAnalysisData, 
  AIInsight, 
  AIMetrics, 
  ChatMessage, 
  AISuggestion,
  AIPersona,
  AI_PERSONAS,
  MOCK_AI_INSIGHTS,
  MOCK_AI_METRICS,
  MOCK_CHAT_HISTORY
} from '../types/ai';
import { useUserContext } from './useUserContext';

interface AIContextType {
  // Insights e Analytics
  insights: AIInsight[];
  metrics: AIMetrics;
  refreshInsights: () => Promise<void>;
  dismissInsight: (insightId: string) => void;
  implementInsight: (insightId: string) => void;
  
  // Chat com IA
  chatMessages: ChatMessage[];
  currentPersona: AIPersona;
  isTyping: boolean;
  sendMessage: (message: string, context?: string) => Promise<void>;
  switchPersona: (personaKey: string) => void;
  clearChat: () => void;
  
  // Análise de Comportamento
  trackUserAction: (action: string, module: string, context?: Record<string, any>) => void;
  getActionSuggestions: (currentModule: string) => AISuggestion[];
  
  // Configurações
  isEnabled: boolean;
  toggleAI: () => void;
  chatPosition: 'bottom-right' | 'bottom-left' | 'side';
  setChatPosition: (position: 'bottom-right' | 'bottom-left' | 'side') => void;
}

export const useAI = (): AIContextType => {
  const { currentUser } = useUserContext();
  const [insights, setInsights] = useState<AIInsight[]>(MOCK_AI_INSIGHTS);
  const [metrics, setMetrics] = useState<AIMetrics>(MOCK_AI_METRICS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentPersona, setCurrentPersona] = useState<AIPersona>(AI_PERSONAS.support);
  const [isTyping, setIsTyping] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [chatPosition, setChatPosition] = useState<'bottom-right' | 'bottom-left' | 'side'>('bottom-right');
  
  const sessionDataRef = useRef<AIAnalysisData[]>([]);
  const currentModuleRef = useRef<string>('dashboard');

  // Inicializar chat com mensagem de boas-vindas
  useEffect(() => {
    if (currentUser && chatMessages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: `msg-welcome-${Date.now()}`,
        type: 'ai',
        content: `Olá, ${currentUser.name.split(' ')[0]}! 👋\n\nSou ${currentPersona.name}, sua ${currentPersona.role}. Estou aqui para ajudar você a otimizar o uso do Cliniciflow e melhorar a eficiência da sua clínica.\n\n✨ **Posso ajudar com:**\n${currentPersona.capabilities.map(cap => `• ${cap}`).join('\n')}\n\nComo posso ajudá-lo hoje?`,
        timestamp: Date.now(),
        suggestions: [
          {
            id: 'sug-insights',
            type: 'information',
            title: 'Ver Insights da IA',
            description: 'Análises e recomendações personalizadas',
            confidence: 100
          },
          {
            id: 'sug-optimize',
            type: 'action',
            title: 'Otimizar Agendamentos',
            description: 'Melhorar eficiência dos agendamentos',
            confidence: 95
          },
          {
            id: 'sug-financial',
            type: 'action',
            title: 'Análise Financeira',
            description: 'Revisar performance financeira',
            confidence: 90
          }
        ]
      };
      setChatMessages([welcomeMessage]);
    }
  }, [currentUser, currentPersona]);

  // Rastrear ações do usuário
  const trackUserAction = useCallback((action: string, module: string, context?: Record<string, any>) => {
    if (!isEnabled || !currentUser) return;

    const actionData: AIAnalysisData = {
      userId: currentUser.id,
      timestamp: Date.now(),
      action,
      module,
      duration: 0, // Será calculado posteriormente
      context: context || {},
      success: true
    };

    sessionDataRef.current.push(actionData);
    currentModuleRef.current = module;

    // Simular análise em tempo real
    if (sessionDataRef.current.length > 10) {
      generateRealTimeInsights();
    }
  }, [isEnabled, currentUser]);

  // Gerar insights em tempo real
  const generateRealTimeInsights = useCallback(() => {
    const recentActions = sessionDataRef.current.slice(-10);
    const moduleUsage = recentActions.reduce((acc, action) => {
      acc[action.module] = (acc[action.module] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Detectar padrões e gerar insights
    const mostUsedModule = Object.entries(moduleUsage).sort(([,a], [,b]) => b - a)[0];
    
    if (mostUsedModule && mostUsedModule[1] > 5) {
      const newInsight: AIInsight = {
        id: `insight-realtime-${Date.now()}`,
        type: 'efficiency',
        priority: 'medium',
        title: `Uso intenso detectado: ${mostUsedModule[0]}`,
        description: `Você está usando muito o módulo ${mostUsedModule[0]}. Posso sugerir algumas otimizações.`,
        impact: 'Potencial economia de tempo de 15-20%',
        recommendation: 'Que tal usar atalhos de teclado ou criar filtros personalizados?',
        implementationDifficulty: 'easy',
        category: 'Produtividade',
        confidence: 75,
        generatedAt: Date.now(),
        status: 'new'
      };

      setInsights(prev => [newInsight, ...prev.slice(0, 9)]);
    }
  }, []);

  // Atualizar insights
  const refreshInsights = useCallback(async () => {
    // Simular chamada para API de IA
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Gerar novos insights baseados nos dados atuais
    const newInsights = generateSmartInsights();
    setInsights(prev => [...newInsights, ...prev.filter(i => i.status !== 'new').slice(0, 5)]);
  }, []);

  // Gerar insights inteligentes
  const generateSmartInsights = (): AIInsight[] => {
    const now = Date.now();
    return [
      {
        id: `insight-${now}-1`,
        type: 'efficiency',
        priority: 'high',
        title: 'Padrão de Uso Otimizado Detectado',
        description: 'Sua produtividade aumentou 23% nos últimos 7 dias com as mudanças implementadas.',
        impact: 'Economia de 1.2 horas por dia',
        recommendation: 'Continue com as práticas atuais e considere aplicar o mesmo padrão em outros módulos.',
        estimatedValue: 2800,
        implementationDifficulty: 'easy',
        category: 'Produtividade',
        confidence: 89,
        generatedAt: now,
        status: 'new'
      }
    ];
  };

  // Dismissar insight
  const dismissInsight = useCallback((insightId: string) => {
    setInsights(prev => prev.map(insight => 
      insight.id === insightId ? { ...insight, status: 'dismissed' } : insight
    ));
  }, []);

  // Implementar insight
  const implementInsight = useCallback((insightId: string) => {
    setInsights(prev => prev.map(insight => 
      insight.id === insightId ? { ...insight, status: 'implemented' } : insight
    ));
  }, []);

  // Enviar mensagem para IA
  const sendMessage = useCallback(async (message: string, context?: string) => {
    if (!isEnabled) return;

    const userMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      type: 'user',
      content: message,
      timestamp: Date.now(),
      context
    };

    setChatMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simular processamento da IA
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));

    const aiResponse = generateAIResponse(message, context);
    const aiMessage: ChatMessage = {
      id: `msg-ai-${Date.now()}`,
      type: 'ai',
      content: aiResponse.content,
      timestamp: Date.now(),
      suggestions: aiResponse.suggestions
    };

    setChatMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  }, [isEnabled, currentPersona]);

  // Gerar resposta da IA
  const generateAIResponse = (userMessage: string, context?: string) => {
    const message = userMessage.toLowerCase();
    
    // Respostas contextuais baseadas no conteúdo
    if (message.includes('agendamento') || message.includes('agenda')) {
      return {
        content: `📅 **Sobre Agendamentos:**\n\nAnalisando seus dados, vejo algumas oportunidades:\n\n• **Horários otimizados**: Seus melhores horários são 9h-11h e 14h-16h\n• **Taxa de comparecimento**: 91.5% (excelente!)\n• **Tempo médio**: 28.5 min por consulta\n\n**💡 Sugestão imediata:** Configure lembretes automáticos 24h antes para reduzir no-show em mais 15%.`,
        suggestions: [
          {
            id: 'sug-schedule',
            type: 'navigation' as const,
            title: 'Ir para Agendamentos',
            description: 'Configurar lembretes automáticos',
            confidence: 95
          },
          {
            id: 'sug-optimize-schedule',
            type: 'action' as const,
            title: 'Otimizar Agenda',
            description: 'Aplicar sugestões da IA automaticamente',
            confidence: 88
          }
        ]
      };
    }

    if (message.includes('financeiro') || message.includes('receita') || message.includes('pagamento')) {
      return {
        content: `💰 **Análise Financeira:**\n\n**Performance atual:**\n• Receita/hora: R$ 245,50\n• Crescimento mensal: +12.3%\n• Inadimplência: 8.2%\n\n**🎯 Oportunidades identificadas:**\n1. **Ajuste de preços**: 3 procedimentos estão subvalorizados\n2. **Cobrança otimizada**: Automatizar lembretes de pagamento\n3. **Novos serviços**: Demanda por telemedicina detectada\n\n**Potencial de aumento**: R$ 8.400/mês`,
        suggestions: [
          {
            id: 'sug-pricing',
            type: 'action' as const,
            title: 'Revisar Preços',
            description: 'Implementar sugestões de precificação',
            confidence: 92
          },
          {
            id: 'sug-financial-report',
            type: 'navigation' as const,
            title: 'Relatório Completo',
            description: 'Ver análise financeira detalhada',
            confidence: 100
          }
        ]
      };
    }

    if (message.includes('paciente') || message.includes('atendimento')) {
      return {
        content: `👥 **Análise de Atendimento:**\n\n**Métricas atuais:**\n• Satisfação: 4.7/5 ⭐\n• Tempo de espera: 14.2 min\n• Taxa de retorno: 68%\n\n**🔍 Insights detectados:**\n• Pacientes preferem horários da manhã\n• Consultas de retorno têm 40% mais satisfação\n• Comunicação via WhatsApp aumenta engajamento em 25%\n\n**Recomendação**: Implementar follow-up automatizado pós-consulta.`,
        suggestions: [
          {
            id: 'sug-patient-flow',
            type: 'optimization' as const,
            title: 'Otimizar Fluxo',
            description: 'Melhorar experiência do paciente',
            confidence: 85
          }
        ]
      };
    }

    // Resposta genérica inteligente
    return {
      content: `🤖 Entendi sua pergunta! Como ${currentPersona.name}, posso ajudar com:\n\n${currentPersona.capabilities.map(cap => `• ${cap}`).join('\n')}\n\nPoderia ser mais específico sobre o que gostaria de saber? Por exemplo:\n• "Como otimizar meus agendamentos?"\n• "Qual a performance financeira?"\n• "Como melhorar o atendimento?"`,
      suggestions: [
        {
          id: 'sug-help',
          type: 'information' as const,
          title: 'Ver Guia Completo',
          description: 'Todas as funcionalidades da IA',
          confidence: 100
        }
      ]
    };
  };

  // Trocar persona da IA
  const switchPersona = useCallback((personaKey: string) => {
    const persona = AI_PERSONAS[personaKey];
    if (persona) {
      setCurrentPersona(persona);
      
      // Adicionar mensagem de transição
      const transitionMessage: ChatMessage = {
        id: `msg-transition-${Date.now()}`,
        type: 'system',
        content: `🔄 Agora você está conversando com ${persona.name} (${persona.role})`,
        timestamp: Date.now()
      };
      
      setChatMessages(prev => [...prev, transitionMessage]);
    }
  }, []);

  // Limpar chat
  const clearChat = useCallback(() => {
    setChatMessages([]);
  }, []);

  // Obter sugestões de ação
  const getActionSuggestions = useCallback((currentModule: string): AISuggestion[] => {
    const moduleSuggestions: Record<string, AISuggestion[]> = {
      appointments: [
        {
          id: 'sug-auto-schedule',
          type: 'optimization' as const,
          title: 'Agendamento Automático',
          description: 'Configurar horários baseados em padrões históricos',
          confidence: 90
        }
      ],
      patients: [
        {
          id: 'sug-patient-segmentation',
          type: 'optimization' as const,
          title: 'Segmentação Inteligente',
          description: 'Agrupar pacientes por perfil de atendimento',
          confidence: 85
        }
      ],
      financial: [
        {
          id: 'sug-pricing-optimization',
          type: 'optimization' as const,
          title: 'Otimização de Preços',
          description: 'Ajustar valores baseado em análise de mercado',
          confidence: 92
        }
      ]
    };

    return moduleSuggestions[currentModule] || [];
  }, []);

  // Toggle IA
  const toggleAI = useCallback(() => {
    setIsEnabled(prev => !prev);
  }, []);

  return {
    // Insights e Analytics
    insights: insights.filter(i => i.status !== 'dismissed'),
    metrics,
    refreshInsights,
    dismissInsight,
    implementInsight,
    
    // Chat com IA
    chatMessages,
    currentPersona,
    isTyping,
    sendMessage,
    switchPersona,
    clearChat,
    
    // Análise de Comportamento
    trackUserAction,
    getActionSuggestions,
    
    // Configurações
    isEnabled,
    toggleAI,
    chatPosition,
    setChatPosition
  };
};

export default useAI;