import React, { createContext, useContext, useState, ReactNode } from "react";
import { Patient } from "../hooks/useAttendance";

// Reusing the Patient interface from useAttendance, but we might want to move it to a shared types file later.
// For now, let's define the shape here to avoid circular dependencies if useAttendance imports this.
// Actually, let's import from types/user or similar if possible, but useAttendance has the specific Patient definition.
// Let's redefine a compatible interface here for the Context.

export interface QueuePatient {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female";
  phone?: string;
  email?: string;
  address?: string;
  healthPlan?: string;
  appointmentTime?: string;
  reason?: string;
  arrivalTime: string;
  status: "waiting" | "in-progress" | "completed";
  priority: "normal" | "urgent" | "emergency";
  symptoms?: string;
  assignedTo?: string; // Doctor ID
  type?: string; // 'Consulta', 'Retorno', etc.
  doctorName?: string; // For display purposes
}

interface QueueContextType {
  queue: QueuePatient[];
  addToQueue: (
    patient: Omit<QueuePatient, "id" | "arrivalTime" | "status">
  ) => void;
  removeFromQueue: (patientId: string) => void;
  updateStatus: (patientId: string, status: QueuePatient["status"]) => void;
  assignToDoctor: (patientId: string, doctorId: string) => void;
  getQueueByDoctor: (doctorId: string) => QueuePatient[];
  getGeneralQueue: () => QueuePatient[];
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [queue, setQueue] = useState<QueuePatient[]>([
    // Initial mock data
    {
      id: "1",
      name: "João Silva",
      age: 45,
      gender: "male",
      arrivalTime: "08:30",
      status: "waiting",
      priority: "normal",
      symptoms: "Dor de cabeça persistente",
      type: "Consulta",
      healthPlan: "Unimed",
      reason: "Consulta de rotina",
      appointmentTime: "08:00",
    },
    {
      id: "2",
      name: "Maria Oliveira",
      age: 32,
      gender: "female",
      arrivalTime: "09:15",
      status: "waiting",
      priority: "urgent",
      symptoms: "Febre alta e dor no corpo",
      type: "Consulta",
      healthPlan: "Bradesco",
      reason: "Febre alta",
      appointmentTime: "09:00",
    },
    {
      id: "3",
      name: "Pedro Santos",
      age: 28,
      gender: "male",
      arrivalTime: "09:45",
      status: "in-progress",
      priority: "normal",
      assignedTo: "doc-1", // Assuming current user might be doc-1 or similar
      symptoms: "Retorno - Exames",
      type: "Retorno",
      healthPlan: "Particular",
      reason: "Retorno",
      appointmentTime: "09:30",
    },
  ]);

  const addToQueue = (
    patientData: Omit<QueuePatient, "id" | "arrivalTime" | "status">
  ) => {
    const newPatient: QueuePatient = {
      ...patientData,
      id: Math.random().toString(36).substr(2, 9),
      arrivalTime: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "waiting",
    };
    setQueue((prev) => [...prev, newPatient]);
  };

  const removeFromQueue = (patientId: string) => {
    setQueue((prev) => prev.filter((p) => p.id !== patientId));
  };

  const updateStatus = (patientId: string, status: QueuePatient["status"]) => {
    setQueue((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, status } : p))
    );
  };

  const assignToDoctor = (patientId: string, doctorId: string) => {
    setQueue((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, assignedTo: doctorId } : p))
    );
  };

  const getQueueByDoctor = (doctorId: string) => {
    return queue.filter(
      (p) => p.assignedTo === doctorId && p.status !== "completed"
    );
  };

  const getGeneralQueue = () => {
    return queue.filter((p) => !p.assignedTo && p.status === "waiting");
  };

  return (
    <QueueContext.Provider
      value={{
        queue,
        addToQueue,
        removeFromQueue,
        updateStatus,
        assignToDoctor,
        getQueueByDoctor,
        getGeneralQueue,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (context === undefined) {
    throw new Error("useQueue must be used within a QueueProvider");
  }
  return context;
};
