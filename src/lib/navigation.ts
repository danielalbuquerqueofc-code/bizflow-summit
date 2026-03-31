import {
  LayoutDashboard,
  Package,
  Users,
  UserCheck,
  ShoppingCart,
  FileText,
  ClipboardList,
  Warehouse,
  ArrowDownUp,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Landmark,
  Receipt,
  FileSpreadsheet,
  Truck,
  Wrench,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navigationGroups: NavGroup[] = [
  {
    label: "Painel",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
    ],
  },
  {
    label: "Cadastros",
    items: [
      { title: "Produtos", url: "/produtos", icon: Package },
      { title: "Clientes", url: "/clientes", icon: Users },
      { title: "Vendedores", url: "/vendedores", icon: UserCheck },
    ],
  },
  {
    label: "Vendas",
    items: [
      { title: "Pedidos", url: "/pedidos", icon: ShoppingCart },
      { title: "Orçamentos", url: "/orcamentos", icon: FileText },
      { title: "Frente de Caixa", url: "/pdv", icon: ClipboardList },
    ],
  },
  {
    label: "Estoque",
    items: [
      { title: "Estoque", url: "/estoque", icon: Warehouse },
      { title: "Movimentações", url: "/movimentacoes", icon: ArrowDownUp },
    ],
  },
  {
    label: "Financeiro",
    items: [
      { title: "Contas a Receber", url: "/contas-receber", icon: TrendingUp },
      { title: "Contas a Pagar", url: "/contas-pagar", icon: TrendingDown },
      { title: "Fluxo de Caixa", url: "/fluxo-caixa", icon: DollarSign },
      { title: "Bancos", url: "/bancos", icon: Landmark },
    ],
  },
  {
    label: "Fiscal",
    items: [
      { title: "Notas Fiscais", url: "/notas-fiscais", icon: Receipt },
      { title: "Relatórios Fiscais", url: "/relatorios-fiscais", icon: FileSpreadsheet },
    ],
  },
  {
    label: "Outros",
    items: [
      { title: "Logística", url: "/logistica", icon: Truck },
      { title: "Serviços", url: "/servicos", icon: Wrench },
      { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
      { title: "Configurações", url: "/configuracoes", icon: Settings },
    ],
  },
];
