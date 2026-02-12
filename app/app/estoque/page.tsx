import { prisma } from "@/lib/prisma";
import { confirmarEntrega } from "../actions";
import { PackageCheck, Timer } from "lucide-react";

export default async function EstoquePage() {
  const itens = await prisma.itemCompra.findMany({
    where: { status: { in: ["PENDENTE", "ESTOQUE"] } },
    orderBy: { dataCompra: 'desc' }
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Gestão de Inventário</h2>
      
      <div className="grid gap-4">
        {itens.map((item) => (
          <div key={item.id} className={`p-4 rounded-lg border bg-white flex justify-between items-center ${item.status === 'ESTOQUE' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-yellow-500'}`}>
            <div>
              <h3 className="font-bold">{item.produto}</h3>
              <p className="text-sm text-gray-500">{item.programa} | {item.pontosGanhos} milhas</p>
              <div className="flex items-center gap-2 mt-1">
                {item.status === 'ESTOQUE' ? 
                  <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1"><PackageCheck size={12}/> EM ESTOQUE</span> :
                  <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex items-center gap-1"><Timer size={12}/> AGUARDANDO ENTREGA</span>
                }
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold">R$ {item.valorPago}</p>
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
