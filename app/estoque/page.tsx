"use client";
import { useApp } from "@/context/AppContext";
import { Box, AlertCircle } from "lucide-react";

export default function EstoquePage() {
  const { estoque } = useApp();
  const itensDisponiveis = estoque.filter(item => item.status === 'Entregue');

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Box className="text-orange-500" /> Itens em Estoque (Pronto para Revenda)
      </h2>

      {itensDisponiveis.length === 0 ? (
        <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 text-center">
          <AlertCircle className="mx-auto text-blue-400 mb-2" size={40} />
          <p className="text-blue-700">Seu estoque está vazio. Cadastre uma compra e marque como "Entregue".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {itensDisponiveis.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-800">{item.produto}</h4>
                  <p className="text-xs text-gray-500">{item.programa} - {item.quantidade.toLocaleString()} milhas</p>
                </div>
                <span className="text-lg font-black text-slate-700">R$ {item.valorPago}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
