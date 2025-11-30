import React, { ReactNode } from "react";
import { useDarkMode } from "../../hooks/useDarkMode";
import UserHeader from "../UserHeader";

interface ReceptionLayoutProps {
  children: ReactNode;
  title?: string;
  actions?: ReactNode;
}

export default function ReceptionLayout({
  children,
  title,
  actions,
}: ReceptionLayoutProps) {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <UserHeader darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      <main className="flex-1 transition-all duration-300">
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
  );
}
