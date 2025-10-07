import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  UserCheck, 
  Clock,
  FileText,
  BarChart3,
  Building2
} from 'lucide-react';
import { useUserContext } from '../../../hooks/useUserContext';

// Importar componentes existentes
import AppointmentsView from '../../AppointmentsView';
import PatientsView from '../../PatientsView';
import DocumentsView from '../../DocumentsView';

// Importar novos componentes do módulo
import ReceptionDashboard from './ReceptionDashboard';
import CheckInOut from './CheckInOut';
import WaitingQueue from './WaitingQueue';

export type ReceptionViewType = 'dashboard' | 'appointments' | 'patients' | 'checkin' | 'queue' | 'documents';

interface ReceptionModuleProps {
  darkMode?: boolean;
  // Props dos componentes existentes
  appointments: any[];
  patients: any[];
  documents: any[];
  selectedPatient: any;
  setSelectedPatient: (patient: any) => void;
  selectedAppointment: any;
  setSelectedAppointment: (appointment: any) => void;
  selectedDocument: any;
  setSelectedDocument: (document: any) => void;
  showNewAppointmentModal: boolean;
  setShowNewAppointmentModal: (show: boolean) => void;
  showNewPatientModal: boolean;
  setShowNewPatientModal: (show: boolean) => void;
  showNewDocumentModal: boolean;
  setShowNewDocumentModal: (show: boolean) => void;
  showUploadDocumentModal: boolean;
  setShowUploadDocumentModal: (show: boolean) => void;
}

export default function ReceptionModule({
  darkMode = false,
  appointments = [],
  patients = [],
  documents = [],
  selectedPatient,
  setSelectedPatient,
  selectedAppointment,
  setSelectedAppointment,
  selectedDocument,
  setSelectedDocument,
  showNewAppointmentModal,
  setShowNewAppointmentModal,
  showNewPatientModal,
  setShowNewPatientModal,
  showNewDocumentModal,
  setShowNewDocumentModal,
  showUploadDocumentModal,
  setShowUploadDocumentModal
}: ReceptionModuleProps) {
  const [currentView, setCurrentView] = useState<ReceptionViewType>('dashboard');
  const { currentUser } = useUserContext();

  // Dados mock para novos componentes
  const receptionAnalytics = {
    todayAppointments: appointments.length,
    waitingPatients: 3,
    checkedInPatients: 8,
    newPatients: 2,
    scheduledAppointments: appointments.filter(a => a.status === 'agendado').length,
    completedAppointments: appointments.filter(a => a.status === 'concluido').length,
  };

  // Mock data para fila de espera
  const waitingQueue = [
    {
      id: '1',
      name: 'Maria Santos Silva',
      phone: '(11) 99999-1234',
      priority: 'alta' as const,
      checkinTime: '09:30',
      waitTime: 45,
      status: 'aguardando' as const,
      appointment: {
        doctor: 'Dr. João Silva',
        type: 'Consulta Cardiologia',
        room: 'Sala 201'
      },
      position: 1
    },
    {
      id: '2',
      name: 'João Pedro Oliveira',
      phone: '(11) 99999-5678',
      priority: 'normal' as const,
      checkinTime: '10:00',
      waitTime: 20,
      status: 'aguardando' as const,
      appointment: {
        doctor: 'Dra. Ana Costa',
        type: 'Consulta Geral',
        room: 'Sala 105'
      },
      position: 2
    },
    {
      id: '3',
      name: 'Ana Beatriz Costa',
      phone: '(11) 99999-9012',
      priority: 'baixa' as const,
      checkinTime: '10:15',
      waitTime: 10,
      status: 'chamado' as const,
      appointment: {
        doctor: 'Dr. Carlos Silva',
        type: 'Retorno',
        room: 'Sala 103'
      },
      position: 3
    }
  ];

  // Mock data para check-in
  const checkInPatients = patients.map(patient => ({
    ...patient,
    appointment: appointments.find(apt => apt.patientName === patient.name),
    status: Math.random() > 0.5 ? 'aguardando_checkin' : 'checked_in' as const,
    checkinTime: Math.random() > 0.5 ? '09:45' : undefined
  }));

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, description: 'Visão geral da recepção' },
    { id: 'appointments', label: 'Agendamentos', icon: Calendar, description: 'Gerenciar consultas e horários' },
    { id: 'patients', label: 'Pacientes', icon: Users, description: 'Cadastro e busca de pacientes' },
    { id: 'checkin', label: 'Check-in/out', icon: UserCheck, description: 'Entrada e saída de pacientes' },
    { id: 'queue', label: 'Fila de Espera', icon: Clock, description: 'Controle da fila de atendimento' },
    { id: 'documents', label: 'Documentos', icon: FileText, description: 'Documentos administrativos' }
  ];

  // Handlers para novos componentes
  const handleCheckIn = (patientId: string) => {
    console.log('Check-in do paciente:', patientId);
    // Implementar lógica de check-in
  };

  const handleCheckOut = (patientId: string) => {
    console.log('Check-out do paciente:', patientId);
    // Implementar lógica de check-out
  };

  const handleCallPatient = (patientId: string) => {
    console.log('Chamar paciente:', patientId);
    // Implementar lógica de chamar paciente
  };

  const handleChangePosition = (patientId: string, direction: 'up' | 'down') => {
    console.log('Alterar posição do paciente:', patientId, direction);
    // Implementar lógica de alterar posição na fila
  };

  const handleChangePriority = (patientId: string, priority: 'alta' | 'normal' | 'baixa') => {
    console.log('Alterar prioridade do paciente:', patientId, priority);
    // Implementar lógica de alterar prioridade
  };

  return (
    <div className="space-y-6">
      {/* Header do Módulo */}
      <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
        <div className="flex items-center space-x-3 mb-4">
          <Building2 className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
          <h1 className={`text-2xl font-bold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
            Módulo de Recepção
          </h1>
        </div>
        
        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
          Gestão completa do atendimento inicial, agendamentos e fluxo de pacientes
        </p>

        {/* Sub-navegação */}
        <nav className="flex space-x-1 overflow-x-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as ReceptionViewType)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                  ${isActive 
                    ? darkMode 
                      ? "bg-blue-900/30 text-blue-400" 
                      : "bg-blue-100 text-blue-700"
                    : darkMode 
                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }
                `}
                title={item.description}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Conteúdo do Módulo */}
      <div className="min-h-[600px]">
        {currentView === 'dashboard' && (
          <ReceptionDashboard
            darkMode={darkMode}
            analytics={receptionAnalytics}
            appointments={appointments}
            waitingQueue={waitingQueue}
          />
        )}

        {currentView === 'appointments' && (
          <AppointmentsView
            darkMode={darkMode}
            appointments={appointments}
            selectedAppointment={selectedAppointment}
            setSelectedAppointment={setSelectedAppointment}
          />
        )}

        {currentView === 'patients' && (
          <PatientsView
            darkMode={darkMode}
            patients={patients}
            selectedPatient={selectedPatient}
            setSelectedPatient={setSelectedPatient}
          />
        )}

        {currentView === 'checkin' && (
          <CheckInOut
            darkMode={darkMode}
            patients={checkInPatients}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
          />
        )}

        {currentView === 'queue' && (
          <WaitingQueue
            darkMode={darkMode}
            queue={waitingQueue}
            onCallPatient={handleCallPatient}
            onChangePosition={handleChangePosition}
            onChangePriority={handleChangePriority}
          />
        )}

        {currentView === 'documents' && (
          <DocumentsView
            darkMode={darkMode}
            documents={documents}
            selectedDocument={selectedDocument}
            setSelectedDocument={setSelectedDocument}
            showNewDocumentModal={showNewDocumentModal}
            setShowNewDocumentModal={setShowNewDocumentModal}
            showUploadDocumentModal={showUploadDocumentModal}
            setShowUploadDocumentModal={setShowUploadDocumentModal}
          />
        )}
      </div>

      {/* Informações do usuário atual */}
      <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-4 rounded-lg shadow-sm border transition-colors`}>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${darkMode ? "bg-green-400" : "bg-green-500"}`} />
            <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Conectado como: <span className="font-medium">{currentUser?.name}</span>
            </span>
          </div>
          
          <div className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
            Módulo: Recepção • Visualização: {menuItems.find(item => item.id === currentView)?.label}
          </div>
        </div>
      </div>
    </div>
  );
}