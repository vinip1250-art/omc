"use client";
import { useState } from "react";
import { BadgeDollarSign, TrendingUp, Wallet2 } from "lucide-react";

export default function VendasPage() {
  const [qtdMilhas, setQtdMilhas] = useState<number>(0);
  const [valorVenda, setValorVenda] = useState<number>(0);
  const [cpmMedio, setCpmMedio] = useState<number>(14.50); // Valor de exemplo que viria do seu banco/dashboard

  // Cálculos de Rentabilidade
  const faturamentoBruto = valorVenda;
  const custoTotal = (qtdMilhas / 1000) * cpmMedio;
  const lucroLiquido = faturamentoBruto - custoTotal;
  const margemLucro = faturamentoBruto > 0 ? (lucroLiquido / faturamentoBruto) * 100 : 0;

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <BadgeDollarSign className="text-green-600" /> Registro de Venda / Resgate
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário de Venda */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Plataforma / Comprador</label>
                <select className="border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none">
                  <option>HotMilhas</option>
                  <option>MaxMilhas</option>
                  <option>Particular (Balcão)</option>
                  <option>Emissão Própria</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Programa</label>
                <select className="border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none">
                  <option>Azul (Interline)</option>
                  <option>Smiles</option>
                  <option>Latam Pass</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Qtd. de Milhas Vendidas</label>
                <input 
                  type="number" 
                  placeholder="Ex: 100000"
                  onChange={(e) => setQtdMilhas(Number(e.target.value))}
                  className="border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" 
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Valor Total Recebido (R$)</label>
                <input 
                  type="number" 
                  placeholder="0,00"
                  onChange={(e) => setValorVenda(Number(e.target.value))}
                  className="border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none" 
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Custo Médio (CPM) Atualizado</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={cpmMedio}
                  onChange={(e) => setCpmMedio(Number(e.target.value))}
                  className="border rounded-lg p-2 bg-gray-50 w-32 font-bold text-gray-700" 
                />
                <span className="text-xs text-gray-400">Puxado automaticamente do estoque</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 transition-all shadow-md">
              Confirmar Venda e Baixar Estoque
            </button>
          </div>
        </div>

        {/* Resumo de Lucratividade */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
             <div className="absolute top-0 right-0 p-2 opacity-10">
                <TrendingUp size={80} />
             </div>
             <p className="text-gray-500 text-sm font-medium italic">Resultado da Operação</p>
             <div className="mt-4">
                <p className="text-sm text-gray-400">Lucro Líquido</p>
                <p className={`text-3xl font-black ${lucroLiquido >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {lucroLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
             </div>
             
             <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <p className="text-[10px] uppercase text-gray-400">Margem</p>
                  <p className="font-bold text-gray-700">{margemLucro.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-400">Custo Total</p>
                  <p className="font-bold text-gray-700">R$ {custoTotal.toFixed(2)}</p>
                </div>
             </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
             <p className="text-orange-800 text-xs font-bold flex items-center gap-1 uppercase">
                <Wallet2 size={14}/> Dica de Especialista
             </p>
             <p className="text-orange-700 text-xs mt-2">
                Para essa venda ser lucrativa com seu CPM atual, o valor mínimo de milheiro deve ser superior a <strong>R$ {cpmMedio.toFixed(2)}</strong>.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
