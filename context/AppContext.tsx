"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ItemEstoque {
  id: string;
  produto: string;
  quantidade: number;
  valorPago: number;
  programa: string;
  status: 'Pendente' | 'Entregue';
}

interface AppContextType {
  estoque: ItemEstoque[];
  adicionarCompra: (item: ItemEstoque) => void;
  registrarVenda: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [estoque, setEstoque] = useState<ItemEstoque[]>([]);

  const adicionarCompra = (item: ItemEstoque) => {
    setEstoque((prev) => [...prev, item]);
  };

  const registrarVenda = (id: string) => {
    // Remove o item do estoque ao vender
    setEstoque((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <AppContext.Provider value={{ estoque, adicionarCompra, registrarVenda }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp deve ser usado dentro de AppProvider");
  return context;
};
