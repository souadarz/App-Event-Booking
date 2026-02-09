import { Reservation } from "@/types/reservation.type";

interface ReservationsTableProps {
  reservations: Reservation[];
}

export function ReservationsTable({ reservations }: ReservationsTableProps) {
  const getStatusBadge = (status: Reservation['status']) => {
    const styles = {
      CONFIRMED: 'bg-[#84a98c] text-white',
      PENDING: 'bg-[#cad2c5] text-[#2f3e46]',
      REFUSED: 'bg-red-500 text-white',
      CANCELED: 'bg-[#52796f] text-white',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#2f3e46] mb-6">
        Gestion des réservations
      </h2>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#cad2c5]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#2f3e46] text-white">
              <tr>
                <th className="px-6 py-4 text-left">Événement</th>
                <th className="px-6 py-4 text-left">Participant</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Places</th>
                <th className="px-6 py-4 text-left">Date réservation</th>
                <th className="px-6 py-4 text-left">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cad2c5]">
              {reservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="hover:bg-[#cad2c5]/20 transition-colors"
                >
                  <td className="px-6 py-4 text-[#2f3e46] font-medium">
                    {reservation.eventTitle}
                  </td>
                  <td className="px-6 py-4 text-[#52796f]">
                    {reservation.userName}
                  </td>
                  <td className="px-6 py-4 text-[#52796f] text-sm">
                    {reservation.userEmail}
                  </td>
                  <td className="px-6 py-4 text-[#52796f]">
                    {reservation.numberOfSeats}
                  </td>
                  <td className="px-6 py-4 text-[#52796f] text-sm">
                    {new Date(reservation.reservationDate).toLocaleDateString(
                      'fr-FR'
                    )}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(reservation.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}