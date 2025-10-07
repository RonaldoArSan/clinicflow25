'use client';

import React, { useState } from 'react';
import { useUserContext } from '../hooks/useUserContext';
import { useAI } from '../hooks/useAI';
import { useDarkMode } from '../hooks/useDarkMode';
import LoginForm from '../components/LoginForm';
import { Plus } from 'lucide-react';

import { 
  usePatients, 
  useAppointments, 
  useMedicalTeam, 
  useMedicalRecords, 
  useAnalytics, 
  useDocuments, 
  useProcedures,
  useUser 
} from '../hooks/useData';

import Dashboard from '../components/Dashboard';
import AppointmentsView from '../components/AppointmentsView';
import PatientsView from '../components/PatientsView';
import AnalyticsView from '../components/AnalyticsView';
import SettingsView from '../components/SettingsView';
import MedicalRecordsView from '../components/MedicalRecordsView';
import DocumentsView from '../components/DocumentsView';
import TeamView from '../components/TeamView';
import ProceduresView from '../components/ProceduresView';
import FinancialView from '../components/FinancialView';
import Modal from '../components/Modal';
import { AIChat } from '../components/AIChat';
import AIInsightsPanel from '../components/AIInsightsPanel';
import NewAppointmentForm from '../components/NewAppointmentForm';
import MainLayout from '../components/layouts/MainLayout';
import { ModuleType } from '../components/navigation/ModuleNavigation';

const MedicalClinicApp = () => {
  const { currentUser, isLoading } = useUserContext();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginForm />;
  }

  return <AuthenticatedApp />;
};

const AuthenticatedApp = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [currentModule, setCurrentModule] = useState<ModuleType>('medical');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedProcedure, setSelectedProcedure] = useState<any>(null);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);

  const { currentUser } = useUserContext();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { trackUserAction } = useAI();
  const { patients } = usePatients();
  const { appointments } = useAppointments();
  const { medicalTeam } = useMedicalTeam();
  const { medicalRecords } = useMedicalRecords();
  const { analytics } = useAnalytics();
  const { documents } = useDocuments();
  const { procedures } = useProcedures();

  return (
    <MainLayout
      darkMode={darkMode}
      onToggleDarkMode={toggleDarkMode}
      currentModule={currentModule}
      onModuleChange={setCurrentModule}
      currentView={currentView}
      onViewChange={(view) => {
        setCurrentView(view);
        trackUserAction('navigation', view, { viewName: view });
      }}
    >
      {/* Page Title and Action Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
          {currentView === "dashboard" && "Dashboard Clínico"}
          {currentView === "appointments" && "Agendamentos"}
          {currentView === "patients" && "Pacientes"}
          {currentView === "records" && "Prontuários Médicos"}
          {currentView === "procedures" && "Procedimentos e Exames"}
          {currentView === "documents" && "Documentos Médicos"}
          {currentView === "team" && "Equipe Médica"}
          {currentView === "financial" && "Financeiro"}
          {currentView === "analytics" && "Relatórios e Análises"}
          {currentView === "ai-insights" && "Insights e Análise da IA"}
          {currentView === "settings" && "Configurações da Clínica"}
        </h1>
        <button 
          onClick={() => {
            if (currentView === "appointments") setShowNewAppointmentModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>
            {currentView === "dashboard" && "Relatório Mensal"}
            {currentView === "appointments" && "Nova Consulta"}
            {currentView === "patients" && "Novo Paciente"}
            {currentView === "records" && "Novo Prontuário"}
            {currentView === "procedures" && "Novo Procedimento"}
            {currentView === "documents" && "Novo Documento"}
            {currentView === "team" && "Novo Profissional"}
            {currentView === "financial" && "Nova Transação"}
            {currentView === "analytics" && "Novo Relatório"}
            {currentView === "ai-insights" && "Atualizar Insights"}
            {currentView === "settings" && "Configurar"}
          </span>
        </button>
      </div>

      {/* Dynamic Content */}
      {currentView === "dashboard" && (
        <Dashboard 
          darkMode={darkMode}
          analytics={analytics}
          appointments={appointments}
          patients={patients}
        />
      )}

      {currentView === "appointments" && (
        <AppointmentsView 
          darkMode={darkMode}
          appointments={appointments}
          selectedAppointment={selectedAppointment}
          setSelectedAppointment={setSelectedAppointment}
        />
      )}
      
      {currentView === "patients" && (
        <PatientsView 
          darkMode={darkMode}
          patients={patients}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
        />
      )}

      {currentView === "analytics" && (
        <AnalyticsView 
          darkMode={darkMode}
          analytics={analytics}
        />
      )}

      {currentView === "ai-insights" && (
        <AIInsightsPanel darkMode={darkMode} />
      )}

      {currentView === "settings" && (
        <SettingsView 
          darkMode={darkMode}
          setDarkMode={toggleDarkMode}
        />
      )}
      
      {currentView !== "dashboard" && 
       currentView !== "appointments" && 
       currentView !== "patients" && 
       currentView !== "analytics" && 
       currentView !== "ai-insights" && 
       currentView !== "settings" && (
        <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
          <p className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Conteúdo da seção "{currentView}" será implementado em breve.
          </p>
        </div>
      )}

      {/* Modals */}
      <Modal
        isOpen={showNewAppointmentModal}
        onClose={() => setShowNewAppointmentModal(false)}
        title="Nova Consulta"
        size="xl"
        darkMode={darkMode}
      >
        <NewAppointmentForm
          darkMode={darkMode}
          patients={patients}
          doctors={medicalTeam}
          onSubmit={(appointment) => {
            console.log('Nova consulta:', appointment);
            setShowNewAppointmentModal(false);
          }}
          onCancel={() => setShowNewAppointmentModal(false)}
        />
      </Modal>

      {/* AI Chat Assistant */}
      <AIChat darkMode={darkMode} />
    </MainLayout>
  );
};

export default MedicalClinicApp;
