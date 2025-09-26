export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  cpf: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  healthPlan: string;
  planNumber?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  lastVisit: string;
  status: string;
  notes: string;
}

export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  specialty: string;
  status: string;
  symptoms?: string;
  observations?: string;
  healthPlan: string;
  value: number;
}

export interface MedicalRecord {
  id: number;
  patientId: number;
  patientName: string;
  doctor: string;
  date: string;
  type: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  medications?: string[];
  followUp?: string;
  observations?: string;
  status: string;
  priority: string;
}

export interface Doctor {
  id: number;
  name: string;
  crm?: string;
  coren?: string;
  specialty: string;
  role: string;
  email: string;
  phone: string;
  status: string;
  avatar?: string;
  appointmentsToday?: number;
  appointmentsWeek?: number;
  rating?: number;
}

export interface Analytics {
  totalPatients: number;
  activePatients: number;
  totalAppointments: number;
  todayAppointments: number;
  weekAppointments: number;
  monthRevenue: number;
  dailyRevenue: number;
  averageConsultationValue: number;
  patientSatisfaction: number;
  monthlyGrowth: {
    patients: number;
    appointments: number;
    revenue: number;
    satisfaction: number;
  };
  appointmentsBySpecialty: Record<string, number>;
}

export interface Document {
  id: number;
  patientId: number;
  patientName: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  category: string;
  doctor: string;
}

export interface Procedure {
  id: number;
  name: string;
  code: string;
  category: string;
  price: number;
  duration: number;
  description: string;
}

export interface User {
  name: string;
  role: string;
  crm: string;
  specialty: string;
  avatar: string;
  permissions: string[];
}