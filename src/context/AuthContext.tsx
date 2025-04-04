"use client"
import type { ReactNode } from "react";
import React, { createContext, useState, useEffect, useContext } from "react";

import { useRouter } from "next/navigation";
import { AuthContextProps } from "@/util/types";




export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState({
    partesDiarios_usuario: '',
    partesDiarios_contrasena: '',
    partesDiarios_url: '',
   
  });

  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Recuperar el token y la información del usuario desde localStorage al cargar la app
  useEffect(() => {
    //const storedToken = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('partesDiarios_usuario');
    const storedUserFirstName = localStorage.getItem('partesDiarios_contrasena');
    const storedUserLastName = localStorage.getItem('partesDiarios_url');
   

    if (storedUserName && storedUserFirstName && storedUserLastName) {
     // setToken(storedToken);
      setUser({
        partesDiarios_usuario: storedUserName,
        partesDiarios_contrasena: storedUserFirstName,
        partesDiarios_url: storedUserLastName,
       
      });
      setIsAuthenticated(true);
    }
  }, []);

  // Método para iniciar sesión
  const login = (partesDiarios_usuario: string, partesDiarios_contrasena: string, partesDiarios_url: string) => {
    setUser({ partesDiarios_usuario, partesDiarios_contrasena, partesDiarios_url });
    setToken(token);
    setIsAuthenticated(true);

    // Guardar la información en localStorage
    //localStorage.setItem('token', token);
    localStorage.setItem('partesDiarios_usuario', partesDiarios_usuario);
    localStorage.setItem('partesDiarios_contrasena', partesDiarios_contrasena);
    localStorage.setItem('partesDiarios_url', partesDiarios_url);
   
    router.push("/home"); // Redirigir a la página principal
  };

  // Método para cerrar sesión
  const logout = () => {
    setUser({ partesDiarios_usuario: '', partesDiarios_contrasena: '', partesDiarios_url: ''});
    //setToken(null);
    setIsAuthenticated(false);
    localStorage.clear(); // Borra toda la información almacenada
    router.push("/config"); // Redirigir al login
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
