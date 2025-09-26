import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  darkMode?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'lg',
  darkMode = false 
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg', 
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto transition-colors`}>
        <div className={`flex items-center justify-between p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <h2 className={`text-xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className={`${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} transition-colors`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;