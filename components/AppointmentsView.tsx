import React from 'react';
import { Plus, Search, Filter, Download, X } from 'lucide-react';
import AppointmentCard from './AppointmentCard';
import { Appointment } from '../types';

interface AppointmentsViewProps {
  darkMode?: boolean;
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  setSelectedAppointment: (appointment: Appointment | null) => void;
}

const AppointmentsView: React.FC<AppointmentsViewProps> = ({ 
  darkMode = false, 
  appointments, 
  selectedAppointment, 
  setSelectedAppointment 
}) => {
  const getStatusColor = (status: string) => {
    if (darkMode) {
      switch (status) {
        case "agendado":
          return "text-blue-400 bg-blue-900/30";
        case "confirmado":
          return "text-green-400 bg-green-900/30";
        case "concluido":
          return "text-gray-400 bg-gray-700";
        case "cancelado":
          return "text-red-400 bg-red-900/30";
        case "em_acompanhamento":
          return "text-orange-400 bg-orange-900/30";
        case "finalizado":
          return "text-green-400 bg-green-900/30";
        default:
          return "text-gray-400 bg-gray-700";
      }
    } else {
      switch (status) {
        case "agendado":
          return "text-blue-600 bg-blue-50";
        case "confirmado":
          return "text-green-600 bg-green-50";
        case "concluido":
          return "text-gray-600 bg-gray-50";
        case "cancelado":
          return "text-red-600 bg-red-50";
        case "em_acompanhamento":
          return "text-orange-600 bg-orange-50";
        case "finalizado":
          return "text-green-600 bg-green-50";
        default:
          return "text-gray-600 bg-gray-50";
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
              <input
                type="text"
                placeholder="Buscar agendamentos..."
                className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  darkMode 
                    ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" 
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>
            <select className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"
            }`}>
              <option>Todos os status</option>
              <option>Agendado</option>
              <option>Confirmado</option>
              <option>Concluído</option>
              <option>Cancelado</option>
            </select>
            <select className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"
            }`}>
              <option>Todas as especialidades</option>
              <option>Clínica Geral</option>
              <option>Cardiologia</option>
              <option>Endocrinologia</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className={`p-2 ${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"} transition-colors`}>
              <Filter className="w-5 h-5" />
            </button>
            <button className={`p-2 ${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"} transition-colors`}>
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Appointments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appointment) => (
            <AppointmentCard 
              key={appointment.id} 
              appointment={appointment} 
              onClick={setSelectedAppointment} 
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto transition-colors`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Detalhes da Consulta
              </h2>
              <button
                onClick={() => setSelectedAppointment(null)}
                className={`${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} transition-colors`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                    Paciente
                  </label>
                  <p className={`${darkMode ? "text-gray-100" : "text-gray-900"} font-medium`}>
                    {selectedAppointment.patientName}
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                    Médico
                  </label>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {selectedAppointment.doctorName}
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                    Data e Hora
                  </label>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {selectedAppointment.date} às {selectedAppointment.time}
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                    Duração
                  </label>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {selectedAppointment.duration} minutos
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                    Tipo
                  </label>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {selectedAppointment.type}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                    Especialidade
                  </label>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {selectedAppointment.specialty}
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                    Convênio
                  </label>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {selectedAppointment.healthPlan}
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                    Valor
                  </label>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    R$ {selectedAppointment.value.toFixed(2)}
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                    Status
                  </label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                    {selectedAppointment.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Sintomas
                </label>
                <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {selectedAppointment.symptoms}
                </p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Observações
                </label>
                <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {selectedAppointment.observations}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setSelectedAppointment(null)}
                className={`px-4 py-2 ${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"} transition-colors`}
              >
                Fechar
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Iniciar Consulta
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Editar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsView;