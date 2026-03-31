import { AppLayout } from "@/components/layout/AppLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentSalesTable } from "@/components/dashboard/RecentSalesTable";
import { LowStockAlert } from "@/components/dashboard/LowStockAlert";
import { formatCurrency } from "@/lib/format";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
} from "lucide-react";

const Dashboard = () => {
  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Faturamento"
            value={formatCurrency(48250)}
            change={12.5}
            icon={DollarSign}
            variant="primary"
          />
          <KPICard
            title="Vendas do Mês"
            value="127"
            change={8.2}
            icon={ShoppingCart}
            variant="success"
          />
          <KPICard
            title="Novos Clientes"
            value="23"
            change={-3.1}
            icon={Users}
            variant="warning"
          />
          <KPICard
            title="Ticket Médio"
            value={formatCurrency(380)}
            change={4.7}
            icon={TrendingUp}
            variant="primary"
          />
        </div>

        {/* Charts and tables */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <LowStockAlert />
        </div>

        <RecentSalesTable />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
