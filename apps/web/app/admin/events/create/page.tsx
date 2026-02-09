import { EventForm } from "@/component/admin/EventForm";
import { ProtectedRoute } from "@/component/auth/ProtectedRoute";


export default function CreateEventPage() {
  return (
    <ProtectedRoute requireAdmin>
      <EventForm />
    </ProtectedRoute>
  );
}