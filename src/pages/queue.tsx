import React from "react";
import dynamic from "next/dynamic";
import MainLayout from "../components/Layout/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { useReceptionData } from "../hooks/useReceptionData";
import { useDarkMode } from "../hooks/useDarkMode";
import { Plus } from "lucide-react";

const QueueView = dynamic(() => import("../components/reception/QueueView"), {
  ssr: false,
});

export default function QueuePage() {
  const { darkMode } = useDarkMode();
  const { queue, updateQueue } = useReceptionData();

  return (
    <ProtectedRoute allowedRoles={["receptionist", "nurse", "admin"]}>
      <MainLayout
        title="Fila de Atendimento"
        actions={
          <button
            onClick={() => {
              // Call next logic
              console.log("Chamar próximo");
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Chamar Próximo</span>
          </button>
        }
      >
        <QueueView
          darkMode={darkMode}
          queue={queue}
          onUpdateQueue={updateQueue}
          onCallNext={(doctorId) => {
            console.log("Chamar próximo para:", doctorId);
          }}
        />
      </MainLayout>
    </ProtectedRoute>
  );
}
