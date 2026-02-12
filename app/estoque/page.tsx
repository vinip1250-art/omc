import { prisma } from "../../lib/prisma";
import { confirmarEntrega } from "../actions";
import { PackageCheck, Timer } from "lucide-react";

export default async function EstoquePage() {
  const itens = await prisma.itemCompra.findMany({
    where: { status: { in: ["PENDENTE", "ESTOQUE"] } },
    orderBy: { dataCompra: 'desc' }
  });

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Meu Inventário</h2>
      <div className="grid gap-4">
        {itens.map((item) => (
          <div key={item.id} className={`p-4 rounded-lg border bg-white flex justify-between items-center ${item.status === 'ESTOQUE' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-yellow-500'}`}>
            <div>
              <h3 className="font-bold text-gray-800">{item.produto}</h3>
              <p className="text-sm text-gray-500">{item.programa} | {item.pontosGanhos.toLocaleString()} milhas</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">R$ {item.valorPago.toFixed(2)}</p>
              {item.status === 'PENDENTE' && (
                <form action={async () => { "use server"; await confirmarEntrega(item.id); }}>
                  <button className="text-xs text-blue-600 underline mt-2">Confirmar Recebimento</button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
