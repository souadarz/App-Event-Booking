export type EventStatus = 'DRAFT' | 'PUBLISHED' | 'CANCELED';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  maxCapacity: number;
  currentReservations: number;
  status: EventStatus
}