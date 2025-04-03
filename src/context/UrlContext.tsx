"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UrlContextType {
  apiUrl: string;
  setApiUrl: (url: string) => void;
}

const UrlContext = createContext<UrlContextType | undefined>(undefined);

export const UrlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiUrl, setApiUrl] = useState("");

  useEffect(() => {
    const storedUrl = localStorage.getItem("apiUrl");
    if (storedUrl) {
      setApiUrl(storedUrl);
    }
  }, []);

  const updateUrl = (url: string) => {
    setApiUrl(url);
    localStorage.setItem("apiUrl", url);
  };

  return (
    <UrlContext.Provider value={{ apiUrl, setApiUrl: updateUrl }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useUrl = () => {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error("useUrl debe usarse dentro de un UrlProvider");
  }
  return context;
};
