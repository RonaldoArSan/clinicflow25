import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import AIInsightsPanel from "../components/AIInsightsPanel";
import ProtectedRoute from "../components/ProtectedRoute";
import { useDarkMode } from "../hooks/useDarkMode";
import { Plus } from "lucide-react";

export default function AIInsightsPage() {
  const { darkMode } = useDarkMode();

  return (
    <ProtectedRoute allowedRoles={["admin", "doctor"]}>
      <MainLayout
        title="Insights e Análise da IA"
        actions={
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Atualizar Insights</span>
          </button>
        }
      >
        <AIInsightsPanel darkMode={darkMode} />
      </MainLayout>
    </ProtectedRoute>
  );
}
