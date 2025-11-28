import React from "react";
import dynamic from "next/dynamic";
import MainLayout from "../components/Layout/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAppointments, usePatients } from "../hooks/useData";
import { useDarkMode } from "../hooks/useDarkMode";
import { useRouter } from "next/router";

import { useQueue } from "../context/QueueContext";

const ReceptionDashboard = dynamic(
  () => import("../components/reception/ReceptionDashboard"),
  { ssr: false }
);

export default function ReceptionPage() {
  const { darkMode } = useDarkMode();
  // const { queue } = useReceptionData(); // Remove old hook usage
  const { queue } = useQueue(); // Use global queue
  const { appointments } = useAppointments();
  const { patients } = usePatients();
  const router = useRouter();

  return (
    <ProtectedRoute allowedRoles={["receptionist", "admin"]}>
      <MainLayout title="Dashboard da Recepção">
        <ReceptionDashboard
          darkMode={darkMode}
          appointments={appointments}
          patients={patients}
          queue={queue}
          onNavigate={(view) => {
            // Map view names to routes
            const routes: Record<string, string> = {
              checkin: "/checkin",
              queue: "/queue",
              contacts: "/contacts",
              appointments: "/appointments",
              patients: "/patients",
            };
            if (routes[view]) {
              router.push(routes[view]);
            }
          }}
        />
      </MainLayout>
    </ProtectedRoute>
  );
}
