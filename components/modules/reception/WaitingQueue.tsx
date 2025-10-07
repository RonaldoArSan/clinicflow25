import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Clock, 
  AlertCircle, 
  PlayCircle,
  PauseCircle,
  SkipForward,
  User,
  Phone,
  Stethoscope,
  RefreshCw,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface QueuePatient {
  id: string;
  name: string;
  phone?: string;
  priority: 'alta' | 'normal' | 'baixa';
  checkinTime: string;
  waitTime: number; // em minutos
  status: 'aguardando' | 'chamado' | 'em_atendimento' | 'finalizado';
  appointment?: {
    doctor: string;
    type: string;
    room?: string;
  };
  position: number;
}

interface WaitingQueueProps {
  darkMode?: boolean;
  queue: QueuePatient[];
  onCallPatient: (patientId: string) => void;
  onChangePosition: (patientId: string, direction: 'up' | 'down') => void;
  onChangePriority: (patientId: string, priority: 'alta' | 'normal' | 'baixa') => void;
}

export default function WaitingQueue({ 
  darkMode = false, 
  queue = [],
  onCallPatient,
  onChangePosition,
  onChangePriority
}: WaitingQueueProps) {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<QueuePatient | null>(null);

  // Auto-refresh da fila a cada 30 segundos
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      // Aqui seria feita a atualização da fila
      console.log('Atualizando fila de espera...');
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getPriorityColor = (priority: string) => {
    if (darkMode) {
      switch (priority) {
        case 'alta':
          return 'bg-red-900/30 text-red-400 border-red-500';
        case 'normal':
          return 'bg-blue-900/30 text-blue-400 border-blue-500';
        case 'baixa':
          return 'bg-green-900/30 text-green-400 border-green-500';
        default:
          return 'bg-gray-700 text-gray-400 border-gray-500';
      }
    } else {
      switch (priority) {
        case 'alta':
          return 'bg-red-50 text-red-700 border-red-300';
        case 'normal':
          return 'bg-blue-50 text-blue-700 border-blue-300';
        case 'baixa':
          return 'bg-green-50 text-green-700 border-green-300';
        default:
          return 'bg-gray-50 text-gray-700 border-gray-300';
      }
    }
  };

  const getStatusColor = (status: string) => {
    if (darkMode) {
      switch (status) {
        case 'aguardando':
          return 'text-yellow-400 bg-yellow-900/30';
        case 'chamado':
          return 'text-blue-400 bg-blue-900/30';
        case 'em_atendimento':
          return 'text-green-400 bg-green-900/30';
        default:
          return 'text-gray-400 bg-gray-700';
      }
    } else {
      switch (status) {
        case 'aguardando':
          return 'text-yellow-600 bg-yellow-50';
        case 'chamado':
          return 'text-blue-600 bg-blue-50';
        case 'em_atendimento':
          return 'text-green-600 bg-green-50';
        default:
          return 'text-gray-600 bg-gray-50';
      }
    }
  };

  const getWaitTimeColor = (waitTime: number) => {
    if (waitTime > 60) return darkMode ? 'text-red-400' : 'text-red-600';
    if (waitTime > 30) return darkMode ? 'text-yellow-400' : 'text-yellow-600';
    return darkMode ? 'text-green-400' : 'text-green-600';
  };

  const formatWaitTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  const getPositionBadgeColor = (position: number) => {
    if (position === 1) return 'bg-red-500 text-white';
    if (position === 2) return 'bg-yellow-500 text-white';
    if (position === 3) return 'bg-green-500 text-white';
    return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-600';
  };

  const sortedQueue = [...queue].sort((a, b) => {
    // Ordenar por prioridade primeiro, depois por posição
    const priorityOrder = { alta: 0, normal: 1, baixa: 2 };
    const aPriority = priorityOrder[a.priority];
    const bPriority = priorityOrder[b.priority];
    
    if (aPriority !== bPriority) return aPriority - bPriority;
    return a.position - b.position;
  });

  return (
    <div className="space-y-6">
      {/* Header da Fila */}
      <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className={`text-xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
              Fila de Espera
            </h1>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {queue.length} pacientes aguardando
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
                ${autoRefresh 
                  ? darkMode 
                    ? 'bg-green-900/30 text-green-400' 
                    : 'bg-green-100 text-green-700'
                  : darkMode 
                    ? 'bg-gray-700 text-gray-400' 
                    : 'bg-gray-100 text-gray-600'
                }
              `}
            >
              {autoRefresh ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />}
              <span className="text-sm">
                {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
              </span>
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className={`
                p-2 rounded-lg transition-colors
                ${darkMode 
                  ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
              title="Atualizar fila"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className={`text-center p-3 rounded-lg ${darkMode ? "bg-red-900/20" : "bg-red-50"}`}>
            <AlertCircle className={`w-6 h-6 mx-auto mb-1 ${darkMode ? "text-red-400" : "text-red-600"}`} />
            <p className={`text-lg font-bold ${darkMode ? "text-red-400" : "text-red-600"}`}>
              {queue.filter(p => p.priority === 'alta').length}
            </p>
            <p className={`text-xs ${darkMode ? "text-red-400/80" : "text-red-600"}`}>
              Alta Prioridade
            </p>
          </div>
          
          <div className={`text-center p-3 rounded-lg ${darkMode ? "bg-yellow-900/20" : "bg-yellow-50"}`}>
            <Clock className={`w-6 h-6 mx-auto mb-1 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
            <p className={`text-lg font-bold ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}>
              {Math.round(queue.reduce((acc, p) => acc + p.waitTime, 0) / queue.length) || 0}min
            </p>
            <p className={`text-xs ${darkMode ? "text-yellow-400/80" : "text-yellow-600"}`}>
              Tempo Médio
            </p>
          </div>
          
          <div className={`text-center p-3 rounded-lg ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}`}>
            <Users className={`w-6 h-6 mx-auto mb-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <p className={`text-lg font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
              {queue.filter(p => p.status === 'aguardando').length}
            </p>
            <p className={`text-xs ${darkMode ? "text-blue-400/80" : "text-blue-600"}`}>
              Aguardando
            </p>
          </div>
          
          <div className={`text-center p-3 rounded-lg ${darkMode ? "bg-green-900/20" : "bg-green-50"}`}>
            <Stethoscope className={`w-6 h-6 mx-auto mb-1 ${darkMode ? "text-green-400" : "text-green-600"}`} />
            <p className={`text-lg font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
              {queue.filter(p => p.status === 'em_atendimento').length}
            </p>
            <p className={`text-xs ${darkMode ? "text-green-400/80" : "text-green-600"}`}>
              Em Atendimento
            </p>
          </div>
        </div>
      </div>

      {/* Lista da Fila */}
      <div className="space-y-3">
        {sortedQueue.length === 0 ? (
          <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-8 rounded-lg shadow-sm border text-center transition-colors`}>
            <Users className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-gray-400" : "text-gray-400"}`} />
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Nenhum paciente na fila de espera
            </p>
          </div>
        ) : (
          sortedQueue.map((patient, index) => (
            <div 
              key={patient.id}
              className={`
                ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} 
                p-4 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md
                ${patient.priority === 'alta' ? 'border-l-4 border-l-red-500' : ''}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Posição na fila */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${getPositionBadgeColor(index + 1)}`}>
                    {index + 1}
                  </div>
                  
                  {/* Informações do paciente */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className={`font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                        {patient.name}
                      </h3>
                      
                      <select
                        value={patient.priority}
                        onChange={(e) => onChangePriority(patient.id, e.target.value as 'alta' | 'normal' | 'baixa')}
                        className={`
                          px-2 py-1 rounded text-xs font-medium border cursor-pointer
                          ${getPriorityColor(patient.priority)}
                        `}
                      >
                        <option value="baixa">Baixa</option>
                        <option value="normal">Normal</option>
                        <option value="alta">Alta</option>
                      </select>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                        {patient.status === 'aguardando' ? 'Aguardando' : 
                         patient.status === 'chamado' ? 'Chamado' : 'Em Atendimento'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className={`w-4 h-4 ${getWaitTimeColor(patient.waitTime)}`} />
                        <span className={getWaitTimeColor(patient.waitTime)}>
                          Aguardando {formatWaitTime(patient.waitTime)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Phone className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                        <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                          {patient.phone || 'Sem telefone'}
                        </span>
                      </div>
                      
                      {patient.appointment && (
                        <div className="flex items-center space-x-1">
                          <User className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                          <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                            {patient.appointment.doctor}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Ações */}
                <div className="flex items-center space-x-2">
                  {/* Botões de posição */}
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => onChangePosition(patient.id, 'up')}
                      disabled={index === 0}
                      className={`
                        p-1 rounded transition-colors
                        ${index === 0 
                          ? 'opacity-50 cursor-not-allowed' 
                          : darkMode 
                            ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }
                      `}
                      title="Mover para cima"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    
                    <button
                      onClick={() => onChangePosition(patient.id, 'down')}
                      disabled={index === sortedQueue.length - 1}
                      className={`
                        p-1 rounded transition-colors
                        ${index === sortedQueue.length - 1 
                          ? 'opacity-50 cursor-not-allowed' 
                          : darkMode 
                            ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }
                      `}
                      title="Mover para baixo"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                  
                  {/* Botão de chamar */}
                  {patient.status === 'aguardando' && (
                    <button
                      onClick={() => onCallPatient(patient.id)}
                      className={`
                        flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
                        ${darkMode 
                          ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50' 
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }
                      `}
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Chamar</span>
                    </button>
                  )}
                  
                  {/* Botão de próximo */}
                  {patient.status === 'chamado' && (
                    <button
                      onClick={() => onCallPatient(patient.id)}
                      className={`
                        flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
                        ${darkMode 
                          ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }
                      `}
                    >
                      <SkipForward className="w-4 h-4" />
                      <span>Iniciar</span>
                    </button>
                  )}
                  
                  {/* Botão de detalhes */}
                  <button
                    onClick={() => setSelectedPatient(patient)}
                    className={`
                      p-2 rounded-lg transition-colors
                      ${darkMode 
                        ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                    `}
                    title="Ver detalhes"
                  >
                    <User className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de detalhes */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow-xl max-w-md w-full mx-4`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
              Detalhes da Fila - {selectedPatient.name}
            </h3>
            
            <div className="space-y-3">
              <div>
                <span className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Posição na fila:</span>
                <p className={darkMode ? "text-gray-200" : "text-gray-900"}>
                  {sortedQueue.findIndex(p => p.id === selectedPatient.id) + 1}º lugar
                </p>
              </div>
              
              <div>
                <span className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Tempo de espera:</span>
                <p className={getWaitTimeColor(selectedPatient.waitTime)}>
                  {formatWaitTime(selectedPatient.waitTime)}
                </p>
              </div>
              
              <div>
                <span className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Check-in:</span>
                <p className={darkMode ? "text-gray-200" : "text-gray-900"}>{selectedPatient.checkinTime}</p>
              </div>
              
              <div>
                <span className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Prioridade:</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(selectedPatient.priority)}`}>
                  {selectedPatient.priority.charAt(0).toUpperCase() + selectedPatient.priority.slice(1)}
                </span>
              </div>
              
              {selectedPatient.appointment && (
                <div className="border-t pt-3 mt-3">
                  <h4 className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>Consulta</h4>
                  <div className="text-sm space-y-1">
                    <p><span className={darkMode ? "text-gray-400" : "text-gray-600"}>Médico:</span> {selectedPatient.appointment.doctor}</p>
                    <p><span className={darkMode ? "text-gray-400" : "text-gray-600"}>Tipo:</span> {selectedPatient.appointment.type}</p>
                    {selectedPatient.appointment.room && (
                      <p><span className={darkMode ? "text-gray-400" : "text-gray-600"}>Sala:</span> {selectedPatient.appointment.room}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setSelectedPatient(null)}
                className={`
                  flex-1 px-4 py-2 rounded-lg transition-colors
                  ${darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}