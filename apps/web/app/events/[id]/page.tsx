import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { notFound } from 'next/navigation';
import { EventActions } from '@/component/event/EventActions';
import { getEventById } from '@/services/events.service';

export default async function EventDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    console.log("parrrr", id);
    const event = await getEventById(id);

    if (!event) {
        notFound();
    }

    const isFull = event.currentReservations >= event.maxCapacity;
    const canReserve = event.status === 'PUBLISHED' && !isFull;
    const fillRate = (event.currentReservations / event.maxCapacity) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#cad2c5]/20 to-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link
                    href="/"
                    className="flex items-center space-x-2 text-[#52796f] hover:text-[#2f3e46] mb-6 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Retour aux événements</span>
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#cad2c5]">
                    <div className="relative h-80 bg-gradient-to-br from-[#84a98c] to-[#52796f] flex items-center justify-center">
                        <Calendar className="h-32 w-32 text-white opacity-20" />
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="flex items-start justify-between mb-6">
                            <h1 className="text-4xl font-bold text-[#2f3e46] flex-1">{event.title}</h1>
                            {event.status === 'CANCELED' && (
                                <span className="px-4 py-2 bg-[#2f3e46] text-white rounded-full text-sm font-semibold">
                                    Annulé
                                </span>
                            )}
                            {isFull && event.status === 'PUBLISHED' && (
                                <span className="px-4 py-2 bg-[#2f3e46] text-white rounded-full text-sm font-semibold">
                                    Complet
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <p className="text-lg text-[#354f52] mb-8 leading-relaxed">
                            {event.description}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3 p-4 bg-[#cad2c5]/30 rounded-lg">
                                    <Calendar className="h-6 w-6 text-[#52796f] mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-[#52796f]">Date</p>
                                        <p className="text-[#2f3e46] font-medium">
                                            {new Date(event.date).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-4 bg-[#cad2c5]/30 rounded-lg">
                                    <Clock className="h-6 w-6 text-[#52796f] mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-[#52796f]">Heure</p>
                                        <p className="text-[#2f3e46] font-medium">
                                            {new Date(event.date).toLocaleTimeString('fr-FR', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3 p-4 bg-[#cad2c5]/30 rounded-lg">
                                    <MapPin className="h-6 w-6 text-[#52796f] mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-[#52796f]">Lieu</p>
                                        <p className="text-[#2f3e46] font-medium">{event.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-4 bg-[#cad2c5]/30 rounded-lg">
                                    <Users className="h-6 w-6 text-[#52796f] mt-1 flex-shrink-0" />
                                    <div className="w-full">
                                        <p className="text-sm text-[#52796f] mb-2">Places disponibles</p>
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-[#2f3e46] font-medium">
                                                {event.currentReservations} / {event.maxCapacity}
                                            </p>
                                            <span className="text-sm text-[#52796f]">{fillRate.toFixed(0)}%</span>
                                        </div>
                                        <div className="w-full bg-[#cad2c5] rounded-full h-3">
                                            <div
                                                className="bg-[#84a98c] h-3 rounded-full transition-all"
                                                style={{ width: `${Math.min(fillRate, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <EventActions
                            eventId={event.id}
                            canReserve={canReserve}
                            status={event.status}
                            isFull={isFull}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}