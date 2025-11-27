import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import AnalyticsView from "../components/AnalyticsView";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAnalytics } from "../hooks/useData";
import { useDarkMode } from "../hooks/useDarkMode";
import { Plus } from "lucide-react";

export default function AnalyticsPage() {
  const { darkMode } = useDarkMode();
  const { analytics } = useAnalytics();

  return (
    <ProtectedRoute allowedRoles={["admin", "doctor"]}>
      <MainLayout
        title="Relatórios e Análises"
        actions={
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Novo Relatório</span>
          </button>
        }
      >
        <AnalyticsView darkMode={darkMode} analytics={analytics} />
      </MainLayout>
    </ProtectedRoute>
  );
}
