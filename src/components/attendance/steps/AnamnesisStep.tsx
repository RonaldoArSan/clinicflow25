import React from "react";

interface AnamnesisStepProps {
  symptoms: string;
  setSymptoms: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  darkMode: boolean;
}

export const AnamnesisStep: React.FC<AnamnesisStepProps> = ({
  symptoms,
  setSymptoms,
  notes,
  setNotes,
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
        Anamnese
      </h3>

      <div className="space-y-4">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Sintomas e Queixas Principais
          </label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Descreva os sintomas apresentados pelo paciente..."
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

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Observações Clínicas
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anote observações sobre o exame físico, histórico médico, etc..."
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
