import { EventForm } from '@/component/admin/EventForm';
import { ProtectedRoute } from '@/component/auth/ProtectedRoute';
import { getEventById } from '@/services/admin.service';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function EditEventPage({
  params,
}: {
   params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const event = await getEventById(id, token);

  if (!event) {
    notFound();
  }

  return (
    <ProtectedRoute requireAdmin>
      <EventForm event={event} isEdit />
    </ProtectedRoute>
  );
}