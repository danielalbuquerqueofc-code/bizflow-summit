import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";

const recentSales = [
  { id: "1", cliente: "Maria Silva", produto: "Kit Premium", valor: 1250.00, status: "aprovado" },
  { id: "2", cliente: "João Santos", produto: "Pacote Básico", valor: 480.00, status: "pendente" },
  { id: "3", cliente: "Ana Oliveira", produto: "Serviço Mensal", valor: 890.00, status: "aprovado" },
  { id: "4", cliente: "Pedro Costa", produto: "Produto A", valor: 320.00, status: "faturado" },
  { id: "5", cliente: "Lucia Ferreira", produto: "Consultoria", valor: 2100.00, status: "aprovado" },
];

const statusMap: Record<string, string> = {
  aprovado: "status-success",
  pendente: "status-warning",
  faturado: "status-info",
  cancelado: "status-danger",
};

const statusLabels: Record<string, string> = {
  aprovado: "Aprovado",
  pendente: "Pendente",
  faturado: "Faturado",
  cancelado: "Cancelado",
};

export function RecentSalesTable() {
  return (
    <Card className="shadow-card border animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Últimas Vendas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentSales.map((sale) => (
            <div key={sale.id} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{sale.cliente}</p>
                <p className="text-xs text-muted-foreground truncate">{sale.produto}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={statusMap[sale.status]}>
                  {statusLabels[sale.status]}
                </span>
                <span className="text-sm font-semibold w-24 text-right">
                  {formatCurrency(sale.valor)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
