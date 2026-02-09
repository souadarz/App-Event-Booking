'use client';

import { useRouter } from 'next/navigation';
import { Calendar } from 'lucide-react';

export function EmptyReservations() {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow-md p-12 text-center border border-[#cad2c5]">
      <Calendar className="h-16 w-16 text-[#cad2c5] mx-auto mb-4" />
      <h3 className="text-2xl font-semibold text-[#2f3e46] mb-2">
        Aucune réservation
      </h3>
      <p className="text-[#52796f] mb-6">
        Vous n&apos;avez pas encore de réservations
      </p>
      <button
        onClick={() => router.push('/')}
        className="px-6 py-3 bg-[#84a98c] text-white rounded-lg hover:bg-[#52796f] transition-colors"
      >
        Découvrir les événements
      </button>
    </div>
  );
}