'use client';

import { Calendar, Download, MapPin, Clock } from 'lucide-react';
import { Reservation } from '@/types/reservation.type';

interface ReservationCardProps {
  reservation: Reservation;
}

export function ReservationCard({ reservation }: ReservationCardProps) {
  const getStatusBadge = (status: Reservation['status']) => {
    const styles = {
      CONFIRMED: 'bg-[#84a98c] text-white',
      PENDING: 'bg-yellow-500 text-white',
      REFUSED: 'bg-red-500 text-white',
      CANCELED: 'bg-[#52796f] text-white',
    };

    const labels = {
      CONFIRMED: 'Confirmée',
      PENDING: 'En attente',
      REFUSED: 'Refusée',
      CANCELED: 'Annulée',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-[#cad2c5] overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-[#2f3e46] mb-2">
              {reservation.eventTitle}
            </h3>
            {getStatusBadge(reservation.status)}
          </div>
          {reservation.status === 'CONFIRMED' && (
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-[#84a98c] text-white rounded-lg hover:bg-[#52796f] transition-colors"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Télécharger le ticket</span>
              <span className="sm:hidden">Ticket</span>
            </button>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2 text-[#52796f]">
            <Calendar className="h-4 w-4 text-[#84a98c]" />
            <span>
              Réservé le{' '}
              {new Date(reservation.reservationDate).toLocaleDateString('fr-FR')}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[#52796f]">
            <Clock className="h-4 w-4 text-[#84a98c]" />
            <span>Réf: {reservation.id.substring(0, 8)}</span>
          </div>

          <div className="flex items-center space-x-2 text-[#52796f]">
            <MapPin className="h-4 w-4 text-[#84a98c]" />
            <span>{reservation.numberOfSeats} place(s)</span>
          </div>
        </div>
      </div>
    </div>
  );
}