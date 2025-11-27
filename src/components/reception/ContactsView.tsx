import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Star,
  Building,
  User,
  MapPin,
  Globe,
  PhoneCall,
  MessageSquare,
  Calendar,
  Clock
} from 'lucide-react';

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

interface ContactsViewProps {
  darkMode: boolean;
  contacts: Contact[];
  onAddContact: (contact: Omit<Contact, 'id'>) => void;
  onEditContact: (id: string, contact: Partial<Contact>) => void;
  onDeleteContact: (id: string) => void;
  onCall: (phone: string) => void;
  onSendMessage: (phone: string) => void;
}

const ContactsView: React.FC<ContactsViewProps> = ({
  darkMode,
  contacts = [],
  onAddContact,
  onEditContact,
  onDeleteContact,
  onCall,
  onSendMessage
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Mock de contatos se a lista estiver vazia
  const mockContacts: Contact[] = [
    {
      id: '1',
      name: 'SAMU',
      type: 'emergency',
      phone: '192',
      favorite: true,
      notes: 'Serviço de Atendimento Móvel de Urgência',
      tags: ['emergência', 'urgência'],
      lastContact: '2025-10-01'
    },
    {
      id: '2',
      name: 'Bombeiros',
      type: 'emergency',
      phone: '193',
      favorite: true,
      notes: 'Corpo de Bombeiros',
      tags: ['emergência', 'incêndio'],
      lastContact: '2025-09-15'
    },
    {
      id: '3',
      name: 'Polícia Militar',
      type: 'emergency',
      phone: '190',
      favorite: true,
      notes: 'Polícia Militar',
      tags: ['emergência', 'segurança']
    },
    {
      id: '4',
      name: 'Dr. Carlos Mendes',
      type: 'doctor',
      phone: '(11) 99999-1234',
      email: 'carlos.mendes@hospital.com.br',
      company: 'Hospital São Paulo',
      specialty: 'Cardiologia',
      favorite: false,
      notes: 'Médico parceiro para interconsultas',
      tags: ['cardiologia', 'parceiro'],
      lastContact: '2025-10-05'
    },
    {
      id: '5',
      name: 'Farmácia Central',
      type: 'supplier',
      phone: '(11) 3333-4567',
      email: 'pedidos@farmaciacentral.com.br',
      address: 'Rua das Flores, 123 - Centro',
      company: 'Farmácia Central Ltda',
      favorite: true,
      notes: 'Fornecedor principal de medicamentos',
      tags: ['fornecedor', 'medicamentos'],
      lastContact: '2025-10-06'
    },
    {
      id: '6',
      name: 'Laboratório Exames+',
      type: 'partner',
      phone: '(11) 4444-5678',
      email: 'agendamento@examesmais.com.br',
      address: 'Av. Principal, 456 - Sala 201',
      company: 'Laboratório Exames+ S/A',
      favorite: true,
      notes: 'Laboratório parceiro para exames',
      tags: ['laboratório', 'exames', 'parceiro'],
      lastContact: '2025-10-07'
    }
  ];

  const allContacts = contacts.length > 0 ? contacts : mockContacts;

  const filteredContacts = allContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.includes(searchTerm) ||
                         contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || contact.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emergency':
        return darkMode 
          ? 'bg-red-900/30 text-red-400 border-red-800' 
          : 'bg-red-100 text-red-700 border-red-300';
      case 'doctor':
        return darkMode 
          ? 'bg-blue-900/30 text-blue-400 border-blue-800' 
          : 'bg-blue-100 text-blue-700 border-blue-300';
      case 'supplier':
        return darkMode 
          ? 'bg-green-900/30 text-green-400 border-green-800' 
          : 'bg-green-100 text-green-700 border-green-300';
      case 'partner':
        return darkMode 
          ? 'bg-purple-900/30 text-purple-400 border-purple-800' 
          : 'bg-purple-100 text-purple-700 border-purple-300';
      case 'patient':
        return darkMode 
          ? 'bg-orange-900/30 text-orange-400 border-orange-800' 
          : 'bg-orange-100 text-orange-700 border-orange-300';
      default:
        return darkMode 
          ? 'bg-gray-700 text-gray-300 border-gray-600' 
          : 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency': return '🚨';
      case 'doctor': return '👨‍⚕️';
      case 'supplier': return '📦';
      case 'partner': return '🤝';
      case 'patient': return '👥';
      default: return '📞';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'emergency': return 'Emergência';
      case 'doctor': return 'Médico';
      case 'supplier': return 'Fornecedor';
      case 'partner': return 'Parceiro';
      case 'patient': return 'Paciente';
      default: return 'Outro';
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border-indigo-800' : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'} rounded-lg border p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Phone className={`w-8 h-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
                Agenda de Contatos
              </h2>
              <p className={`${darkMode ? 'text-indigo-400/80' : 'text-indigo-600/80'}`}>
                Gerencie contatos importantes da clínica
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Contato</span>
          </button>
        </div>
      </div>

      {/* Busca e Filtros */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Buscar contatos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
          
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-200' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">Todos os Tipos</option>
              <option value="emergency">Emergência</option>
              <option value="doctor">Médicos</option>
              <option value="supplier">Fornecedores</option>
              <option value="partner">Parceiros</option>
              <option value="patient">Pacientes</option>
              <option value="other">Outros</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contatos Favoritos */}
      {allContacts.some(c => c.favorite) && (
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-6`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            Favoritos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {allContacts.filter(c => c.favorite).map((contact) => (
              <div 
                key={contact.id}
                className={`${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'} border rounded-lg p-3`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(contact.type)}`}>
                    {getTypeIcon(contact.type)} {getTypeLabel(contact.type)}
                  </span>
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </div>
                
                <h4 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {contact.name}
                </h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {contact.phone}
                </p>
                
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => onCall(contact.phone)}
                    className="bg-green-600 text-white p-1.5 rounded hover:bg-green-700 transition-colors"
                    title="Ligar"
                  >
                    <PhoneCall className="w-3 h-3" />
                  </button>
                  {contact.phone.startsWith('(') && (
                    <button
                      onClick={() => onSendMessage(contact.phone)}
                      className="bg-blue-600 text-white p-1.5 rounded hover:bg-blue-700 transition-colors"
                      title="Enviar mensagem"
                    >
                      <MessageSquare className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista de Contatos */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Todos os Contatos ({filteredContacts.length})
          </h3>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    contact.type === 'emergency' 
                      ? darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
                      : contact.type === 'doctor'
                      ? darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                      : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {contact.type === 'doctor' || contact.type === 'patient' ? (
                      <User className="w-6 h-6" />
                    ) : (
                      <Building className="w-6 h-6" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {contact.name}
                      </h4>
                      {contact.favorite && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(contact.type)}`}>
                        {getTypeIcon(contact.type)} {getTypeLabel(contact.type)}
                      </span>
                    </div>
                    
                    <div className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <p className="flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {contact.phone}
                      </p>
                      
                      {contact.email && (
                        <p className="flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {contact.email}
                        </p>
                      )}
                      
                      {contact.company && (
                        <p className="flex items-center">
                          <Building className="w-3 h-3 mr-1" />
                          {contact.company}
                        </p>
                      )}
                      
                      {contact.specialty && (
                        <p className="flex items-center">
                          <span className="w-3 h-3 mr-1">🩺</span>
                          {contact.specialty}
                        </p>
                      )}
                      
                      {contact.address && (
                        <p className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {contact.address}
                        </p>
                      )}
                      
                      {contact.lastContact && (
                        <p className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Último contato: {new Date(contact.lastContact).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>

                    {/* Tags */}
                    {contact.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {contact.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className={`px-2 py-1 text-xs rounded-full ${
                              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Ações */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onCall(contact.phone)}
                    className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
                    title="Ligar"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </button>
                  
                  {contact.email && (
                    <button
                      className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                      title="Enviar e-mail"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  )}
                  
                  {contact.phone.startsWith('(') && (
                    <button
                      onClick={() => onSendMessage(contact.phone)}
                      className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition-colors"
                      title="Enviar mensagem"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => setSelectedContact(contact)}
                    className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition-colors"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => onDeleteContact(contact.id)}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredContacts.length === 0 && (
            <div className="p-8 text-center">
              <Phone className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Nenhum contato encontrado
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsView;