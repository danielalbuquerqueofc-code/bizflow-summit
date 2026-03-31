import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Clientes from "./pages/Clientes";
import { PlaceholderPage } from "./components/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/vendedores" element={<PlaceholderPage title="Vendedores" />} />
          <Route path="/pedidos" element={<PlaceholderPage title="Pedidos de Venda" />} />
          <Route path="/orcamentos" element={<PlaceholderPage title="Orçamentos" />} />
          <Route path="/pdv" element={<PlaceholderPage title="Frente de Caixa (PDV)" />} />
          <Route path="/estoque" element={<PlaceholderPage title="Estoque" />} />
          <Route path="/movimentacoes" element={<PlaceholderPage title="Movimentações de Estoque" />} />
          <Route path="/contas-receber" element={<PlaceholderPage title="Contas a Receber" />} />
          <Route path="/contas-pagar" element={<PlaceholderPage title="Contas a Pagar" />} />
          <Route path="/fluxo-caixa" element={<PlaceholderPage title="Fluxo de Caixa" />} />
          <Route path="/bancos" element={<PlaceholderPage title="Bancos e Contas" />} />
          <Route path="/notas-fiscais" element={<PlaceholderPage title="Notas Fiscais" />} />
          <Route path="/relatorios-fiscais" element={<PlaceholderPage title="Relatórios Fiscais" />} />
          <Route path="/logistica" element={<PlaceholderPage title="Logística" />} />
          <Route path="/servicos" element={<PlaceholderPage title="Serviços" />} />
          <Route path="/relatorios" element={<PlaceholderPage title="Relatórios" />} />
          <Route path="/configuracoes" element={<PlaceholderPage title="Configurações" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
