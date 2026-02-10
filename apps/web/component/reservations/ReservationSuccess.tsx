'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle, Clock, Mail, Calendar } from 'lucide-react';

interface ReservationSuccessProps {
  eventTitle: string;
  userEmail: string;
}

export function ReservationSuccess({
  eventTitle,
  userEmail,
}: ReservationSuccessProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#cad2c5]/20 to-white flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-[#cad2c5]">
          {/* Icon de succès */}
          <div className="flex justify-center mb-6">
            <div className="bg-[#84a98c] rounded-full p-4">
              <CheckCircle className="h-16 w-16 text-white" />
            </div>
          </div>

          {/* Titre */}
          <h2 className="text-3xl font-bold text-[#2f3e46] mb-4">
            Demande envoyée !
          </h2>

          {/* Message principal */}
          <p className="text-[#52796f] mb-6 text-lg">
            Votre demande de réservation pour l&apos;événement{' '}
            <strong className="text-[#2f3e46]">{eventTitle}</strong> a été envoyée
            avec succès.
          </p>

          {/* Statut en attente */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <p className="text-sm font-semibold text-yellow-800">
                En attente de confirmation
              </p>
            </div>
            <p className="text-xs text-yellow-700">
              Votre réservation sera examinée par l&apos;administrateur
            </p>
          </div>

          {/* Information email */}
          <div className="bg-[#cad2c5]/30 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Mail className="h-5 w-5 text-[#52796f]" />
              <p className="text-sm font-medium text-[#52796f]">
                Notification par email
              </p>
            </div>
            <p className="text-xs text-[#52796f] mb-2">
              Vous recevrez un email à :
            </p>
            <p className="text-[#2f3e46] font-semibold text-sm">{userEmail}</p>
            <p className="text-xs text-[#52796f] mt-2">
              Une fois votre réservation <strong>confirmée</strong> par l&apos;administrateur
            </p>
          </div>

          {/* Info nombre de places */}
          <div className="flex items-start space-x-2 bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
            <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 text-left">
              <strong>Rappel :</strong> Cette réservation correspond à{' '}
              <strong>1 place</strong> pour cet événement.
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            <button
              onClick={() => router.push('/participant/reservations')}
              className="w-full px-6 py-3 bg-[#84a98c] text-white rounded-lg hover:bg-[#52796f] transition-colors shadow-md hover:shadow-lg font-medium"
            >
              Voir mes réservations
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full px-6 py-3 bg-[#cad2c5] text-[#2f3e46] rounded-lg hover:bg-[#84a98c] hover:text-white transition-colors font-medium"
            >
              Retour aux événements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}