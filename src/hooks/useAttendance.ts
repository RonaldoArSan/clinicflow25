import { useState, useEffect } from 'react';

export interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  healthPlan: string;
  appointmentTime: string;
  reason: string;
  status: 'waiting' | 'in-progress' | 'completed';
  priority: 'normal' | 'urgent' | 'emergency';
  assignedTo?: string; // ID do médico se já estiver atribuído
}

export interface VitalSigns {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  weight: string;
  height: string;
  oxygenSaturation: string;
}

export interface AttendanceRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime?: string;
  vitalSigns: VitalSigns;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  prescription: string;
  notes: string;
  status: 'ongoing' | 'completed';
}

export const useAttendance = () => {
  const [todayPatients, setTodayPatients] = useState<Patient[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - em um app real, isso viria de uma API
  useEffect(() => {
    const mockPatients: Patient[] = [
      {
        id: '1',
        name: 'Maria Silva',
        age: 45,
        phone: '(11) 99999-1111',
        email: 'maria@email.com',
        address: 'Rua das Flores, 123',
        healthPlan: 'Unimed',
        appointmentTime: '09:00',
        reason: 'Consulta de rotina',
        status: 'waiting',
        priority: 'normal'
      },
      {
        id: '2',
        name: 'João Santos',
        age: 60,
        phone: '(11) 99999-2222',
        email: 'joao@email.com',
        address: 'Av. Principal, 456',
        healthPlan: 'Bradesco Saúde',
        appointmentTime: '09:30',
        reason: 'Dor no peito',
        status: 'waiting',
        priority: 'urgent',
        assignedTo: 'current_doctor' // Exemplo: atribuído ao médico atual
      },
      {
        id: '3',
        name: 'Ana Costa',
        age: 35,
        phone: '(11) 99999-3333',
        email: 'ana@email.com',
        address: 'Rua Nova, 789',
        healthPlan: 'SulAmérica',
        appointmentTime: '10:00',
        reason: 'Check-up anual',
        status: 'waiting',
        priority: 'normal'
      },
      {
        id: '4',
        name: 'Pedro Oliveira',
        age: 28,
        phone: '(11) 99999-4444',
        email: 'pedro@email.com',
        address: 'Rua da Paz, 101',
        healthPlan: 'Amil',
        appointmentTime: '10:30',
        reason: 'Dor de cabeça constante',
        status: 'waiting',
        priority: 'normal',
        assignedTo: 'other_doctor' // Exemplo: atribuído a outro médico
      },
      {
        id: '5',
        name: 'Carla Mendes',
        age: 52,
        phone: '(11) 99999-5555',
        email: 'carla@email.com',
        address: 'Av. Brasil, 234',
        healthPlan: 'Porto Seguro',
        appointmentTime: '11:00',
        reason: 'Pressão alta',
        status: 'waiting',
        priority: 'urgent',
        assignedTo: 'current_doctor'
      }
    ];

    setTodayPatients(mockPatients);
    setIsLoading(false);
  }, []);

  const callPatient = (patientId: string) => {
    // Simulação de chamar paciente (pode disparar som, notificação, etc)
    if ((window as any).showToast) {
      (window as any).showToast({
        type: 'info',
        title: 'Chamando Paciente',
        message: `Chamando paciente para o consultório...`
      });
    }
  };

  const startAttendance = (patient: Patient) => {
    // Atualizar status do paciente para 'in-progress'
    setTodayPatients(prev => 
      prev.map(p => 
        p.id === patient.id 
          ? { ...p, status: 'in-progress' } 
          : p
      )
    );

    // Criar um novo registro de atendimento
    const newRecord: AttendanceRecord = {
      id: `att_${Date.now()}`,
      patientId: patient.id,
      doctorId: 'current_doctor', // Em um app real, pegar do contexto do usuário
      date: new Date().toISOString().split('T')[0],
      startTime: new Date().toTimeString().split(' ')[0],
      vitalSigns: {
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        weight: '',
        height: '',
        oxygenSaturation: ''
      },
      symptoms: '',
      diagnosis: '',
      treatment: '',
      prescription: '',
      notes: '',
      status: 'ongoing'
    };

    setAttendanceRecords(prev => [...prev, newRecord]);
    return newRecord;
  };

  const completeAttendance = (recordId: string, recordData: Partial<AttendanceRecord>) => {
    const record = attendanceRecords.find(r => r.id === recordId);
    if (!record) return;

    // Atualizar o registro de atendimento
    setAttendanceRecords(prev => 
      prev.map(r => 
        r.id === recordId 
          ? { 
              ...r, 
              ...recordData, 
              endTime: new Date().toTimeString().split(' ')[0],
              status: 'completed' as const
            } 
          : r
      )
    );

    // Atualizar status do paciente para 'completed'
    setTodayPatients(prev => 
      prev.map(p => 
        p.id === record.patientId 
          ? { ...p, status: 'completed' } 
          : p
      )
    );
  };

  const updateAttendanceRecord = (recordId: string, updates: Partial<AttendanceRecord>) => {
    setAttendanceRecords(prev => 
      prev.map(r => 
        r.id === recordId 
          ? { ...r, ...updates } 
          : r
      )
    );
  };

  const getPatientsByStatus = (status: Patient['status']) => {
    return todayPatients.filter(patient => patient.status === status);
  };

  const getAttendancesByStatus = (status: AttendanceRecord['status']) => {
    return attendanceRecords.filter(record => record.status === status);
  };

  const getTodayStats = () => {
    const total = todayPatients.length;
    const waiting = getPatientsByStatus('waiting').length;
    const inProgress = getPatientsByStatus('in-progress').length;
    const completed = getPatientsByStatus('completed').length;
    const urgent = todayPatients.filter(p => p.priority === 'urgent').length;
    const emergency = todayPatients.filter(p => p.priority === 'emergency').length;

    return {
      total,
      waiting,
      inProgress,
      completed,
      urgent,
      emergency,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  return {
    todayPatients,
    attendanceRecords,
    isLoading,
    startAttendance,
    completeAttendance,
    updateAttendanceRecord,
    getPatientsByStatus,
    getAttendancesByStatus,
    getTodayStats,
    callPatient
  };
};