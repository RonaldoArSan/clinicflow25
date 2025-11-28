import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import SettingsView from "../components/SettingsView";
import ProtectedRoute from "../components/ProtectedRoute";
import { useDarkMode } from "../hooks/useDarkMode";

export default function SettingsPage() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <ProtectedRoute allowedRoles={["admin", "doctor", "nurse", "receptionist"]}>
      <MainLayout title="Configurações da Clínica">
        <SettingsView darkMode={darkMode} setDarkMode={toggleDarkMode} />
      </MainLayout>
    </ProtectedRoute>
  );
}
