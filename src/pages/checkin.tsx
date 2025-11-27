import React, { useState } from "react";
import dynamic from "next/dynamic";
import MainLayout from "../components/Layout/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAppointments, usePatients } from "../hooks/useData";
import { useDarkMode } from "../hooks/useDarkMode";
import { Plus } from "lucide-react";

const CheckinView = dynamic(
  () => import("../components/reception/CheckinView"),
  { ssr: false }
);
const PatientSearchModal = dynamic(
  () => import("../components/reception/PatientSearchModal"),
  { ssr: false }
);

export default function CheckinPage() {
  const { darkMode } = useDarkMode();
  const { appointments } = useAppointments();
  const { patients } = usePatients();
  const [showPatientSearchModal, setShowPatientSearchModal] = useState(false);

  return (
    <ProtectedRoute allowedRoles={["receptionist", "admin"]}>
      <MainLayout
        title="Check-in de Pacientes"
        actions={
          <button
            onClick={() => setShowPatientSearchModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Paciente</span>
          </button>
        }
      >
        <CheckinView
          darkMode={darkMode}
          appointments={appointments}
          patients={patients}
          onCheckIn={(patientId, appointmentId) => {
            console.log("Check-in realizado:", { patientId, appointmentId });
          }}
        />

        <PatientSearchModal
          darkMode={darkMode}
          patients={patients}
          isOpen={showPatientSearchModal}
          onClose={() => setShowPatientSearchModal(false)}
          onSelectPatient={(patient) => {
            console.log("Paciente selecionado:", patient);
            setShowPatientSearchModal(false);
          }}
          onCreateNew={() => {
            setShowPatientSearchModal(false);
            // Redirect to new patient form or open modal
          }}
        />
      </MainLayout>
    </ProtectedRoute>
  );
}
