import type { Metadata } from "next";
import { AppProvider } from "@/context/AppContext"; // Caminho com @
import "./globals.css"; // Certifique-se que o arquivo está na pasta /app
import { LayoutDashboard, ShoppingCart, Box, BadgeDollarSign } from "lucide-react";

export const metadata: Metadata = { title: "OMC Prod" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="flex bg-gray-50">
        <AppProvider>
          <aside className="w-64 h-screen bg-slate-900 text-white fixed p-4">
             <h1 className="text-xl font-bold mb-8 text-orange-500 text-center">OMC PROD</h1>
             <nav className="space-y-2">
                <a href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors"><LayoutDashboard size={20}/> Dashboard</a>
                <a href="/compras" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors"><ShoppingCart size={20}/> Compras</a>
                <a href="/estoque" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors"><Box size={20}/> Estoque</a>
                <a href="/vendas" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors"><BadgeDollarSign size={20}/> Vendas</a>
             </nav>
          </aside>
          <main className="ml-64 w-full p-8">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
