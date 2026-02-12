"use server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// 1. Criar Compra (Pode iniciar como PENDENTE ou ESTOQUE)
export async function cadastrarCompra(formData: FormData) {
  const status = formData.get("entregue") === "on" ? "ESTOQUE" : "PENDENTE";
  
  await prisma.itemCompra.create({
    data: {
      produto: formData.get("produto") as string,
      programa: formData.get("programa") as string,
      valorPago: parseFloat(formData.get("valor") as string),
      pontosGanhos: parseInt(formData.get("pontos") as string),
      status: status
    }
  });
  revalidatePath("/estoque");
}

// 2. Marcar como Entregue (Move de Pendente para Estoque)
export async function confirmarEntrega(id: string) {
  await prisma.itemCompra.update({
    where: { id },
    data: { status: "ESTOQUE" }
  });
  revalidatePath("/estoque");
}

// 3. Registrar Venda (Muda status para VENDIDO e cria registro de venda)
export async function registrarVenda(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const valorVenda = parseFloat(formData.get("valorVenda") as string);

  await prisma.$transaction([
    prisma.venda.create({
      data: {
        itemCompraId: itemId,
        valorVenda: valorVenda
      }
    }),
    prisma.itemCompra.update({
      where: { id: itemId },
      data: { status: "VENDIDO" }
    })
  ]);

  revalidatePath("/estoque");
  revalidatePath("/vendas");
}
