import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  MessageSquare,
  Send,
  X,
  Minimize2,
  Maximize2,
  Bot,
  User,
  Sparkles,
  TrendingUp,
  Settings,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Move
} from 'lucide-react';
import { useAI } from '../hooks/useAI';
import { ChatMessage, AIPersona, AI_PERSONAS } from '../types/ai';

interface AIChatProps {
  darkMode?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'side';
  onClose?: () => void;
}

function PersonaSelector({ 
  currentPersona, 
  onSelectPersona, 
  darkMode 
}: {
  currentPersona: AIPersona;
  onSelectPersona: (key: string) => void;
  darkMode: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-colors ${
          darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <span className="text-lg">{currentPersona.avatar}</span>
        <div className="text-left min-w-0">
          <div className={`text-sm font-medium truncate ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {currentPersona.name}
          </div>
          <div className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {currentPersona.role}
          </div>
        </div>
      </button>

      {isOpen && (
        <div className={`absolute bottom-full right-0 mb-2 w-64 max-w-[calc(100vw-2rem)] rounded-lg shadow-xl border z-50 backdrop-blur-sm ${
          darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
        }`}>
          <div className={`px-3 py-2.5 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`font-medium text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Escolher Assistente IA
            </h3>
          </div>
          <div className="p-2 space-y-1">
            {Object.entries(AI_PERSONAS).map(([key, persona]) => (
              <button
                key={key}
                onClick={() => {
                  onSelectPersona(key);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 p-2.5 rounded-lg transition-colors text-left ${
                  currentPersona.name === persona.name
                    ? darkMode ? 'bg-blue-900/40 text-blue-300 ring-1 ring-blue-400/20' : 'bg-blue-100 text-blue-700 ring-1 ring-blue-200'
                    : darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="text-lg">{persona.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium truncate ${
                    currentPersona.name === persona.name
                      ? darkMode ? 'text-blue-300' : 'text-blue-700'
                      : darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {persona.name}
                  </div>
                  <div className={`text-xs truncate ${
                    currentPersona.name === persona.name
                      ? darkMode ? 'text-blue-400' : 'text-blue-600'
                      : darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {persona.role}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MessageBubble({ 
  message, 
  darkMode, 
  onSuggestionClick 
}: {
  message: ChatMessage;
  darkMode: boolean;
  onSuggestionClick?: (suggestion: any) => void;
}) {
  const isUser = message.type === 'user';
  const isSystem = message.type === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center my-3">
        <div className={`px-3 py-1.5 rounded-full text-xs ${
          darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
        }`}>
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[85%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div className={`flex items-end space-x-2.5 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser 
              ? darkMode ? 'bg-blue-600' : 'bg-blue-500'
              : darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            {isUser ? (
              <User className="w-3.5 h-3.5 text-white" />
            ) : (
              <Bot className={`w-3.5 h-3.5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            )}
          </div>
          
          <div className={`px-3.5 py-2.5 rounded-2xl shadow-sm ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-md'
              : darkMode 
                ? 'bg-gray-700 text-gray-100 rounded-bl-md border border-gray-600'
                : 'bg-gray-100 text-gray-900 rounded-bl-md border border-gray-200'
          }`}>
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.content}
            </div>
            
            {message.suggestions && message.suggestions.length > 0 && (
              <div className="mt-3 space-y-2">
                {message.suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => onSuggestionClick?.(suggestion)}
                    className={`block w-full text-left p-2.5 rounded-lg text-xs transition-colors ${
                      darkMode 
                        ? 'bg-gray-600 hover:bg-gray-500 text-gray-200 border border-gray-500'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{suggestion.title}</div>
                    <div className={`text-xs mt-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {suggestion.description}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className={`text-xs mt-1.5 ${isUser ? 'text-right' : 'text-left'} ${
          darkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {new Date(message.timestamp).toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}

export function AIChat({ darkMode = false, position = 'bottom-right', onClose }: AIChatProps) {
  const {
    chatMessages,
    currentPersona,
    isTyping,
    sendMessage,
    switchPersona,
    clearChat,
    isEnabled
  } = useAI();

  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(true); // Iniciado como minimizado
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const [chatPosition, setChatPosition] = useState(() => {
    // Posição fixa abaixo de todos os links da sidebar, centralizado horizontalmente
    if (typeof window !== 'undefined') {
      // Sidebar tem 256px de largura (w-64), ícone tem 48px (3rem)
      // Centralizar: (256 - 48) / 2 = 104px do lado esquerdo da sidebar
      // Posição vertical: abaixo de todos os links + margem (500px)
      return { x: 104, y: 500 };
    }
    return { x: 104, y: 500 };
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // Auto-correção de posição inválida
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isValidPosition = 
        chatPosition.y >= 0 && 
        chatPosition.y <= window.innerHeight - 100 &&
        chatPosition.x >= 0 && 
        chatPosition.x <= window.innerWidth - 100;

      if (!isValidPosition) {
        console.log('Corrigindo posição inválida do chat:', chatPosition);
        const correctedPosition = position === 'bottom-left' 
          ? { x: 16, y: window.innerHeight - 480 }
          : { x: window.innerWidth - 400, y: window.innerHeight - 480 };
        
        setChatPosition(correctedPosition);
        localStorage.setItem('aiChatPosition', JSON.stringify(correctedPosition));
      }
    }
  }, []);

  // Funcionalidade de drag and drop
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isFullscreen) return; // Não permitir drag apenas em tela cheia
    
    setIsDragging(true);
    const rect = chatRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, [isFullscreen]);

  // Quando minimizado, manter centralizado horizontalmente abaixo dos links da sidebar
  // Quando expandido, mover para uma posição mais central
  const updateChatPosition = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    if (isMinimized) {
      // Posição fixa centralizada horizontalmente abaixo de todos os links da sidebar
      setChatPosition({ x: 104, y: 500 });
    } else {
      // Posição mais central quando expandido
      const centerX = Math.max(20, (window.innerWidth - 384) / 2); // 384 = 24rem
      const centerY = Math.max(50, (window.innerHeight - 448) / 2); // 448 = 28rem
      setChatPosition({ x: centerX, y: centerY });
    }
  }, [isMinimized]);

  useEffect(() => {
    updateChatPosition();
  }, [isMinimized, updateChatPosition]);

  // Função de emergência para corrigir chat perdido
  const emergencyReset = useCallback(() => {
    if (typeof window !== 'undefined') {
      const safePosition = { x: 50, y: 100 };
      setChatPosition(safePosition);
      localStorage.setItem('aiChatPosition', JSON.stringify(safePosition));
      console.log('Reset de emergência executado:', safePosition);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !chatRef.current || isFullscreen) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Marcar que houve movimento
    setHasDragged(true);

    // Limitar o movimento dentro da tela
    const maxX = window.innerWidth - chatRef.current.offsetWidth;
    const maxY = window.innerHeight - chatRef.current.offsetHeight;

    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));

    setChatPosition({ x: constrainedX, y: constrainedY });
  }, [isDragging, dragOffset, isFullscreen]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Salvar posição no localStorage quando o drag terminar
    if (typeof window !== 'undefined') {
      localStorage.setItem('aiChatPosition', JSON.stringify(chatPosition));
    }
    // Reset hasDragged após um pequeno delay para evitar ativação do click
    setTimeout(() => setHasDragged(false), 100);
  }, [chatPosition]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleSendMessage = async () => {
    if (!message.trim() || isTyping) return;
    
    const messageToSend = message.trim();
    setMessage('');
    await sendMessage(messageToSend);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    // Implementar ação da sugestão
    sendMessage(`Implementar: ${suggestion.title}`);
  };

  if (!isEnabled) return null;

  // Calcular posição e tamanho dinamicamente
  const getPositionStyle = () => {
    if (isFullscreen) {
      return {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
      };
    }

    if (position === 'side') {
      return {
        position: 'fixed' as const,
        right: 0,
        top: 0,
        width: '24rem',
        height: '100vh'
      };
    }

    // Posicionamento draggable para bottom-right e bottom-left
    return {
      position: 'fixed' as const,
      left: `${chatPosition.x}px`,
      top: `${chatPosition.y}px`,
      width: isMinimized ? '3rem' : '24rem',
      height: isMinimized ? '3rem' : '28rem'
    };
  };

  return (
    <div 
      ref={chatRef}
      className={`z-50 transition-all duration-300 ${isDragging ? 'transition-none' : ''}`}
      style={getPositionStyle()}
    >
      <div className={`h-full rounded-lg shadow-xl border backdrop-blur-sm flex flex-col ${
        darkMode 
          ? 'bg-gray-800/95 border-gray-700' 
          : 'bg-white/95 border-gray-200'
      }`}>
        {isMinimized ? (
          // Modo minimizado - apenas ícone da IA
          <button
            onClick={(e) => {
              // Só expandir se não houve drag
              if (!hasDragged) {
                setIsMinimized(false);
              }
            }}
            onMouseDown={(e) => {
              // Permitir drag no ícone minimizado
              e.stopPropagation();
              setHasDragged(false); // Reset no início do drag
              handleMouseDown(e);
            }}
            className={`w-full h-full flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-105 cursor-grab active:cursor-grabbing ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20' 
                : 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/20'
            } ${isDragging ? 'scale-105' : ''}`}
            title="Assistente IA - Clique para expandir • Arraste para mover"
          >
            <Sparkles className="w-4 h-4 text-white" />
          </button>
        ) : (
          // Modo expandido - interface completa
          <>
            {/* Header */}
            <div 
              className={`flex items-center justify-between px-4 py-3 border-b ${
                isMinimized ? '' : 'cursor-move select-none'
              } ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={handleMouseDown}
              title={isMinimized ? "" : "Arraste para mover o chat"}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2.5 rounded-lg ${
                  darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                }`}>
                  <Sparkles className={`w-4 h-4 ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div className="space-y-1">
                  <div>
                    <h3 className={`font-semibold text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      Assistente IA
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Online
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                {!isFullscreen && (
                  <div className={`p-1.5 rounded ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    <Move className="w-4 h-4" />
                  </div>
                )}
                
                <PersonaSelector
                  currentPersona={currentPersona}
                  onSelectPersona={switchPersona}
                  darkMode={darkMode}
                />
                
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className={`p-1.5 rounded transition-colors ${
                    darkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-700'
                  }`}
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className={`p-1.5 rounded transition-colors ${
                    darkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-700'
                  }`}
                  title="Tela cheia"
                >
                  <TrendingUp className="w-4 h-4" />
                </button>

                <button
                  onClick={emergencyReset}
                  className={`p-1.5 rounded transition-colors ${
                    darkMode ? 'hover:bg-red-700 text-red-400 hover:text-red-300' : 'hover:bg-red-100 text-red-600 hover:text-red-700'
                  }`}
                  title="Reset posição (emergência)"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                
                {onClose && (
                  <button
                    onClick={onClose}
                    className={`p-1.5 rounded transition-colors ${
                      darkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-700'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
              {chatMessages.length === 0 && (
                <div className={`text-center py-6 px-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
                  }`}>
                    <Bot className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Olá! Eu sou seu assistente IA
                  </p>
                  <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Faça perguntas sobre a clínica, pacientes ou procedimentos.
                  </p>
                </div>
              )}
              {chatMessages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  darkMode={darkMode}
                  onSuggestionClick={handleSuggestionClick}
                />
              ))}
              
              {isTyping && (
                <div className="flex justify-start mb-3">
                  <div className="flex items-end space-x-2.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <Bot className={`w-3.5 h-3.5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                    </div>
                    <div className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-2xl shadow-sm ${
                      darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-100 border border-gray-200'
                    }`}>
                      <div className="flex space-x-1">
                        <div className={`w-2 h-2 rounded-full animate-bounce ${
                          darkMode ? 'bg-gray-400' : 'bg-gray-500'
                        }`} style={{ animationDelay: '0ms' }} />
                        <div className={`w-2 h-2 rounded-full animate-bounce ${
                          darkMode ? 'bg-gray-400' : 'bg-gray-500'
                        }`} style={{ animationDelay: '150ms' }} />
                        <div className={`w-2 h-2 rounded-full animate-bounce ${
                          darkMode ? 'bg-gray-400' : 'bg-gray-500'
                        }`} style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`px-4 py-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua pergunta..."
                    className={`w-full px-3.5 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-gray-50'
                    }`}
                    disabled={isTyping}
                  />
                </div>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isTyping}
                  className={`p-2.5 rounded-lg transition-colors ${
                    message.trim() && !isTyping
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                      : darkMode 
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={clearChat}
                    className={`text-xs px-2.5 py-1.5 rounded transition-colors ${
                      darkMode 
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <RefreshCw className="w-3 h-3 mr-1.5 inline" />
                    Limpar
                  </button>
                </div>
                
                <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {currentPersona.name} • IA
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AIChat;