import React, { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import MedicalRecordsView from "../components/MedicalRecordsView";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  useMedicalRecords,
  usePatients,
  useMedicalTeam,
} from "../hooks/useData";
import { useDarkMode } from "../hooks/useDarkMode";
import { Plus } from "lucide-react";

export default function RecordsPage() {
  const { darkMode } = useDarkMode();
  const { medicalRecords } = useMedicalRecords();
  const { patients } = usePatients();
  const { medicalTeam } = useMedicalTeam();

  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showNewRecordModal, setShowNewRecordModal] = useState(false);

  return (
    <ProtectedRoute allowedRoles={["doctor", "nurse", "admin"]}>
      <MainLayout
        title="Prontuários Médicos"
        actions={
          <button
            onClick={() => setShowNewRecordModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Prontuário</span>
          </button>
        }
      >
        <MedicalRecordsView
          darkMode={darkMode}
          medicalRecords={medicalRecords}
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
          showNewRecordModal={showNewRecordModal}
          setShowNewRecordModal={setShowNewRecordModal}
          patients={patients}
          medicalTeam={medicalTeam}
        />
      </MainLayout>
    </ProtectedRoute>
  );
}
