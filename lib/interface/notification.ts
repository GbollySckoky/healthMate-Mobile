export type Notification = {
  id: string
  title: string
  body: string
  type: string
  isRead: boolean
  readAt: string | null
  createdAt: string
  supportTicketId: string | null
  appointmentId: string | null
  doctorId: string | null
  hospitalId: string | null
  patientId: string | null
}