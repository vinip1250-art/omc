import type { Metadata } from "next";
import { AppProvider } from "../context/AppContext"; // Caminho corrigido
import "./globals.css";
import { LayoutDashboard, ShoppingCart, Box, BadgeDollarSign, Wallet } from "lucide-react";

export const metadata: Metadata = {
  title: "OMC Prod - Gestão de Milhas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20}/>, href: '/' },
    { name: 'Compras/Pedidos', icon: <ShoppingCart size={20}/>, href: '/compras' },
    { name: 'Meu Estoque', icon: <Box size={20}/>, href: '/estoque' },
    { name: 'Vendas/Revenda', icon: <BadgeDollarSign size={20}/>, href: '/vendas' },
  ];

  return (
    <html lang="pt-br">
      <body className="flex bg-gray-50 text-gray-900">
        <AppProvider>
          <aside className="w-64 h-screen bg-slate-900 text-white fixed p-4">
            <h1 className="text-xl font-bold mb-8 text-orange-500">OMC PROD</h1>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <a key={item.name} href={item.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                  {item.icon} {item.name}
                </a>
              ))}
            </nav>
          </aside>
          <main className="ml-64 w-full p-8">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
