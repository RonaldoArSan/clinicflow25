'use client';

import React, { useState, useEffect } from 'react';
import { useUserContext } from '../hooks/useUserContext';
import { useAI } from '../hooks/useAI';
import LoginForm from '../components/LoginForm';
import UserHeader from '../components/UserHeader';
import AIChat from '../components/AIChat';
import AIInsightsPanel from '../components/AIInsightsPanel';
import { 
  Calendar, Users, MessageSquare, FileText, BarChart3, Settings, Plus, Search, Bell, 
  Menu, X, ChevronRight, MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle, User, 
  Target, Briefcase, Filter, Download, Share2, Eye, Edit, Trash2, Star, Heart, 
  MessageCircle, Send, UserPlus, Shield, Key, Camera, Video, Mic, Link, Hash, 
  TrendingUp, PieChart, Activity, DollarSign, UserCheck, Calendar as CalendarIcon, 
  Clock as ClockIcon, CheckSquare, Archive, Flag, Zap, Globe, Facebook, Instagram, 
  Twitter, Linkedin, Youtube, Bookmark, Tag, Award, BadgeCheck, AlertTriangle, Info, 
  CheckCircle2, XCircle, Clock4, MoreHorizontal, ArrowRight, ArrowLeft, ChevronDown, 
  ChevronUp, RefreshCw, Upload, Download as DownloadIcon, Stethoscope, Pill, HeartPulse, 
  CalendarDays, Receipt, CreditCard, FileImage, Clipboard, UserCog, Package, Thermometer, 
  Syringe, Badge, ShieldCheck, AlertOctagon, TrendingDown, Brain 
} from 'lucide-react';

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
import { useClinicSettings } from '../hooks/useData';

import Dashboard from '../components/Dashboard';
import StatCard from '../components/StatCard';
import PatientCard from '../components/PatientCard';
import AppointmentCard from '../components/AppointmentCard';
import AppointmentsView from '../components/AppointmentsView';
import PatientsView from '../components/PatientsView';
import AnalyticsView from '../components/AnalyticsView';
import SettingsView from '../components/SettingsView';
import MedicalRecordsView from '../components/MedicalRecordsView';
import DocumentsView from '../components/DocumentsView';
// Team management component
import TeamView from '../components/TeamView';
import ProceduresView from '../components/ProceduresView';
import FinancialView from '../components/FinancialView';
import Modal from '../components/Modal';
import NewAppointmentForm from '../components/NewAppointmentForm';

const MedicalClinicApp = () => {
  const { currentUser, isLoading } = useUserContext();
  
  // Se não estiver autenticado, mostrar tela de login
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedProcedure, setSelectedProcedure] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);
  const [showNewMemberModal, setShowNewMemberModal] = useState(false);
  const [showNewRecordModal, setShowNewRecordModal] = useState(false);
  const [showNewProcedureModal, setShowNewProcedureModal] = useState(false);
  const [showNewDocumentModal, setShowNewDocumentModal] = useState(false);
  const [showUploadDocumentModal, setShowUploadDocumentModal] = useState(false);
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
  const [showFinancialReportModal, setShowFinancialReportModal] = useState(false);

  const { currentUser } = useUserContext();
  const { trackUserAction } = useAI();
  const { user } = useUser();
  const { patients } = usePatients();
  const { appointments } = useAppointments();
  const { medicalTeam } = useMedicalTeam();
  const { medicalRecords } = useMedicalRecords();
  const { analytics } = useAnalytics();
  const { documents } = useDocuments();
  const { procedures } = useProcedures();
  const { clinicSettings } = useClinicSettings();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "appointments", label: "Agendamentos", icon: Calendar },
    { id: "patients", label: "Pacientes", icon: Users },
    { id: "records", label: "Prontuários", icon: Clipboard },
    { id: "procedures", label: "Procedimentos", icon: Stethoscope },
    { id: "documents", label: "Documentos", icon: FileText },
    { id: "team", label: "Equipe Médica", icon: UserCheck },
    { id: "financial", label: "Financeiro", icon: DollarSign },
    { id: "analytics", label: "Relatórios", icon: TrendingUp },
    { id: "ai-insights", label: "Insights IA", icon: Brain },
    { id: "settings", label: "Configurações", icon: Settings }
  ];

  const getPriorityColor = (priority: 'alta' | 'media' | 'baixa' | string) => {
    if (darkMode) {
      switch (priority) {
        case "alta":
          return "text-red-400 bg-red-900/30";
        case "media":
          return "text-yellow-400 bg-yellow-900/30";
        case "baixa":
          return "text-green-400 bg-green-900/30";
        default:
          return "text-gray-400 bg-gray-700";
      }
    } else {
      switch (priority) {
        case "alta":
          return "text-red-600 bg-red-50";
        case "media":
          return "text-yellow-600 bg-yellow-50";
        case "baixa":
          return "text-green-600 bg-green-50";
        default:
          return "text-gray-600 bg-gray-50";
      }
    }
  };

  const getStatusColor = (status: 'agendado' | 'confirmado' | 'concluido' | 'cancelado' | 'em_acompanhamento' | 'finalizado' | string) => {
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
    <div className={`min-h-screen transition-colors ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* User Header */}
      <UserHeader 
        darkMode={darkMode} 
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
      
      {/* Mobile Menu Button */}
      <div className="md:hidden px-4 py-2 flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 ${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"} transition-colors`}
        >
          <Menu className="w-6 h-6" />
          <span className="sr-only">Abrir menu</span>
        </button>
        
        {/* Busca Mobile */}
        <div className="flex-1 mx-4">
          <div className="relative">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
            <input
              type="text"
              placeholder="Buscar..."
              className={`pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm transition-colors ${
                darkMode 
                  ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" 
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg transform transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:inset-0 md:z-0
        `}>
          <div className="flex flex-col h-full">
            <div className={`flex items-center justify-between p-4 ${darkMode ? "border-gray-700" : "border-gray-200"} border-b md:hidden`}>
              <span className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                Menu
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`p-2 ${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"} transition-colors`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setSidebarOpen(false);
                      trackUserAction('navigation', `view_${item.id}`, { viewName: item.label });
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors
                      ${currentView === item.id 
                        ? darkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700" 
                        : darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-gray-100" : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className={`p-4 ${darkMode ? "border-gray-700" : "border-gray-200"} border-t`}>
              <div className="space-y-3">
                {/* Informações do Usuário */}
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${darkMode ? "bg-blue-600/20" : "bg-blue-100"} rounded-full flex items-center justify-center`}>
                    <span className={`${darkMode ? "text-blue-400" : "text-blue-600"} font-medium text-sm`}>
                      AP
                    </span>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                      {user?.name || "Dr. Ana Paula Silva"}
                    </p>
                    <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {user?.specialty || "Clínica Geral"}
                    </p>
                  </div>
                </div>
                
                {/* Informações da Clínica */}
                {clinicSettings.name && (
                  <div className={`pt-2 ${darkMode ? "border-gray-700" : "border-gray-200"} border-t`}>
                    <div className="flex items-start space-x-3">
                      {clinicSettings.logoUrl ? (
                        <div className="w-6 h-6 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={clinicSettings.logoUrl} 
                            alt="Logo" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className={`w-6 h-6 ${darkMode ? "bg-gray-600" : "bg-gray-300"} rounded flex items-center justify-center flex-shrink-0`}>
                          <Stethoscope className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} truncate`}>
                          {clinicSettings.fantasyName || clinicSettings.name}
                        </p>
                        {clinicSettings.phone && (
                          <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"} truncate`}>
                            📞 {clinicSettings.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-0">
          <div className="p-6 max-w-7xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
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
                    trackUserAction('create', `new_${currentView}`, { section: currentView });
                    if (currentView === "appointments") setShowNewAppointmentModal(true);
                    else if (currentView === "patients") setShowNewPatientModal(true);
                    else if (currentView === "team") setShowNewMemberModal(true);
                    else if (currentView === "records") setShowNewRecordModal(true);
                    else if (currentView === "procedures") setShowNewProcedureModal(true);
                    else if (currentView === "documents") setShowNewDocumentModal(true);
                    else if (currentView === "financial") setShowNewTransactionModal(true);
                    // Adicionar outros modais conforme necessário
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
                <AIInsightsPanel />
              )}

              {currentView === "records" && (
                <MedicalRecordsView 
                  darkMode={darkMode}
                  medicalRecords={medicalRecords}
                  selectedRecord={selectedRecord}
                  setSelectedRecord={setSelectedRecord}
                  showNewRecordModal={showNewRecordModal}
                  setShowNewRecordModal={setShowNewRecordModal}
                  patients={patients}
                  medicalTeam={medicalTeam}
                />
              )}

              {currentView === "documents" && (
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

              {currentView === "team" && (
                <TeamView 
                  darkMode={darkMode}
                  medicalTeam={medicalTeam}
                  selectedMember={selectedMember}
                  setSelectedMember={setSelectedMember}
                  showNewMemberModal={showNewMemberModal}
                  setShowNewMemberModal={setShowNewMemberModal}
                />
              )}

              {currentView === "procedures" && (
                <ProceduresView 
                  darkMode={darkMode}
                  procedures={procedures}
                  selectedProcedure={selectedProcedure}
                  setSelectedProcedure={setSelectedProcedure}
                  showNewProcedureModal={showNewProcedureModal}
                  setShowNewProcedureModal={setShowNewProcedureModal}
                />
              )}

              {currentView === "financial" && (
                <FinancialView 
                  darkMode={darkMode}
                  showNewTransactionModal={showNewTransactionModal}
                  setShowNewTransactionModal={setShowNewTransactionModal}
                  showFinancialReportModal={showFinancialReportModal}
                  setShowFinancialReportModal={setShowFinancialReportModal}
                />
              )}

              {currentView === "analytics" && (
                <AnalyticsView 
                  darkMode={darkMode}
                  analytics={analytics}
                />
              )}

              {currentView === "settings" && (
                <SettingsView 
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
              )}
              
              {currentView !== "dashboard" && 
               currentView !== "appointments" && 
               currentView !== "patients" && 
               currentView !== "records" && 
               currentView !== "documents" && 
               currentView !== "team" && 
               currentView !== "procedures" && 
               currentView !== "financial" && 
               currentView !== "analytics" && 
               currentView !== "settings" && (
                <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
                  <p className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Conteúdo da seção "{currentView}" será implementado em breve.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
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
            // Aqui você implementaria a lógica para adicionar o agendamento
            console.log('Nova consulta:', appointment);
            setShowNewAppointmentModal(false);
          }}
          onCancel={() => setShowNewAppointmentModal(false)}
        />
      </Modal>

      <Modal
        isOpen={showNewPatientModal}
        onClose={() => setShowNewPatientModal(false)}
        title="Novo Paciente"
        size="xl"
        darkMode={darkMode}
      >
        <form className="space-y-6">
          {/* Seção 1: Dados Pessoais */}
          <div className={`p-6 ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-lg transition-colors`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
              📋 Dados Pessoais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Digite o nome completo"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  CPF *
                </label>
                <input
                  type="text"
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Data de Nascimento *
                </label>
                <input
                  type="date"
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Sexo *
                </label>
                <select 
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">Selecione...</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  <option value="O">Outro</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Estado Civil
                </label>
                <select 
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">Selecione...</option>
                  <option value="solteiro">Solteiro(a)</option>
                  <option value="casado">Casado(a)</option>
                  <option value="divorciado">Divorciado(a)</option>
                  <option value="viuvo">Viúvo(a)</option>
                  <option value="uniao_estavel">União Estável</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Profissão
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Digite a profissão"
                />
              </div>
            </div>
          </div>

          {/* Seção 2: Contato e Endereço */}
          <div className={`p-6 ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-lg transition-colors`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
              📞 Contato e Endereço
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Telefone Principal *
                </label>
                <input
                  type="tel"
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Telefone Alternativo
                </label>
                <input
                  type="tel"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  E-mail *
                </label>
                <input
                  type="email"
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  CEP *
                </label>
                <input
                  type="text"
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="00000-000"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Cidade *
                </label>
                <input
                  type="text"
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Digite a cidade"
                />
              </div>
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Endereço Completo *
                </label>
                <input
                  type="text"
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Rua, número, complemento, bairro"
                />
              </div>
            </div>
          </div>

          {/* Seção 3: Informações Médicas */}
          <div className={`p-6 ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-lg transition-colors`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
              🩺 Informações Médicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Tipo Sanguíneo
                </label>
                <select 
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">Selecione...</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Peso (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="70.5"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Altura (cm)
                </label>
                <input
                  type="number"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="175"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Médico Responsável
                </label>
                <select 
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">Selecione um médico...</option>
                  <option value="dr_silva">Dr. João Silva - Clínico Geral</option>
                  <option value="dr_santos">Dra. Maria Santos - Cardiologia</option>
                  <option value="dr_costa">Dr. Pedro Costa - Pediatria</option>
                  <option value="dr_lima">Dra. Ana Lima - Ginecologia</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Alergias Conhecidas
                </label>
                <textarea
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Liste todas as alergias conhecidas (medicamentos, alimentos, etc.)"
                />
              </div>
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Condições Crônicas / Histórico Médico
                </label>
                <textarea
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Diabetes, hipertensão, cirurgias anteriores, etc."
                />
              </div>
            </div>
          </div>

          {/* Seção 4: Convênio e Plano de Saúde */}
          <div className={`p-6 ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-lg transition-colors`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
              💳 Convênio e Plano de Saúde
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Tipo de Atendimento *
                </label>
                <select 
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">Selecione...</option>
                  <option value="particular">Particular</option>
                  <option value="convenio">Convênio</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Convênio / Plano de Saúde
                </label>
                <select 
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">Selecione...</option>
                  <option value="unimed">Unimed</option>
                  <option value="bradesco">Bradesco Saúde</option>
                  <option value="amil">Amil</option>
                  <option value="sulamerica">SulAmérica</option>
                  <option value="porto_seguro">Porto Seguro</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Número da Carteirinha
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Digite o número da carteirinha"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Validade do Plano
                </label>
                <input
                  type="date"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Seção 5: Contato de Emergência */}
          <div className={`p-6 ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-lg transition-colors`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
              🚨 Contato de Emergência
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Nome do contato de emergência"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Parentesco *
                </label>
                <select 
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">Selecione...</option>
                  <option value="pai">Pai</option>
                  <option value="mae">Mãe</option>
                  <option value="conjuge">Cônjuge</option>
                  <option value="filho">Filho(a)</option>
                  <option value="irmao">Irmão(ã)</option>
                  <option value="amigo">Amigo(a)</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Telefone *
                </label>
                <input
                  type="tel"
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  E-mail do Contato
                </label>
                <input
                  type="email"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>
          </div>

          {/* Seção 6: Observações Adicionais */}
          <div className={`p-6 ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-lg transition-colors`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
              📝 Observações Adicionais
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Como chegou à clínica?
                </label>
                <select 
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">Selecione...</option>
                  <option value="indicacao">Indicação de paciente</option>
                  <option value="medico">Indicação médica</option>
                  <option value="internet">Pesquisa na internet</option>
                  <option value="redes_sociais">Redes sociais</option>
                  <option value="convenio">Pelo convênio</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Observações Gerais
                </label>
                <textarea
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors ${
                    darkMode 
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Informações adicionais sobre o paciente, preferências, restrições, etc."
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="termos"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="termos" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Aceito os termos de uso e política de privacidade da clínica
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="marketing"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="marketing" className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Autorizo o recebimento de comunicações sobre consultas e serviços
                </label>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-300 dark:border-gray-600">
            <button
              type="button"
              onClick={() => setShowNewPatientModal(false)}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                darkMode 
                  ? "text-gray-300 bg-gray-700 hover:bg-gray-600" 
                  : "text-gray-700 bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Cancelar
            </button>
            <button
              type="button"
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                darkMode 
                  ? "text-gray-300 bg-gray-600 hover:bg-gray-500" 
                  : "text-gray-600 bg-gray-300 hover:bg-gray-400"
              }`}
            >
              Salvar Rascunho
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cadastrar Paciente
            </button>
          </div>
        </form>
      </Modal>

      {/* AI Chat Assistant - Disponível em todas as páginas */}
      <AIChat darkMode={darkMode} />
    </div>
  );
};

export default MedicalClinicApp;