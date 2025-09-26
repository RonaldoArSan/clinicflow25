import React, { useState, useEffect } from 'react';
import UserHeader from './UserHeader';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setDarkMode(JSON.parse(saved));
    }
    
    // Escutar mudanças no localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'darkMode' && e.newValue) {
        setDarkMode(JSON.parse(e.newValue));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem('darkMode', JSON.stringify(newValue));
    // Disparar evento customizado para sincronizar com outras abas/componentes
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'darkMode',
      newValue: JSON.stringify(newValue)
    }));
  };
  
  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <UserHeader darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}