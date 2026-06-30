export interface Consultation {
  id: number
  doctorId: number
  availableTimeSlots: string[]
  dayOfWeek: string
  consultationType: string[]
  createdAt: string
  updatedAt: string
}
