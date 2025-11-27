import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import Dashboard from "../components/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import { useUserContext } from "../hooks/useUserContext";
import { useAnalytics, useAppointments, usePatients } from "../hooks/useData";
import { useDarkMode } from "../hooks/useDarkMode";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  const { darkMode } = useDarkMode();
  const { analytics } = useAnalytics();
  const { appointments } = useAppointments();
  const { patients } = usePatients();
  const { currentUser } = useUserContext();

  // Redirect receptionists to reception dashboard?
  // This logic was in index.tsx, but now we can handle it via routing or just show different content.
  // For now, let's just render the Dashboard component.

  return (
    <ProtectedRoute>
      <MainLayout
        title="Dashboard Clínico"
        actions={
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Relatório Mensal</span>
          </button>
        }
      >
        <Dashboard
          darkMode={darkMode}
          analytics={analytics}
          appointments={appointments}
          patients={patients}
        />
      </MainLayout>
    </ProtectedRoute>
  );
}
