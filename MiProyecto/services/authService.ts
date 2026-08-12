import { saveToken, getToken, removeToken, saveUserData, getUserData, removeUserData } from '../utils/storage';
import { validatePassword, validateEmail, verifyEmailDomainExistence } from '../utils/validation';

export interface User {
  id: string;
  nombre: string;
  correo: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

// Configuración de URL base para la API Backend (puedes cambiarla según tu entorno)
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.tudominio.com/api';

/**
 * Servicio de Autenticación JWT y Gestión de Cuenta
 */
export const authService = {
  /**
   * Iniciar sesión de usuario y obtener JWT
   */
  async login(correo: string, contrasenia: string): Promise<AuthResponse> {
    const emailCheck = await verifyEmailDomainExistence(correo);
    if (!emailCheck.isValidFormat || !emailCheck.isNotDisposable || !emailCheck.domainExists) {
      return { success: false, message: emailCheck.message };
    }

    if (!contrasenia) {
      return { success: false, message: 'Por favor ingresa tu contraseña.' };
    }


    try {
      // Si tienes un backend real, activa este bloque de fetch:
      /*
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: correo, password: contrasenia }),
      });
      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || 'Error al iniciar sesión.' };
      }

      await saveToken(data.token);
      await saveUserData(data.user);
      return { success: true, token: data.token, user: data.user };
      */

      // --- MOCK TEMPORAL / DEMO JWT (Si aún no está enlazado el servidor) ---
      console.log('Intento de Login:', correo);
      
      // Simulación de generación de JWT Token
      const fakeJwtToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsImVtYWlsIjoi${btoa(correo)}IiwiaWF0IjoxNTE2MjM5MDIyfQ.mock_signature`;
      const user: User = {
        id: 'usr_' + Date.now(),
        nombre: correo.split('@')[0].toUpperCase(),
        correo: correo,
      };

      await saveToken(fakeJwtToken);
      await saveUserData(user);

      return {
        success: true,
        token: fakeJwtToken,
        user: user,
        message: 'Sesión iniciada con éxito.',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Error de conexión con el servidor.',
      };
    }
  },

  /**
   * Registrar nuevo usuario con validación de contraseña
   */
  async register(nombre: string, correo: string, contrasenia: string, confirmContrasenia: string): Promise<AuthResponse> {
    if (!nombre.trim()) {
      return { success: false, message: 'El nombre completo es requerido.' };
    }

    const emailCheck = await verifyEmailDomainExistence(correo);
    if (!emailCheck.isValidFormat || !emailCheck.isNotDisposable || !emailCheck.domainExists) {
      return { success: false, message: emailCheck.message };
    }

    const passValidation = validatePassword(contrasenia);

    if (!passValidation.isValid) {
      return { 
        success: false, 
        message: `La contraseña no cumple con los requisitos: ${passValidation.errors.join(', ')}` 
      };
    }

    if (contrasenia !== confirmContrasenia) {
      return { success: false, message: 'Las contraseñas no coinciden.' };
    }

    try {
      // Llamada real API:
      /*
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nombre, email: correo, password: contrasenia }),
      });
      const data = await response.json();
      if (!response.ok) return { success: false, message: data.message };
      await saveToken(data.token);
      await saveUserData(data.user);
      return { success: true, token: data.token, user: data.user };
      */

      // Mock
      const fakeJwtToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzg5MCIsImVtYWlsIjoi${btoa(correo)}IiwiaWF0IjoxNTE2MjM5MDIyfQ.mock_signature`;
      const user: User = {
        id: 'usr_' + Date.now(),
        nombre: nombre,
        correo: correo,
      };

      await saveToken(fakeJwtToken);
      await saveUserData(user);

      return {
        success: true,
        token: fakeJwtToken,
        user,
        message: 'Cuenta creada con éxito.',
      };
    } catch (error: any) {
      return { success: false, message: error.message || 'Error al conectar con el servidor.' };
    }
  },

  /**
   * Cerrar Sesión y remover JWT de expo-secure-store
   */
  async logout(): Promise<void> {
    await removeToken();
    await removeUserData();
  },

  /**
   * Obtener sesión activa al cargar la aplicación
   */
  async checkSession(): Promise<{ token: string | null; user: User | null }> {
    const token = await getToken();
    const user = await getUserData();
    return { token, user };
  },

  /**
   * Helper para realizar peticiones HTTP autenticadas con el JWT Bearer
   */
  async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const token = await getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    return fetch(url, {
      ...options,
      headers,
    });
  }
};
