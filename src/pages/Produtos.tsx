import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Plus, Search, Filter, MoreHorizontal, Package } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { useState } from "react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockProducts = [
  { id: "1", codigo: "SKU001", nome: "Kit Premium de Limpeza", categoria: "Kits", preco_venda: 129.90, estoque_atual: 45, unidade: "UN", ativo: true },
  { id: "2", codigo: "SKU002", nome: "Detergente Concentrado 5L", categoria: "Limpeza", preco_venda: 32.50, estoque_atual: 3, unidade: "UN", ativo: true },
  { id: "3", codigo: "SKU003", nome: "Pano Microfibra Pack 10", categoria: "Acessórios", preco_venda: 45.00, estoque_atual: 120, unidade: "PC", ativo: true },
  { id: "4", codigo: "SKU004", nome: "Desinfetante Floral 2L", categoria: "Limpeza", preco_venda: 18.90, estoque_atual: 8, unidade: "UN", ativo: true },
  { id: "5", codigo: "SKU005", nome: "Rodo Profissional 60cm", categoria: "Ferramentas", preco_venda: 67.00, estoque_atual: 22, unidade: "UN", ativo: false },
  { id: "6", codigo: "SKU006", nome: "Luva Nitrílica Caixa 100", categoria: "EPIs", preco_venda: 89.90, estoque_atual: 1, unidade: "CX", ativo: true },
];

const Produtos = () => {
  const [search, setSearch] = useState("");

  const filtered = mockProducts.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase()) ||
    p.codigo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout title="Produtos">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Produtos</h2>
            <p className="text-sm text-muted-foreground">{mockProducts.length} produtos cadastrados</p>
          </div>
          <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4 mr-1.5" />
            Novo Produto
          </Button>
        </div>

        {/* Filters */}
        <Card className="shadow-card border">
          <CardContent className="p-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou código..."
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

        {/* Table */}
        <Card className="shadow-card border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Código</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead className="hidden md:table-cell">Categoria</TableHead>
                  <TableHead className="text-right">Preço</TableHead>
                  <TableHead className="text-center">Estoque</TableHead>
                  <TableHead className="text-center hidden sm:table-cell">Status</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((product) => (
                  <TableRow key={product.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-mono text-xs text-muted-foreground">{product.codigo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                          <Package className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-medium">{product.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{product.categoria}</TableCell>
                    <TableCell className="text-right text-sm font-medium">{formatCurrency(product.preco_venda)}</TableCell>
                    <TableCell className="text-center">
                      <span className={product.estoque_atual <= 5 ? "status-danger" : product.estoque_atual <= 10 ? "status-warning" : "status-success"}>
                        {product.estoque_atual} {product.unidade.toLowerCase()}
                      </span>
                    </TableCell>
                    <TableCell className="text-center hidden sm:table-cell">
                      <span className={product.ativo ? "status-success" : "status-neutral"}>
                        {product.ativo ? "Ativo" : "Inativo"}
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
                          <DropdownMenuItem>Duplicar</DropdownMenuItem>
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

export default Produtos;
