import {useState, useEffect} from 'react';
import {userAPI} from '../api';
import type {User, UseAuthReturn} from '../types';

/**
 * Hook personalizado para gestionar la autenticación del usuario/negocio
 * @returns {UseAuthReturn} Estado y métodos de autenticación
 */
export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Verifica si hay una sesión activa almacenada
   */
  const checkAuth = async (): Promise<void> => {
    try {
      setLoading(true);
      // TODO: Verificar si hay sesión activa desde AsyncStorage
      // const token = await AsyncStorage.getItem('authToken');
      // if (token) { setIsAuthenticated(true); }
      setLoading(false);
    } catch (err) {
      console.error('Error checking auth:', err);
      setError('Error al verificar autenticación');
      setLoading(false);
    }
  };

  /**
   * Inicia sesión del usuario/propietario del negocio
   */
  const login = async (businessName: string, whatsappNumber: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await userAPI.createUser({businessName, whatsappNumber});
      const userData = response.data;

      // TODO: Guardar token y datos en AsyncStorage
      // await AsyncStorage.setItem('authToken', userData.token);
      // await AsyncStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(errorMessage);
      console.error('Error logging in:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cierra sesión del usuario actual
   */
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);

      // TODO: Eliminar datos de AsyncStorage
      // await AsyncStorage.removeItem('authToken');
      // await AsyncStorage.removeItem('user');

      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cerrar sesión';
      setError(errorMessage);
      console.error('Error logging out:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
  };
};
