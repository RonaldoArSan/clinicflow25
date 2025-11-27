import React, { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import PatientsView from "../components/PatientsView";
import ProtectedRoute from "../components/ProtectedRoute";
import { usePatients } from "../hooks/useData";
import { useDarkMode } from "../hooks/useDarkMode";
import { Plus } from "lucide-react";
import Modal from "../components/Modal";
import NewPatientForm from "../components/NewPatientForm";
import ToastContainer from "../components/common/ToastContainer";

export default function PatientsPage() {
  const { darkMode } = useDarkMode();
  const { patients, setPatients } = usePatients();
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);

  const handleCreatePatient = (newPatientData: any) => {
    const newPatient = {
      ...newPatientData,
      id: patients.length + 1, // Simple ID generation
    };

    setPatients((prev) => [...prev, newPatient]);
    setShowNewPatientModal(false);

    // Show success toast
    if ((window as any).showToast) {
      (window as any).showToast({
        type: "success",
        title: "Paciente Cadastrado",
        message: `${newPatient.name} foi cadastrado com sucesso.`,
      });
    }
  };

  return (
    <ProtectedRoute>
      <MainLayout
        title="Pacientes"
        actions={
          <button
            onClick={() => setShowNewPatientModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Paciente</span>
          </button>
        }
      >
        <PatientsView
          darkMode={darkMode}
          patients={patients}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
        />

        <Modal
          isOpen={showNewPatientModal}
          onClose={() => setShowNewPatientModal(false)}
          title="Novo Paciente"
          size="xl"
          darkMode={darkMode}
        >
          <NewPatientForm
            darkMode={darkMode}
            onCancel={() => setShowNewPatientModal(false)}
            onSubmit={handleCreatePatient}
          />
        </Modal>

        <ToastContainer darkMode={darkMode} />
      </MainLayout>
    </ProtectedRoute>
  );
}
