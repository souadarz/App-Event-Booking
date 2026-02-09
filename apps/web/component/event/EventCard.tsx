import Link from 'next/link';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '@/types/event.type';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const availableSeats = event.capacity - event.currentReservations;
  const isFull = availableSeats <= 0;

  return (
    <Link href={`/events/${event._id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-[#cad2c5] h-full flex flex-col">

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold text-[#2f3e46] mb-2">
            {event.title}
          </h3>

          <p className="text-[#52796f] text-sm mb-4 line-clamp-2 flex-1">
            {event.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-[#52796f]">
              <Calendar className="h-4 w-4 mr-2 text-[#84a98c]" />
              {new Date(event.date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>

            <div className="flex items-center text-sm text-[#52796f]">
              <MapPin className="h-4 w-4 mr-2 text-[#84a98c]" />
              {event.location}
            </div>

            <div className="flex items-center text-sm text-[#52796f]">
              <Users className="h-4 w-4 mr-2 text-[#84a98c]" />
              {isFull ? (
                <span className="text-red-600 font-semibold">Complet</span>
              ) : (
                <span>
                  {availableSeats} place(s) disponible(s) / {event.capacity}
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#cad2c5]">
            <span
              className={`block text-center w-full py-2 rounded-lg transition-colors ${isFull
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#84a98c] text-white hover:bg-[#52796f]'
                }`}
            >
              {isFull ? 'Complet' : 'Réserver'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}