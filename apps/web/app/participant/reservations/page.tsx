
import { cookies } from 'next/headers';
import { Reservation } from '@/types/reservation.type';
import { ProtectedRoute } from '@/component/auth/ProtectedRoute';
import { ReservationCard } from '@/component/reservations/ReservationsCard';
import { EmptyReservations } from '@/component/reservations/EmptyReservations';
import { getUserReservations } from '@/services/reservation.service';

export default async function MyReservationsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';

  const reservations = await getUserReservations(token);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-[#cad2c5]/20 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#2f3e46] mb-2">
              Mes Réservations
            </h1>
            <p className="text-[#52796f]">
              Gérez vos réservations et téléchargez vos tickets
            </p>
          </div>

          {reservations.length > 0 ? (
            <div className="space-y-4">
              {reservations.map((reservation : Reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))}
            </div>
          ) : (
            <EmptyReservations />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}