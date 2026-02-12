"use client";
import { useState, useEffect } from "react";
import { registrarVenda } from "../actions"; // Ajuste se actions estiver em /app
import { BadgeDollarSign, ShoppingCart } from "lucide-react";

export default function VendasPage() {
  const [itensEstoque, setItensEstoque] = useState<any[]>([]);

  // Simulação de busca (no futuro trocar por uma Action que busca do banco)
  // Por enquanto, o formulário enviará o ID para a Server Action
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BadgeDollarSign className="text-green-600" /> Registrar Venda
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form action={registrarVenda} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Selecione o Item do Estoque</label>
              <select name="itemId" required className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Selecione um produto...</option>
                {/* Aqui os itens do Supabase aparecerão */}
              </select>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Valor da Venda (R$)</label>
              <input name="valorVenda" type="number" step="0.01" required placeholder="0.00" className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>

          <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors">
            Confirmar Venda e Dar Baixa
          </button>
        </form>
      </div>
    </div>
  );
}
