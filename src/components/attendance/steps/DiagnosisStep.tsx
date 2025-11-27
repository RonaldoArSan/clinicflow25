import React from "react";

interface DiagnosisStepProps {
  diagnosis: string;
  setDiagnosis: (value: string) => void;
  treatment: string;
  setTreatment: (value: string) => void;
  darkMode: boolean;
}

export const DiagnosisStep: React.FC<DiagnosisStepProps> = ({
  diagnosis,
  setDiagnosis,
  treatment,
  setTreatment,
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
        Diagnóstico e Tratamento
      </h3>

      <div className="space-y-4">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Diagnóstico
          </label>
          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Diagnóstico médico baseado nos sintomas e exame físico..."
            rows={3}
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

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Plano de Tratamento
          </label>
          <textarea
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            placeholder="Descreva o plano de tratamento, recomendações, acompanhamento..."
            rows={4}
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
      </div>
    </div>
  );
};
