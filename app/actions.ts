"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function cadastrarCompra(formData: FormData) {
  await prisma.itemCompra.create({
    data: {
      produto: formData.get("produto") as string,
      programa: formData.get("programa") as string,
      valorPago: parseFloat(formData.get("valorPago") as string),
      pontosGanhos: parseInt(formData.get("pontos") as string),
      status: formData.get("entregue") === "on" ? "ESTOQUE" : "PENDENTE"
    }
  });
  revalidatePath("/estoque");
  revalidatePath("/");
}

export async function confirmarEntrega(id: string) {
  await prisma.itemCompra.update({
    where: { id },
    data: { status: "ESTOQUE" }
  });
  revalidatePath("/estoque");
}

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
  revalidatePath("/");
}
