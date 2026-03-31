import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";
import { formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
}

const variantStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-destructive/10 text-destructive",
};

export function KPICard({ title, value, change, icon: Icon, variant = "default" }: KPICardProps) {
  return (
    <Card className="shadow-card border animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="kpi-label">{title}</p>
            <p className="kpi-value">{value}</p>
            {change !== undefined && (
              <p className={cn(
                "text-xs font-medium",
                change >= 0 ? "text-success" : "text-destructive"
              )}>
                {formatPercent(change)} vs mês anterior
              </p>
            )}
          </div>
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", variantStyles[variant])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
