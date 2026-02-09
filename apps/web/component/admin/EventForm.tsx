'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Event } from '@/types/event.type';
import { createEvent, updateEvent } from '@/services/admin.service';
import { ErrorAlert } from '../ui/ErrorAlert';
import { Input } from '../ui/Input';

interface EventFormProps {
    event?: Event;
    isEdit?: boolean;
}

export function EventForm({ event, isEdit = false }: EventFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: event?.title || '',
        description: event?.description || '',
        date: event?.date ? event.date.split('T')[0] : '',
        time: event?.date
            ? new Date(event.date).toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
            })
            : '',
        location: event?.location || '',
        capacity: event?.capacity || 50,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {


            const dateTime = new Date(`${formData.date}T${formData.time}`);

            const eventData = {
                title: formData.title,
                description: formData.description,
                date: dateTime.toISOString(),
                location: formData.location,
                capacity: Number(formData.capacity),
            };

            if (isEdit && event) {
                await updateEvent(event._id, eventData);
            } else {
                await createEvent(eventData);
            }

            router.push('/admin/dashboard');
            router.refresh();
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                `Une erreur est survenue lors de ${isEdit ? 'la modification' : 'la création'
                } de l'événement`
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#cad2c5]/20 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link
                    href="/admin/dashboard"
                    className="flex items-center space-x-2 text-[#52796f] hover:text-[#2f3e46] mb-6 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Retour au tableau de bord</span>
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#cad2c5]">
                    <div className="bg-gradient-to-r from-[#2f3e46] to-[#52796f] text-white p-8">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    {isEdit ? 'Modifier l\'événement' : 'Nouvel événement'}
                                </h1>
                                <p className="text-[#cad2c5]">
                                    {isEdit
                                        ? 'Modifiez les informations de votre événement'
                                        : 'Créez un nouvel événement pour vos participants'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {error && <ErrorAlert message={error} />}

                        <Input
                            id="title"
                            name="title"
                            label="Titre de l'événement *"
                            placeholder="Ex: Conférence Tech 2024"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-[#52796f] mb-2"
                            >
                                Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border-2 border-[#cad2c5] focus:border-[#84a98c] focus:outline-none text-[#2f3e46]"
                                placeholder="Décrivez votre événement..."
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                label="Date *"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                id="time"
                                name="time"
                                type="time"
                                label="Heure *"
                                value={formData.time}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Input
                            id="location"
                            name="location"
                            label="Lieu *"
                            placeholder="Ex: Centre de conférences, 123 Rue Example"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            id="capacity"
                            name="capacity"
                            type="number"
                            label="Capacité maximale *"
                            min="10"
                            value={formData.capacity}
                            onChange={handleChange}
                            required
                        />

                        <div className="flex space-x-4 pt-6 border-t border-[#cad2c5]">
                            <button
                                type="button"
                                onClick={() => router.push('/admin/dashboard')}
                                className="flex-1 px-6 py-3 bg-[#cad2c5] text-[#2f3e46] rounded-lg hover:bg-[#84a98c] hover:text-white transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-[#84a98c] text-white rounded-lg hover:bg-[#52796f] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading
                                    ? 'Enregistrement...'
                                    : isEdit
                                        ? 'Modifier l\'événement'
                                        : 'Créer l\'événement'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}