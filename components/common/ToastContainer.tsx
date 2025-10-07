import React, { useEffect, useState } from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  X,
  Bell
} from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
  darkMode: boolean;
}

const ToastComponent: React.FC<ToastProps> = ({ toast, onRemove, darkMode }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animação de entrada
    setIsVisible(true);
    
    // Auto-remove após duração especificada
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onRemove(toast.id), 300); // Delay para animação de saída
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast, onRemove]);

  const getToastStyles = () => {
    const baseStyles = "transform transition-all duration-300 ease-in-out";
    
    if (!isVisible) {
      return `${baseStyles} translate-x-full opacity-0`;
    }
    
    return `${baseStyles} translate-x-0 opacity-100`;
  };

  const getToastColors = () => {
    if (darkMode) {
      switch (toast.type) {
        case 'success':
          return 'bg-green-900/90 border-green-800 text-green-200';
        case 'error':
          return 'bg-red-900/90 border-red-800 text-red-200';
        case 'warning':
          return 'bg-yellow-900/90 border-yellow-800 text-yellow-200';
        case 'info':
          return 'bg-blue-900/90 border-blue-800 text-blue-200';
        default:
          return 'bg-gray-800/90 border-gray-700 text-gray-200';
      }
    } else {
      switch (toast.type) {
        case 'success':
          return 'bg-green-50 border-green-200 text-green-800';
        case 'error':
          return 'bg-red-50 border-red-200 text-red-800';
        case 'warning':
          return 'bg-yellow-50 border-yellow-200 text-yellow-800';
        case 'info':
          return 'bg-blue-50 border-blue-200 text-blue-800';
        default:
          return 'bg-white border-gray-200 text-gray-800';
      }
    }
  };

  const getIcon = () => {
    const iconClass = "w-5 h-5";
    switch (toast.type) {
      case 'success':
        return <CheckCircle className={iconClass} />;
      case 'error':
        return <AlertCircle className={iconClass} />;
      case 'warning':
        return <AlertCircle className={iconClass} />;
      case 'info':
        return <Info className={iconClass} />;
      default:
        return <Bell className={iconClass} />;
    }
  };

  return (
    <div className={`${getToastStyles()} w-96 max-w-sm`}>
      <div className={`${getToastColors()} border rounded-lg shadow-lg p-4 backdrop-blur-sm`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">
              {toast.title}
            </p>
            {toast.message && (
              <p className="mt-1 text-sm opacity-90">
                {toast.message}
              </p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={() => onRemove(toast.id)}
              className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ToastContainerProps {
  darkMode: boolean;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ darkMode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const newToast: Toast = {
      ...toast,
      id: Date.now().toString()
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Expor função globalmente para uso em outros componentes
  React.useEffect(() => {
    (window as any).showToast = addToast;
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <ToastComponent
          key={toast.id}
          toast={toast}
          onRemove={removeToast}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};

export default ToastContainer;