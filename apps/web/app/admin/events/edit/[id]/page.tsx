import { EventForm } from '@/component/admin/EventForm';
import { ProtectedRoute } from '@/component/auth/ProtectedRoute';
import { getEventById } from '@/services/events.service';
import { notFound } from 'next/navigation';

export default async function EditEventPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <ProtectedRoute requireAdmin>
      <EventForm event={event} isEdit />
    </ProtectedRoute>
  );
}