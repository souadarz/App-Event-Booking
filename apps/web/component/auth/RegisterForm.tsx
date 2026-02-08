'use client';

import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ErrorAlert } from '../ui/ErrorAlert';
import { Input } from '../ui/Input';

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    try {
      const success = await register(formData.name, formData.email, formData.password);
      if (!success) {
        setError('Une erreur est survenue lors de l\'inscription');
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
        id="name"
        name="name"
        type="text"
        label="Nom complet"
        placeholder="Jean Dupont"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Adresse email"
        placeholder="votre@email.com"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Mot de passe"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        required
        minLength={6}
        helperText="Minimum 6 caractères"
      />

      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirmer le mot de passe"
        placeholder="••••••••"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-[#84a98c] text-white rounded-lg hover:bg-[#52796f] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <UserPlus className="h-5 w-5" />
        <span>{loading ? 'Inscription...' : 'S\'inscrire'}</span>
      </button>
    </form>
  );
}