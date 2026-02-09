'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { EventStatus } from '@/types/event.type';

interface EventActionsProps {
  eventId: string;
  canReserve: boolean;
  status: EventStatus;
  isFull: boolean;
}

export function EventActions({ eventId, canReserve, status, isFull }: EventActionsProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (canReserve) {
    return (
      <div className="flex justify-center">
        {isAuthenticated ? (
          <button
            onClick={() => router.push(`/reservation/${eventId}`)}
            className="px-8 py-4 bg-[#84a98c] text-white rounded-xl hover:bg-[#52796f] transition-colors shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            Réserver maintenant
          </button>
        ) : (
          <button
            onClick={() => router.push('/login')}
            className="px-8 py-4 bg-[#84a98c] text-white rounded-xl hover:bg-[#52796f] transition-colors shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            Se connecter pour réserver
          </button>
        )}
      </div>
    );
  }

  if (status === 'CANCELED') {
    return (
      <div className="bg-[#2f3e46]/10 border border-[#2f3e46] rounded-lg p-4 text-center">
        <p className="text-[#2f3e46]">
          Cet événement a été annulé et n&apos;accepte plus de réservations.
        </p>
      </div>
    );
  }

  if (isFull) {
    return (
      <div className="bg-[#52796f]/10 border border-[#52796f] rounded-lg p-4 text-center">
        <p className="text-[#2f3e46]">
          Cet événement est complet. Toutes les places ont été réservées.
        </p>
      </div>
    );
  }

  return null;
}