import { cookies } from 'next/headers';
import { AdminDashboardClient } from '@/component/admin/AdminDashboardClient';
import { ProtectedRoute } from '@/component/auth/ProtectedRoute';
import { getAllEvents, getAllReservations } from '@/services/admin.service';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const [events, reservations] = await Promise.all([
    getAllEvents(token),
    getAllReservations(token),
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