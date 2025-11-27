import { useState, useMemo, useCallback } from 'react';

// Tipos para o sistema de busca
export interface SearchResult {
  id: string;
  type: 'patient' | 'appointment' | 'doctor' | 'procedure' | 'document' | 'health_plan';
  title: string;
  subtitle?: string;
  description?: string;
  url?: string;
  data?: any;
  score?: number;
  highlight?: string[];
}

export interface SearchFilters {
  types?: string[];
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  status?: string[];
  priority?: string[];
}

export interface SearchOptions {
  query: string;
  filters?: SearchFilters;
  limit?: number;
  sortBy?: 'relevance' | 'date' | 'name';
  sortOrder?: 'asc' | 'desc';
}

// Hook para sistema de busca
export function useSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Dados mock para demonstração
  const mockData = useMemo(() => ({
    patients: [
      {
        id: '1',
        name: 'Maria Santos Silva',
        email: 'maria.santos@email.com',
        phone: '(11) 99999-1234',
        cpf: '123.456.789-01',
        birthDate: '1990-05-15',
        status: 'active'
      },
      {
        id: '2',
        name: 'João Pedro Oliveira',
        email: 'joao.pedro@email.com',
        phone: '(11) 99999-5678',
        cpf: '987.654.321-09',
        birthDate: '1985-08-22',
        status: 'active'
      },
      {
        id: '3',
        name: 'Ana Beatriz Costa',
        email: 'ana.beatriz@email.com',
        phone: '(11) 99999-9012',
        cpf: '456.789.123-45',
        birthDate: '1992-12-03',
        status: 'inactive'
      }
    ],
    appointments: [
      {
        id: '1',
        patientName: 'Maria Santos Silva',
        doctorName: 'Dr. Carlos Silva',
        date: '2024-02-01',
        time: '14:30',
        type: 'Consulta Geral',
        status: 'agendado'
      },
      {
        id: '2',
        patientName: 'João Pedro Oliveira',
        doctorName: 'Dra. Ana Costa',
        date: '2024-02-01',
        time: '15:00',
        type: 'Cardiologia',
        status: 'confirmado'
      }
    ],
    doctors: [
      {
        id: '1',
        name: 'Dr. Carlos Silva',
        specialty: 'Clínico Geral',
        crm: '12345-SP',
        email: 'carlos.silva@clinica.com',
        phone: '(11) 3333-1234'
      },
      {
        id: '2',
        name: 'Dra. Ana Costa',
        specialty: 'Cardiologia',
        crm: '67890-SP',
        email: 'ana.costa@clinica.com',
        phone: '(11) 3333-5678'
      }
    ],
    procedures: [
      {
        id: '1',
        name: 'Eletrocardiograma',
        description: 'Exame do coração',
        duration: 30,
        price: 120.00
      },
      {
        id: '2',
        name: 'Hemograma Completo',
        description: 'Exame de sangue completo',
        duration: 15,
        price: 45.00
      }
    ],
    documents: [
      {
        id: '1',
        name: 'Relatório Mensal Janeiro',
        type: 'Relatório',
        date: '2024-01-31',
        size: '2.5 MB'
      },
      {
        id: '2',
        name: 'Protocolo de Atendimento',
        type: 'Protocolo',
        date: '2024-01-15',
        size: '1.2 MB'
      }
    ]
  }), []);

  const searchFunction = useCallback((options: SearchOptions): SearchResult[] => {
    const { query, filters, limit = 20, sortBy = 'relevance' } = options;
    
    if (!query.trim()) return [];

    const results: SearchResult[] = [];
    const queryLower = query.toLowerCase();

    // Buscar pacientes
    if (!filters?.types || filters.types.includes('patient')) {
      mockData.patients.forEach(patient => {
        const score = calculateScore(queryLower, [
          patient.name,
          patient.email,
          patient.phone,
          patient.cpf
        ]);

        if (score > 0) {
          results.push({
            id: `patient-${patient.id}`,
            type: 'patient',
            title: patient.name,
            subtitle: patient.email,
            description: `Telefone: ${patient.phone} • CPF: ${patient.cpf}`,
            data: patient,
            score,
            highlight: getHighlights(queryLower, patient.name)
          });
        }
      });
    }

    // Buscar consultas
    if (!filters?.types || filters.types.includes('appointment')) {
      mockData.appointments.forEach(appointment => {
        const score = calculateScore(queryLower, [
          appointment.patientName,
          appointment.doctorName,
          appointment.type,
          appointment.status
        ]);

        if (score > 0) {
          results.push({
            id: `appointment-${appointment.id}`,
            type: 'appointment',
            title: `Consulta - ${appointment.patientName}`,
            subtitle: `${appointment.doctorName} • ${appointment.date} às ${appointment.time}`,
            description: `${appointment.type} • Status: ${appointment.status}`,
            data: appointment,
            score,
            highlight: getHighlights(queryLower, appointment.patientName)
          });
        }
      });
    }

    // Buscar médicos
    if (!filters?.types || filters.types.includes('doctor')) {
      mockData.doctors.forEach(doctor => {
        const score = calculateScore(queryLower, [
          doctor.name,
          doctor.specialty,
          doctor.crm,
          doctor.email
        ]);

        if (score > 0) {
          results.push({
            id: `doctor-${doctor.id}`,
            type: 'doctor',
            title: doctor.name,
            subtitle: doctor.specialty,
            description: `CRM: ${doctor.crm} • ${doctor.email}`,
            data: doctor,
            score,
            highlight: getHighlights(queryLower, doctor.name)
          });
        }
      });
    }

    // Buscar procedimentos
    if (!filters?.types || filters.types.includes('procedure')) {
      mockData.procedures.forEach(procedure => {
        const score = calculateScore(queryLower, [
          procedure.name,
          procedure.description
        ]);

        if (score > 0) {
          results.push({
            id: `procedure-${procedure.id}`,
            type: 'procedure',
            title: procedure.name,
            subtitle: `R$ ${procedure.price.toFixed(2)}`,
            description: procedure.description,
            data: procedure,
            score,
            highlight: getHighlights(queryLower, procedure.name)
          });
        }
      });
    }

    // Buscar documentos
    if (!filters?.types || filters.types.includes('document')) {
      mockData.documents.forEach(document => {
        const score = calculateScore(queryLower, [
          document.name,
          document.type
        ]);

        if (score > 0) {
          results.push({
            id: `document-${document.id}`,
            type: 'document',
            title: document.name,
            subtitle: document.type,
            description: `${document.date} • ${document.size}`,
            data: document,
            score,
            highlight: getHighlights(queryLower, document.name)
          });
        }
      });
    }

    // Ordenar resultados
    results.sort((a, b) => {
      if (sortBy === 'relevance') {
        return (b.score || 0) - (a.score || 0);
      } else if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return results.slice(0, limit);
  }, [mockData]);

  const search = useCallback(async (options: SearchOptions): Promise<SearchResult[]> => {
    setIsSearching(true);
    
    try {
      // Simular delay de busca
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const results = searchFunction(options);
      
      // Adicionar ao histórico se há query
      if (options.query.trim()) {
        addToSearchHistory(options.query);
      }
      
      return results;
    } finally {
      setIsSearching(false);
    }
  }, [searchFunction]);

  const quickSearch = useCallback((query: string, type?: string): SearchResult[] => {
    if (!query.trim()) return [];
    
    const options: SearchOptions = {
      query,
      filters: type ? { types: [type] } : undefined,
      limit: 5
    };
    
    return searchFunction(options);
  }, [searchFunction]);

  const addToSearchHistory = useCallback((query: string) => {
    if (!query.trim()) return;
    
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== query);
      return [query, ...filtered].slice(0, 10);
    });
  }, []);

  const clearSearchHistory = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const removeFromHistory = useCallback((query: string) => {
    setRecentSearches(prev => prev.filter(item => item !== query));
  }, []);

  const getSearchSuggestions = useCallback((query: string): string[] => {
    if (!query.trim()) return recentSearches;
    
    const queryLower = query.toLowerCase();
    const suggestions = new Set<string>();
    
    // Sugestões baseadas em dados existentes
    mockData.patients.forEach(patient => {
      if (patient.name.toLowerCase().includes(queryLower)) {
        suggestions.add(patient.name);
      }
    });
    
    mockData.doctors.forEach(doctor => {
      if (doctor.name.toLowerCase().includes(queryLower)) {
        suggestions.add(doctor.name);
      }
      if (doctor.specialty.toLowerCase().includes(queryLower)) {
        suggestions.add(doctor.specialty);
      }
    });
    
    mockData.procedures.forEach(procedure => {
      if (procedure.name.toLowerCase().includes(queryLower)) {
        suggestions.add(procedure.name);
      }
    });
    
    return Array.from(suggestions).slice(0, 8);
  }, [mockData, recentSearches]);

  return {
    search,
    quickSearch,
    isSearching,
    recentSearches,
    addToSearchHistory,
    clearSearchHistory,
    removeFromHistory,
    getSearchSuggestions
  };
}

// Função auxiliar para calcular score de relevância
function calculateScore(query: string, fields: string[]): number {
  let score = 0;
  
  fields.forEach(field => {
    const fieldLower = field.toLowerCase();
    
    if (fieldLower === query) {
      score += 100; // Match exato
    } else if (fieldLower.startsWith(query)) {
      score += 50; // Começa com
    } else if (fieldLower.includes(query)) {
      score += 20; // Contém
    }
  });
  
  return score;
}

// Função auxiliar para destacar termos
function getHighlights(query: string, text: string): string[] {
  const textLower = text.toLowerCase();
  const index = textLower.indexOf(query);
  
  if (index === -1) return [];
  
  return [text.substring(index, index + query.length)];
}