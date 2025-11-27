import React, { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import AppointmentsView from "../components/AppointmentsView";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAppointments } from "../hooks/useData";
import { useDarkMode } from "../hooks/useDarkMode";
import { Plus } from "lucide-react";
import Modal from "../components/Modal";
import NewAppointmentForm from "../components/NewAppointmentForm";
import { usePatients, useMedicalTeam } from "../hooks/useData";

export default function AppointmentsPage() {
  const { darkMode } = useDarkMode();
  const { appointments } = useAppointments();
  const { patients } = usePatients();
  const { medicalTeam } = useMedicalTeam();

  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);

  return (
    <ProtectedRoute>
      <MainLayout
        title="Agendamentos"
        actions={
          <button
            onClick={() => setShowNewAppointmentModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Consulta</span>
          </button>
        }
      >
        <AppointmentsView
          darkMode={darkMode}
          appointments={appointments}
          selectedAppointment={selectedAppointment}
          setSelectedAppointment={setSelectedAppointment}
        />

        <Modal
          isOpen={showNewAppointmentModal}
          onClose={() => setShowNewAppointmentModal(false)}
          title="Nova Consulta"
          size="xl"
          darkMode={darkMode}
        >
          <NewAppointmentForm
            darkMode={darkMode}
            patients={patients}
            doctors={medicalTeam}
            onSubmit={(appointment) => {
              console.log("Nova consulta:", appointment);
              setShowNewAppointmentModal(false);
            }}
            onCancel={() => setShowNewAppointmentModal(false)}
          />
        </Modal>
      </MainLayout>
    </ProtectedRoute>
  );
}
