export type EventStatus = 'DRAFT' | 'PUBLISHED' | 'CANCELED';

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  currentReservations: number;
  status: EventStatus
}

export interface CreateEventDto {
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
}

export interface UpdateEventDto {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  capacity?: number;
}