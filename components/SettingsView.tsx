import React, { useState, useRef } from 'react';
import { 
  Building, 
  Settings, 
  Shield, 
  Key, 
  Database, 
  Palette, 
  Bell, 
  Clock, 
  ShieldCheck,
  Upload,
  Camera,
  FileImage,
  Download,
  Eye,
  Edit,
  Trash2,
  Save,
  Globe,
  MapPin,
  Phone,
  Mail,
  User,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useClinicSettings } from '../hooks/useClinicSettings';

interface SettingsViewProps {
  darkMode?: boolean;
  setDarkMode?: (dark: boolean) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ darkMode = false, setDarkMode }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importFileRef = useRef<HTMLInputElement>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [activeTab, setActiveTab] = useState("clinic");
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Usar o hook personalizado para configurações da clínica
  const {
    settings: clinicSettings,
    isLoading,
    error,
    saveSettings,
    exportSettings,
    importSettings
  } = useClinicSettings();

  const [localSettings, setLocalSettings] = useState(clinicSettings);

  // Sincronizar configurações locais com as do hook
  React.useEffect(() => {
    setLocalSettings(clinicSettings);
    if (localSettings.logoUrl && !logoPreview) {
      setLogoPreview(localSettings.logoUrl);
    }
  }, [clinicSettings]);

  const [systemSettings, setSystemSettings] = useState({
    appointmentReminder: true,
    autoBackup: true,
    emailNotifications: false,
    healthPlanIntegration: true,
    appointmentInterval: 30
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        setLocalSettings({...localSettings, logoUrl: result});
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview("");
    setLocalSettings({...localSettings, logoUrl: ""});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveSettings = async () => {
    const result = await saveSettings(localSettings);
    setSaveMessage({
      type: result.success ? 'success' : 'error',
      message: result.message
    });
    
    // Limpar mensagem após 3 segundos
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleImportSettings = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const result = await importSettings(file);
      setSaveMessage({
        type: result.success ? 'success' : 'error',
        message: result.message
      });
      
      // Limpar mensagem após 3 segundos
      setTimeout(() => setSaveMessage(null), 3000);
      
      // Limpar input
      if (importFileRef.current) {
        importFileRef.current.value = "";
      }
    }
  };

  const tabs = [
    { id: "clinic", label: "Dados da Clínica", icon: Building },
    { id: "logo", label: "Logo e Identidade", icon: FileImage },
    { id: "documents", label: "Configurações de Documentos", icon: FileText },
    { id: "system", label: "Sistema", icon: Settings },
    { id: "security", label: "Segurança", icon: Shield }
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg shadow-sm border transition-colors`}>
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? darkMode
                      ? "border-blue-400 text-blue-400 bg-gray-700/50"
                      : "border-blue-600 text-blue-600 bg-blue-50"
                    : darkMode
                    ? "border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-700/30"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clinic Information Tab */}
      {activeTab === "clinic" && (
        <div className="space-y-6">
          {/* Dados Básicos */}
          <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
            <div className="flex items-center space-x-3 mb-6">
              <Building className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                📋 Dados Básicos da Clínica
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Razão Social *
                </label>
                <input
                  type="text"
                  value={localSettings.socialReason}
                  onChange={(e) => setLocalSettings({...localSettings, socialReason: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Nome Fantasia *
                </label>
                <input
                  type="text"
                  value={localSettings.fantasyName}
                  onChange={(e) => setLocalSettings({...localSettings, fantasyName: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  CNPJ *
                </label>
                <input
                  type="text"
                  value={localSettings.cnpj}
                  onChange={(e) => setLocalSettings({...localSettings, cnpj: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="00.000.000/0000-00"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Inscrição Estadual
                </label>
                <input
                  type="text"
                  value={localSettings.inscricaoEstadual}
                  onChange={(e) => setLocalSettings({...localSettings, inscricaoEstadual: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Inscrição Municipal
                </label>
                <input
                  type="text"
                  value={localSettings.inscricaoMunicipal}
                  onChange={(e) => setLocalSettings({...localSettings, inscricaoMunicipal: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Data de Abertura
                </label>
                <input
                  type="date"
                  value={localSettings.openingDate}
                  onChange={(e) => setLocalSettings({...localSettings, openingDate: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  CNES
                </label>
                <input
                  type="text"
                  value={localSettings.cnes}
                  onChange={(e) => setLocalSettings({...localSettings, cnes: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Registro ANVISA
                </label>
                <input
                  type="text"
                  value={localSettings.anvisa}
                  onChange={(e) => setLocalSettings({...localSettings, anvisa: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Endereço Completo */}
          <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                📍 Endereço Completo
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  CEP *
                </label>
                <input
                  type="text"
                  value={localSettings.cep}
                  onChange={(e) => setLocalSettings({...localSettings, cep: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="00000-000"
                />
              </div>
              <div className="lg:col-span-2">
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Endereço *
                </label>
                <input
                  type="text"
                  value={localSettings.address}
                  onChange={(e) => setLocalSettings({...localSettings, address: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Número *
                </label>
                <input
                  type="text"
                  value={localSettings.number}
                  onChange={(e) => setLocalSettings({...localSettings, number: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Complemento
                </label>
                <input
                  type="text"
                  value={localSettings.complement}
                  onChange={(e) => setLocalSettings({...localSettings, complement: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Bairro *
                </label>
                <input
                  type="text"
                  value={localSettings.district}
                  onChange={(e) => setLocalSettings({...localSettings, district: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Cidade *
                </label>
                <input
                  type="text"
                  value={localSettings.city}
                  onChange={(e) => setLocalSettings({...localSettings, city: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Estado *
                </label>
                <select
                  value={localSettings.state}
                  onChange={(e) => setLocalSettings({...localSettings, state: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="RS">Rio Grande do Sul</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  País
                </label>
                <input
                  type="text"
                  value={localSettings.country}
                  onChange={(e) => setLocalSettings({...localSettings, country: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Contatos */}
          <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
            <div className="flex items-center space-x-3 mb-6">
              <Phone className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                📞 Informações de Contato
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Telefone Principal *
                </label>
                <input
                  type="text"
                  value={localSettings.phone}
                  onChange={(e) => setLocalSettings({...localSettings, phone: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="(11) 3333-4444"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Celular
                </label>
                <input
                  type="text"
                  value={localSettings.cellphone}
                  onChange={(e) => setLocalSettings({...localSettings, cellphone: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="(11) 99999-8888"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  WhatsApp
                </label>
                <input
                  type="text"
                  value={localSettings.whatsapp}
                  onChange={(e) => setLocalSettings({...localSettings, whatsapp: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="(11) 99999-8888"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  E-mail Principal *
                </label>
                <input
                  type="email"
                  value={localSettings.email}
                  onChange={(e) => setLocalSettings({...localSettings, email: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="contato@clinica.com.br"
                />
              </div>
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Website
                </label>
                <input
                  type="text"
                  value={localSettings.website}
                  onChange={(e) => setLocalSettings({...localSettings, website: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="www.clinica.com.br"
                />
              </div>
            </div>
          </div>

          {/* Responsável Técnico */}
          <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
            <div className="flex items-center space-x-3 mb-6">
              <User className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                👨‍⚕️ Responsável Técnico
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={localSettings.technicalManager}
                  onChange={(e) => setLocalSettings({...localSettings, technicalManager: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  CRM *
                </label>
                <input
                  type="text"
                  value={localSettings.technicalManagerCrm}
                  onChange={(e) => setLocalSettings({...localSettings, technicalManagerCrm: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="CRM/SP 123456"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  CPF *
                </label>
                <input
                  type="text"
                  value={localSettings.technicalManagerCpf}
                  onChange={(e) => setLocalSettings({...localSettings, technicalManagerCpf: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="000.000.000-00"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logo and Identity Tab */}
      {activeTab === "logo" && (
        <div className="space-y-6">
          {/* Logo Upload */}
          <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
            <div className="flex items-center space-x-3 mb-6">
              <FileImage className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                🎨 Logo da Clínica
              </h2>
            </div>
            
            <div className="space-y-6">
              {/* Current Logo Display */}
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-3`}>
                  Logo Atual
                </label>
                <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  logoPreview || localSettings.logoUrl
                    ? darkMode ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"
                    : darkMode ? "border-gray-600 bg-gray-700/50" : "border-gray-300 bg-gray-50"
                }`}>
                  {logoPreview || localSettings.logoUrl ? (
                    <div className="space-y-4">
                      <img
                        src={logoPreview || localSettings.logoUrl}
                        alt="Logo da Clínica"
                        className="max-h-32 mx-auto object-contain"
                      />
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Alterar Logo</span>
                        </button>
                        <button
                          onClick={removeLogo}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Remover</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <FileImage className={`mx-auto w-12 h-12 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                      <div>
                        <p className={`text-lg font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Adicionar Logo da Clínica
                        </p>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mt-1`}>
                          PNG, JPG ou SVG até 5MB
                        </p>
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Upload className="w-5 h-5" />
                        <span>Carregar Logo</span>
                      </button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Logo Guidelines */}
              <div className={`p-4 ${darkMode ? "bg-blue-900/20 border-blue-800" : "bg-blue-50 border-blue-200"} border rounded-lg`}>
                <h4 className={`font-medium ${darkMode ? "text-blue-300" : "text-blue-800"} mb-2`}>
                  📝 Diretrizes para o Logo
                </h4>
                <ul className={`text-sm ${darkMode ? "text-blue-200" : "text-blue-700"} space-y-1`}>
                  <li>• Resolução mínima recomendada: 300x300px</li>
                  <li>• Formato preferível: PNG com fundo transparente</li>
                  <li>• Tamanho máximo do arquivo: 5MB</li>
                  <li>• O logo será usado em receituários, prontuários e documentos</li>
                  <li>• Certifique-se de que seja legível em tamanhos pequenos</li>
                </ul>
              </div>

              {/* Logo Preview in Documents */}
              {(logoPreview || localSettings.logoUrl) && (
                <div className={`p-4 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"} border rounded-lg`}>
                  <h4 className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"} mb-3`}>
                    👁️ Prévia em Documentos
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Receituário Preview */}
                    <div className={`p-4 ${darkMode ? "bg-gray-600 border-gray-500" : "bg-white border-gray-200"} border rounded-lg`}>
                      <div className="flex items-center justify-between mb-2">
                        <img
                          src={logoPreview || localSettings.logoUrl}
                          alt="Logo"
                          className="h-8 object-contain"
                        />
                        <span className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          Receituário
                        </span>
                      </div>
                      <div className="text-xs space-y-1">
                        <p className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                          {localSettings.fantasyName}
                        </p>
                        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {localSettings.address}, {localSettings.number}
                        </p>
                      </div>
                    </div>

                    {/* Prontuário Preview */}
                    <div className={`p-4 ${darkMode ? "bg-gray-600 border-gray-500" : "bg-white border-gray-200"} border rounded-lg`}>
                      <div className="flex items-center justify-between mb-2">
                        <img
                          src={logoPreview || localSettings.logoUrl}
                          alt="Logo"
                          className="h-8 object-contain"
                        />
                        <span className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          Prontuário
                        </span>
                      </div>
                      <div className="text-xs space-y-1">
                        <p className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                          {localSettings.fantasyName}
                        </p>
                        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {localSettings.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Documents Configuration Tab */}
      {activeTab === "documents" && (
        <div className="space-y-6">
          {/* Document Settings */}
          <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
            <div className="flex items-center space-x-3 mb-6">
              <FileText className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                📄 Configurações de Documentos
              </h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
                  Cabeçalho dos Documentos *
                </label>
                <input
                  type="text"
                  value={localSettings.letterhead}
                  onChange={(e) => setLocalSettings({...localSettings, letterhead: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Texto que aparecerá no cabeçalho dos documentos"
                />
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"} mt-1`}>
                  Este texto aparecerá junto com o logo no topo dos documentos
                </p>
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
                  Rodapé dos Documentos
                </label>
                <textarea
                  rows={3}
                  value={localSettings.footer}
                  onChange={(e) => setLocalSettings({...localSettings, footer: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Informações que aparecerão no rodapé dos documentos"
                />
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"} mt-1`}>
                  Informações legais, avisos ou instruções que aparecerão no final dos documentos
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
                  Observações Gerais da Clínica
                </label>
                <textarea
                  rows={4}
                  value={localSettings.observations}
                  onChange={(e) => setLocalSettings({...localSettings, observations: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Especialidades, diferenciais, avisos importantes, etc."
                />
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"} mt-1`}>
                  Informações sobre a clínica que podem ser incluídas em documentos específicos
                </p>
              </div>

              {/* Document Preview */}
              <div className={`p-4 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"} border rounded-lg`}>
                <h4 className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"} mb-3`}>
                  👁️ Prévia do Documento
                </h4>
                <div className={`p-6 ${darkMode ? "bg-white text-black" : "bg-white text-black"} border rounded-lg shadow-sm`}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-300">
                    <div className="flex items-center space-x-4">
                      {(logoPreview || localSettings.logoUrl) && (
                        <img
                          src={logoPreview || localSettings.logoUrl}
                          alt="Logo"
                          className="h-16 object-contain"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {localSettings.letterhead || localSettings.fantasyName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {localSettings.address}, {localSettings.number} - {localSettings.district}
                        </p>
                        <p className="text-sm text-gray-600">
                          {localSettings.phone} • {localSettings.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Sample */}
                  <div className="mb-6">
                    <h4 className="text-md font-semibold mb-4 text-gray-800">RECEITUÁRIO MÉDICO</h4>
                    <p className="text-sm text-gray-700 mb-2">Paciente: Maria da Silva</p>
                    <p className="text-sm text-gray-700 mb-4">Data: {new Date().toLocaleDateString('pt-BR')}</p>
                    <div className="min-h-[100px] border-l-4 border-blue-500 pl-4">
                      <p className="text-sm text-gray-600 italic">
                        [Conteúdo da prescrição apareceria aqui]
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  {localSettings.footer && (
                    <div className="pt-4 border-t border-gray-300">
                      <p className="text-xs text-gray-600 text-center">
                        {localSettings.footer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Settings Tab */}
      {activeTab === "system" && (
        <div className="space-y-6">
          {/* System Settings */}
          <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
            <div className="flex items-center space-x-3 mb-4">
              <Settings className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                Configurações do Sistema
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
                  <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Lembrete de consultas
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemSettings.appointmentReminder}
                    onChange={(e) => setSystemSettings({...systemSettings, appointmentReminder: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
                  <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Backup automático
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemSettings.autoBackup}
                    onChange={(e) => setSystemSettings({...systemSettings, autoBackup: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
                  <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Notificações por email
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemSettings.emailNotifications}
                    onChange={(e) => setSystemSettings({...systemSettings, emailNotifications: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
                  Intervalo entre consultas (minutos)
                </label>
                <select
                  value={systemSettings.appointmentInterval}
                  onChange={(e) => setSystemSettings({...systemSettings, appointmentInterval: parseInt(e.target.value)})}
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
          </div>

          {/* Appearance Settings */}
          <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
            <div className="flex items-center space-x-3 mb-4">
              <Palette className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                Aparência
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Tema escuro
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode?.(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Security Settings */}
          <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
            <div className="flex items-center space-x-3 mb-4">
              <Shield className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                Segurança e Privacidade
              </h2>
            </div>
            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Alterar Senha
              </button>
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Configurar 2FA
              </button>
              <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                Backup de Dados
              </button>
              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Configurar LGPD
              </button>
            </div>
          </div>

          {/* Active Health Plans */}
          <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-lg shadow-sm border transition-colors`}>
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
              Convênios Ativos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Unimed", status: "Ativo", color: "blue" },
                { name: "Bradesco Saúde", status: "Ativo", color: "red" },
                { name: "SulAmérica", status: "Ativo", color: "green" },
                { name: "Amil", status: "Pendente", color: "purple" },
                { name: "Particular", status: "Sempre Ativo", color: "yellow" }
              ].map((plan, index) => (
                <div key={index} className={`flex items-center justify-between p-4 border rounded-lg ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 bg-${plan.color}-100 rounded-full flex items-center justify-center`}>
                      <ShieldCheck className={`w-5 h-5 text-${plan.color}-600`} />
                    </div>
                    <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {plan.name}
                    </span>
                  </div>
                  <span className={`text-sm ${
                    plan.status === "Ativo" || plan.status === "Sempre Ativo" 
                      ? "text-green-600" 
                      : "text-yellow-600"
                  }`}>
                    {plan.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end space-x-3">
        <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Exportar Configurações
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Salvar Configurações</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsView;