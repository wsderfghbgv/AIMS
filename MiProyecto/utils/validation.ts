export interface PasswordRequirements {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export interface PasswordValidationResult {
  isValid: boolean;
  score: number; // 0 a 5
  strengthText: 'Muy Débil' | 'Débil' | 'Aceptable' | 'Fuerte' | 'Excelente';
  strengthColor: string;
  requirements: PasswordRequirements;
  errors: string[];
}

/**
 * Valida si un correo electrónico tiene un formato válido
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Valida una contraseña según criterios de seguridad exigidos
 */
export function validatePassword(password: string): PasswordValidationResult {
  const requirements: PasswordRequirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const errors: string[] = [];
  if (!requirements.minLength) errors.push('Mínimo 8 caracteres');
  if (!requirements.hasUppercase) errors.push('Al menos una letra mayúscula');
  if (!requirements.hasLowercase) errors.push('Al menos una letra minúscula');
  if (!requirements.hasNumber) errors.push('Al menos un número');
  if (!requirements.hasSpecialChar) errors.push('Al menos un carácter especial (!@#$%^&*)');

  const fulfilledCount = Object.values(requirements).filter(Boolean).length;

  let strengthText: PasswordValidationResult['strengthText'] = 'Muy Débil';
  let strengthColor = '#EF4444'; // Rojo

  if (fulfilledCount === 5) {
    strengthText = 'Excelente';
    strengthColor = '#10B981'; // Verde
  } else if (fulfilledCount === 4) {
    strengthText = 'Fuerte';
    strengthColor = '#3B82F6'; // Azul
  } else if (fulfilledCount === 3) {
    strengthText = 'Aceptable';
    strengthColor = '#F59E0B'; // Naranja/Amarillo
  } else if (fulfilledCount === 2) {
    strengthText = 'Débil';
    strengthColor = '#F97316'; // Naranja oscuro
  }

  return {
    isValid: errors.length === 0,
    score: fulfilledCount,
    strengthText,
    strengthColor,
    requirements,
    errors,
  };
}

/**
 * Valida la coincidencia entre la contraseña y la confirmación
 */
export function validatePasswordMatch(password: string, confirmPassword: string): boolean {
  return password.length > 0 && password === confirmPassword;
}
