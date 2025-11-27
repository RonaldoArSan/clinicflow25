import React from 'react';
import { Calendar as CalendarIcon, Clock, Stethoscope, DollarSign, CreditCard, Building2 } from 'lucide-react';
import { Appointment } from '../types';

interface AppointmentCardProps {
  appointment: Appointment;
  onClick: (appointment: Appointment) => void;
  darkMode?: boolean;
}

const getStatusColor = (status: string, darkMode: boolean) => {
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

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onClick, darkMode = false }) => {
  return (
    <div
      className={`${
        darkMode 
          ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
          : "bg-white border-gray-200 hover:shadow-md"
      } p-4 rounded-lg shadow-sm border transition-all cursor-pointer`}
      onClick={() => onClick(appointment)}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
            {appointment.patientName}
          </h3>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {appointment.type} - {appointment.specialty}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status, darkMode)}`}>
          {appointment.status}
        </span>
      </div>

      <div className={`space-y-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-4 h-4" />
          <span>{appointment.date} às {appointment.time}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{appointment.duration} minutos</span>
        </div>
        <div className="flex items-center space-x-2">
          <Stethoscope className="w-4 h-4" />
          <span>{appointment.doctorName}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4" />
            <span>R$ {appointment.value.toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-1">
            {(() => {
              const paymentInfo = getPaymentInfo(appointment.healthPlan, darkMode);
              const PaymentIcon = paymentInfo.icon;
              return (
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${paymentInfo.bgColor}`}>
                  <PaymentIcon className={`w-3 h-3 ${paymentInfo.color}`} />
                  <span className={`text-xs font-medium ${paymentInfo.color}`}>
                    {paymentInfo.label}
                  </span>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {appointment.symptoms && (
        <div className={`mt-3 p-2 rounded ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
          <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <strong>Sintomas:</strong> {appointment.symptoms}
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;