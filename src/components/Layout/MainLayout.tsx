import React, { useState, ReactNode } from "react";
import { useDarkMode } from "../../hooks/useDarkMode";
import Sidebar from "../navigation/Sidebar";
import UserHeader from "../UserHeader";
import { Menu } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  actions?: ReactNode;
}

export default function MainLayout({
  children,
  title,
  actions,
}: MainLayoutProps) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <UserHeader darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      {/* Mobile Menu Button */}
      <div className="md:hidden px-4 py-2 flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 ${
            darkMode
              ? "text-gray-400 hover:text-gray-200"
              : "text-gray-600 hover:text-gray-900"
          } transition-colors`}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Sidebar Toggle */}
      <div className="hidden md:block px-4 py-2">
        {/* Toggle button is inside Sidebar header in the new design or handled here? 
             In the original code, there was a toggle button outside. 
             But Sidebar component has a toggle button inside its header if onToggleCollapse is provided.
             Let's rely on Sidebar's internal toggle if passed.
         */}
      </div>

      <div className="flex">
        <Sidebar
          darkMode={darkMode}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? "md:ml-16" : "md:ml-64"
          }`}
        >
          <div className="p-6 max-w-7xl mx-auto">
            <div className="space-y-6">
              {(title || actions) && (
                <div className="flex items-center justify-between">
                  {title && (
                    <h1
                      className={`text-2xl font-bold ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {title}
                    </h1>
                  )}
                  {actions && <div>{actions}</div>}
                </div>
              )}
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
