import {useState, useEffect} from 'react';
import {userAPI} from '../api';

export interface User {
  id: string;
  businessName: string;
  whatsappNumber: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      // TODO: Verificar si hay sesión activa desde AsyncStorage
      setLoading(false);
    } catch (err) {
      console.error('Error checking auth:', err);
      setError('Error al verificar autenticación');
      setLoading(false);
    }
  };

  const login = async (businessName: string, whatsappNumber: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await userAPI.createUser({businessName, whatsappNumber});
      // TODO: Guardar token y datos en AsyncStorage
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (err) {
      setError('Error al iniciar sesión');
      console.error('Error logging in:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // TODO: Limpiar AsyncStorage
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Error logging out:', err);
      setError('Error al cerrar sesión');
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    checkAuth,
  };
};
