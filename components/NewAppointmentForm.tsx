import React, { useState } from 'react';
import { Calendar, Clock, User, Stethoscope, DollarSign, Building2, CreditCard } from 'lucide-react';

interface NewAppointmentFormProps {
  darkMode?: boolean;
  onSubmit: (appointment: any) => void;
  onCancel: () => void;
  patients: any[];
  doctors: any[];
}

const getPaymentInfo = (healthPlan: string, darkMode: boolean) => {
  // Se for "Particular" ou vazio, é pagamento particular
  if (!healthPlan || healthPlan.toLowerCase() === 'particular') {
    return {
      type: 'particular',
      icon: DollarSign,
      label: 'Particular',
      color: darkMode ? 'text-green-400' : 'text-green-600',
      bgColor: darkMode ? 'bg-green-900/20' : 'bg-green-50'
    };
  }
  
  // Caso contrário, é convênio/plano de saúde
  return {
    type: 'convenio',
    icon: Building2,
    label: healthPlan,
    color: darkMode ? 'text-blue-400' : 'text-blue-600',
    bgColor: darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
  };
};

const NewAppointmentForm: React.FC<NewAppointmentFormProps> = ({
  darkMode = false,
  onSubmit,
  onCancel,
  patients = [],
  doctors = []
}) => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    duration: 30,
    type: 'Consulta',
    specialty: '',
    symptoms: '',
    observations: '',
    value: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Buscar informações do paciente selecionado
    const selectedPatient = patients.find(p => p.id.toString() === formData.patientId);
    const selectedDoctor = doctors.find(d => d.id.toString() === formData.doctorId);
    
    // Criar o appointment com as informações completas
    const appointmentData = {
      ...formData,
      patientName: selectedPatient?.name || '',
      doctorName: selectedDoctor?.name || '',
      healthPlan: selectedPatient?.healthPlan || 'Particular',
      status: 'agendado'
    };
    
    onSubmit(appointmentData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Paciente e Médico */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
            Paciente
          </label>
          <select
            value={formData.patientId}
            onChange={(e) => handleChange('patientId', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? "bg-gray-700 border-gray-600 text-gray-200" 
                : "bg-white border-gray-300 text-gray-900"
            }`}
            required
          >
            <option value="">Selecionar paciente</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
            Médico
          </label>
          <select
            value={formData.doctorId}
            onChange={(e) => handleChange('doctorId', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? "bg-gray-700 border-gray-600 text-gray-200" 
                : "bg-white border-gray-300 text-gray-900"
            }`}
            required
          >
            <option value="">Selecionar médico</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Informações do Paciente Selecionado */}
      {formData.patientId && (() => {
        const selectedPatient = patients.find(p => p.id.toString() === formData.patientId);
        if (!selectedPatient) return null;
        
        const paymentInfo = getPaymentInfo(selectedPatient.healthPlan, darkMode);
        const PaymentIcon = paymentInfo.icon;
        
        return (
          <div className={`p-4 rounded-lg border ${darkMode ? "bg-gray-700/30 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
            <h4 className={`text-sm font-medium mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              📋 Informações do Paciente
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Nome:</span>
                <p className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                  {selectedPatient.name}
                </p>
              </div>
              <div>
                <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Telefone:</span>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {selectedPatient.phone}
                </p>
              </div>
              <div>
                <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Forma de Pagamento:</span>
                <div className={`flex items-center space-x-1 mt-1 px-2 py-1 rounded-full w-fit ${paymentInfo.bgColor}`}>
                  <PaymentIcon className={`w-3 h-3 ${paymentInfo.color}`} />
                  <span className={`text-xs font-medium ${paymentInfo.color}`}>
                    {paymentInfo.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Data e Hora */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
            Data
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? "bg-gray-700 border-gray-600 text-gray-200" 
                : "bg-white border-gray-300 text-gray-900"
            }`}
            required
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
            Horário
          </label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => handleChange('time', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? "bg-gray-700 border-gray-600 text-gray-200" 
                : "bg-white border-gray-300 text-gray-900"
            }`}
            required
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
            Duração (min)
          </label>
          <select
            value={formData.duration}
            onChange={(e) => handleChange('duration', parseInt(e.target.value))}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? "bg-gray-700 border-gray-600 text-gray-200" 
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value={15}>15 minutos</option>
            <option value={30}>30 minutos</option>
            <option value={45}>45 minutos</option>
            <option value={60}>60 minutos</option>
          </select>
        </div>
      </div>

      {/* Tipo e Especialidade */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
            Tipo de Consulta
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? "bg-gray-700 border-gray-600 text-gray-200" 
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="Consulta">Consulta</option>
            <option value="Retorno">Retorno</option>
            <option value="Check-up">Check-up</option>
            <option value="Emergência">Emergência</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
            Especialidade
          </label>
          <select
            value={formData.specialty}
            onChange={(e) => handleChange('specialty', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? "bg-gray-700 border-gray-600 text-gray-200" 
                : "bg-white border-gray-300 text-gray-900"
            }`}
            required
          >
            <option value="">Selecionar especialidade</option>
            <option value="Clínica Geral">Clínica Geral</option>
            <option value="Cardiologia">Cardiologia</option>
            <option value="Endocrinologia">Endocrinologia</option>
            <option value="Pediatria">Pediatria</option>
            <option value="Dermatologia">Dermatologia</option>
          </select>
        </div>
      </div>

      {/* Valor */}
      <div>
        <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
          Valor da Consulta
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.value}
          onChange={(e) => handleChange('value', parseFloat(e.target.value))}
          placeholder="0,00"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode 
              ? "bg-gray-700 border-gray-600 text-gray-200" 
              : "bg-white border-gray-300 text-gray-900"
          }`}
          required
        />
      </div>

      {/* Sintomas */}
      <div>
        <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
          Sintomas Relatados
        </label>
        <textarea
          value={formData.symptoms}
          onChange={(e) => handleChange('symptoms', e.target.value)}
          placeholder="Descreva os sintomas reportados pelo paciente..."
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
            darkMode 
              ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" 
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          }`}
        />
      </div>

      {/* Observações */}
      <div>
        <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
          Observações Adicionais
        </label>
        <textarea
          value={formData.observations}
          onChange={(e) => handleChange('observations', e.target.value)}
          placeholder="Observações sobre o agendamento..."
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
            darkMode 
              ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" 
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          }`}
        />
      </div>

      {/* Botões */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className={`px-4 py-2 ${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"} transition-colors`}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Agendar Consulta
        </button>
      </div>
    </form>
  );
};

export default NewAppointmentForm;