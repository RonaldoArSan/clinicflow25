import React, { useState } from "react";
import { CheckCircle, Phone, Mail, MapPin } from "lucide-react";
import {
  Patient,
  VitalSigns,
  AttendanceRecord,
} from "../../hooks/useAttendance";
import { VitalSignsStep } from "./steps/VitalSignsStep";
import { AnamnesisStep } from "./steps/AnamnesisStep";
import { DiagnosisStep } from "./steps/DiagnosisStep";
import { PrescriptionStep } from "./steps/PrescriptionStep";

interface AttendanceSessionProps {
  patient: Patient;
  record: AttendanceRecord | null;
  onFinish: (data: any) => void;
  onCancel: () => void;
  darkMode: boolean;
}

export const AttendanceSession: React.FC<AttendanceSessionProps> = ({
  patient,
  record,
  onFinish,
  onCancel,
  darkMode,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form States
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    weight: "",
    height: "",
    oxygenSaturation: "",
  });
  const [symptoms, setSymptoms] = useState("");
  const [notes, setNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [prescription, setPrescription] = useState("");

  const handleFinish = () => {
    onFinish({
      vitalSigns,
      symptoms,
      notes,
      diagnosis,
      treatment,
      prescription,
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <VitalSignsStep
            vitalSigns={vitalSigns}
            setVitalSigns={setVitalSigns}
            darkMode={darkMode}
          />
        );
      case 2:
        return (
          <AnamnesisStep
            symptoms={symptoms}
            setSymptoms={setSymptoms}
            notes={notes}
            setNotes={setNotes}
            darkMode={darkMode}
          />
        );
      case 3:
        return (
          <DiagnosisStep
            diagnosis={diagnosis}
            setDiagnosis={setDiagnosis}
            treatment={treatment}
            setTreatment={setTreatment}
            darkMode={darkMode}
          />
        );
      case 4:
        return (
          <PrescriptionStep
            prescription={prescription}
            setPrescription={setPrescription}
            darkMode={darkMode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header do Atendimento */}
      <div
        className={`
        ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
        border rounded-lg p-6
      `}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2
              className={`text-xl font-semibold ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Atendimento em Andamento
            </h2>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Paciente: {patient.name}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Cancelar Atendimento
          </button>
        </div>

        {/* Informações do Paciente */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {patient.phone}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {patient.email}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {patient.healthPlan}
            </span>
          </div>
        </div>

        {/* Steps do Atendimento */}
        <div className="flex items-center space-x-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                onClick={() => setCurrentStep(step)}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors
                  ${
                    currentStep >= step
                      ? "bg-blue-600 text-white"
                      : darkMode
                      ? "bg-gray-700 text-gray-400 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }
                `}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`
                  w-8 h-0.5 mx-2
                  ${
                    currentStep > step
                      ? "bg-blue-600"
                      : darkMode
                      ? "bg-gray-700"
                      : "bg-gray-200"
                  }
                `}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-2 text-xs">
          <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Sinais Vitais
          </span>
          <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Anamnese
          </span>
          <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Diagnóstico
          </span>
          <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Prescrição
          </span>
        </div>
      </div>

      {/* Conteúdo do Step Atual */}
      {renderStep()}

      {/* Navegação */}
      <div className="flex justify-between">
        <button
          onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
          className={`
            px-4 py-2 rounded-lg transition-colors
            ${
              currentStep === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }
          `}
        >
          Anterior
        </button>

        {currentStep < 4 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Próximo
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Finalizar Atendimento</span>
          </button>
        )}
      </div>
    </div>
  );
};
