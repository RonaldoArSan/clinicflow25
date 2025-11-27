import React from "react";
import { User, Clock, Calendar, Search } from "lucide-react";
import { Patient } from "../../hooks/useAttendance";

interface AttendanceQueueProps {
  patients: Patient[];
  onStartAttendance: (patient: Patient) => void;
  darkMode: boolean;
  activeTab: "my-patients" | "general-queue";
  setActiveTab: (tab: "my-patients" | "general-queue") => void;
}

export const AttendanceQueue: React.FC<AttendanceQueueProps> = ({
  patients,
  onStartAttendance,
  darkMode,
  activeTab,
  setActiveTab,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "emergency":
        return "bg-red-100 text-red-800 border-red-200";
      case "urgent":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2
          className={`text-xl font-semibold ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Fila de Atendimento
        </h2>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {new Date().toLocaleDateString("pt-BR")}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
        <button
          className={`pb-2 px-4 font-medium transition-colors relative ${
            activeTab === "my-patients"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
          onClick={() => setActiveTab("my-patients")}
        >
          Meus Pacientes
        </button>
        <button
          className={`pb-2 px-4 font-medium transition-colors relative ${
            activeTab === "general-queue"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
          onClick={() => setActiveTab("general-queue")}
        >
          Fila Geral
        </button>
      </div>

      {/* Search Filter (Placeholder) */}
      <div className="relative">
        <Search
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        />
        <input
          type="text"
          placeholder="Buscar paciente..."
          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          }`}
        />
      </div>

      <div className="space-y-4">
        {patients.length === 0 ? (
          <div
            className={`text-center py-8 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <User className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Nenhum paciente na fila.</p>
          </div>
        ) : (
          patients.map((patient) => (
            <div
              key={patient.id}
              className={`
                ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }
                border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer
              `}
              onClick={() => onStartAttendance(patient)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      ${darkMode ? "bg-gray-700" : "bg-gray-100"}
                    `}
                    >
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                  </div>

                  <div>
                    <h3
                      className={`font-semibold ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {patient.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {patient.age} anos • {patient.healthPlan}
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {patient.reason}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span
                    className={`
                    px-2 py-1 text-xs font-medium rounded-full border
                    ${getPriorityColor(patient.priority)}
                  `}
                  >
                    {patient.priority === "emergency"
                      ? "Emergência"
                      : patient.priority === "urgent"
                      ? "Urgente"
                      : "Normal"}
                  </span>

                  <span
                    className={`
                    px-2 py-1 text-xs font-medium rounded-full
                    ${getStatusColor(patient.status)}
                  `}
                  >
                    {patient.status === "completed"
                      ? "Concluído"
                      : patient.status === "in-progress"
                      ? "Em andamento"
                      : "Aguardando"}
                  </span>

                  <div className="flex items-center text-blue-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">
                      {patient.appointmentTime}
                    </span>
                  </div>

                  <button
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartAttendance(patient);
                    }}
                  >
                    Chamar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
