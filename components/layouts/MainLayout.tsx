import React from 'react';
import { Menu } from 'lucide-react';
import UserHeader from '../UserHeader';
import ModuleNavigation, { ModuleType } from '../navigation/ModuleNavigation';
import Sidebar from '../navigation/Sidebar';
import { useSidebar } from '../../hooks/useSidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  currentModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
  currentView: string;
  onViewChange: (view: string) => void;
  showModuleNavigation?: boolean;
  showSidebar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  darkMode,
  onToggleDarkMode,
  currentModule,
  onModuleChange,
  currentView,
  onViewChange,
  showModuleNavigation = true,
  showSidebar = true
}) => {
  const { 
    isCollapsed, 
    isMobileOpen, 
    isMobile, 
    toggleCollapse, 
    openMobile, 
    closeMobile, 
    toggleMobile 
  } = useSidebar();

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* User Header */}
      <UserHeader 
        darkMode={darkMode} 
        onToggleDarkMode={onToggleDarkMode}
      />
      
      {/* Mobile Menu Button */}
      {isMobile && showSidebar && (
        <div className="lg:hidden px-4 py-2 flex justify-between items-center">
          <button
            onClick={toggleMobile}
            className={`p-2 ${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"} transition-colors`}
          >
            <Menu className="w-6 h-6" />
            <span className="sr-only">Abrir menu</span>
          </button>
        </div>
      )}
      
      <div className="flex">
        {/* Sidebar */}
        {showSidebar && (
          <Sidebar
            darkMode={darkMode}
            currentView={currentView}
            onViewChange={onViewChange}
            isCollapsed={isCollapsed}
            onToggleCollapse={toggleCollapse}
            isMobile={isMobile}
            isOpen={isMobileOpen}
            onClose={closeMobile}
          />
        )}

        {/* Main Content */}
        <main className={`
          flex-1 transition-all duration-300
          ${showSidebar ? (
            isCollapsed ? 'lg:ml-16' : 'lg:ml-72'
          ) : ''}
        `}>
          {/* Navegação Modular */}
          {showModuleNavigation && (
            <ModuleNavigation
              currentModule={currentModule}
              onModuleChange={onModuleChange}
              darkMode={darkMode}
            />
          )}
          
          {/* Content Area com padding otimizado */}
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="space-y-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;