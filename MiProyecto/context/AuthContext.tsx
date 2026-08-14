import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, User, AuthResponse } from '../services/authService';

interface AuthContextData {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (correo: string, pass: string) => Promise<AuthResponse>;
  register: (nombre: string, correo: string, pass: string, confirmPass: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Al montar el proveedor, verificar si hay un JWT y sesión previa en SecureStore
  useEffect(() => {
    async function loadStoredSession() {
      try {
        const session = await authService.checkSession();
        if (session.token && session.user) {
          setToken(session.token);
          setUser(session.user);
        }
      } catch (e) {
        console.error('Error cargando sesión almacenada:', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadStoredSession();
  }, []);

  const login = async (correo: string, pass: string): Promise<AuthResponse> => {
    setIsLoading(true);
    const res = await authService.login(correo, pass);
    if (res.success && res.token && res.user) {
      setToken(res.token);
      setUser(res.user);
    }
    setIsLoading(false);
    return res;
  };

  const register = async (
    nombre: string,
    correo: string,
    pass: string,
    confirmPass: string
  ): Promise<AuthResponse> => {
    setIsLoading(true);
    const res = await authService.register(nombre, correo, pass, confirmPass);
    if (res.success && res.token && res.user) {
      setToken(res.token);
      setUser(res.user);
    }
    setIsLoading(false);
    return res;
  };

  const logout = async () => {
    setIsLoading(true);
    await authService.logout();
    setToken(null);
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
