'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-[#2f3e46] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Calendar className="h-8 w-8 text-[#84a98c]" />
              <span className="text-xl font-bold text-white">EventBooking</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' ? (
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-[#52796f] text-white hover:bg-[#354f52] transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <Link
                    href="/participant/reservations"
                    className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-[#52796f] text-white hover:bg-[#354f52] transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Mes Réservations</span>
                  </Link>
                )}
                <div className="flex items-center space-x-2 px-3 py-2 bg-[#354f52] rounded-lg">
                  <User className="h-4 w-4 text-[#cad2c5]" />
                  <span className="text-sm text-[#cad2c5]">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-[#84a98c] text-white hover:bg-[#52796f] transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg bg-[#84a98c] text-white hover:bg-[#52796f] transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-[#52796f] text-white hover:bg-[#354f52] transition-colors"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}