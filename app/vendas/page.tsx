import { prisma } from "../../lib/prisma";
import { registrarVenda } from "../actions";
import { BadgeDollarSign } from "lucide-react";

export default async function VendasPage() {
  const estoqueDisponivel = await prisma.itemCompra.findMany({
    where: { status: "ESTOQUE" }
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <BadgeDollarSign className="text-green-600" /> Registrar Venda
      </h2>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <form action={registrarVenda} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Item do Estoque</label>
            <select name="itemId" required className="border border-gray-300 rounded-lg p-3 bg-gray-50">
              <option value="">Selecione um produto...</option>
              {estoqueDisponivel.map(item => (
                <option key={item.id} value={item.id}>
                  {item.produto} (R$ {item.valorPago})
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Valor da Venda (R$)</label>
            <input name="valorVenda" type="number" step="0.01" required className="border border-gray-300 rounded-lg p-3 bg-gray-50" />
          </div>
          <button type="submit" className="w-full bg-green-700 text-white font-bold py-4 rounded-lg hover:bg-green-800 transition-all">
            Confirmar Venda e Dar Baixa
          </button>
        </form>
      </div>
    </div>
  );
}
