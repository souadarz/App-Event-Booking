'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { AuthResponse, User } from '@/types/auth.type';
import apiClient from '@/lib/axios.client';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = () => {
      try {
        const token = Cookies.get('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser && storedUser !== 'undefined') {
          setUser(JSON.parse(storedUser));
        } else {
          localStorage.removeItem('user');
          Cookies.remove('token');
          setUser(null);
        }
      } catch (error) {
        console.error('Impossible de parser le user:', error);
        localStorage.removeItem('user');
        Cookies.remove('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);


  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', {
        email,
        password,
      });

      const { access_token, user: userData } = response.data;

      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
        Cookies.set('token', access_token, { expires: 7 });
      }

      setUser(userData);

      if (userData.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }

      return true;
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', {
        name,
        email,
        password,
      });

      const { access_token, user: userData } = response.data;

      Cookies.set('token', access_token, { expires: 7 });
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      router.push('/dashboard');

      return true;
    } catch (error: any) {
      console.error('Erreur d\'inscription:', error);
      return false;
    }
  };

  const logout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}