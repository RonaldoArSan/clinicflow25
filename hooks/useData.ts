import { useState, useEffect } from 'react';
import { Patient, Appointment, MedicalRecord, Doctor, Analytics, Document, Procedure, User } from '../types';

// Mock data similar to the original application
const initialUser: User = {
  name: "Dr. Ana Paula Silva",
  role: "Médica Clínica Geral",
  crm: "CRM/SP 123456",
  specialty: "Clínica Geral",
  avatar: "keys/avatar-doctor?prompt=professional%20female%20doctor%20white%20coat",
  permissions: ["admin", "manage_patients", "view_analytics", "manage_appointments"]
};

const initialPatients: Patient[] = [
  {
    id: 1,
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "(11) 99999-9999",
    address: "Rua das Flores, 123 - Centro",
    birthDate: "1985-03-15",
    cpf: "123.456.789-10",
    bloodType: "O+",
    allergies: ["Penicilina", "Dipirona"],
    chronicConditions: ["Hipertensão"],
    healthPlan: "Unimed",
    planNumber: "123456789",
    emergencyContact: {
      name: "João Santos",
      phone: "(11) 88888-8888",
      relationship: "Esposo"
    },
    lastVisit: "2024-01-15",
    status: "ativo",
    notes: "Paciente hipertensa em acompanhamento regular"
  },
  {
    id: 2,
    name: "João Oliveira",
    email: "joao.oliveira@email.com",
    phone: "(11) 88888-8888",
    address: "Av. Principal, 456 - Jardim Europa",
    birthDate: "1978-07-22",
    cpf: "987.654.321-10",
    bloodType: "A+",
    allergies: [],
    chronicConditions: ["Diabetes tipo 2"],
    healthPlan: "Bradesco Saúde",
    planNumber: "987654321",
    emergencyContact: {
      name: "Ana Oliveira",
      phone: "(11) 77777-7777",
      relationship: "Esposa"
    },
    lastVisit: "2024-01-10",
    status: "ativo",
    notes: "Diabetes controlada com medicação"
  },
  {
    id: 3,
    name: "Carlos Mendes",
    email: "carlos.mendes@email.com",
    phone: "(11) 77777-7777",
    address: "Rua do Comércio, 789 - Vila Nova",
    birthDate: "1965-12-05",
    cpf: "456.789.123-10",
    bloodType: "B+",
    allergies: ["Aspirina"],
    chronicConditions: [],
    healthPlan: "Particular",
    planNumber: undefined,
    emergencyContact: {
      name: "Paula Mendes",
      phone: "(11) 66666-6666",
      relationship: "Filha"
    },
    lastVisit: "2024-01-20",
    status: "ativo",
    notes: "Paciente particular, checkup anual"
  }
];

const initialAppointments: Appointment[] = [
  {
    id: 1,
    patientId: 1,
    patientName: "Maria Santos",
    doctorName: "Dr. Ana Paula Silva",
    date: "2024-02-01",
    time: "09:00",
    duration: 30,
    type: "Consulta",
    specialty: "Clínica Geral",
    status: "agendado",
    symptoms: "Dor de cabeça constante",
    observations: "Paciente relata dores há 3 dias",
    healthPlan: "Unimed",
    value: 250
  },
  {
    id: 2,
    patientId: 2,
    patientName: "João Oliveira",
    doctorName: "Dr. Carlos Ferreira",
    date: "2024-02-01",
    time: "14:00",
    duration: 30,
    type: "Retorno",
    specialty: "Endocrinologia",
    status: "confirmado",
    symptoms: "Acompanhamento diabetes",
    observations: "Retorno para ajuste medicação",
    healthPlan: "Bradesco Saúde",
    value: 180
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Carlos Mendes",
    doctorName: "Dr. Ana Paula Silva",
    date: "2024-02-02",
    time: "10:30",
    duration: 45,
    type: "Check-up",
    specialty: "Clínica Geral",
    status: "concluido",
    symptoms: "Exame de rotina",
    observations: "Paciente assintomático",
    healthPlan: "Particular",
    value: 300
  }
];

const initialMedicalTeam: Doctor[] = [
  {
    id: 1,
    name: "Dr. Carlos Ferreira",
    role: "Médico Endocrinologista",
    crm: "CRM/SP 654321",
    email: "carlos.ferreira@clinica.com",
    phone: "(11) 99999-0001",
    specialty: "Endocrinologia",
    status: "ativo",
    avatar: "keys/avatar-doctor-male?prompt=professional%20male%20doctor%20white%20coat",
    appointmentsToday: 8,
    appointmentsWeek: 32,
    rating: 4.8
  },
  {
    id: 2,
    name: "Dra. Mariana Costa",
    role: "Médica Cardiologista",
    crm: "CRM/SP 789123",
    email: "mariana.costa@clinica.com",
    phone: "(11) 99999-0002",
    specialty: "Cardiologia",
    status: "ativo",
    avatar: "keys/avatar-doctor-female2?prompt=professional%20female%20cardiologist%20white%20coat",
    appointmentsToday: 6,
    appointmentsWeek: 28,
    rating: 4.9
  },
  {
    id: 3,
    name: "Enf. Pedro Santos",
    role: "Enfermeiro",
    coren: "COREN/SP 456789",
    email: "pedro.santos@clinica.com",
    phone: "(11) 99999-0003",
    specialty: "Enfermagem",
    status: "ativo",
    avatar: "keys/avatar-nurse?prompt=professional%20male%20nurse%20uniform",
    appointmentsToday: 12,
    appointmentsWeek: 60,
    rating: 4.7
  }
];

const initialMedicalRecords: MedicalRecord[] = [
  {
    id: 1,
    patientId: 1,
    patientName: "Maria Santos",
    date: "2024-01-20",
    type: "Consulta",
    doctor: "Dr. Ana Paula Silva",
    diagnosis: "Cefaleia tensional",
    symptoms: "Dor de cabeça, tensão muscular",
    treatment: "Dipirona 500mg, relaxante muscular",
    observations: "Paciente apresenta melhora com repouso",
    status: "finalizado",
    priority: "baixa"
  },
  {
    id: 2,
    patientId: 2,
    patientName: "João Oliveira",
    date: "2024-01-19",
    type: "Retorno",
    doctor: "Dr. Carlos Ferreira",
    diagnosis: "Diabetes mellitus tipo 2",
    symptoms: "Glicemia alterada",
    treatment: "Metformina 850mg, dieta controlada",
    observations: "Paciente aderente ao tratamento",
    status: "em_acompanhamento",
    priority: "media"
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Carlos Mendes",
    date: "2024-01-18",
    type: "Check-up",
    doctor: "Dra. Mariana Costa",
    diagnosis: "Paciente hígido",
    symptoms: "Assintomático",
    treatment: "Manter hábitos saudáveis",
    observations: "Exames laboratoriais normais",
    status: "finalizado",
    priority: "baixa"
  }
];

const initialAnalytics: Analytics = {
  totalPatients: 847,
  activePatients: 623,
  totalAppointments: 156,
  todayAppointments: 12,
  weekAppointments: 89,
  monthRevenue: 45620,
  dailyRevenue: 2800,
  averageConsultationValue: 220,
  patientSatisfaction: 4.6,
  monthlyGrowth: {
    patients: 8,
    appointments: 12,
    revenue: 15,
    satisfaction: 0.2
  },
  appointmentsBySpecialty: {
    "Clínica Geral": 45,
    "Cardiologia": 32,
    "Endocrinologia": 28,
    "Pediatria": 25,
    "Dermatologia": 26
  }
};

const initialDocuments: Document[] = [
  {
    id: 1,
    name: "Exame Hemograma - Maria Santos",
    type: "pdf",
    size: "1.2 MB",
    uploadDate: "2024-01-15",
    category: "Exames",
    patientId: 1,
    patientName: "Maria Santos",
    doctor: "Dr. Ana Paula Silva"
  },
  {
    id: 2,
    name: "Receita Médica - João Oliveira",
    type: "pdf",
    size: "320 KB",
    uploadDate: "2024-01-19",
    category: "Receitas",
    patientId: 2,
    patientName: "João Oliveira",
    doctor: "Dr. Carlos Ferreira"
  },
  {
    id: 3,
    name: "Laudo Cardiológico - Carlos Mendes",
    type: "pdf",
    size: "890 KB",
    uploadDate: "2024-01-18",
    category: "Laudos",
    patientId: 3,
    patientName: "Carlos Mendes",
    doctor: "Dra. Mariana Costa"
  }
];

const initialProcedures: Procedure[] = [
  {
    id: 1,
    name: "Eletrocardiograma",
    code: "0202010023",
    category: "Diagnóstico",
    duration: 15,
    price: 120,
    description: "Exame para avaliação da atividade elétrica do coração"
  },
  {
    id: 2,
    name: "Consulta Cardiológica",
    code: "0301010015",
    category: "Consulta",
    duration: 30,
    price: 250,
    description: "Consulta especializada em cardiologia"
  },
  {
    id: 3,
    name: "Hemograma Completo",
    code: "0202020014",
    category: "Laboratório",
    duration: 0,
    price: 85,
    description: "Análise completa dos elementos sanguíneos"
  }
];

// Custom hooks for data management
export const useUser = () => {
  const [user, setUser] = useState(initialUser);
  return { user, setUser };
};

export const usePatients = () => {
  const [patients, setPatients] = useState(initialPatients);
  return { patients, setPatients };
};

export const useAppointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  return { appointments, setAppointments };
};

export const useMedicalTeam = () => {
  const [medicalTeam, setMedicalTeam] = useState(initialMedicalTeam);
  return { medicalTeam, setMedicalTeam };
};

export const useMedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState(initialMedicalRecords);
  return { medicalRecords, setMedicalRecords };
};

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState(initialAnalytics);
  return { analytics, setAnalytics };
};

export const useDocuments = () => {
  const [documents, setDocuments] = useState(initialDocuments);
  return { documents, setDocuments };
};

export const useProcedures = () => {
  const [procedures, setProcedures] = useState(initialProcedures);
  return { procedures, setProcedures };
};