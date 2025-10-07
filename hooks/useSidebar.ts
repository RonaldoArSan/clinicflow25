import { useState, useEffect } from 'react';

interface UseSidebarReturn {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  isMobile: boolean;
  toggleCollapse: () => void;
  openMobile: () => void;
  closeMobile: () => void;
  toggleMobile: () => void;
}

export const useSidebar = (): UseSidebarReturn => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      
      // Auto-collapse em telas pequenas
      if (window.innerWidth < 1024) {
        setIsCollapsed(false); // Em mobile, sempre expandido quando aberto
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Recuperar estado do localStorage (apenas para desktop)
  useEffect(() => {
    if (!isMobile) {
      const savedState = localStorage.getItem('sidebar-collapsed');
      if (savedState) {
        setIsCollapsed(JSON.parse(savedState));
      }
    }
  }, [isMobile]);

  // Salvar estado no localStorage (apenas para desktop)
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
    }
  }, [isCollapsed, isMobile]);

  const toggleCollapse = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const openMobile = () => {
    setIsMobileOpen(true);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return {
    isCollapsed: isMobile ? false : isCollapsed,
    isMobileOpen,
    isMobile,
    toggleCollapse,
    openMobile,
    closeMobile,
    toggleMobile
  };
};