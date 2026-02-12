export default function Home() {
  const stats = [
    { label: "Milhas em Estoque", value: "1.250.000", color: "text-blue-600" },
    { label: "Investimento Total", value: "R$ 15.400,00", color: "text-red-600" },
    { label: "Lucro Estimado", value: "R$ 4.200,00", color: "text-green-600" },
    { label: "CPM Médio", value: "R$ 14,20", color: "text-orange-600" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Visão Geral</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold mb-4">Últimas Movimentações (Excel Sync)</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-400 text-sm">
              <th className="pb-3">Data</th>
              <th className="pb-3">Programa</th>
              <th className="pb-3">Operação</th>
              <th className="pb-3">Quantidade</th>
              <th className="pb-3">Valor</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b">
              <td className="py-3">12/02/2026</td>
              <td className="py-3 font-medium text-blue-500">Livelo</td>
              <td className="py-3 text-green-600 font-semibold">Compra Bonificada</td>
              <td className="py-3 text-gray-600">50.000 pts</td>
              <td className="py-3 text-gray-600">R$ 1.750,00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
