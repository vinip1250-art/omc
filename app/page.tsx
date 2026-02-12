import { prisma } from "../lib/prisma";
import { Wallet, TrendingUp, Package, AlertCircle } from "lucide-react";

export default async function Dashboard() {
  // Busca dados reais do Supabase
  const estoque = await prisma.itemCompra.findMany({
    where: { status: "ESTOQUE" }
  });

  const vendas = await prisma.venda.findMany({
    include: { itemCompra: true }
  });

  // Cálculos
  const totalMilhas = estoque.reduce((acc, curr) => acc + curr.pontosGanhos, 0);
  const investimentoEstoque = estoque.reduce((acc, curr) => acc + curr.valorPago, 0);
  
  const lucroTotal = vendas.reduce((acc, curr) => {
    const lucroOperacao = curr.valorVenda - curr.itemCompra.valorPago;
    return acc + lucroOperacao;
  }, 0);

  const stats = [
    { label: "Milhas em Estoque", value: totalMilhas.toLocaleString(), icon: <Package size={20}/>, color: "text-blue-600" },
    { label: "Investimento Atual", value: `R$ ${investimentoEstoque.toFixed(2)}`, icon: <Wallet size={20}/>, color: "text-slate-600" },
    { label: "Lucro Realizado", value: `R$ ${lucroTotal.toFixed(2)}`, icon: <TrendingUp size={20}/>, color: "text-green-600" },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-black text-slate-800">Painel OMC Prod</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-slate-50 ${s.color}`}>{s.icon}</div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{s.label}</p>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex gap-3 items-center">
        <AlertCircle className="text-orange-500" />
        <p className="text-sm text-orange-800">
          Você tem <strong>{estoque.length}</strong> itens prontos para revenda no estoque.
        </p>
      </div>
    </div>
  );
}
