"use client";
import { useState } from "react";
import { Save, Plus, Calculation } from "lucide-react";

export default function ComprasPage() {
  const [valorPago, setValorPago] = useState<number>(0);
  const [pontos, setPontos] = useState<number>(0);

  // Cálculo automático do CPM (Custo por Milheiro)
  const cpm = pontos > 0 ? (valorPago / (pontos / 1000)) : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Nova Compra Bonificada</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Formulário */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Produto / Descrição</label>
                <input type="text" placeholder="Ex: iPhone 15 Pro" className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Programa de Origem</label>
                <select className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-500 outline-none">
                  <option>Livelo</option>
                  <option>Esfera</option>
                  <option>Pão de Açúcar</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Valor Pago (R$)</label>
                <input 
                  type="number" 
                  onChange={(e) => setValorPago(Number(e.target.value))}
                  placeholder="0,00" 
                  className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-500 outline-none" 
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Pontos Acumulados</label>
                <input 
                  type="number" 
                  onChange={(e) => setPontos(Number(e.target.value))}
                  placeholder="Ex: 50000" 
                  className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-500 outline-none" 
                />
              </div>
            </div>

            <button type="button" className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
              <Save size={20} /> Salvar no Estoque
            </button>
          </form>
        </div>

        {/* Card de Resumo Dinâmico (Substitui fórmulas do Excel) */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
          <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Custo Real</p>
          <h3 className="text-4xl font-black text-orange-400">
            {cpm.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </h3>
          <p className="text-xs text-slate-400 mt-2 italic">
            * Valor por cada 1.000 pontos
          </p>
          
          <div className="mt-6 pt-6 border-t border-slate-700 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Total Pontos:</span>
              <span className="font-bold">{pontos.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Investido:</span>
              <span className="font-bold">R$ {valorPago.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
