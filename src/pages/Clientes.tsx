import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Plus, Search, Filter, MoreHorizontal, User } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { useState } from "react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockClients = [
  { id: "1", nome: "Maria Silva Ltda", tipo: "juridica", cpf_cnpj: "12.345.678/0001-90", cidade: "São Paulo", telefone: "(11) 98765-4321", total_compras: 15420.00, status: "ativo" },
  { id: "2", nome: "João Santos", tipo: "fisica", cpf_cnpj: "123.456.789-00", cidade: "Rio de Janeiro", telefone: "(21) 91234-5678", total_compras: 3200.00, status: "ativo" },
  { id: "3", nome: "Tech Solutions ME", tipo: "juridica", cpf_cnpj: "98.765.432/0001-10", cidade: "Curitiba", telefone: "(41) 93456-7890", total_compras: 28900.00, status: "ativo" },
  { id: "4", nome: "Ana Oliveira", tipo: "fisica", cpf_cnpj: "987.654.321-00", cidade: "Belo Horizonte", telefone: "(31) 92345-6789", total_compras: 890.00, status: "inativo" },
  { id: "5", nome: "Distribuidora Central EIRELI", tipo: "juridica", cpf_cnpj: "45.678.901/0001-23", cidade: "Salvador", telefone: "(71) 94567-8901", total_compras: 67800.00, status: "ativo" },
];

const Clientes = () => {
  const [search, setSearch] = useState("");

  const filtered = mockClients.filter((c) =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.cpf_cnpj.includes(search)
  );

  return (
    <AppLayout title="Clientes">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Clientes</h2>
            <p className="text-sm text-muted-foreground">{mockClients.length} clientes cadastrados</p>
          </div>
          <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4 mr-1.5" />
            Novo Cliente
          </Button>
        </div>

        <Card className="shadow-card border">
          <CardContent className="p-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou CPF/CNPJ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-9 text-sm"
                />
              </div>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-3.5 w-3.5 mr-1.5" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden md:table-cell">CPF/CNPJ</TableHead>
                  <TableHead className="hidden lg:table-cell">Cidade</TableHead>
                  <TableHead className="hidden sm:table-cell">Telefone</TableHead>
                  <TableHead className="text-right">Total Compras</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((client) => (
                  <TableRow key={client.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                          {client.nome.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{client.nome}</p>
                          <p className="text-xs text-muted-foreground capitalize">{client.tipo === "juridica" ? "Pessoa Jurídica" : "Pessoa Física"}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground font-mono text-xs">{client.cpf_cnpj}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{client.cidade}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{client.telefone}</TableCell>
                    <TableCell className="text-right text-sm font-medium">{formatCurrency(client.total_compras)}</TableCell>
                    <TableCell className="text-center">
                      <span className={client.status === "ativo" ? "status-success" : "status-neutral"}>
                        {client.status === "ativo" ? "Ativo" : "Inativo"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Ver Histórico</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Clientes;
