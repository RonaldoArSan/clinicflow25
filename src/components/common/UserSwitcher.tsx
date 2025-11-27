import React, { useState } from 'react';
import { User, ChevronDown, UserCheck } from 'lucide-react';
import { useUserContext } from '../../hooks/useUserContext';

interface UserSwitcherProps {
  darkMode: boolean;
}

const UserSwitcher: React.FC<UserSwitcherProps> = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, getAllUsers, switchUser } = useUserContext();
  const users = getAllUsers();

  if (!currentUser) return null;

  const handleUserSwitch = (userId: string) => {
    switchUser(userId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
          darkMode 
            ? "bg-gray-700 hover:bg-gray-600 text-gray-200" 
            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        }`}
      >
        <User className="w-4 h-4" />
        <span className="text-sm font-medium">{currentUser.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-1 right-0 w-64 rounded-lg shadow-lg border z-50 ${
          darkMode 
            ? "bg-gray-800 border-gray-700" 
            : "bg-white border-gray-200"
        }`}>
          <div className={`p-2 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <p className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Trocar Usuário (Desenvolvimento)
            </p>
          </div>
          <div className="p-1">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => handleUserSwitch(user.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded text-left transition-colors ${
                  user.id === currentUser.id
                    ? darkMode 
                      ? "bg-blue-900/30 text-blue-400" 
                      : "bg-blue-100 text-blue-700"
                    : darkMode 
                      ? "hover:bg-gray-700 text-gray-200" 
                      : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  user.role === 'admin' ? (darkMode ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-700") :
                  user.role === 'doctor' ? (darkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700") :
                  user.role === 'nurse' ? (darkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700") :
                  user.role === 'receptionist' ? (darkMode ? "bg-orange-900/30 text-orange-400" : "bg-orange-100 text-orange-700") :
                  (darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-600")
                }`}>
                  {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user.name}
                  </p>
                  <p className={`text-xs truncate ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {user.role === 'admin' ? '👑 Administrador' :
                     user.role === 'doctor' ? '👨‍⚕️ Médico' :
                     user.role === 'nurse' ? '👩‍⚕️ Enfermeiro' :
                     user.role === 'receptionist' ? '🏥 Recepcionista' :
                     '👁️ Visualizador'} • {user.specialty || user.department || 'Geral'}
                  </p>
                </div>
                {user.id === currentUser.id && (
                  <UserCheck className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay para fechar o dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default UserSwitcher;