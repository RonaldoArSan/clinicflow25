import React, { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import TeamView from "../components/TeamView";
import ProtectedRoute from "../components/ProtectedRoute";
import { useMedicalTeam } from "../hooks/useData";
import { useDarkMode } from "../hooks/useDarkMode";
import { Plus } from "lucide-react";

export default function TeamPage() {
  const { darkMode } = useDarkMode();
  const { medicalTeam } = useMedicalTeam();
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showNewMemberModal, setShowNewMemberModal] = useState(false);

  return (
    <ProtectedRoute allowedRoles={["admin", "doctor"]}>
      <MainLayout
        title="Equipe Médica"
        actions={
          <button
            onClick={() => setShowNewMemberModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Profissional</span>
          </button>
        }
      >
        <TeamView
          darkMode={darkMode}
          medicalTeam={medicalTeam}
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
          showNewMemberModal={showNewMemberModal}
          setShowNewMemberModal={setShowNewMemberModal}
        />
      </MainLayout>
    </ProtectedRoute>
  );
}
