import React from "react";
import { Calendar, FileText, Clock } from "lucide-react";
import { AttendanceRecord } from "../../hooks/useAttendance";

interface PatientHistoryProps {
  records: AttendanceRecord[];
  darkMode: boolean;
}

export const PatientHistory: React.FC<PatientHistoryProps> = ({
  records,
  darkMode,
}) => {
  return (
    <div
      className={`
      ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
      border rounded-lg p-6 mt-6
    `}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${
          darkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Histórico do Paciente
      </h3>

      <div className="space-y-4">
        {records.length === 0 ? (
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Nenhum histórico encontrado para este paciente.
          </p>
        ) : (
          records.map((record) => (
            <div
              key={record.id}
              className={`
                p-4 rounded-lg border
                ${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                }
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span
                    className={`font-medium ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {new Date(record.date).toLocaleDateString("pt-BR")}
                  </span>
                  <span
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    • {record.startTime}
                  </span>
                </div>
                <span
                  className={`
                  px-2 py-0.5 text-xs rounded-full
                  ${
                    darkMode
                      ? "bg-green-900/30 text-green-400"
                      : "bg-green-100 text-green-800"
                  }
                `}
                >
                  Concluído
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <p
                    className={`text-xs font-medium uppercase ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Diagnóstico
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {record.diagnosis || "Não informado"}
                  </p>
                </div>

                {record.prescription && (
                  <div>
                    <p
                      className={`text-xs font-medium uppercase ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Prescrição
                    </p>
                    <p
                      className={`text-sm truncate ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {record.prescription}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
