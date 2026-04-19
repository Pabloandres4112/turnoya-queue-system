/**
 * Client-side validation utilities.
 * Each function returns an error message string or null if valid.
 */

export const validateEmail = (value: string): string | null => {
  if (!value.trim()) {
    return 'El correo electronico es requerido';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.trim())) {
    return 'Ingresa un correo electronico valido';
  }
  return null;
};

export const validatePassword = (value: string): string | null => {
  if (!value) {
    return 'La contrasena es requerida';
  }
  if (value.length < 6) {
    return 'La contrasena debe tener al menos 6 caracteres';
  }
  return null;
};

export const validatePasswordConfirm = (
  password: string,
  confirm: string,
): string | null => {
  if (!confirm) {
    return 'Confirma tu contrasena';
  }
  if (password !== confirm) {
    return 'Las contrasenas no coinciden';
  }
  return null;
};

export const validatePhoneNumber = (value: string): string | null => {
  if (!value.trim()) {
    return 'El numero de telefono es requerido';
  }
  // Accept digits and leading +, between 7-15 digits
  const phoneRegex = /^\+?[0-9]{7,15}$/;
  if (!phoneRegex.test(value.replace(/[\s\-()]/g, ''))) {
    return 'Ingresa un numero de telefono valido (7-15 digitos)';
  }
  return null;
};

export const validateName = (
  value: string,
  fieldName = 'El nombre',
): string | null => {
  if (!value.trim()) {
    return `${fieldName} es requerido`;
  }
  if (value.trim().length < 3) {
    return `${fieldName} debe tener al menos 3 caracteres`;
  }
  if (value.trim().length > 100) {
    return `${fieldName} no puede superar 100 caracteres`;
  }
  return null;
};

export const validateRequired = (
  value: string,
  fieldName = 'Este campo',
): string | null => {
  if (!value.trim()) {
    return `${fieldName} es requerido`;
  }
  return null;
};

export const validatePositiveNumber = (
  value: string | number,
  fieldName = 'El valor',
): string | null => {
  const num = typeof value === 'string' ? parseInt(value, 10) : value;
  if (isNaN(num) || num <= 0) {
    return `${fieldName} debe ser un numero positivo`;
  }
  return null;
};
