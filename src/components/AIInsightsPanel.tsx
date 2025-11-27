import React, { useState } from 'react';
import {
  Brain,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  X,
  Eye,
  Zap,
  Target,
  BarChart3,
  Lightbulb,
  RefreshCw,
  Filter,
  Star,
  ArrowRight
} from 'lucide-react';
import { useAI } from '../hooks/useAI';
import { AIInsight } from '../types/ai';

interface AIInsightsPanelProps {
  darkMode?: boolean;
}

function InsightCard({ 
  insight, 
  darkMode, 
  onDismiss, 
  onImplement, 
  onView 
}: {
  insight: AIInsight;
  darkMode: boolean;
  onDismiss: (id: string) => void;
  onImplement: (id: string) => void;
  onView: (insight: AIInsight) => void;
}) {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'critical':
        return {
          color: darkMode ? 'text-red-400 bg-red-900/30 border-red-800' : 'text-red-600 bg-red-50 border-red-200',
          icon: AlertCircle,
          label: 'Crítico'
        };
      case 'high':
        return {
          color: darkMode ? 'text-orange-400 bg-orange-900/30 border-orange-800' : 'text-orange-600 bg-orange-50 border-orange-200',
          icon: Zap,
          label: 'Alto'
        };
      case 'medium':
        return {
          color: darkMode ? 'text-yellow-400 bg-yellow-900/30 border-yellow-800' : 'text-yellow-600 bg-yellow-50 border-yellow-200',
          icon: Target,
          label: 'Médio'
        };
      default:
        return {
          color: darkMode ? 'text-blue-400 bg-blue-900/30 border-blue-800' : 'text-blue-600 bg-blue-50 border-blue-200',
          icon: Lightbulb,
          label: 'Baixo'
        };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'efficiency': return TrendingUp;
      case 'financial': return DollarSign;
      case 'clinical': return Users;
      case 'workflow': return Clock;
      case 'patient-care': return Users;
      default: return Brain;
    }
  };

  const priorityConfig = getPriorityConfig(insight.priority);
  const TypeIcon = getTypeIcon(insight.type);
  const PriorityIcon = priorityConfig.icon;

  return (
    <div className={`rounded-lg border p-6 transition-all hover:shadow-lg ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
          }`}>
            <TypeIcon className={`w-5 h-5 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{insight.title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${priorityConfig.color}`}>
                <PriorityIcon className="w-3 h-3 mr-1" />
                {priorityConfig.label}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                {insight.category}
              </span>
              <div className="flex items-center">
                <Star className={`w-3 h-3 mr-1 ${
                  darkMode ? 'text-yellow-400' : 'text-yellow-500'
                }`} />
                <span className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {insight.confidence}% confiança
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onDismiss(insight.id)}
          className={`p-1 rounded transition-colors ${
            darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3 mb-4">
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {insight.description}
        </p>
        
        <div className={`p-3 rounded-lg ${
          darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'
        }`}>
          <div className="flex items-center mb-2">
            <TrendingUp className={`w-4 h-4 mr-2 ${
              darkMode ? 'text-green-400' : 'text-green-600'
            }`} />
            <span className={`font-medium text-sm ${
              darkMode ? 'text-green-400' : 'text-green-700'
            }`}>
              Impacto Estimado
            </span>
          </div>
          <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
            {insight.impact}
          </p>
          {insight.estimatedValue && (
            <p className={`text-lg font-bold mt-2 ${
              darkMode ? 'text-green-400' : 'text-green-600'
            }`}>
              + R$ {insight.estimatedValue.toLocaleString('pt-BR')}/mês
            </p>
          )}
        </div>

        <div className={`p-3 rounded-lg ${
          darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-center mb-2">
            <Lightbulb className={`w-4 h-4 mr-2 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <span className={`font-medium text-sm ${
              darkMode ? 'text-blue-400' : 'text-blue-700'
            }`}>
              Recomendação
            </span>
          </div>
          <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
            {insight.recommendation}
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Dificuldade: {insight.implementationDifficulty === 'easy' ? '🟢 Fácil' : insight.implementationDifficulty === 'medium' ? '🟡 Médio' : '🔴 Difícil'}
            </span>
            <span className={`text-xs ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {new Date(insight.generatedAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => onImplement(insight.id)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Implementar</span>
        </button>
        
        <button
          onClick={() => onView(insight)}
          className={`px-4 py-2 rounded-lg border transition-colors flex items-center space-x-2 ${
            darkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Detalhes</span>
        </button>
      </div>
    </div>
  );
}

export function AIInsightsPanel({ darkMode = false }: AIInsightsPanelProps) {
  const {
    insights,
    metrics,
    refreshInsights,
    dismissInsight,
    implementInsight
  } = useAI();

  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredInsights = insights.filter(insight => {
    const typeMatch = filterType === 'all' || insight.type === filterType;
    const priorityMatch = filterPriority === 'all' || insight.priority === filterPriority;
    return typeMatch && priorityMatch;
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshInsights();
    setIsRefreshing(false);
  };

  const handleImplement = (insightId: string) => {
    implementInsight(insightId);
    // Aqui você pode adicionar lógica para realmente implementar a sugestão
  };

  const totalPotentialValue = insights
    .filter(i => i.estimatedValue)
    .reduce((sum, i) => sum + (i.estimatedValue || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Brain className="w-6 h-6 mr-2 text-purple-600" />
            Insights da IA
          </h2>
          <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Análises inteligentes e recomendações personalizadas
          </p>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
            darkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          } ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Atualizar</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`rounded-lg p-6 ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Insights Ativos
              </p>
              <p className="text-2xl font-bold">{insights.length}</p>
            </div>
            <Brain className={`w-8 h-8 ${
              darkMode ? 'text-purple-400' : 'text-purple-600'
            }`} />
          </div>
        </div>

        <div className={`rounded-lg p-6 ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Valor Potencial
              </p>
              <p className="text-2xl font-bold text-green-600">
                R$ {totalPotentialValue.toLocaleString('pt-BR')}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className={`rounded-lg p-6 ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Produtividade
              </p>
              <p className="text-2xl font-bold">
                {metrics.userProductivity.taskCompletionRate.toFixed(1)}%
              </p>
            </div>
            <TrendingUp className={`w-8 h-8 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
          </div>
        </div>

        <div className={`rounded-lg p-6 ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Confiança Média
              </p>
              <p className="text-2xl font-bold">
                {Math.round(insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length || 0)}%
              </p>
            </div>
            <BarChart3 className={`w-8 h-8 ${
              darkMode ? 'text-orange-400' : 'text-orange-600'
            }`} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-lg p-4 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className={`w-4 h-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <span className={`text-sm font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Filtros:
            </span>
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={`px-3 py-2 rounded border text-sm ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-200'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">Todos os Tipos</option>
            <option value="efficiency">Eficiência</option>
            <option value="financial">Financeiro</option>
            <option value="clinical">Clínico</option>
            <option value="workflow">Fluxo de Trabalho</option>
            <option value="patient-care">Cuidado ao Paciente</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className={`px-3 py-2 rounded border text-sm ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-200'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">Todas as Prioridades</option>
            <option value="critical">Crítico</option>
            <option value="high">Alto</option>
            <option value="medium">Médio</option>
            <option value="low">Baixo</option>
          </select>

          <span className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {filteredInsights.length} insights encontrados
          </span>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInsights.map((insight) => (
          <InsightCard
            key={insight.id}
            insight={insight}
            darkMode={darkMode}
            onDismiss={dismissInsight}
            onImplement={handleImplement}
            onView={setSelectedInsight}
          />
        ))}
      </div>

      {filteredInsights.length === 0 && (
        <div className={`text-center py-12 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">Nenhum insight encontrado</h3>
          <p>Tente ajustar os filtros ou aguarde a IA gerar novos insights.</p>
        </div>
      )}

      {/* Insight Detail Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Detalhes do Insight</h2>
                <button
                  onClick={() => setSelectedInsight(null)}
                  className={`p-2 rounded transition-colors ${
                    darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{selectedInsight.title}</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedInsight.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <h4 className="font-medium mb-2">Impacto</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {selectedInsight.impact}
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <h4 className="font-medium mb-2">Recomendação</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {selectedInsight.recommendation}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedInsight(null)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      darkMode 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Fechar
                  </button>
                  <button
                    onClick={() => {
                      handleImplement(selectedInsight.id);
                      setSelectedInsight(null);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Implementar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIInsightsPanel;