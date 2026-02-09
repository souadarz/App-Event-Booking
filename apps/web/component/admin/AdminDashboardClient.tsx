'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EventsTable } from './EventsTable';
import { ReservationsTable } from './ReservationTable';
import { deleteEvent } from '@/services/admin.service';
import { Reservation } from '@/types/reservation.type';
import { Event } from '@/types/event.type';

interface AdminDashboardClientProps {
  events: Event[];
  reservations: Reservation[];
}

export function AdminDashboardClient({
  events,
  reservations,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'reservations'>('overview');
  const router = useRouter();

  const handleDeleteEvent = async (eventId: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const success = await deleteEvent(eventId);
    if (success) {
      router.refresh();
    } else {
      alert('Erreur lors de la suppression de l\'événement');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#cad2c5]/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#2f3e46] mb-2">
            Tableau de bord administrateur
          </h1>
          <p className="text-[#52796f]">Gérez vos événements et réservations</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 border-b border-[#cad2c5]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-t-lg transition-colors font-medium ${
              activeTab === 'overview'
                ? 'bg-[#84a98c] text-white'
                : 'text-[#52796f] hover:bg-[#cad2c5]/30'
            }`}
          >
            Vue d&apos;ensemble
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 rounded-t-lg transition-colors font-medium ${
              activeTab === 'events'
                ? 'bg-[#84a98c] text-white'
                : 'text-[#52796f] hover:bg-[#cad2c5]/30'
            }`}
          >
            Événements
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-6 py-3 rounded-t-lg transition-colors font-medium ${
              activeTab === 'reservations'
                ? 'bg-[#84a98c] text-white'
                : 'text-[#52796f] hover:bg-[#cad2c5]/30'
            }`}
          >
            Réservations
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
          </div>
        )}

        {activeTab === 'events' && (
          <EventsTable events={events} onDelete={handleDeleteEvent} />
        )}

        {activeTab === 'reservations' && (
          <ReservationsTable reservations={reservations} />
        )}
      </div>
    </div>
  );
}