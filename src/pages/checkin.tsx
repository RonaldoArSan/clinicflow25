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

import { useQueue } from "../context/QueueContext";

export default function CheckinPage() {
  const { darkMode } = useDarkMode();
  const { appointments } = useAppointments();
  const { patients } = usePatients();
  const [showPatientSearchModal, setShowPatientSearchModal] = useState(false);
  const { addToQueue } = useQueue();

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
            // Convert IDs to numbers if they are coming as strings from the UI but stored as numbers in mock data
            // Or convert mock data IDs to strings for comparison
            // Assuming mock data uses numbers for IDs based on previous errors
            const pId = Number(patientId);
            const aId = appointmentId ? Number(appointmentId) : undefined;

            const patient = patients.find((p) => p.id === pId);
            const appointment = appointments.find((a) => a.id === aId);

            if (patient) {
              addToQueue({
                name: patient.name,
                age: 30, // Mock age if not in patient data
                gender: "male", // Mock gender
                priority: "normal",
                type: appointment?.type || "Consulta",
                reason: appointment?.symptoms || "Consulta",
                healthPlan: patient.healthPlan || "Particular",
                appointmentTime:
                  appointment?.time ||
                  new Date().toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                symptoms: appointment?.symptoms,
              });

              // Optional: Show success toast
              console.log("Check-in realizado e adicionado à fila:", {
                patientId,
                appointmentId,
              });
            }
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
