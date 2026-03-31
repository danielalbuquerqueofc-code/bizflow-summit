import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "01", receitas: 4200, despesas: 2400 },
  { name: "05", receitas: 3800, despesas: 2200 },
  { name: "10", receitas: 5100, despesas: 2800 },
  { name: "15", receitas: 4600, despesas: 3100 },
  { name: "20", receitas: 6200, despesas: 2900 },
  { name: "25", receitas: 5800, despesas: 3400 },
  { name: "30", receitas: 7100, despesas: 3200 },
];

export function RevenueChart() {
  return (
    <Card className="shadow-card border animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Receitas vs Despesas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 50%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 50%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(214, 20%, 90%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="receitas"
                stroke="hsl(217, 91%, 60%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorReceitas)"
                name="Receitas"
              />
              <Area
                type="monotone"
                dataKey="despesas"
                stroke="hsl(0, 72%, 51%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorDespesas)"
                name="Despesas"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
