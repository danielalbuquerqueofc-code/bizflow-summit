import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Clientes from "./pages/Clientes";
import { PlaceholderPage } from "./components/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const P = ({ children }: { children: React.ReactNode }) => <ProtectedRoute>{children}</ProtectedRoute>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<P><Dashboard /></P>} />
            <Route path="/produtos" element={<P><Produtos /></P>} />
            <Route path="/clientes" element={<P><Clientes /></P>} />
            <Route path="/vendedores" element={<P><PlaceholderPage title="Vendedores" /></P>} />
            <Route path="/pedidos" element={<P><PlaceholderPage title="Pedidos de Venda" /></P>} />
            <Route path="/orcamentos" element={<P><PlaceholderPage title="Orçamentos" /></P>} />
            <Route path="/pdv" element={<P><PlaceholderPage title="Frente de Caixa (PDV)" /></P>} />
            <Route path="/estoque" element={<P><PlaceholderPage title="Estoque" /></P>} />
            <Route path="/movimentacoes" element={<P><PlaceholderPage title="Movimentações de Estoque" /></P>} />
            <Route path="/contas-receber" element={<P><PlaceholderPage title="Contas a Receber" /></P>} />
            <Route path="/contas-pagar" element={<P><PlaceholderPage title="Contas a Pagar" /></P>} />
            <Route path="/fluxo-caixa" element={<P><PlaceholderPage title="Fluxo de Caixa" /></P>} />
            <Route path="/bancos" element={<P><PlaceholderPage title="Bancos e Contas" /></P>} />
            <Route path="/notas-fiscais" element={<P><PlaceholderPage title="Notas Fiscais" /></P>} />
            <Route path="/relatorios-fiscais" element={<P><PlaceholderPage title="Relatórios Fiscais" /></P>} />
            <Route path="/logistica" element={<P><PlaceholderPage title="Logística" /></P>} />
            <Route path="/servicos" element={<P><PlaceholderPage title="Serviços" /></P>} />
            <Route path="/relatorios" element={<P><PlaceholderPage title="Relatórios" /></P>} />
            <Route path="/configuracoes" element={<P><PlaceholderPage title="Configurações" /></P>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
