"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  // Aqui você pode manter estados temporários de UI se precisar
  isSidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AppContext.Provider value={{ isSidebarOpen, setSidebarOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp deve ser usado dentro de AppProvider");
  return context;
};
