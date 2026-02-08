import { EventsList } from '@/component/home/EventsList';
import { getPublishedEvents } from '@/services/events.service';
import { Calendar } from 'lucide-react';

export default async function HomePage() {
  const events = await getPublishedEvents();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#cad2c5]/20 to-white">
      {/* section hero */}
      <div className="bg-gradient-to-r from-[#2f3e46] to-[#52796f] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
           
            <h1 className="text-5xl font-bold text-white mb-4">
              Bienvenue sur EventHub
            </h1>
            <p className="text-xl text-[#cad2c5] max-w-3xl mx-auto">
              Découvrez et réservez vos places pour les événements les plus inspirants.
              Conférences, ateliers, festivals et bien plus encore.
            </p>
          </div>
        </div>
      </div>
      <EventsList events={events} />
    </div>
  );
}