import React, { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import ProceduresView from "../components/ProceduresView";
import ProtectedRoute from "../components/ProtectedRoute";
import { useProcedures } from "../hooks/useData";
import { useDarkMode } from "../hooks/useDarkMode";
import { Plus } from "lucide-react";

export default function ProceduresPage() {
  const { darkMode } = useDarkMode();
  const { procedures } = useProcedures();
  const [selectedProcedure, setSelectedProcedure] = useState<any>(null);
  const [showNewProcedureModal, setShowNewProcedureModal] = useState(false);

  return (
    <ProtectedRoute allowedRoles={["doctor", "nurse", "admin"]}>
      <MainLayout
        title="Procedimentos e Exames"
        actions={
          <button
            onClick={() => setShowNewProcedureModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Procedimento</span>
          </button>
        }
      >
        <ProceduresView
          darkMode={darkMode}
          procedures={procedures}
          selectedProcedure={selectedProcedure}
          setSelectedProcedure={setSelectedProcedure}
          showNewProcedureModal={showNewProcedureModal}
          setShowNewProcedureModal={setShowNewProcedureModal}
        />
      </MainLayout>
    </ProtectedRoute>
  );
}
