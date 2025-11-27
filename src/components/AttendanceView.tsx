import React, { useState } from "react";
import {
  useAttendance,
  Patient,
  AttendanceRecord,
} from "../hooks/useAttendance";
import { AttendanceQueue } from "./attendance/AttendanceQueue";
import { AttendanceSession } from "./attendance/AttendanceSession";
import { PatientHistory } from "./attendance/PatientHistory";

interface AttendanceViewProps {
  darkMode: boolean;
}

const AttendanceView: React.FC<AttendanceViewProps> = ({ darkMode }) => {
  const {
    todayPatients,
    attendanceRecords,
    isLoading,
    startAttendance: startAttendanceHook,
    completeAttendance,
    getTodayStats,
    callPatient,
  } = useAttendance();

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [attendanceStarted, setAttendanceStarted] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<AttendanceRecord | null>(
    null
  );
  const [activeQueueTab, setActiveQueueTab] = useState<
    "my-patients" | "general-queue"
  >("my-patients");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const startAttendance = (patient: Patient) => {
    // Se clicar em "Chamar" na fila, apenas notifica
    if (!attendanceStarted) {
      callPatient(patient.id);
    }

    // Inicia o atendimento de fato
    const record = startAttendanceHook(patient);
    setSelectedPatient(patient);
    setCurrentRecord(record);
    setAttendanceStarted(true);
  };

  const finishAttendance = (data: any) => {
    if (currentRecord) {
      completeAttendance(currentRecord.id, data);
    }

    // Reset state
    setSelectedPatient(null);
    setCurrentRecord(null);
    setAttendanceStarted(false);
  };

  const cancelAttendance = () => {
    setSelectedPatient(null);
    setCurrentRecord(null);
    setAttendanceStarted(false);
  };

  // Filter patients based on active tab
  const filteredPatients = todayPatients.filter((patient) => {
    if (patient.status === "completed" || patient.status === "in-progress")
      return false;

    if (activeQueueTab === "my-patients") {
      return patient.assignedTo === "current_doctor";
    } else {
      return !patient.assignedTo || patient.assignedTo !== "current_doctor";
    }
  });

  const stats = getTodayStats();

  return (
    <div className="space-y-6">
      {!attendanceStarted ? (
        <>
          {/* Estatísticas do Dia */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
              className={`
              ${
                darkMode
                  ? "bg-blue-900 border-blue-700"
                  : "bg-blue-50 border-blue-200"
              }
              border rounded-lg p-4
            `}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-blue-200" : "text-blue-900"
                }`}
              >
                {stats.total}
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-blue-300" : "text-blue-700"
                }`}
              >
                Total de Pacientes
              </p>
            </div>

            <div
              className={`
              ${
                darkMode
                  ? "bg-yellow-900 border-yellow-700"
                  : "bg-yellow-50 border-yellow-200"
              }
              border rounded-lg p-4
            `}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-yellow-200" : "text-yellow-900"
                }`}
              >
                {stats.waiting}
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-yellow-300" : "text-yellow-700"
                }`}
              >
                Aguardando
              </p>
            </div>

            <div
              className={`
              ${
                darkMode
                  ? "bg-green-900 border-green-700"
                  : "bg-green-50 border-green-200"
              }
              border rounded-lg p-4
            `}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-green-200" : "text-green-900"
                }`}
              >
                {stats.inProgress}
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-green-300" : "text-green-700"
                }`}
              >
                Em Atendimento
              </p>
            </div>

            <div
              className={`
              ${
                darkMode
                  ? "bg-purple-900 border-purple-700"
                  : "bg-purple-50 border-purple-200"
              }
              border rounded-lg p-4
            `}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-purple-200" : "text-purple-900"
                }`}
              >
                {stats.completed}
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-purple-300" : "text-purple-700"
                }`}
              >
                Concluídos
              </p>
            </div>
          </div>

          <AttendanceQueue
            patients={filteredPatients}
            onStartAttendance={startAttendance}
            darkMode={darkMode}
            activeTab={activeQueueTab}
            setActiveTab={setActiveQueueTab}
          />
        </>
      ) : (
        selectedPatient && (
          <>
            <AttendanceSession
              patient={selectedPatient}
              record={currentRecord}
              onFinish={finishAttendance}
              onCancel={cancelAttendance}
              darkMode={darkMode}
            />

            {/* Show history for the current patient */}
            <PatientHistory
              records={attendanceRecords.filter(
                (r) =>
                  r.patientId === selectedPatient.id && r.status === "completed"
              )}
              darkMode={darkMode}
            />
          </>
        )
      )}
    </div>
  );
};

export default AttendanceView;
