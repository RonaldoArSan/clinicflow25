import React, { useState } from 'react';
import { Search, Phone, Mail, MapPin, Clock, User, Building } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  role: string;
  phone: string;
  email?: string;
  department?: string;
  available?: boolean;
}

interface ReceptionContactsProps {
  darkMode?: boolean;
}

const ReceptionContacts: React.FC<ReceptionContactsProps> = ({ darkMode = false }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock contacts data
  const contacts: Contact[] = [
    {
      id: 1,
      name: 'Dra. Ana Paula Silva',
      role: 'Cardiologista',
      phone: '(11) 99999-2222',
      email: 'ana.paula@clinica.com.br',
      department: 'Cardiologia',
      available: true
    },
    {
      id: 2,
      name: 'Dr. João Silva',
      role: 'Clínico Geral',
      phone: '(11) 99999-1111',
      email: 'joao.silva@clinica.com.br',
      department: 'Clínica Geral',
      available: true
    },
    {
      id: 3,
      name: 'Enf. Maria Santos',
      role: 'Enfermeira',
      phone: '(11) 99999-3333',
      email: 'maria.santos@clinica.com.br',
      department: 'Enfermagem',
      available: false
    },
    {
      id: 4,
      name: 'Farmácia',
      role: 'Setor',
      phone: '(11) 3333-4444',
      department: 'Farmácia',
      available: true
    },
    {
      id: 5,
      name: 'Laboratório',
      role: 'Setor',
      phone: '(11) 3333-5555',
      department: 'Laboratório',
      available: true
    },
    {
      id: 6,
      name: 'Emergência',
      role: 'Setor',
      phone: '192',
      department: 'Emergência',
      available: true
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm) ||
    (contact.department && contact.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-lg shadow p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
          Contatos
        </h2>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            darkMode ? "text-gray-500" : "text-gray-400"
          }`} />
          <input
            type="text"
            placeholder="Buscar contato..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
              darkMode 
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-blue-500" 
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          />
        </div>

        <p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          {filteredContacts.length} contatos encontrados
        </p>
      </div>

      {/* Emergency Contacts */}
      <div className={`rounded-lg shadow p-6 ${
        darkMode ? "bg-red-900/20 border border-red-700/30" : "bg-red-50 border border-red-200"
      }`}>
        <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
          darkMode ? "text-red-400" : "text-red-700"
        }`}>
          <Phone className="w-5 h-5" />
          Contatos de Emergência
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${
            darkMode ? "bg-gray-800/50" : "bg-white"
          }`}>
            <p className={`text-sm mb-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              SAMU
            </p>
            <p className={`text-xl font-bold ${darkMode ? "text-red-400" : "text-red-600"}`}>
              192
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${
            darkMode ? "bg-gray-800/50" : "bg-white"
          }`}>
            <p className={`text-sm mb-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Bombeiros
            </p>
            <p className={`text-xl font-bold ${darkMode ? "text-red-400" : "text-red-600"}`}>
              193
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${
            darkMode ? "bg-gray-800/50" : "bg-white"
          }`}>
            <p className={`text-sm mb-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Polícia
            </p>
            <p className={`text-xl font-bold ${darkMode ? "text-red-400" : "text-red-600"}`}>
              190
            </p>
          </div>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContacts.map((contact) => (
          <div 
            key={contact.id}
            className={`rounded-lg shadow p-5 transition-all hover:scale-[1.02] ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 p-3 rounded-full ${
                darkMode ? "bg-blue-900/30" : "bg-blue-50"
              }`}>
                {contact.role === 'Setor' ? (
                  <Building className={`w-6 h-6 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`} />
                ) : (
                  <User className={`w-6 h-6 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`} />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className={`font-bold text-lg ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}>
                      {contact.name}
                    </h3>
                    <p className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {contact.role}
                    </p>
                  </div>
                  
                  {contact.available !== undefined && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      contact.available
                        ? (darkMode ? "bg-green-900/30 text-green-400" : "bg-green-50 text-green-600")
                        : (darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-600")
                    }`}>
                      {contact.available ? 'Disponível' : 'Ocupado'}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <a 
                    href={`tel:${contact.phone}`}
                    className={`flex items-center gap-2 text-sm hover:underline ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    {contact.phone}
                  </a>
                  
                  {contact.email && (
                    <a 
                      href={`mailto:${contact.email}`}
                      className={`flex items-center gap-2 text-sm hover:underline ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      {contact.email}
                    </a>
                  )}
                  
                  {contact.department && (
                    <div className={`flex items-center gap-2 text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                      <Building className="w-4 h-4" />
                      {contact.department}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceptionContacts;
