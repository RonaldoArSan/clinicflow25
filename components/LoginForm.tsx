import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  Shield,
  Stethoscope 
} from 'lucide-react';
import { useUserContext } from '../hooks/useUserContext';
import { MOCK_USERS } from '../types/user';

interface LoginFormProps {
  darkMode?: boolean;
  onSuccess?: () => void;
}

export function LoginForm({ darkMode = false, onSuccess }: LoginFormProps) {
  const { login } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Para desenvolvimento, vamos pré-popular com um usuário admin
  const [selectedMockUser, setSelectedMockUser] = useState('admin@clinicflow.com');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simular delay de autenticação
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Tentar fazer login com as credenciais
      const success = login(email, password);
      
      if (success) {
        onSuccess?.();
      } else {
        setError('Email ou senha incorretos. Verifique suas credenciais.');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMockUserSelect = (userEmail: string) => {
    setSelectedMockUser(userEmail);
    setEmail(userEmail);
    setPassword('123456'); // Senha padrão para desenvolvimento
    setError('');
  };

  return (
    <div className={`
      min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8
      ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}
    `}>
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className={`
            mx-auto h-16 w-16 rounded-full flex items-center justify-center
            ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}
          `}>
            <Stethoscope className="h-8 w-8 text-white" />
          </div>
          <h2 className={`
            mt-6 text-3xl font-bold
            ${darkMode ? 'text-gray-100' : 'text-gray-900'}
          `}>
            ClinicFlow25
          </h2>
          <p className={`
            mt-2 text-sm
            ${darkMode ? 'text-gray-400' : 'text-gray-600'}
          `}>
            Sistema de Gestão Clínica
          </p>
        </div>

        {/* Seletor de Usuários Mock (apenas para desenvolvimento) */}
        <div className={`
          rounded-lg p-4 border-2 border-dashed
          ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-50'}
        `}>
          <h3 className={`
            text-sm font-medium mb-3
            ${darkMode ? 'text-gray-300' : 'text-gray-700'}
          `}>
            Usuários de Teste (Desenvolvimento):
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {MOCK_USERS.map((user) => (
              <button
                key={user.email}
                onClick={() => handleMockUserSelect(user.email)}
                className={`
                  p-2 rounded text-xs transition-colors text-left
                  ${selectedMockUser === user.email
                    ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                    : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100')
                  }
                `}
              >
                <div className="font-medium">{user.name.split(' ')[0]}</div>
                <div className="opacity-75">{user.role}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className={`
                block text-sm font-medium mb-1
                ${darkMode ? 'text-gray-300' : 'text-gray-700'}
              `}>
                Email
              </label>
              <div className="relative">
                <div className={`
                  absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
                  ${darkMode ? 'text-gray-500' : 'text-gray-400'}
                `}>
                  <User className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`
                    appearance-none rounded-lg relative block w-full px-3 py-2 pl-10
                    border placeholder-gray-500 text-gray-900 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm
                    ${darkMode 
                      ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400' 
                      : 'bg-white border-gray-300'
                    }
                  `}
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className={`
                block text-sm font-medium mb-1
                ${darkMode ? 'text-gray-300' : 'text-gray-700'}
              `}>
                Senha
              </label>
              <div className="relative">
                <div className={`
                  absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
                  ${darkMode ? 'text-gray-500' : 'text-gray-400'}
                `}>
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`
                    appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 pr-10
                    border placeholder-gray-500 text-gray-900 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm
                    ${darkMode 
                      ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400' 
                      : 'bg-white border-gray-300'
                    }
                  `}
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  className={`
                    absolute inset-y-0 right-0 pr-3 flex items-center
                    ${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-500'}
                  `}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className={`
              rounded-md p-4 border
              ${darkMode 
                ? 'bg-red-900 bg-opacity-20 border-red-800 text-red-400' 
                : 'bg-red-50 border-red-200 text-red-600'
              }
            `}>
              <div className="flex">
                <Shield className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`
                group relative w-full flex justify-center py-2 px-4 border border-transparent 
                text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-blue-500 transition-colors
                ${isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                }
              `}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Entrando...
                </div>
              ) : (
                <div className="flex items-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Entrar no Sistema
                </div>
              )}
            </button>
          </div>

          {/* Development Info */}
          <div className={`
            text-xs text-center p-3 rounded-lg
            ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}
          `}>
            <p>Versão de Desenvolvimento</p>
            <p>Senha padrão para todos os usuários: <code className="font-mono">123456</code></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;