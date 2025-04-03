"use client"
import type { ReactNode } from "react";
import React, { createContext, useState, useEffect, useContext } from "react";

import { useRouter } from "next/navigation";
import { AuthContextProps } from "@/util/types";




export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState({
    userName: '',
    userFirstName: '',
    userLastName: '',
    roleName: '',
    foto: '',
    state: 0,
    clientID: 0
  });

  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Recuperar el token y la información del usuario desde localStorage al cargar la app
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName');
    const storedUserFirstName = localStorage.getItem('userFirstName');
    const storedUserLastName = localStorage.getItem('userLastName');
    const storedRoleName = localStorage.getItem('roleName');
    const storedFoto = localStorage.getItem('foto');
    const storedStatus = localStorage.getItem('status');
    const storedClientID = localStorage.getItem('clientID');

    if (storedToken && storedUserName && storedUserFirstName && storedUserLastName && storedRoleName) {
      setToken(storedToken);
      setUser({
        userName: storedUserName,
        userFirstName: storedUserFirstName,
        userLastName: storedUserLastName,
        roleName: storedRoleName,
        foto: storedFoto ? storedFoto : '',
        state: Number(storedStatus),
        clientID: Number(storedClientID)
      });
      setIsAuthenticated(true);
    }
  }, []);

  // Método para iniciar sesión
  const login = (userName: string, userFirstName: string, userLastName: string, roleName: string, token: string, foto: string, state: number, clientID: number) => {
    setUser({ userName, userFirstName, userLastName, roleName, foto, state, clientID });
    setToken(token);
    setIsAuthenticated(true);

    // Guardar la información en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userFirstName', userFirstName);
    localStorage.setItem('userLastName', userLastName);
    localStorage.setItem('roleName', roleName);
    localStorage.setItem('foto', foto);
    localStorage.setItem('status', String(state));
    localStorage.setItem('clientID', String(clientID));

    router.push("/home"); // Redirigir a la página principal
  };

  // Método para cerrar sesión
  const logout = () => {
    setUser({ userName: '', userFirstName: '', userLastName: '', roleName: '', foto: '', state: 0, clientID: 0 });
    setToken(null);
    setIsAuthenticated(false);
    localStorage.clear(); // Borra toda la información almacenada
    router.push("/login"); // Redirigir al login
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }


  return context;
};
