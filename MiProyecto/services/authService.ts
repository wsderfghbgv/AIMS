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
      return { success: true, token: data.token, user: data.user, message: data.message || 'Sesión iniciada con éxito.' };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Error de conexión con el servidor de autenticación.',
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
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nombre, email: correo, password: contrasenia }),
      });
      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || 'Error al registrar la cuenta.' };
      }

      await saveToken(data.token);
      await saveUserData(data.user);
      return { success: true, token: data.token, user: data.user, message: data.message || 'Cuenta creada exitosamente.' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Error de conexión con el servidor de autenticación.' };
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
