import React, { useState } from "react";
import {
  Timer,
  Users,
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  XCircle,
} from "lucide-react";

import { QueueItem } from "../../types/reception";

interface QueueViewProps {
  darkMode: boolean;
  queue: QueueItem[];
  onUpdateQueue: (queueItem: QueueItem) => void;
  onCallNext: (doctorId: string) => void;
}

const QueueView: React.FC<QueueViewProps> = ({
  darkMode,
  queue = [],
  onUpdateQueue,
  onCallNext,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [activeStage, setActiveStage] = useState<
    "consultation" | "medication" | "exams"
  >("consultation");

  // Estatísticas da fila (filtradas por estágio atual)
  const currentStageQueue = queue.filter(
    (item) => (item.stage || "consultation") === activeStage
  );

  const waitingCount = currentStageQueue.filter(
    (item) => item.status === "waiting"
  ).length;
  const inServiceCount = currentStageQueue.filter(
    (item) => item.status === "in_service"
  ).length;
  const completedCount = currentStageQueue.filter(
    (item) => item.status === "completed"
  ).length;
  const averageWaitTime =
    currentStageQueue.length > 0
      ? Math.round(
          currentStageQueue.reduce((acc, item) => acc + item.waitTime, 0) /
            currentStageQueue.length
        )
      : 0;

  // Filtrar fila
  const filteredQueue = currentStageQueue.filter((item) => {
    if (filterStatus !== "all" && item.status !== filterStatus) return false;
    if (selectedDoctor !== "all" && item.doctorName !== selectedDoctor)
      return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return darkMode
          ? "bg-yellow-900/30 text-yellow-400 border-yellow-800"
          : "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "in_service":
        return darkMode
          ? "bg-green-900/30 text-green-400 border-green-800"
          : "bg-green-100 text-green-700 border-green-300";
      case "completed":
        return darkMode
          ? "bg-blue-900/30 text-blue-400 border-blue-800"
          : "bg-blue-100 text-blue-700 border-blue-300";
      case "cancelled":
        return darkMode
          ? "bg-red-900/30 text-red-400 border-red-800"
          : "bg-red-100 text-red-700 border-red-300";
      default:
        return darkMode
          ? "bg-gray-700 text-gray-300 border-gray-600"
          : "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "emergency":
        return darkMode ? "text-red-400" : "text-red-600";
      case "urgent":
        return darkMode ? "text-orange-400" : "text-orange-600";
      default:
        return darkMode ? "text-gray-400" : "text-gray-600";
    }
  };

  const formatWaitTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const updateItemStatus = (
    item: QueueItem,
    newStatus: string,
    newStage?: "consultation" | "medication" | "exams"
  ) => {
    const updatedItem = {
      ...item,
      status: newStatus as any,
      stage: newStage || item.stage || "consultation",
    };
    onUpdateQueue(updatedItem);

    // Trigger TV Panel if calling patient
    if (newStatus === "in_service") {
      let destination = "Recepção";
      if (updatedItem.stage === "consultation") {
        destination = item.doctorName
          ? `Consultório - ${item.doctorName}`
          : "Triagem";
      } else if (updatedItem.stage === "medication") {
        destination = "Sala de Medicação";
      } else if (updatedItem.stage === "exams") {
        destination = "Sala de Exames";
      }

      const tvCall = {
        id: item.id,
        patientName: item.patientName,
        ticketNumber: `S${item.id.substring(0, 3).toUpperCase()}`,
        destination: destination,
        timestamp: new Date(),
        type: item.priority === "normal" ? "normal" : "preferential",
      };
      localStorage.setItem("clinicflow_tv_call", JSON.stringify(tvCall));
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div
        className={`${
          darkMode
            ? "bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-800"
            : "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200"
        } rounded-lg border p-6`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Timer
              className={`w-8 h-8 ${
                darkMode ? "text-orange-400" : "text-orange-600"
              }`}
            />
            <div>
              <h2
                className={`text-2xl font-bold ${
                  darkMode ? "text-orange-300" : "text-orange-700"
                }`}
              >
                Fluxo de Atendimento
              </h2>
              <p
                className={`${
                  darkMode ? "text-orange-400/80" : "text-orange-600/80"
                }`}
              >
                Gerenciamento de filas e chamadas
              </p>
            </div>
          </div>
          <button
            onClick={() => window.open("/tv-panel", "_blank")}
            className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
              darkMode
                ? "bg-orange-900/40 text-orange-300 hover:bg-orange-900/60 border border-orange-700"
                : "bg-white text-orange-700 hover:bg-orange-50 border border-orange-200 shadow-sm"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Abrir Painel TV</span>
          </button>
        </div>
      </div>

      {/* Stage Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
        <button
          onClick={() => setActiveStage("consultation")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            activeStage === "consultation"
              ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          }`}
        >
          🩺 Consultas
        </button>
        <button
          onClick={() => setActiveStage("medication")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            activeStage === "medication"
              ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          }`}
        >
          💊 Medicação
        </button>
        <button
          onClick={() => setActiveStage("exams")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            activeStage === "exams"
              ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          }`}
        >
          🔬 Exames
        </button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          className={`${
            darkMode
              ? "bg-yellow-900/20 border-yellow-800"
              : "bg-yellow-50 border-yellow-200"
          } border rounded-lg p-4`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-yellow-400/80" : "text-yellow-600/80"
                }`}
              >
                Aguardando
              </p>
              <p
                className={`text-2xl font-bold ${
                  darkMode ? "text-yellow-400" : "text-yellow-600"
                }`}
              >
                {waitingCount}
              </p>
            </div>
            <Timer
              className={`w-8 h-8 ${
                darkMode ? "text-yellow-400" : "text-yellow-600"
              } opacity-60`}
            />
          </div>
        </div>

        <div
          className={`${
            darkMode
              ? "bg-green-900/20 border-green-800"
              : "bg-green-50 border-green-200"
          } border rounded-lg p-4`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-green-400/80" : "text-green-600/80"
                }`}
              >
                Em Atendimento
              </p>
              <p
                className={`text-2xl font-bold ${
                  darkMode ? "text-green-400" : "text-green-600"
                }`}
              >
                {inServiceCount}
              </p>
            </div>
            <Activity
              className={`w-8 h-8 ${
                darkMode ? "text-green-400" : "text-green-600"
              } opacity-60`}
            />
          </div>
        </div>

        <div
          className={`${
            darkMode
              ? "bg-blue-900/20 border-blue-800"
              : "bg-blue-50 border-blue-200"
          } border rounded-lg p-4`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-blue-400/80" : "text-blue-600/80"
                }`}
              >
                Concluídos
              </p>
              <p
                className={`text-2xl font-bold ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {completedCount}
              </p>
            </div>
            <CheckCircle
              className={`w-8 h-8 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              } opacity-60`}
            />
          </div>
        </div>

        <div
          className={`${
            darkMode
              ? "bg-purple-900/20 border-purple-800"
              : "bg-purple-50 border-purple-200"
          } border rounded-lg p-4`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-purple-400/80" : "text-purple-600/80"
                }`}
              >
                Tempo Médio
              </p>
              <p
                className={`text-2xl font-bold ${
                  darkMode ? "text-purple-400" : "text-purple-600"
                }`}
              >
                {formatWaitTime(averageWaitTime)}
              </p>
            </div>
            <Clock
              className={`w-8 h-8 ${
                darkMode ? "text-purple-400" : "text-purple-600"
              } opacity-60`}
            />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } rounded-lg border p-4`}
      >
        <div className="flex flex-wrap gap-4">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-200"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="all">Todos</option>
              <option value="waiting">Aguardando</option>
              <option value="in_service">Em Atendimento</option>
              <option value="completed">Concluídos</option>
              <option value="cancelled">Cancelados</option>
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Médico
            </label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-200"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="all">Todos os Médicos</option>
              <option value="Dr. João Silva">Dr. João Silva</option>
              <option value="Dra. Ana Paula">Dra. Ana Paula</option>
              <option value="Dr. Pedro Costa">Dr. Pedro Costa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista da Fila */}
      <div
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } rounded-lg border`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Pacientes na Fila -{" "}
            {activeStage === "consultation"
              ? "Consultas"
              : activeStage === "medication"
              ? "Medicação"
              : "Exames"}{" "}
            ({filteredQueue.length})
          </h3>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredQueue.map((item, index) => (
            <div key={item.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Posição na fila */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      item.priority === "emergency"
                        ? darkMode
                          ? "bg-red-900/30 text-red-400"
                          : "bg-red-100 text-red-600"
                        : item.priority === "urgent"
                        ? darkMode
                          ? "bg-orange-900/30 text-orange-400"
                          : "bg-orange-100 text-orange-600"
                        : darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Informações do paciente */}
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        darkMode
                          ? "bg-blue-900/30 text-blue-400"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4
                        className={`font-medium ${
                          darkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {item.patientName}
                      </h4>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {item.serviceType}
                        {item.doctorName && ` • ${item.doctorName}`}
                        {item.specialty && ` • ${item.specialty}`}
                      </p>
                      <p
                        className={`text-xs ${getPriorityColor(item.priority)}`}
                      >
                        {item.priority === "emergency" && "🚨 Emergência"}
                        {item.priority === "urgent" && "⚠️ Urgente"}
                        {item.priority === "normal" && "📋 Normal"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Tempo de espera */}
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {formatWaitTime(item.waitTime)}
                    </p>
                    <p
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Chegada: {item.checkInTime}
                    </p>
                  </div>

                  {/* Status */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status === "waiting" && "Aguardando"}
                    {item.status === "in_service" && "Em Atendimento"}
                    {item.status === "completed" && "Concluído"}
                    {item.status === "cancelled" && "Cancelado"}
                  </span>

                  {/* Ações */}
                  <div className="flex space-x-2">
                    {item.status === "waiting" && (
                      <>
                        <button
                          onClick={() => updateItemStatus(item, "in_service")}
                          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
                          title="Chamar para atendimento"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateItemStatus(item, "cancelled")}
                          className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
                          title="Cancelar"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {item.status === "in_service" && (
                      <div className="flex items-center space-x-2">
                        {/* Ações de Encaminhamento (Só aparecem na etapa de Consulta) */}
                        {activeStage === "consultation" && (
                          <>
                            <button
                              onClick={() =>
                                updateItemStatus(item, "waiting", "medication")
                              }
                              className="bg-purple-600 text-white px-3 py-2 rounded text-xs font-medium hover:bg-purple-700 transition-colors"
                              title="Enviar para Medicação"
                            >
                              💊 Medicação
                            </button>
                            <button
                              onClick={() =>
                                updateItemStatus(item, "waiting", "exams")
                              }
                              className="bg-indigo-600 text-white px-3 py-2 rounded text-xs font-medium hover:bg-indigo-700 transition-colors"
                              title="Enviar para Exames"
                            >
                              🔬 Exames
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => updateItemStatus(item, "completed")}
                          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                          title="Finalizar Atendimento"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateItemStatus(item, "waiting")}
                          className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 transition-colors"
                          title="Retornar para fila"
                        >
                          <Pause className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Controles de prioridade */}
                    {item.status === "waiting" && index > 0 && (
                      <button
                        className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition-colors"
                        title="Mover para cima"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                    )}

                    {item.status === "waiting" &&
                      index < filteredQueue.length - 1 && (
                        <button
                          className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition-colors"
                          title="Mover para baixo"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredQueue.length === 0 && (
            <div className="p-8 text-center">
              <Timer
                className={`w-12 h-12 mx-auto mb-4 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Nenhum paciente na fila de{" "}
                {activeStage === "consultation"
                  ? "consultas"
                  : activeStage === "medication"
                  ? "medicação"
                  : "exames"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueueView;
