export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'REFUSED' | 'CANCELED';


export interface Reservation {
  id: string;
  eventId: string;
  eventTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  numberOfSeats: number;
  status: ReservationStatus;
  reservationDate: string;
}
