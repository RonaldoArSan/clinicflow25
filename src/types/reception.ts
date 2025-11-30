export interface QueueItem {
  id: string;
  patientName: string;
  patientId: string;
  appointmentId?: string;
  checkInTime: string;
  estimatedTime?: string;
  priority: 'normal' | 'urgent' | 'emergency';
  status: 'waiting' | 'in_service' | 'completed' | 'cancelled';
  stage: 'consultation' | 'medication' | 'exams';
  doctorName?: string;
  specialty?: string;
  serviceType: string;
  waitTime: number; // em minutos
}
