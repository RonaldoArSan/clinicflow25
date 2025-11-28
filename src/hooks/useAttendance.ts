import { useState } from 'react';
import { useQueue, QueuePatient } from '../context/QueueContext';

// Re-exporting interfaces for compatibility
export type Patient = QueuePatient;

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
  const { queue, updateStatus } = useQueue();
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  
  // Filter patients for the current view (Attendance Page)
  // In a real app, we might filter by the logged-in doctor here
  const todayPatients = queue;

  const callPatient = (patientId: string) => {
    if ((window as any).showToast) {
      (window as any).showToast({
        type: 'info',
        title: 'Chamando Paciente',
        message: `Chamando paciente para o consultório...`
      });
    }
  };

  const startAttendance = (patient: Patient) => {
    // Update patient status in the global queue
    updateStatus(patient.id, 'in-progress');

    // Create a new attendance record
    const newRecord: AttendanceRecord = {
      id: `att_${Date.now()}`,
      patientId: patient.id,
      doctorId: 'current_doctor', // In a real app, get from user context
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
      symptoms: patient.symptoms || '',
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

    // Update the attendance record
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

    // Update patient status in the global queue
    updateStatus(record.patientId, 'completed');
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
    isLoading: false, // Queue is managed by context, so no loading state here for now
    startAttendance,
    completeAttendance,
    updateAttendanceRecord,
    getPatientsByStatus,
    getAttendancesByStatus,
    getTodayStats,
    callPatient
  };
};