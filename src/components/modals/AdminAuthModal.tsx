import React, { useState } from "react";
import { Shield, Lock, X, AlertTriangle } from "lucide-react";

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  darkMode: boolean;
}

const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  darkMode,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate against a secure backend endpoint
    // For this prototype, we'll use a hardcoded check or simulate it
    if (password === "admin123") {
      onConfirm();
      setPassword("");
      setError("");
      onClose();
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={`w-full max-w-md p-6 rounded-xl shadow-2xl transform transition-all scale-100 ${
          darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${
                darkMode ? "bg-red-900/30" : "bg-red-100"
              }`}
            >
              <Shield
                className={`w-6 h-6 ${
                  darkMode ? "text-red-400" : "text-red-600"
                }`}
              />
            </div>
            <h3
              className={`text-xl font-bold ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Autorização Necessária
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-full hover:bg-gray-200/20 transition-colors ${
              darkMode
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          className={`mb-6 p-4 rounded-lg border ${
            darkMode
              ? "bg-yellow-900/20 border-yellow-800/50"
              : "bg-yellow-50 border-yellow-200"
          }`}
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle
              className={`w-5 h-5 mt-0.5 ${
                darkMode ? "text-yellow-500" : "text-yellow-600"
              }`}
            />
            <p
              className={`text-sm ${
                darkMode ? "text-yellow-200" : "text-yellow-800"
              }`}
            >
              Esta ação requer privilégios de administrador. Por favor, insira a
              senha administrativa para continuar.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-1.5 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Senha do Administrador
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                }`}
                placeholder="Digite a senha..."
                autoFocus
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500 animate-pulse">{error}</p>
            )}
          </div>

          <div className="flex space-x-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAuthModal;
