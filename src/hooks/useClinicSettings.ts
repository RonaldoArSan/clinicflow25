import { useState, useEffect } from 'react';

interface ClinicSettings {
  // Dados Básicos
  name: string;
  fantasyName: string;
  cnpj: string;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  
  // Endereço Completo
  cep: string;
  address: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  country: string;
  
  // Contatos
  phone: string;
  cellphone: string;
  whatsapp: string;
  email: string;
  website: string;
  
  // Responsável Técnico
  technicalManager: string;
  technicalManagerCrm: string;
  technicalManagerCpf: string;
  
  // Informações Legais
  socialReason: string;
  openingDate: string;
  cnes: string;
  anvisa: string;
  
  // Configurações de Documentos
  logoUrl: string;
  letterhead: string;
  footer: string;
  observations: string;
}

const defaultClinicSettings: ClinicSettings = {
  // Dados Básicos
  name: "Clínica Médica São Paulo",
  fantasyName: "MedClinic SP",
  cnpj: "12.345.678/0001-90",
  inscricaoEstadual: "123.456.789.012",
  inscricaoMunicipal: "12345678",
  
  // Endereço Completo
  cep: "01234-567",
  address: "Rua das Clínicas, 123",
  number: "123",
  complement: "Sala 101",
  district: "Centro",
  city: "São Paulo",
  state: "SP",
  country: "Brasil",
  
  // Contatos
  phone: "(11) 3333-4444",
  cellphone: "(11) 99999-8888",
  whatsapp: "(11) 99999-8888",
  email: "contato@clinica.com.br",
  website: "www.clinica.com.br",
  
  // Responsável Técnico
  technicalManager: "Dr. João Silva",
  technicalManagerCrm: "CRM/SP 123456",
  technicalManagerCpf: "123.456.789-00",
  
  // Informações Legais
  socialReason: "Clínica Médica São Paulo LTDA",
  openingDate: "2020-01-15",
  cnes: "1234567",
  anvisa: "ANVISA123456",
  
  // Configurações de Documentos
  logoUrl: "",
  letterhead: "CLÍNICA MÉDICA SÃO PAULO",
  footer: "Esta clínica segue os protocolos de segurança estabelecidos pela ANVISA",
  observations: "Clínica especializada em medicina geral e preventiva"
};

export const useClinicSettings = () => {
  const [settings, setSettings] = useState<ClinicSettings>(defaultClinicSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar configurações do localStorage na inicialização
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('clinicSettings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultClinicSettings, ...parsed });
      }
    } catch (err) {
      console.error('Erro ao carregar configurações da clínica:', err);
      setError('Erro ao carregar configurações salvas');
    }
  }, []);

  // Salvar configurações no localStorage
  const saveSettings = async (newSettings: Partial<ClinicSettings>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedSettings = { ...settings, ...newSettings };
      setSettings(updatedSettings);
      
      // Salvar no localStorage
      localStorage.setItem('clinicSettings', JSON.stringify(updatedSettings));
      
      // Aqui você poderia também salvar no backend/banco de dados
      // await saveToBackend(updatedSettings);
      
      return { success: true, message: 'Configurações salvas com sucesso!' };
    } catch (err) {
      const errorMessage = 'Erro ao salvar configurações da clínica';
      setError(errorMessage);
      console.error(errorMessage, err);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Resetar configurações para o padrão
  const resetSettings = () => {
    setSettings(defaultClinicSettings);
    localStorage.removeItem('clinicSettings');
  };

  // Exportar configurações
  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `configuracoes-clinica-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Importar configurações
  const importSettings = (file: File) => {
    return new Promise<{ success: boolean; message: string }>((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          const validatedSettings = { ...defaultClinicSettings, ...imported };
          setSettings(validatedSettings);
          localStorage.setItem('clinicSettings', JSON.stringify(validatedSettings));
          resolve({ success: true, message: 'Configurações importadas com sucesso!' });
        } catch (err) {
          console.error('Erro ao importar configurações:', err);
          resolve({ success: false, message: 'Erro ao importar configurações. Verifique se o arquivo é válido.' });
        }
      };
      
      reader.onerror = () => {
        resolve({ success: false, message: 'Erro ao ler o arquivo de configurações.' });
      };
      
      reader.readAsText(file);
    });
  };

  // Funções utilitárias para usar as configurações em documentos
  const getDocumentHeader = () => {
    return {
      logoUrl: settings.logoUrl,
      title: settings.letterhead || settings.fantasyName,
      subtitle: `${settings.address}, ${settings.number} - ${settings.district}`,
      contact: `${settings.phone} • ${settings.email}`,
      cnpj: settings.cnpj,
      cnes: settings.cnes
    };
  };

  const getDocumentFooter = () => {
    return settings.footer;
  };

  const getFullAddress = () => {
    return `${settings.address}, ${settings.number}${settings.complement ? `, ${settings.complement}` : ''} - ${settings.district}, ${settings.city}/${settings.state} - CEP: ${settings.cep}`;
  };

  const getTechnicalManagerInfo = () => {
    return {
      name: settings.technicalManager,
      crm: settings.technicalManagerCrm,
      cpf: settings.technicalManagerCpf
    };
  };

  return {
    settings,
    isLoading,
    error,
    saveSettings,
    resetSettings,
    exportSettings,
    importSettings,
    getDocumentHeader,
    getDocumentFooter,
    getFullAddress,
    getTechnicalManagerInfo
  };
};

export type { ClinicSettings };