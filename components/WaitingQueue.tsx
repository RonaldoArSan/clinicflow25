import React, { useState, useEffect } from 'react';
import { Clock, User, Bell, ChevronUp, ChevronDown, AlertCircle } from 'lucide-react';

interface QueueItem {
  id: number;
  patientName: string;
  appointmentTime: string;
  checkInTime: string;
  priority: 'alta' | 'normal' | 'baixa';
  doctorName: string;
  type: string;
  waitingTime?: number;
}

interface WaitingQueueProps {
  darkMode?: boolean;
  appointments?: any[];
}

const WaitingQueue: React.FC<WaitingQueueProps> = ({ 
  darkMode = false,
  appointments = []
}) => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    // Simulate queue from appointments with check-in
    const queueItems: QueueItem[] = appointments
      .filter(apt => apt.status === 'confirmado' && apt.checkInTime)
      .map((apt, index) => {
        const priority: 'alta' | 'normal' | 'baixa' = apt.priority || 'normal';
        return {
          id: apt.id,
          patientName: apt.patientName,
          appointmentTime: apt.time,
          checkInTime: apt.checkInTime,
          priority,
          doctorName: apt.doctorName,
          type: apt.type,
          waitingTime: Math.floor(Math.random() * 45) + 5 // Simulated waiting time
        };
      })
      .sort((a, b) => {
        // Sort by priority first
        const priorityOrder: Record<'alta' | 'normal' | 'baixa', number> = { 'alta': 0, 'normal': 1, 'baixa': 2 };
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDiff !== 0) return priorityDiff;
        
        // Then by check-in time
        return a.checkInTime.localeCompare(b.checkInTime);
      });

    setQueue(queueItems);
  }, [appointments]);

  const getPriorityColor = (priority: 'alta' | 'normal' | 'baixa') => {
    if (darkMode) {
      switch (priority) {
        case 'alta':
          return 'bg-red-900/30 text-red-400 border-red-700/30';
        case 'normal':
          return 'bg-yellow-900/30 text-yellow-400 border-yellow-700/30';
        case 'baixa':
          return 'bg-green-900/30 text-green-400 border-green-700/30';
      }
    } else {
      switch (priority) {
        case 'alta':
          return 'bg-red-50 text-red-600 border-red-200';
        case 'normal':
          return 'bg-yellow-50 text-yellow-600 border-yellow-200';
        case 'baixa':
          return 'bg-green-50 text-green-600 border-green-200';
      }
    }
  };

  const getPriorityLabel = (priority: 'alta' | 'normal' | 'baixa') => {
    return {
      'alta': 'Alta Prioridade',
      'normal': 'Prioridade Normal',
      'baixa': 'Baixa Prioridade'
    }[priority];
  };

  const callPatient = (queueItem: QueueItem) => {
    // Simulate calling patient
    console.log(`Chamando paciente: ${queueItem.patientName}`);
    // In a real app, this would trigger a notification system
  };

  const changePriority = (id: number, direction: 'up' | 'down') => {
    setQueue(prevQueue => {
      const newQueue = [...prevQueue];
      const currentIndex = newQueue.findIndex(item => item.id === id);
      
      if (currentIndex === -1) return prevQueue;
      
      const item = newQueue[currentIndex];
      const priorities: Array<'alta' | 'normal' | 'baixa'> = ['baixa', 'normal', 'alta'];
      const currentPriorityIndex = priorities.indexOf(item.priority);
      
      if (direction === 'up' && currentPriorityIndex < priorities.length - 1) {
        item.priority = priorities[currentPriorityIndex + 1];
      } else if (direction === 'down' && currentPriorityIndex > 0) {
        item.priority = priorities[currentPriorityIndex - 1];
      }
      
      // Re-sort queue
      return newQueue.sort((a, b) => {
        const priorityOrder: Record<'alta' | 'normal' | 'baixa', number> = { 'alta': 0, 'normal': 1, 'baixa': 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-lg shadow p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
              Fila de Espera
            </h2>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {queue.length} pacientes aguardando atendimento
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Auto-atualizar
              </span>
            </label>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${
            darkMode ? "bg-red-900/20" : "bg-red-50"
          }`}>
            <p className={`text-xs mb-1 ${darkMode ? "text-red-400" : "text-red-600"}`}>
              Alta Prioridade
            </p>
            <p className={`text-2xl font-bold ${darkMode ? "text-red-300" : "text-red-700"}`}>
              {queue.filter(q => q.priority === 'alta').length}
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${
            darkMode ? "bg-yellow-900/20" : "bg-yellow-50"
          }`}>
            <p className={`text-xs mb-1 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}>
              Prioridade Normal
            </p>
            <p className={`text-2xl font-bold ${darkMode ? "text-yellow-300" : "text-yellow-700"}`}>
              {queue.filter(q => q.priority === 'normal').length}
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${
            darkMode ? "bg-green-900/20" : "bg-green-50"
          }`}>
            <p className={`text-xs mb-1 ${darkMode ? "text-green-400" : "text-green-600"}`}>
              Baixa Prioridade
            </p>
            <p className={`text-2xl font-bold ${darkMode ? "text-green-300" : "text-green-700"}`}>
              {queue.filter(q => q.priority === 'baixa').length}
            </p>
          </div>
        </div>
      </div>

      {/* Queue List */}
      <div className="space-y-3">
        {queue.length === 0 ? (
          <div className={`rounded-lg shadow p-12 text-center ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}>
            <Clock className={`w-16 h-16 mx-auto mb-4 ${
              darkMode ? "text-gray-600" : "text-gray-300"
            }`} />
            <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Nenhum paciente na fila de espera
            </p>
          </div>
        ) : (
          queue.map((item, index) => (
            <div 
              key={item.id}
              className={`rounded-lg shadow p-5 transition-all ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Position */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  index === 0 
                    ? (darkMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white")
                    : (darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600")
                }`}>
                  {index + 1}
                </div>

                {/* Patient Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-lg font-bold ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}>
                      {item.patientName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                      {getPriorityLabel(item.priority)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className={`text-xs mb-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                        Médico
                      </p>
                      <p className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {item.doctorName}
                      </p>
                    </div>
                    
                    <div>
                      <p className={`text-xs mb-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                        Horário
                      </p>
                      <p className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {item.appointmentTime}
                      </p>
                    </div>
                    
                    <div>
                      <p className={`text-xs mb-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                        Check-in
                      </p>
                      <p className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {item.checkInTime}
                      </p>
                    </div>
                    
                    <div>
                      <p className={`text-xs mb-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                        Tempo de Espera
                      </p>
                      <p className={`font-medium ${
                        item.waitingTime && item.waitingTime > 30 
                          ? (darkMode ? "text-red-400" : "text-red-600")
                          : (darkMode ? "text-gray-300" : "text-gray-700")
                      }`}>
                        {item.waitingTime} min
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => callPatient(item)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2 ${
                      darkMode 
                        ? "bg-blue-600 hover:bg-blue-700 text-white" 
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                    Chamar
                  </button>
                  
                  <div className="flex gap-1">
                    <button
                      onClick={() => changePriority(item.id, 'up')}
                      disabled={item.priority === 'alta'}
                      className={`p-2 rounded transition-colors ${
                        item.priority === 'alta'
                          ? (darkMode ? "bg-gray-700 text-gray-600 cursor-not-allowed" : "bg-gray-100 text-gray-400 cursor-not-allowed")
                          : (darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-600")
                      }`}
                      title="Aumentar prioridade"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => changePriority(item.id, 'down')}
                      disabled={item.priority === 'baixa'}
                      className={`p-2 rounded transition-colors ${
                        item.priority === 'baixa'
                          ? (darkMode ? "bg-gray-700 text-gray-600 cursor-not-allowed" : "bg-gray-100 text-gray-400 cursor-not-allowed")
                          : (darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-600")
                      }`}
                      title="Diminuir prioridade"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WaitingQueue;
