'use client';

import Link from 'next/link';
import { Edit, Trash2, Plus, Upload, X } from 'lucide-react';
import { Event } from '@/types/event.type';

interface EventsTableProps {
  events: Event[];
  onDelete: (eventId: string) => void;
  onPublish: (eventId: string) => void;
  onCancel: (eventId: string) => void;
}

export function EventsTable({ events, onDelete, onPublish, onCancel}: EventsTableProps) {
  const handleDelete = (eventId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      onDelete(eventId);
    }
  };

  const handlePublish = (eventId: string) => {
    onPublish(eventId);
  }

  const handleCancel = (eventId: string) => {
    onCancel(eventId)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#2f3e46]">
          Gestion des événements
        </h2>
        <Link
          href="/admin/events/create"
          className="flex items-center space-x-2 px-4 py-2 bg-[#84a98c] text-white rounded-lg hover:bg-[#52796f] transition-colors shadow-md"
        >
          <Plus className="h-5 w-5" />
          <span>Nouvel événement</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#cad2c5]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#2f3e46] text-white">
              <tr>
                <th className="px-6 py-4 text-left">Titre</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Lieu</th>
                <th className="px-6 py-4 text-left">Capacité</th>
                <th className="px-6 py-4 text-left">Statut</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cad2c5]">
              {events.map((event) => (
                <tr
                  key={event._id}
                  className="hover:bg-[#cad2c5]/20 transition-colors"
                >
                  <td className="px-6 py-4 text-[#2f3e46] font-medium">
                    {event.title}
                  </td>
                  <td className="px-6 py-4 text-[#52796f] text-sm">
                    {new Date(event.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-[#52796f] text-sm">
                    {event.location.substring(0, 30)}
                    {event.location.length > 30 && '...'}
                  </td>
                  <td className="px-6 py-4 text-[#52796f] text-sm">
                    {event.currentReservations} / {event.capacity}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${event.status === 'PUBLISHED'
                          ? 'bg-[#84a98c] text-white'
                          : event.status === 'DRAFT'
                            ? 'bg-[#cad2c5] text-[#2f3e46]'
                            : 'bg-[#2f3e46] text-white'
                        }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/events/edit/${event._id}`}
                        className="p-2 text-[#84a98c] hover:bg-[#84a98c] hover:text-white rounded transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="p-2 text-[#2f3e46] hover:bg-[#2f3e46] hover:text-white rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handlePublish(event._id)}
                        className="p-2 text-[#2f3e46] hover:bg-[#2f3e46] hover:text-white rounded transition-colors"
                      >
                        publier
                      </button>
                      <button
                        onClick={() => handleCancel(event._id)}
                        className="p-2 text-[#2f3e46] hover:bg-[#2f3e46] hover:text-white rounded transition-colors"
                      >
                        <X  className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}