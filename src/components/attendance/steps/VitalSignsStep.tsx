import React from "react";
import { VitalSigns } from "../../../hooks/useAttendance";

interface VitalSignsStepProps {
  vitalSigns: VitalSigns;
  setVitalSigns: (vitals: VitalSigns) => void;
  darkMode: boolean;
}

export const VitalSignsStep: React.FC<VitalSignsStepProps> = ({
  vitalSigns,
  setVitalSigns,
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
        Sinais Vitais
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Pressão Arterial (mmHg)
          </label>
          <input
            type="text"
            value={vitalSigns.bloodPressure}
            onChange={(e) =>
              setVitalSigns({ ...vitalSigns, bloodPressure: e.target.value })
            }
            placeholder="120/80"
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
            Frequência Cardíaca (bpm)
          </label>
          <input
            type="text"
            value={vitalSigns.heartRate}
            onChange={(e) =>
              setVitalSigns({ ...vitalSigns, heartRate: e.target.value })
            }
            placeholder="72"
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
            Temperatura (°C)
          </label>
          <input
            type="text"
            value={vitalSigns.temperature}
            onChange={(e) =>
              setVitalSigns({ ...vitalSigns, temperature: e.target.value })
            }
            placeholder="36.5"
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
            Peso (kg)
          </label>
          <input
            type="text"
            value={vitalSigns.weight}
            onChange={(e) =>
              setVitalSigns({ ...vitalSigns, weight: e.target.value })
            }
            placeholder="70"
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
            Altura (cm)
          </label>
          <input
            type="text"
            value={vitalSigns.height}
            onChange={(e) =>
              setVitalSigns({ ...vitalSigns, height: e.target.value })
            }
            placeholder="170"
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
            Saturação O2 (%)
          </label>
          <input
            type="text"
            value={vitalSigns.oxygenSaturation}
            onChange={(e) =>
              setVitalSigns({ ...vitalSigns, oxygenSaturation: e.target.value })
            }
            placeholder="98"
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
