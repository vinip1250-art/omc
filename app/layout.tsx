import type { Metadata } from "next";
import "./globals.css";
import { LayoutDashboard, ShoppingCart, Repeat, BadgeDollarSign, Wallet } from "lucide-react";

export const metadata: Metadata = {
  title: "OMC Prod - Gestão de Milhas",
  description: "Sistema de Gestão de Compras e Revenda",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20}/>, href: '/' },
    { name: 'Contas/Programas', icon: <Wallet size={20}/>, href: '#' },
    { name: 'Compras/Estoque', icon: <ShoppingCart size={20}/>, href: '#' },
    { name: 'Transferências', icon: <Repeat size={20}/>, href: '#' },
    { name: 'Vendas/Revenda', icon: <BadgeDollarSign size={20}/>, href: '#' },
  ];

  return (
    <html lang="pt-br">
      <body className="flex bg-gray-50 text-gray-900">
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
      </body>
    </html>
  );
}
