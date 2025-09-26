import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  Clock, 
  CheckCircle2, 
  Trash2,
  Calendar,
  User,
  Settings as SettingsIcon,
  AlertTriangle,
  Info,
  CheckCircle
} from 'lucide-react';
import { useSimpleNotifications, type SimpleNotification } from '@/hooks/useSimpleNotifications';

interface SimpleNotificationDropdownProps {
  darkMode?: boolean;
}

export default function SimpleNotificationDropdown({ darkMode = false }: SimpleNotificationDropdownProps) {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    getUnreadCount, 
    getRecentNotifications 
  } = useSimpleNotifications();
  
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = getUnreadCount();
  const recentNotifications = getRecentNotifications(8);

  const getTypeIcon = (type: SimpleNotification['type']) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'patient':
        return <User className="w-4 h-4 text-green-500" />;
      case 'system':
        return <SettingsIcon className="w-4 h-4 text-gray-500" />;
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: SimpleNotification['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-red-500 bg-red-50 dark:bg-red-900/10';
      case 'high':
        return 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/10';
      case 'normal':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/10';
      case 'low':
        return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/10';
      default:
        return 'border-l-gray-300 bg-gray-50 dark:bg-gray-900/10';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  return (
    <div className="relative">
      {/* Botão de Notificações */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative p-2 rounded-lg transition-colors
          ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
          ${isOpen ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}
        `}
        title="Notificações"
      >
        <Bell className="w-4 h-4" />
        
        {/* Badge de contagem */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[1.125rem] h-4.5 px-1 flex items-center justify-center font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className={`
          absolute right-0 mt-2 w-80 rounded-lg shadow-lg border z-50 max-h-96 overflow-hidden
          ${darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
          }
        `}>
          {/* Header do Dropdown */}
          <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Notificações
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {unreadCount > 0 ? `${unreadCount} não lidas` : 'Nenhuma nova notificação'}
                </p>
              </div>
              
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    onClick={() => {
                      markAllAsRead();
                    }}
                    className={`p-1 rounded-md transition-colors ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                    title="Marcar todas como lidas"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
                
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-1 rounded-md transition-colors ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Lista de Notificações */}
          <div className="max-h-64 overflow-y-auto">
            {recentNotifications.length === 0 ? (
              <div className={`p-6 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhuma notificação</p>
              </div>
            ) : (
              recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`
                    border-l-4 p-3 transition-colors cursor-pointer
                    ${getPriorityColor(notification.priority)}
                    ${notification.isRead 
                      ? (darkMode ? 'opacity-60' : 'opacity-75') 
                      : ''
                    }
                    ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                  `}
                  onClick={() => {
                    if (!notification.isRead) {
                      markAsRead(notification.id);
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getTypeIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className={`
                            text-sm font-medium truncate
                            ${darkMode ? 'text-gray-100' : 'text-gray-900'}
                            ${notification.isRead ? 'font-normal' : 'font-semibold'}
                          `}>
                            {notification.title}
                          </p>
                          <p className={`
                            text-xs mt-1 line-clamp-2
                            ${darkMode ? 'text-gray-400' : 'text-gray-600'}
                          `}>
                            {notification.message}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(notification.createdAt)}</span>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className={`
                              p-1 rounded-md transition-colors opacity-0 group-hover:opacity-100
                              ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}
                            `}
                            title="Excluir notificação"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Indicador de não lida */}
                      {!notification.isRead && (
                        <div className="flex items-center mt-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                            Nova
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {recentNotifications.length > 0 && (
            <div className={`p-3 border-t ${darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'}`}>
              <button
                onClick={() => {
                  // Aqui poderia abrir um centro de notificações se existisse
                  setIsOpen(false);
                }}
                className={`
                  w-full text-center text-sm py-2 rounded-md transition-colors
                  ${darkMode 
                    ? 'text-blue-400 hover:bg-gray-700' 
                    : 'text-blue-600 hover:bg-gray-100'
                  }
                `}
              >
                Ver todas as notificações
              </button>
            </div>
          )}
        </div>
      )}

      {/* Overlay para fechar dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}