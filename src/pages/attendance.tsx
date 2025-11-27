import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import AttendanceView from "../components/AttendanceView";
import ProtectedRoute from "../components/ProtectedRoute";
import { useDarkMode } from "../hooks/useDarkMode";
import { Plus } from "lucide-react";

export default function AttendancePage() {
  const { darkMode } = useDarkMode();

  return (
    <ProtectedRoute allowedRoles={["doctor", "nurse"]}>
      <MainLayout
        title="Atendimento"
        actions={
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Iniciar Atendimento</span>
          </button>
        }
      >
        <AttendanceView darkMode={darkMode} />
      </MainLayout>
    </ProtectedRoute>
  );
}
