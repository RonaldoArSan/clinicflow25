import { useState, useEffect, useCallback } from 'react';

// Tipos simplificados para notificações do header
export interface SimpleNotification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'patient' | 'system' | 'urgent' | 'success' | 'warning' | 'error' | 'info';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  isRead: boolean;
  createdAt: Date;
}

export interface CreateSimpleNotification {
  title: string;
  message: string;
  type: SimpleNotification['type'];
  priority?: SimpleNotification['priority'];
}

// Hook simplificado para notificações do header
export function useSimpleNotifications() {
  const [notifications, setNotifications] = useState<SimpleNotification[]>([]);

  // Dados mock iniciais
  useEffect(() => {
    const mockNotifications: SimpleNotification[] = [
      {
        id: '1',
        title: 'Nova Consulta Agendada',
        message: 'Dr. Silva - Paciente Maria Santos às 14:30',
        type: 'appointment',
        priority: 'normal',
        isRead: false,
        createdAt: new Date(Date.now() - 5 * 60 * 1000) // 5 minutos atrás
      },
      {
        id: '2',
        title: 'Lembrete de Consulta',
        message: 'Consulta com João Pedro em 15 minutos',
        type: 'appointment',
        priority: 'high',
        isRead: false,
        createdAt: new Date(Date.now() - 15 * 60 * 1000) // 15 minutos atrás
      },
      {
        id: '3',
        title: 'Backup Concluído',
        message: 'Backup automático realizado com sucesso',
        type: 'system',
        priority: 'low',
        isRead: true,
        createdAt: new Date(Date.now() - 60 * 60 * 1000) // 1 hora atrás
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const createNotification = useCallback((data: CreateSimpleNotification) => {
    const newNotification: SimpleNotification = {
      id: Date.now().toString(),
      title: data.title,
      message: data.message,
      type: data.type,
      priority: data.priority || 'normal',
      isRead: false,
      createdAt: new Date()
    };

    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  }, []);

  const getUnreadCount = useCallback(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  const getRecentNotifications = useCallback((limit: number = 5) => {
    return notifications
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }, [notifications]);

  return {
    notifications,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnreadCount,
    getRecentNotifications
  };
}