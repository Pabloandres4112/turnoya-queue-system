import React, {createContext, useContext, ReactNode} from 'react';
import {useAuth} from '../hooks';
import type {AuthContextType} from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const authData = useAuth();

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe ser usado dentro de un AuthProvider');
  }
  return context;
};
