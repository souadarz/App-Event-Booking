'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { ProtectedRoute } from '@/component/auth/ProtectedRoute';
import { ReservationForm } from '@/component/reservations/ReservationForm';
import { getEventById } from '@/services/events.service';
import { Event } from '@/types/event.type';

export default function ReserveEventPage() {
  const params = useParams();
  const [event, setEvent] = useState < Event | null > (null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  console.log("iddddddd",params.id);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(params.id as string);

        if (!eventData) {
          setNotFoundError(true);
          return;
        }

        const isFull = eventData.currentReservations >= eventData.capacity;
        const canReserve = eventData.status === 'PUBLISHED' && !isFull;

        if (!canReserve) {
          setNotFoundError(true);
          return;
        }

        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
        setNotFoundError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#cad2c5]/20 to-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#84a98c] mx-auto mb-4"></div>
            <p className="text-[#52796f] text-lg">Chargement...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (notFoundError || !event) {
    return notFound();
  }

  return (
    <ProtectedRoute>
      <ReservationForm event={event} />
    </ProtectedRoute>
  );
}