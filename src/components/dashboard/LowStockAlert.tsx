import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Package } from "lucide-react";

const lowStockItems = [
  { nome: "Produto A", estoque: 3, minimo: 10 },
  { nome: "Kit Premium", estoque: 1, minimo: 5 },
  { nome: "Material B", estoque: 8, minimo: 15 },
  { nome: "Componente X", estoque: 2, minimo: 10 },
];

export function LowStockAlert() {
  return (
    <Card className="shadow-card border animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <CardTitle className="text-sm font-semibold">Estoque Crítico</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          {lowStockItems.map((item, i) => {
            const pct = Math.round((item.estoque / item.minimo) * 100);
            return (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">{item.nome}</span>
                  </div>
                  <span className="text-xs font-medium text-destructive">
                    {item.estoque}/{item.minimo} un
                  </span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-danger transition-all"
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
