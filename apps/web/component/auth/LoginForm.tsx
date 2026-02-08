'use client';

import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '../ui/Input';
import { ErrorAlert } from '../ui/ErrorAlert';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorAlert message={error} />}

      <Input
        id="email"
        type="email"
        label="Adresse email"
        placeholder="votre@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        id="password"
        type="password"
        label="Mot de passe"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-[#84a98c] text-white rounded-lg hover:bg-[#52796f] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <LogIn className="h-5 w-5" />
        <span>{loading ? 'Connexion...' : 'Se connecter'}</span>
      </button>
    </form>
  );
}