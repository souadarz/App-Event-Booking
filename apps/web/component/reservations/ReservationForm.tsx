'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Users, ArrowLeft, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Event } from '@/types/event.type';
import { ErrorAlert } from '../ui/ErrorAlert';
import { createReservation } from '@/services/reservation.service';
import { ReservationSuccess } from './ReservationSuccess';


interface ReservationFormProps {
    event: Event;
}

export function ReservationForm({ event }: ReservationFormProps) {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { user } = useAuth();

    const availableSeats = event.capacity - event.currentReservations;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await createReservation(event._id);
            setSubmitted(true);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                'Une erreur est survenue lors de la réservation'
            );
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <ReservationSuccess
                eventTitle={event.title}
                userEmail={user?.email || ''}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#cad2c5]/20 to-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link
                    href={`/events/${event._id}`}
                    className="flex items-center space-x-2 text-[#52796f] hover:text-[#2f3e46] mb-6 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Retour à l&apos;événement</span>
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#cad2c5]">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#2f3e46] to-[#52796f] text-white p-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Réserver une place
                        </h1>
                        <p className="text-[#cad2c5]">{event.title}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        {error && <ErrorAlert message={error} />}

                        {/* Event Summary */}
                        <div className="bg-[#cad2c5]/30 rounded-lg p-6 mb-8">
                            <div className="flex items-start space-x-3 mb-4">
                                <Calendar className="h-5 w-5 text-[#52796f] mt-1" />
                                <div>
                                    <p className="text-sm text-[#52796f] font-medium">Date et heure</p>
                                    <p className="text-[#2f3e46] font-semibold">
                                        {new Date(event.date).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}{' '}
                                        à{' '}
                                        {new Date(event.date).toLocaleTimeString('fr-FR', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Users className="h-5 w-5 text-[#52796f] mt-1" />
                                <div>
                                    <p className="text-sm text-[#52796f] font-medium">Places disponibles</p>
                                    <p className="text-[#2f3e46] font-semibold">
                                        {availableSeats} / {event.capacity}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* User Information */}
                        <div className="space-y-6 mb-8">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <User className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-blue-800 mb-1">
                                            Informations du participant
                                        </p>
                                        <p className="text-xs text-blue-700">
                                            Chaque participant peut réserver <strong>une seule place</strong> par événement
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#52796f] mb-2">
                                    Nom complet
                                </label>
                                <input
                                    type="text"
                                    value={user?.name || ''}
                                    disabled
                                    className="w-full px-4 py-3 rounded-lg border-2 border-[#cad2c5] bg-gray-50 text-[#2f3e46] font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#52796f] mb-2">
                                    Adresse email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    className="w-full px-4 py-3 rounded-lg border-2 border-[#cad2c5] bg-gray-50 text-[#2f3e46] font-medium"
                                />
                            </div>

                            {/* Récapitulatif */}
                            <div className="bg-[#84a98c]/10 border-2 border-[#84a98c] rounded-lg p-4">
                                <h3 className="text-sm font-semibold text-[#2f3e46] mb-2">
                                    Récapitulatif de votre réservation
                                </h3>
                                <div className="space-y-1 text-sm text-[#52796f]">
                                    <p>• Événement : <strong className="text-[#2f3e46]">{event.title}</strong></p>
                                    <p>• Participant : <strong className="text-[#2f3e46]">{user?.name}</strong></p>
                                    <p>• Nombre de places : <strong className="text-[#2f3e46]">1 place</strong></p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                            <button
                                type="button"
                                onClick={() => router.push(`/events/${event._id}`)}
                                className="flex-1 px-6 py-3 bg-[#cad2c5] text-[#2f3e46] rounded-lg hover:bg-[#84a98c] hover:text-white transition-colors font-medium"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-[#84a98c] text-white rounded-lg hover:bg-[#52796f] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Envoi en cours...
                                    </span>
                                ) : (
                                    'Confirmer ma réservation'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}