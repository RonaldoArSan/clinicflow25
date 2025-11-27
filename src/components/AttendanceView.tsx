import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  User, 
  FileText, 
  Heart, 
  Thermometer, 
  Activity, 
  Pill, 
  CheckCircle, 
  Play,
  Pause,
  Save,
  Plus,
  Edit3,
  Calendar,
  Phone,
  Mail,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { useAttendance, Patient, VitalSigns, AttendanceRecord } from '../hooks/useAttendance';

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
    updateAttendanceRecord,
    getTodayStats
  } = useAttendance();
  
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [attendanceStarted, setAttendanceStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentRecord, setCurrentRecord] = useState<AttendanceRecord | null>(null);
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    weight: '',
    height: '',
    oxygenSaturation: ''
  });
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [prescription, setPrescription] = useState('');
  const [notes, setNotes] = useState('');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'emergency':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'urgent':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const startAttendance = (patient: Patient) => {
    const record = startAttendanceHook(patient);
    setSelectedPatient(patient);
    setCurrentRecord(record);
    setAttendanceStarted(true);
    setCurrentStep(1);
  };

  const finishAttendance = () => {
    if (currentRecord) {
      completeAttendance(currentRecord.id, {
        vitalSigns,
        symptoms,
        diagnosis,
        treatment,
        prescription,
        notes
      });
    }
    
    // Reset form
    setSelectedPatient(null);
    setCurrentRecord(null);
    setAttendanceStarted(false);
    setCurrentStep(1);
    setVitalSigns({
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      weight: '',
      height: '',
      oxygenSaturation: ''
    });
    setSymptoms('');
    setDiagnosis('');
    setTreatment('');
    setPrescription('');
    setNotes('');
  };

  const renderPatientList = () => {
    const stats = getTodayStats();
    
    return (
      <div className="space-y-6">
        {/* Estatísticas do Dia */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`
            ${darkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'}
            border rounded-lg p-4
          `}>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>
              {stats.total}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              Total de Pacientes
            </p>
          </div>
          
          <div className={`
            ${darkMode ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}
            border rounded-lg p-4
          `}>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-yellow-200' : 'text-yellow-900'}`}>
              {stats.waiting}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
              Aguardando
            </p>
          </div>
          
          <div className={`
            ${darkMode ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200'}
            border rounded-lg p-4
          `}>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-green-200' : 'text-green-900'}`}>
              {stats.inProgress}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
              Em Atendimento
            </p>
          </div>
          
          <div className={`
            ${darkMode ? 'bg-purple-900 border-purple-700' : 'bg-purple-50 border-purple-200'}
            border rounded-lg p-4
          `}>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-purple-200' : 'text-purple-900'}`}>
              {stats.completed}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
              Concluídos
            </p>
          </div>
        </div>

        <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Pacientes Agendados para Hoje
        </h2>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {new Date().toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>

      {todayPatients.map((patient) => (
        <div
          key={patient.id}
          className={`
            ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
            border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer
          `}
          onClick={() => startAttendance(patient)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}
                `}>
                  <User className="w-6 h-6 text-gray-500" />
                </div>
              </div>
              
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {patient.name}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {patient.age} anos • {patient.healthPlan}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {patient.reason}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className={`
                px-2 py-1 text-xs font-medium rounded-full border
                ${getPriorityColor(patient.priority)}
              `}>
                {patient.priority === 'emergency' ? 'Emergência' : 
                 patient.priority === 'urgent' ? 'Urgente' : 'Normal'}
              </span>
              
              <span className={`
                px-2 py-1 text-xs font-medium rounded-full
                ${getStatusColor(patient.status)}
              `}>
                {patient.status === 'completed' ? 'Concluído' : 
                 patient.status === 'in-progress' ? 'Em andamento' : 'Aguardando'}
              </span>
              
              <div className="flex items-center text-blue-600">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">{patient.appointmentTime}</span>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );  const renderAttendanceForm = () => (
    <div className="space-y-6">
      {/* Header do Atendimento */}
      <div className={`
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        border rounded-lg p-6
      `}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Atendimento em Andamento
            </h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Paciente: {selectedPatient?.name}
            </p>
          </div>
          <button
            onClick={finishAttendance}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Cancelar Atendimento
          </button>
        </div>

        {/* Informações do Paciente */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {selectedPatient?.phone}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {selectedPatient?.email}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {selectedPatient?.healthPlan}
            </span>
          </div>
        </div>

        {/* Steps do Atendimento */}
        <div className="flex items-center space-x-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                  }
                `}
              >
                {step}
              </div>
              {step < 4 && (
                <div className={`
                  w-8 h-0.5 mx-2
                  ${currentStep > step 
                    ? 'bg-blue-600' 
                    : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }
                `} />
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-2 text-xs">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Sinais Vitais</span>
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Anamnese</span>
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Diagnóstico</span>
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Prescrição</span>
        </div>
      </div>

      {/* Conteúdo do Step Atual */}
      {currentStep === 1 && renderVitalSignsStep()}
      {currentStep === 2 && renderAnamnesisStep()}
      {currentStep === 3 && renderDiagnosisStep()}
      {currentStep === 4 && renderPrescriptionStep()}

      {/* Navegação */}
      <div className="flex justify-between">
        <button
          onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
          className={`
            px-4 py-2 rounded-lg transition-colors
            ${currentStep === 1 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-600 text-white hover:bg-gray-700'
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
            onClick={finishAttendance}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Finalizar Atendimento</span>
          </button>
        )}
      </div>
    </div>
  );

  const renderVitalSignsStep = () => (
    <div className={`
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      border rounded-lg p-6
    `}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        Sinais Vitais
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Pressão Arterial (mmHg)
          </label>
          <input
            type="text"
            value={vitalSigns.bloodPressure}
            onChange={(e) => setVitalSigns({...vitalSigns, bloodPressure: e.target.value})}
            placeholder="120/80"
            className={`
              w-full px-3 py-2 border rounded-lg
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }
            `}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Frequência Cardíaca (bpm)
          </label>
          <input
            type="text"
            value={vitalSigns.heartRate}
            onChange={(e) => setVitalSigns({...vitalSigns, heartRate: e.target.value})}
            placeholder="72"
            className={`
              w-full px-3 py-2 border rounded-lg
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }
            `}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Temperatura (°C)
          </label>
          <input
            type="text"
            value={vitalSigns.temperature}
            onChange={(e) => setVitalSigns({...vitalSigns, temperature: e.target.value})}
            placeholder="36.5"
            className={`
              w-full px-3 py-2 border rounded-lg
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }
            `}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Peso (kg)
          </label>
          <input
            type="text"
            value={vitalSigns.weight}
            onChange={(e) => setVitalSigns({...vitalSigns, weight: e.target.value})}
            placeholder="70"
            className={`
              w-full px-3 py-2 border rounded-lg
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }
            `}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Altura (cm)
          </label>
          <input
            type="text"
            value={vitalSigns.height}
            onChange={(e) => setVitalSigns({...vitalSigns, height: e.target.value})}
            placeholder="170"
            className={`
              w-full px-3 py-2 border rounded-lg
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }
            `}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Saturação O2 (%)
          </label>
          <input
            type="text"
            value={vitalSigns.oxygenSaturation}
            onChange={(e) => setVitalSigns({...vitalSigns, oxygenSaturation: e.target.value})}
            placeholder="98"
            className={`
              w-full px-3 py-2 border rounded-lg
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }
            `}
          />
        </div>
      </div>
    </div>
  );

  const renderAnamnesisStep = () => (
    <div className={`
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      border rounded-lg p-6
    `}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        Anamnese
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Sintomas e Queixas Principais
          </label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Descreva os sintomas apresentados pelo paciente..."
            rows={4}
            className={`
              w-full px-3 py-2 border rounded-lg
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }
            `}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Observações Clínicas
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anote observações sobre o exame físico, histórico médico, etc..."
            rows={4}
            className={`
              w-full px-3 py-2 border rounded-lg
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }
            `}
          />
        </div>
      </div>
    </div>
  );

  const renderDiagnosisStep = () => (
    <div className={`
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      border rounded-lg p-6
    `}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        Diagnóstico e Tratamento
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Diagnóstico
          </label>
          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Diagnóstico médico baseado nos sintomas e exame físico..."
            rows={3}
            className={`
              w-full px-3 py-2 border rounded-lg
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }
            `}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Plano de Tratamento
          </label>
          <textarea
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            placeholder="Descreva o plano de tratamento, recomendações, acompanhamento..."
            rows={4}
            className={`
              w-full px-3 py-2 border rounded-lg
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }
            `}
          />
        </div>
      </div>
    </div>
  );

  const renderPrescriptionStep = () => (
    <div className={`
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      border rounded-lg p-6
    `}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        Prescrição Médica
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Medicamentos e Posologia
          </label>
          <textarea
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            placeholder="Liste os medicamentos prescritos com dosagem e instruções de uso..."
            rows={6}
            className={`
              w-full px-3 py-2 border rounded-lg
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }
            `}
          />
        </div>

        <div className={`
          p-4 rounded-lg border-l-4 border-blue-500
          ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}
        `}>
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                Resumo do Atendimento
              </h4>
              <p className={`text-sm mt-1 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                Revise todas as informações antes de finalizar o atendimento. 
                Os dados serão salvos no prontuário do paciente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {!attendanceStarted ? renderPatientList() : renderAttendanceForm()}
    </div>
  );
  }
};

export default AttendanceView;