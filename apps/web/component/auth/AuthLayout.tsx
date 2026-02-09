'use client';

import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLink,
  footerLinkText,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f3e46] via-[#52796f] to-[#84a98c] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
          <p className="text-[#cad2c5]">{subtitle}</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {children}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#52796f]">
              {footerText}{' '}
              <Link href={footerLink} className="text-[#84a98c] hover:text-[#52796f] hover:underline">
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-[#cad2c5] hover:text-white text-sm transition-colors">
            Retour à la page d&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}