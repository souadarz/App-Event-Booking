
import { AdminDashboardClient } from '@/component/admin/AdminDashboardClient';
import { ProtectedRoute } from '@/component/auth/ProtectedRoute';
import { getAllEvents, getAllReservations } from '@/services/admin.service';

export default async function AdminDashboardPage() {

  const [events, reservations] = await Promise.all([
    getAllEvents(),
    getAllReservations(),
  ]);

  return (
    <ProtectedRoute requireAdmin>
      <AdminDashboardClient
        events={events}
        reservations={reservations}
      />
    </ProtectedRoute>
  );
}