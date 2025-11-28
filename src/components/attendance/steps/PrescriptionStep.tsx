import React, { useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import DocumentHeader from "../../documents/DocumentHeader";

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
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div
      className={`
      ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
      border rounded-lg p-6
    `}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Prescrição Médica
        </h3>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className={`
            flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm transition-colors
            ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }
          `}
        >
          {showPreview ? (
            <>
              <EyeOff className="w-4 h-4" />
              <span>Ocultar Prévia</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              <span>Visualizar Impressão</span>
            </>
          )}
        </button>
      </div>

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

        {showPreview && (
          <div className="mt-6 border rounded-lg p-8 bg-white text-gray-900 shadow-sm">
            <div className="text-center mb-4 text-xs text-gray-400 uppercase tracking-wider">
              Prévia do Documento
            </div>
            <div className="border border-gray-200 p-8 min-h-[400px] relative">
              <DocumentHeader />

              <div className="mt-8">
                <h2 className="text-center text-xl font-bold mb-8 uppercase border-b pb-2">
                  Receituário Médico
                </h2>

                <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {prescription || "Nenhum medicamento prescrito."}
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 text-center border-t pt-4">
                <p className="text-sm text-gray-600">
                  Assinatura e Carimbo do Médico
                </p>
              </div>
            </div>
          </div>
        )}

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
