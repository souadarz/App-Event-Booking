'use client';

import { useState, useMemo } from 'react';
import { Calendar, Search } from 'lucide-react';
import { EventCard } from '../event/EventCard';
import { Event } from '@/types/event.type';

interface EventsListProps {
  events: Event[];
}

export function EventsList({ events }: EventsListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [events, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#52796f]" />
            <input
            type="text"
            placeholder="Rechercher un événement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-[#cad2c5] focus:border-[#84a98c] focus:outline-none text-[#2f3e46] shadow-sm"
            />
        </div>
    </div>

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[#2f3e46] mb-2">
          Événements à venir
        </h2>
        <p className="text-[#52796f]">
          {filteredEvents.length} événement(s) disponible(s)
        </p>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Calendar className="h-16 w-16 text-[#cad2c5] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#2f3e46] mb-2">
            Aucun événement trouvé
          </h3>
          <p className="text-[#52796f]">
            Essayez de modifier vos critères de recherche.
          </p>
        </div>
      )}
    </div>
  );
}