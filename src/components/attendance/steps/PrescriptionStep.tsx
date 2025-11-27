import React from "react";
import { AlertCircle } from "lucide-react";

interface PrescriptionStepProps {
  prescription: string;
  setPrescription: (value: string) => void;
  darkMode: boolean;
}

export const PrescriptionStep: React.FC<PrescriptionStepProps> = ({
  prescription,
  setPrescription,
  darkMode,
}) => {
  return (
    <div
      className={`
      ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
      border rounded-lg p-6
    `}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${
          darkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Prescrição Médica
      </h3>

      <div className="space-y-4">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Medicamentos e Posologia
          </label>
          <textarea
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            placeholder="Liste os medicamentos prescritos com dosagem e instruções de uso..."
            rows={6}
            className={`
              w-full px-3 py-2 border rounded-lg
              ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }
            `}
          />
        </div>

        <div
          className={`
          p-4 rounded-lg border-l-4 border-blue-500
          ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}
        `}
        >
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4
                className={`font-medium ${
                  darkMode ? "text-blue-300" : "text-blue-900"
                }`}
              >
                Resumo do Atendimento
              </h4>
              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-blue-200" : "text-blue-700"
                }`}
              >
                Revise todas as informações antes de finalizar o atendimento. Os
                dados serão salvos no prontuário do paciente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
