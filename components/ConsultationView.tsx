import React, { useState } from 'react';
import { 
  User, Activity, Heart, Thermometer, Wind, Droplet, Clock, 
  FileText, Stethoscope, Pill, Calendar, Save, CheckCircle, 
  X, Plus, Search, AlertCircle, Edit, Trash2, ChevronDown, ChevronUp 
} from 'lucide-react';

interface ConsultationViewProps {
  darkMode: boolean;
  appointment: any;
  patient: any;
  onSave: (data: any) => void;
  onFinalize: (data: any) => void;
  onCancel: () => void;
}

const ConsultationView: React.FC<ConsultationViewProps> = ({
  darkMode,
  appointment,
  patient,
  onSave,
  onFinalize,
  onCancel
}) => {
  // Estado dos sinais vitais
  const [vitalSigns, setVitalSigns] = useState({
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    weight: '',
    height: '',
    bmi: ''
  });

  // Estado da anamnese
  const [anamnesis, setAnamnesis] = useState({
    chiefComplaint: appointment?.symptoms || '',
    historyOfPresentIllness: '',
    pastMedicalHistory: '',
    medications: '',
    allergies: patient?.allergies?.join(', ') || '',
    familyHistory: '',
    socialHistory: ''
  });

  // Estado do exame físico
  const [physicalExam, setPhysicalExam] = useState({
    generalAppearance: '',
    headNeck: '',
    cardiovascular: '',
    respiratory: '',
    abdomen: '',
    extremities: '',
    neurological: '',
    skin: '',
    other: ''
  });

  // Estado do diagnóstico
  const [diagnosis, setDiagnosis] = useState({
    primary: '',
    cid10: '',
    secondary: [] as { description: string; cid10: string }[],
    observations: ''
  });

  // Estado do tratamento
  const [treatment, setTreatment] = useState({
    prescriptions: [] as { medication: string; dosage: string; frequency: string; duration: string }[],
    procedures: '',
    recommendations: '',
    restrictions: ''
  });

  // Estado dos exames solicitados
  const [exams, setExams] = useState<{ name: string; type: string; urgency: string; instructions: string }[]>([]);

  // Estado do retorno
  const [followUp, setFollowUp] = useState({
    needsFollowUp: false,
    days: '',
    instructions: ''
  });

  // Seções expandidas/colapsadas
  const [expandedSections, setExpandedSections] = useState({
    vitalSigns: true,
    anamnesis: true,
    physicalExam: true,
    diagnosis: true,
    treatment: true,
    exams: true,
    followUp: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Calcular IMC
  const calculateBMI = () => {
    const weight = parseFloat(vitalSigns.weight);
    const height = parseFloat(vitalSigns.height) / 100; // converter cm para m
    if (weight > 0 && height > 0) {
      const bmi = (weight / (height * height)).toFixed(2);
      setVitalSigns(prev => ({ ...prev, bmi }));
    }
  };

  // Adicionar prescrição
  const addPrescription = () => {
    setTreatment(prev => ({
      ...prev,
      prescriptions: [...prev.prescriptions, { medication: '', dosage: '', frequency: '', duration: '' }]
    }));
  };

  // Remover prescrição
  const removePrescription = (index: number) => {
    setTreatment(prev => ({
      ...prev,
      prescriptions: prev.prescriptions.filter((_, i) => i !== index)
    }));
  };

  // Adicionar exame
  const addExam = () => {
    setExams(prev => [...prev, { name: '', type: '', urgency: 'normal', instructions: '' }]);
  };

  // Remover exame
  const removeExam = (index: number) => {
    setExams(prev => prev.filter((_, i) => i !== index));
  };

  // Adicionar diagnóstico secundário
  const addSecondaryDiagnosis = () => {
    setDiagnosis(prev => ({
      ...prev,
      secondary: [...prev.secondary, { description: '', cid10: '' }]
    }));
  };

  // Remover diagnóstico secundário
  const removeSecondaryDiagnosis = (index: number) => {
    setDiagnosis(prev => ({
      ...prev,
      secondary: prev.secondary.filter((_, i) => i !== index)
    }));
  };

  // Salvar consulta
  const handleSave = () => {
    const consultationData = {
      appointmentId: appointment.id,
      patientId: patient.id,
      vitalSigns,
      anamnesis,
      physicalExam,
      diagnosis,
      treatment,
      exams,
      followUp,
      status: 'em_andamento',
      savedAt: new Date().toISOString()
    };
    onSave(consultationData);
  };

  // Finalizar consulta
  const handleFinalize = () => {
    const consultationData = {
      appointmentId: appointment.id,
      patientId: patient.id,
      vitalSigns,
      anamnesis,
      physicalExam,
      diagnosis,
      treatment,
      exams,
      followUp,
      status: 'finalizado',
      finalizedAt: new Date().toISOString()
    };
    onFinalize(consultationData);
  };

  const SectionHeader: React.FC<{ title: string; icon: any; section: keyof typeof expandedSections }> = ({ title, icon: Icon, section }) => (
    <button
      onClick={() => toggleSection(section)}
      className={`w-full flex items-center justify-between p-4 ${
        darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-gray-50 hover:bg-gray-100'
      } transition-colors rounded-t-lg`}
    >
      <div className="flex items-center space-x-2">
        <Icon className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{title}</h3>
      </div>
      {expandedSections[section] ? (
        <ChevronUp className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
      ) : (
        <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header da Consulta */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'} rounded-lg border p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Stethoscope className={`w-10 h-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                Consulta em Andamento
              </h2>
              <p className={`mt-1 ${darkMode ? 'text-blue-400/80' : 'text-blue-600/80'}`}>
                Paciente: <span className="font-semibold">{patient?.name}</span>
              </p>
            </div>
          </div>
          <div className={`text-right ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            <p className="text-sm">Data: {appointment?.date}</p>
            <p className="text-sm">Horário: {appointment?.time}</p>
            <p className="text-sm font-semibold">{appointment?.specialty}</p>
          </div>
        </div>
      </div>

      {/* Informações do Paciente */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-6`}>
        <div className="flex items-center space-x-2 mb-4">
          <User className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Informações do Paciente</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>CPF</p>
            <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{patient?.cpf}</p>
          </div>
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Idade</p>
            <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {patient?.birthDate ? new Date().getFullYear() - new Date(patient.birthDate).getFullYear() : '-'} anos
            </p>
          </div>
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tipo Sanguíneo</p>
            <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{patient?.bloodType}</p>
          </div>
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Convênio</p>
            <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{appointment?.healthPlan}</p>
          </div>
        </div>
        {patient?.allergies && patient.allergies.length > 0 && (
          <div className={`mt-4 p-3 ${darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'} border rounded-lg`}>
            <p className={`text-sm font-semibold ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
              <AlertCircle className="w-4 h-4 inline mr-1" />
              Alergias: {patient.allergies.join(', ')}
            </p>
          </div>
        )}
        {patient?.chronicConditions && patient.chronicConditions.length > 0 && (
          <div className={`mt-2 p-3 ${darkMode ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200'} border rounded-lg`}>
            <p className={`text-sm font-semibold ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
              Condições Crônicas: {patient.chronicConditions.join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Sinais Vitais */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
        <SectionHeader title="Sinais Vitais" icon={Activity} section="vitalSigns" />
        {expandedSections.vitalSigns && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Heart className="w-4 h-4 inline mr-1" />
                  Pressão Arterial
                </label>
                <input
                  type="text"
                  placeholder="120/80 mmHg"
                  value={vitalSigns.bloodPressure}
                  onChange={(e) => setVitalSigns(prev => ({ ...prev, bloodPressure: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Activity className="w-4 h-4 inline mr-1" />
                  Frequência Cardíaca
                </label>
                <input
                  type="text"
                  placeholder="72 bpm"
                  value={vitalSigns.heartRate}
                  onChange={(e) => setVitalSigns(prev => ({ ...prev, heartRate: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Thermometer className="w-4 h-4 inline mr-1" />
                  Temperatura
                </label>
                <input
                  type="text"
                  placeholder="36.5°C"
                  value={vitalSigns.temperature}
                  onChange={(e) => setVitalSigns(prev => ({ ...prev, temperature: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Wind className="w-4 h-4 inline mr-1" />
                  Freq. Respiratória
                </label>
                <input
                  type="text"
                  placeholder="16 rpm"
                  value={vitalSigns.respiratoryRate}
                  onChange={(e) => setVitalSigns(prev => ({ ...prev, respiratoryRate: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Droplet className="w-4 h-4 inline mr-1" />
                  Saturação O₂
                </label>
                <input
                  type="text"
                  placeholder="98%"
                  value={vitalSigns.oxygenSaturation}
                  onChange={(e) => setVitalSigns(prev => ({ ...prev, oxygenSaturation: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Peso (kg)
                </label>
                <input
                  type="text"
                  placeholder="70"
                  value={vitalSigns.weight}
                  onChange={(e) => setVitalSigns(prev => ({ ...prev, weight: e.target.value }))}
                  onBlur={calculateBMI}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Altura (cm)
                </label>
                <input
                  type="text"
                  placeholder="170"
                  value={vitalSigns.height}
                  onChange={(e) => setVitalSigns(prev => ({ ...prev, height: e.target.value }))}
                  onBlur={calculateBMI}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  IMC
                </label>
                <input
                  type="text"
                  value={vitalSigns.bmi}
                  readOnly
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode ? 'bg-gray-600 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-700'
                  }`}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Anamnese */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
        <SectionHeader title="Anamnese" icon={FileText} section="anamnesis" />
        {expandedSections.anamnesis && (
          <div className="p-6 space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Queixa Principal *
              </label>
              <textarea
                value={anamnesis.chiefComplaint}
                onChange={(e) => setAnamnesis(prev => ({ ...prev, chiefComplaint: e.target.value }))}
                rows={2}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Motivo da consulta..."
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                História da Moléstia Atual
              </label>
              <textarea
                value={anamnesis.historyOfPresentIllness}
                onChange={(e) => setAnamnesis(prev => ({ ...prev, historyOfPresentIllness: e.target.value }))}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Descrição detalhada dos sintomas, início, evolução..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Histórico Médico Prévio
                </label>
                <textarea
                  value={anamnesis.pastMedicalHistory}
                  onChange={(e) => setAnamnesis(prev => ({ ...prev, pastMedicalHistory: e.target.value }))}
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Cirurgias, doenças anteriores..."
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Medicamentos em Uso
                </label>
                <textarea
                  value={anamnesis.medications}
                  onChange={(e) => setAnamnesis(prev => ({ ...prev, medications: e.target.value }))}
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Lista de medicamentos atuais..."
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  História Familiar
                </label>
                <textarea
                  value={anamnesis.familyHistory}
                  onChange={(e) => setAnamnesis(prev => ({ ...prev, familyHistory: e.target.value }))}
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Doenças na família..."
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  História Social
                </label>
                <textarea
                  value={anamnesis.socialHistory}
                  onChange={(e) => setAnamnesis(prev => ({ ...prev, socialHistory: e.target.value }))}
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Tabagismo, etilismo, atividade física..."
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exame Físico */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
        <SectionHeader title="Exame Físico" icon={Stethoscope} section="physicalExam" />
        {expandedSections.physicalExam && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Aspecto Geral
                </label>
                <textarea
                  value={physicalExam.generalAppearance}
                  onChange={(e) => setPhysicalExam(prev => ({ ...prev, generalAppearance: e.target.value }))}
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Estado geral, nível de consciência..."
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Cabeça e Pescoço
                </label>
                <textarea
                  value={physicalExam.headNeck}
                  onChange={(e) => setPhysicalExam(prev => ({ ...prev, headNeck: e.target.value }))}
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Exame de cabeça, ouvidos, olhos, nariz, garganta..."
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sistema Cardiovascular
                </label>
                <textarea
                  value={physicalExam.cardiovascular}
                  onChange={(e) => setPhysicalExam(prev => ({ ...prev, cardiovascular: e.target.value }))}
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Ausculta cardíaca, pulsos, edema..."
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sistema Respiratório
                </label>
                <textarea
                  value={physicalExam.respiratory}
                  onChange={(e) => setPhysicalExam(prev => ({ ...prev, respiratory: e.target.value }))}
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Ausculta pulmonar, expansibilidade..."
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Abdome
                </label>
                <textarea
                  value={physicalExam.abdomen}
                  onChange={(e) => setPhysicalExam(prev => ({ ...prev, abdomen: e.target.value }))}
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Inspeção, palpação, ausculta abdominal..."
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Extremidades
                </label>
                <textarea
                  value={physicalExam.extremities}
                  onChange={(e) => setPhysicalExam(prev => ({ ...prev, extremities: e.target.value }))}
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Membros superiores e inferiores..."
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sistema Neurológico
                </label>
                <textarea
                  value={physicalExam.neurological}
                  onChange={(e) => setPhysicalExam(prev => ({ ...prev, neurological: e.target.value }))}
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Reflexos, sensibilidade, coordenação..."
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Pele e Anexos
                </label>
                <textarea
                  value={physicalExam.skin}
                  onChange={(e) => setPhysicalExam(prev => ({ ...prev, skin: e.target.value }))}
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Lesões, coloração, hidratação..."
                />
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Outros Achados
              </label>
              <textarea
                value={physicalExam.other}
                onChange={(e) => setPhysicalExam(prev => ({ ...prev, other: e.target.value }))}
                rows={2}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Observações adicionais do exame físico..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Diagnóstico */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
        <SectionHeader title="Diagnóstico" icon={Search} section="diagnosis" />
        {expandedSections.diagnosis && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Diagnóstico Principal *
                </label>
                <textarea
                  value={diagnosis.primary}
                  onChange={(e) => setDiagnosis(prev => ({ ...prev, primary: e.target.value }))}
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Diagnóstico principal..."
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  CID-10
                </label>
                <input
                  type="text"
                  value={diagnosis.cid10}
                  onChange={(e) => setDiagnosis(prev => ({ ...prev, cid10: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Ex: A00.0"
                />
              </div>
            </div>

            {/* Diagnósticos Secundários */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Diagnósticos Secundários
                </label>
                <button
                  onClick={addSecondaryDiagnosis}
                  className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar</span>
                </button>
              </div>
              {diagnosis.secondary.map((item, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => {
                      const newSecondary = [...diagnosis.secondary];
                      newSecondary[index].description = e.target.value;
                      setDiagnosis(prev => ({ ...prev, secondary: newSecondary }));
                    }}
                    className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Descrição"
                  />
                  <input
                    type="text"
                    value={item.cid10}
                    onChange={(e) => {
                      const newSecondary = [...diagnosis.secondary];
                      newSecondary[index].cid10 = e.target.value;
                      setDiagnosis(prev => ({ ...prev, secondary: newSecondary }));
                    }}
                    className={`w-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="CID-10"
                  />
                  <button
                    onClick={() => removeSecondaryDiagnosis(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Observações do Diagnóstico
              </label>
              <textarea
                value={diagnosis.observations}
                onChange={(e) => setDiagnosis(prev => ({ ...prev, observations: e.target.value }))}
                rows={2}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Observações adicionais sobre o diagnóstico..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Tratamento */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
        <SectionHeader title="Plano de Tratamento" icon={Pill} section="treatment" />
        {expandedSections.treatment && (
          <div className="p-6 space-y-4">
            {/* Prescrições */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Prescrições
                </label>
                <button
                  onClick={addPrescription}
                  className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Medicamento</span>
                </button>
              </div>
              {treatment.prescriptions.map((prescription, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                  <input
                    type="text"
                    value={prescription.medication}
                    onChange={(e) => {
                      const newPrescriptions = [...treatment.prescriptions];
                      newPrescriptions[index].medication = e.target.value;
                      setTreatment(prev => ({ ...prev, prescriptions: newPrescriptions }));
                    }}
                    className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Medicamento"
                  />
                  <input
                    type="text"
                    value={prescription.dosage}
                    onChange={(e) => {
                      const newPrescriptions = [...treatment.prescriptions];
                      newPrescriptions[index].dosage = e.target.value;
                      setTreatment(prev => ({ ...prev, prescriptions: newPrescriptions }));
                    }}
                    className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Dosagem"
                  />
                  <input
                    type="text"
                    value={prescription.frequency}
                    onChange={(e) => {
                      const newPrescriptions = [...treatment.prescriptions];
                      newPrescriptions[index].frequency = e.target.value;
                      setTreatment(prev => ({ ...prev, prescriptions: newPrescriptions }));
                    }}
                    className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Frequência"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={prescription.duration}
                      onChange={(e) => {
                        const newPrescriptions = [...treatment.prescriptions];
                        newPrescriptions[index].duration = e.target.value;
                        setTreatment(prev => ({ ...prev, prescriptions: newPrescriptions }));
                      }}
                      className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="Duração"
                    />
                    <button
                      onClick={() => removePrescription(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Procedimentos Recomendados
              </label>
              <textarea
                value={treatment.procedures}
                onChange={(e) => setTreatment(prev => ({ ...prev, procedures: e.target.value }))}
                rows={2}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Fisioterapia, terapias complementares..."
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Recomendações e Orientações
              </label>
              <textarea
                value={treatment.recommendations}
                onChange={(e) => setTreatment(prev => ({ ...prev, recommendations: e.target.value }))}
                rows={2}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Repouso, hidratação, dieta..."
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Restrições e Cuidados
              </label>
              <textarea
                value={treatment.restrictions}
                onChange={(e) => setTreatment(prev => ({ ...prev, restrictions: e.target.value }))}
                rows={2}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Evitar esforço físico, exposição ao sol..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Exames Solicitados */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
        <SectionHeader title="Exames Solicitados" icon={FileText} section="exams" />
        {expandedSections.exams && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Adicione exames laboratoriais ou de imagem necessários
              </p>
              <button
                onClick={addExam}
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Exame</span>
              </button>
            </div>
            {exams.map((exam, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                <input
                  type="text"
                  value={exam.name}
                  onChange={(e) => {
                    const newExams = [...exams];
                    newExams[index].name = e.target.value;
                    setExams(newExams);
                  }}
                  className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Nome do exame"
                />
                <select
                  value={exam.type}
                  onChange={(e) => {
                    const newExams = [...exams];
                    newExams[index].type = e.target.value;
                    setExams(newExams);
                  }}
                  className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Tipo</option>
                  <option value="laboratorial">Laboratorial</option>
                  <option value="imagem">Imagem</option>
                  <option value="outros">Outros</option>
                </select>
                <select
                  value={exam.urgency}
                  onChange={(e) => {
                    const newExams = [...exams];
                    newExams[index].urgency = e.target.value;
                    setExams(newExams);
                  }}
                  className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="normal">Normal</option>
                  <option value="urgente">Urgente</option>
                  <option value="emergência">Emergência</option>
                </select>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={exam.instructions}
                    onChange={(e) => {
                      const newExams = [...exams];
                      newExams[index].instructions = e.target.value;
                      setExams(newExams);
                    }}
                    className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Instruções"
                  />
                  <button
                    onClick={() => removeExam(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Retorno/Follow-up */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
        <SectionHeader title="Agendamento de Retorno" icon={Calendar} section="followUp" />
        {expandedSections.followUp && (
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="needsFollowUp"
                checked={followUp.needsFollowUp}
                onChange={(e) => setFollowUp(prev => ({ ...prev, needsFollowUp: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="needsFollowUp" className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Necessita retorno
              </label>
            </div>

            {followUp.needsFollowUp && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Retornar em (dias)
                  </label>
                  <input
                    type="number"
                    value={followUp.days}
                    onChange={(e) => setFollowUp(prev => ({ ...prev, days: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Ex: 7, 15, 30"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Instruções para o Retorno
                  </label>
                  <textarea
                    value={followUp.instructions}
                    onChange={(e) => setFollowUp(prev => ({ ...prev, instructions: e.target.value }))}
                    rows={2}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Trazer resultados de exames, etc."
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-end space-x-3 pb-6">
        <button
          onClick={onCancel}
          className={`px-6 py-3 rounded-lg transition-colors ${
            darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          <X className="w-5 h-5 inline mr-2" />
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-5 h-5 inline mr-2" />
          Salvar Rascunho
        </button>
        <button
          onClick={handleFinalize}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <CheckCircle className="w-5 h-5 inline mr-2" />
          Finalizar Consulta
        </button>
      </div>
    </div>
  );
};

export default ConsultationView;
