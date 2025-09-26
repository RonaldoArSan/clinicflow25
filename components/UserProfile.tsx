import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Camera,
  Save,
  X,
  Edit2,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Clock,
  Badge
} from 'lucide-react';
import { useUserContext } from '../hooks/useUserContext';
import { UserRole } from '../types/user';

interface UserProfileProps {
  darkMode?: boolean;
  onClose?: () => void;
}

function UserAvatar({ user, size = 'xl', editable = false, onEdit }: { 
  user: any, 
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl', 
  editable?: boolean,
  onEdit?: () => void 
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
    '2xl': 'w-32 h-32 text-3xl'
  };

  const initials = user.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative">
      <div className={`
        ${sizeClasses[size]}
        rounded-full bg-gradient-to-br from-blue-500 to-purple-600
        flex items-center justify-center text-white font-bold
        shadow-lg relative overflow-hidden
      `}>
        {user.avatar ? (
          <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          initials
        )}
      </div>
      
      {editable && (
        <button
          onClick={onEdit}
          className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
          title="Alterar foto"
        >
          <Camera className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

function RoleBadge({ role, darkMode }: { role: UserRole, darkMode: boolean }) {
  const getRoleConfig = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return {
          label: 'Administrador',
          color: 'from-red-500 to-pink-600',
          icon: Shield
        };
      case 'doctor':
        return {
          label: 'Médico',
          color: 'from-blue-500 to-blue-600',
          icon: Badge
        };
      case 'nurse':
        return {
          label: 'Enfermeiro(a)',
          color: 'from-green-500 to-green-600',
          icon: Badge
        };
      case 'receptionist':
        return {
          label: 'Recepcionista',
          color: 'from-purple-500 to-purple-600',
          icon: User
        };
      case 'viewer':
        return {
          label: 'Visualizador',
          color: 'from-gray-500 to-gray-600',
          icon: Eye
        };
      default:
        return {
          label: 'Usuário',
          color: 'from-gray-400 to-gray-500',
          icon: User
        };
    }
  };

  const config = getRoleConfig(role);
  const IconComponent = config.icon;

  return (
    <span className={`
      inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
      bg-gradient-to-r ${config.color} text-white shadow-sm
    `}>
      <IconComponent className="w-4 h-4 mr-2" />
      {config.label}
    </span>
  );
}

export function UserProfile({ darkMode = false, onClose }: UserProfileProps) {
  const { currentUser, updateUser } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: '',
    birthDate: '',
    department: currentUser?.department || '',
    specialty: currentUser?.specialty || '',
    crm: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aqui você implementaria a lógica real de atualização
      // await updateUser(formData);
      
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
      setIsEditing(false);
      
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao atualizar perfil. Tente novamente.' });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'As senhas não coincidem.' });
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'A nova senha deve ter pelo menos 6 caracteres.' });
      return;
    }

    setSaving(true);
    try {
      // Simular atualização de senha
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Senha alterada com sucesso!' });
      setShowPasswordForm(false);
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao alterar senha. Verifique a senha atual.' });
    } finally {
      setSaving(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`
        w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl
        ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}
      `}>
        {/* Header */}
        <div className={`
          flex items-center justify-between px-6 py-4 border-b
          ${darkMode ? 'border-gray-700' : 'border-gray-200'}
        `}>
          <h2 className="text-xl font-bold flex items-center">
            <User className="w-5 h-5 mr-2" />
            Meu Perfil
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mensagem de Status */}
        {message && (
          <div className={`mx-6 mt-4 p-3 rounded-lg flex items-center ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-4 h-4 mr-2" />
            ) : (
              <AlertCircle className="w-4 h-4 mr-2" />
            )}
            {message.text}
          </div>
        )}

        <div className="p-6 space-y-6">
          {/* Seção do Avatar e Informações Básicas */}
          <div className={`
            p-6 rounded-lg border
            ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}
          `}>
            <div className="flex items-start space-x-6">
              <UserAvatar 
                user={currentUser} 
                size="2xl" 
                editable={isEditing}
                onEdit={() => {
                  // Implementar seleção de foto
                  console.log('Editar foto');
                }}
              />
              
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{currentUser.name}</h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <RoleBadge role={currentUser.role} darkMode={darkMode} />
                    <span className={`
                      inline-flex items-center px-3 py-1 rounded-full text-sm
                      ${darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'}
                    `}>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Ativo
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span>{currentUser.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span>{currentUser.phone || 'Não informado'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span>Membro desde: Janeiro 2025</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span>Último acesso: Hoje às 14:30</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                    ${isEditing 
                      ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }
                  `}
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4" />
                      <span>Cancelar</span>
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4" />
                      <span>Editar</span>
                    </>
                  )}
                </button>

                {isEditing && (
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Salvando...' : 'Salvar'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Formulário de Informações Pessoais */}
          <div className={`
            p-6 rounded-lg border
            ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}
          `}>
            <h4 className="text-lg font-semibold mb-4">Informações Pessoais</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  className={`
                    w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isEditing 
                      ? darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100' 
                        : 'bg-white border-gray-300 text-gray-900'
                      : darkMode 
                        ? 'bg-gray-800 border-gray-700 text-gray-300' 
                        : 'bg-gray-100 border-gray-200 text-gray-600'
                    }
                    ${!isEditing ? 'cursor-not-allowed' : ''}
                  `}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  E-mail *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className={`
                    w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isEditing 
                      ? darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100' 
                        : 'bg-white border-gray-300 text-gray-900'
                      : darkMode 
                        ? 'bg-gray-800 border-gray-700 text-gray-300' 
                        : 'bg-gray-100 border-gray-200 text-gray-600'
                    }
                    ${!isEditing ? 'cursor-not-allowed' : ''}
                  `}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Telefone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  placeholder="(11) 99999-9999"
                  className={`
                    w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isEditing 
                      ? darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100' 
                        : 'bg-white border-gray-300 text-gray-900'
                      : darkMode 
                        ? 'bg-gray-800 border-gray-700 text-gray-300' 
                        : 'bg-gray-100 border-gray-200 text-gray-600'
                    }
                    ${!isEditing ? 'cursor-not-allowed' : ''}
                  `}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  disabled={!isEditing}
                  className={`
                    w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isEditing 
                      ? darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100' 
                        : 'bg-white border-gray-300 text-gray-900'
                      : darkMode 
                        ? 'bg-gray-800 border-gray-700 text-gray-300' 
                        : 'bg-gray-100 border-gray-200 text-gray-600'
                    }
                    ${!isEditing ? 'cursor-not-allowed' : ''}
                  `}
                />
              </div>

              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Endereço
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Rua, número, bairro, cidade, CEP"
                  className={`
                    w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isEditing 
                      ? darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100' 
                        : 'bg-white border-gray-300 text-gray-900'
                      : darkMode 
                        ? 'bg-gray-800 border-gray-700 text-gray-300' 
                        : 'bg-gray-100 border-gray-200 text-gray-600'
                    }
                    ${!isEditing ? 'cursor-not-allowed' : ''}
                  `}
                />
              </div>
            </div>
          </div>

          {/* Informações Profissionais */}
          <div className={`
            p-6 rounded-lg border
            ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}
          `}>
            <h4 className="text-lg font-semibold mb-4">Informações Profissionais</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Departamento
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Ex: Cardiologia, Pediatria..."
                  className={`
                    w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isEditing 
                      ? darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100' 
                        : 'bg-white border-gray-300 text-gray-900'
                      : darkMode 
                        ? 'bg-gray-800 border-gray-700 text-gray-300' 
                        : 'bg-gray-100 border-gray-200 text-gray-600'
                    }
                    ${!isEditing ? 'cursor-not-allowed' : ''}
                  `}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Especialidade
                </label>
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={(e) => handleInputChange('specialty', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Ex: Cardiologista, Pediatra..."
                  className={`
                    w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isEditing 
                      ? darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100' 
                        : 'bg-white border-gray-300 text-gray-900'
                      : darkMode 
                        ? 'bg-gray-800 border-gray-700 text-gray-300' 
                        : 'bg-gray-100 border-gray-200 text-gray-600'
                    }
                    ${!isEditing ? 'cursor-not-allowed' : ''}
                  `}
                />
              </div>

              {currentUser.role === 'doctor' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    CRM
                  </label>
                  <input
                    type="text"
                    value={formData.crm}
                    onChange={(e) => handleInputChange('crm', e.target.value)}
                    disabled={!isEditing}
                    placeholder="12345/SP"
                    className={`
                      w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${isEditing 
                        ? darkMode 
                          ? 'bg-gray-600 border-gray-500 text-gray-100' 
                          : 'bg-white border-gray-300 text-gray-900'
                        : darkMode 
                          ? 'bg-gray-800 border-gray-700 text-gray-300' 
                          : 'bg-gray-100 border-gray-200 text-gray-600'
                      }
                      ${!isEditing ? 'cursor-not-allowed' : ''}
                    `}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Seção de Segurança */}
          <div className={`
            p-6 rounded-lg border
            ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}
          `}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Segurança</h4>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
              >
                <Lock className="w-4 h-4" />
                <span>Alterar Senha</span>
              </button>
            </div>

            {showPasswordForm && (
              <div className="space-y-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Senha Atual *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                      className={`
                        w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${darkMode 
                          ? 'bg-gray-600 border-gray-500 text-gray-100' 
                          : 'bg-white border-gray-300 text-gray-900'
                        }
                      `}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Nova Senha *
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      className={`
                        w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${darkMode 
                          ? 'bg-gray-600 border-gray-500 text-gray-100' 
                          : 'bg-white border-gray-300 text-gray-900'
                        }
                      `}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Confirmar Nova Senha *
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`
                      w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100' 
                        : 'bg-white border-gray-300 text-gray-900'
                      }
                    `}
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handlePasswordChange}
                    disabled={saving || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Alterando...' : 'Alterar Senha'}
                  </button>
                  <button
                    onClick={() => setShowPasswordForm(false)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      darkMode 
                        ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;