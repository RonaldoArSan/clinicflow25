import React from 'react';

interface BaseLayoutProps {
  children: React.ReactNode;
  darkMode?: boolean;
  className?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ 
  children, 
  darkMode = false, 
  className = "" 
}) => {
  return (
    <div className={`
      min-h-screen transition-colors
      ${darkMode ? "bg-gray-900" : "bg-gray-50"}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default BaseLayout;