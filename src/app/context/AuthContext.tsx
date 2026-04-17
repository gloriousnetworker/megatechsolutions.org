import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, LoginResult } from '../types';
import { api, setTokens, clearTokens } from '../utils/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  login2fa: (email: string, password: string, code: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; phone?: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.auth.me()
      .then((data) => setUser(data.user))
      .catch(() => {
        setUser(null);
        clearTokens();
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    const data = await api.auth.login({ email, password });

    if (data.requiresTwoFactor) {
      return { requiresTwoFactor: true };
    }

    if (data.accessToken) {
      setTokens(data.accessToken, data.refreshToken);
    }
    setUser(data.user);
    return { user: data.user };
  }, []);

  const login2fa = useCallback(async (email: string, password: string, code: string) => {
    const data = await api.auth.login2fa({ email, password, twoFactorCode: code });
    if (data.accessToken) {
      setTokens(data.accessToken, data.refreshToken);
    }
    setUser(data.user);
  }, []);

  const register = useCallback(async (data: { name: string; email: string; password: string; phone?: string }) => {
    const result = await api.auth.register(data);
    if (result.accessToken) {
      setTokens(result.accessToken, result.refreshToken);
    }
    setUser(result.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
    } catch {
    } finally {
      setUser(null);
      clearTokens();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, login2fa, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
