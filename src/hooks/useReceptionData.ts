import { useState, useEffect } from 'react';

interface QueueItem {
  id: string;
  patientName: string;
  patientId: string;
  appointmentId?: string;
  checkInTime: string;
  estimatedTime?: string;
  priority: 'normal' | 'urgent' | 'emergency';
  status: 'waiting' | 'in_service' | 'completed' | 'cancelled';
  doctorName?: string;
  specialty?: string;
  serviceType: string;
  waitTime: number;
}

interface Contact {
  id: string;
  name: string;
  type: 'patient' | 'doctor' | 'supplier' | 'partner' | 'emergency' | 'other';
  phone: string;
  email?: string;
  address?: string;
  company?: string;
  specialty?: string;
  notes?: string;
  favorite: boolean;
  lastContact?: string;
  tags: string[];
}

export const useReceptionData = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    // Inicializar dados mock para a fila
    const mockQueue: QueueItem[] = [
      {
        id: '1',
        patientName: 'Maria Silva',
        patientId: 'PAT001',
        appointmentId: 'APP001',
        checkInTime: '08:30',
        estimatedTime: '09:00',
        priority: 'normal',
        status: 'waiting',
        doctorName: 'Dr. João Santos',
        specialty: 'Cardiologia',
        serviceType: 'Consulta',
        waitTime: 15
      },
      {
        id: '2',
        patientName: 'Pedro Oliveira',
        patientId: 'PAT002',
        checkInTime: '09:15',
        priority: 'urgent',
        status: 'in_service',
        doctorName: 'Dra. Ana Paula Silva',
        specialty: 'Clínica Geral',
        serviceType: 'Consulta de Urgência',
        waitTime: 45
      },
      {
        id: '3',
        patientName: 'Ana Costa',
        patientId: 'PAT003',
        appointmentId: 'APP002',
        checkInTime: '10:00',
        estimatedTime: '10:30',
        priority: 'normal',
        status: 'waiting',
        doctorName: 'Dr. Carlos Mendes',
        specialty: 'Dermatologia',
        serviceType: 'Exame',
        waitTime: 25
      }
    ];

    // Inicializar dados mock para contatos
    const mockContacts: Contact[] = [
      {
        id: '1',
        name: 'SAMU 192',
        type: 'emergency',
        phone: '192',
        email: 'contato@samu.gov.br',
        company: 'SAMU',
        notes: 'Serviço de Atendimento Móvel de Urgência',
        favorite: true,
        tags: ['emergência', 'urgência'],
        lastContact: '2024-01-15'
      },
      {
        id: '2',
        name: 'Bombeiros',
        type: 'emergency',
        phone: '193',
        company: 'Corpo de Bombeiros',
        notes: 'Emergências e resgates',
        favorite: true,
        tags: ['emergência', 'resgate'],
        lastContact: '2024-01-10'
      },
      {
        id: '3',
        name: 'Polícia Militar',
        type: 'emergency',
        phone: '190',
        company: 'PM',
        notes: 'Emergências policiais',
        favorite: true,
        tags: ['emergência', 'segurança']
      },
      {
        id: '4',
        name: 'Dr. Roberto Carvalho',
        type: 'doctor',
        phone: '(11) 99999-1234',
        email: 'roberto.carvalho@hospital.com',
        company: 'Hospital São Lucas',
        specialty: 'Neurologista',
        notes: 'Especialista em neurologia, parceiro para encaminhamentos',
        favorite: false,
        tags: ['neurologia', 'parceiro'],
        lastContact: '2024-01-20'
      },
      {
        id: '5',
        name: 'Laboratório Central',
        type: 'supplier',
        phone: '(11) 4444-5678',
        email: 'contato@labcentral.com.br',
        address: 'Rua das Análises, 123 - Centro',
        company: 'Lab Central',
        notes: 'Laboratório de análises clínicas parceiro',
        favorite: true,
        tags: ['laboratório', 'exames'],
        lastContact: '2024-01-18'
      },
      {
        id: '6',
        name: 'Farmácia Saúde',
        type: 'supplier',
        phone: '(11) 5555-9876',
        email: 'vendas@farmaciasaude.com.br',
        address: 'Av. Principal, 456 - Centro',
        company: 'Farmácia Saúde',
        notes: 'Fornecedora de medicamentos e materiais médicos',
        favorite: false,
        tags: ['farmácia', 'medicamentos'],
        lastContact: '2024-01-16'
      }
    ];

    setQueue(mockQueue);
    setContacts(mockContacts);
  }, []);

  const addToQueue = (queueItem: Omit<QueueItem, 'id'>) => {
    const newItem: QueueItem = {
      ...queueItem,
      id: Date.now().toString()
    };
    setQueue(prev => [...prev, newItem]);
  };

  const updateQueue = (queueItem: QueueItem) => {
    setQueue(prev => prev.map(item => 
      item.id === queueItem.id ? queueItem : item
    ));
  };

  const removeFromQueue = (id: string) => {
    setQueue(prev => prev.filter(item => item.id !== id));
  };

  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString()
    };
    setContacts(prev => [...prev, newContact]);
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    setContacts(prev => prev.map(contact => 
      contact.id === id ? { ...contact, ...updates } : contact
    ));
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return {
    queue,
    contacts,
    addToQueue,
    updateQueue,
    removeFromQueue,
    addContact,
    updateContact,
    deleteContact
  };
};