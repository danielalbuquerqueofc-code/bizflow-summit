import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const produtoSchema = z.object({
  codigo: z.string().min(1, 'Código obrigatório'),
  nome: z.string().min(2, 'Nome obrigatório (mín. 2 caracteres)'),
  descricao: z.string().default(''),
  categoria_id: z.string().nullable().default(null),
  unidade: z.string().default('UN'),
  ean: z.string().default(''),
  preco_custo: z.coerce.number().min(0).default(0),
  preco_venda: z.coerce.number().min(0).default(0),
  estoque_atual: z.coerce.number().default(0),
  estoque_minimo: z.coerce.number().min(0).default(0),
  estoque_maximo: z.coerce.number().min(0).default(0),
  controla_estoque: z.boolean().default(true),
  ncm: z.string().default(''),
  cest: z.string().default(''),
  origem: z.coerce.number().default(0),
  cfop_padrao: z.string().default(''),
  ativo: z.boolean().default(true),
});

type FormValues = z.infer<typeof produtoSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: any;
  onSuccess: () => void;
}

export function ProdutoFormDialog({ open, onOpenChange, product, onSuccess }: Props) {
  const { tenantId } = useAuth();
  const isEditing = !!product?.id;

  const form = useForm<FormValues>({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      codigo: '', nome: '', descricao: '', categoria_id: null, unidade: 'UN', ean: '',
      preco_custo: 0, preco_venda: 0, estoque_atual: 0, estoque_minimo: 0, estoque_maximo: 0,
      controla_estoque: true, ncm: '', cest: '', origem: 0, cfop_padrao: '', ativo: true,
    },
  });

  useEffect(() => {
    if (open) {
      if (product) {
        form.reset({
          codigo: product.codigo || '', nome: product.nome || '', descricao: product.descricao || '',
          categoria_id: product.categoria_id || null, unidade: product.unidade || 'UN', ean: product.ean || '',
          preco_custo: product.preco_custo || 0, preco_venda: product.preco_venda || 0,
          estoque_atual: product.estoque_atual || 0, estoque_minimo: product.estoque_minimo || 0,
          estoque_maximo: product.estoque_maximo || 0, controla_estoque: product.controla_estoque ?? true,
          ncm: product.ncm || '', cest: product.cest || '', origem: product.origem || 0,
          cfop_padrao: product.cfop_padrao || '', ativo: product.ativo ?? true,
        });
      } else {
        form.reset();
      }
    }
  }, [product, open, form]);

  const { data: categorias } = useQuery({
    queryKey: ['categorias_produtos'],
    queryFn: async () => {
      const { data } = await supabase.from('categorias_produtos').select('id, nome').order('nome');
      return data || [];
    },
    enabled: open,
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload = {
        ...values,
        tenant_id: tenantId!,
        categoria_id: values.categoria_id || null,
        descricao: values.descricao || null,
        ean: values.ean || null,
        ncm: values.ncm || null,
        cest: values.cest || null,
        cfop_padrao: values.cfop_padrao || null,
      };
      if (isEditing) {
        const { error } = await supabase.from('produtos').update(payload).eq('id', product.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('produtos').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(isEditing ? 'Produto atualizado!' : 'Produto criado!');
      onOpenChange(false);
      onSuccess();
    },
    onError: (err: any) => {
      if (err.message?.includes('unique') || err.message?.includes('duplicate')) {
        toast.error('Já existe um produto com este código');
      } else {
        toast.error('Erro ao salvar: ' + err.message);
      }
    },
  });

  const custoVal = form.watch('preco_custo');
  const vendaVal = form.watch('preco_venda');
  const margem = custoVal > 0 ? (((vendaVal - custoVal) / custoVal) * 100).toFixed(1) : '0.0';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((v) => mutation.mutate(v))} className="space-y-4">
            <Tabs defaultValue="geral">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="geral">Geral</TabsTrigger>
                <TabsTrigger value="precos">Preços</TabsTrigger>
                <TabsTrigger value="estoque">Estoque</TabsTrigger>
                <TabsTrigger value="fiscal">Fiscal</TabsTrigger>
              </TabsList>

              <TabsContent value="geral" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="codigo" render={({ field }) => (
                    <FormItem><FormLabel>Código *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="unidade" render={({ field }) => (
                    <FormItem><FormLabel>Unidade</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                          {['UN', 'KG', 'MT', 'CX', 'PC', 'LT', 'M2', 'M3'].map(u => (
                            <SelectItem key={u} value={u}>{u}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select><FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="nome" render={({ field }) => (
                  <FormItem><FormLabel>Nome *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="ean" render={({ field }) => (
                  <FormItem><FormLabel>EAN / Código de Barras</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="categoria_id" render={({ field }) => (
                  <FormItem><FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ''}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger></FormControl>
                      <SelectContent>
                        {categorias?.map((cat: any) => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select><FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="descricao" render={({ field }) => (
                  <FormItem><FormLabel>Descrição</FormLabel><FormControl><Textarea {...field} rows={3} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="ativo" render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <FormLabel className="!mt-0">Produto ativo</FormLabel>
                  </FormItem>
                )} />
              </TabsContent>

              <TabsContent value="precos" className="space-y-4 mt-4">
                <div className="grid grid-cols-3 gap-4">
                  <FormField control={form.control} name="preco_custo" render={({ field }) => (
                    <FormItem><FormLabel>Preço de Custo (R$)</FormLabel><FormControl><Input type="number" step="0.01" min="0" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="preco_venda" render={({ field }) => (
                    <FormItem><FormLabel>Preço de Venda (R$) *</FormLabel><FormControl><Input type="number" step="0.01" min="0" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div>
                    <label className="text-sm font-medium">Margem de Lucro</label>
                    <div className="h-10 flex items-center px-3 rounded-md border bg-muted text-sm font-semibold mt-1">
                      {margem}%
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="estoque" className="space-y-4 mt-4">
                <FormField control={form.control} name="controla_estoque" render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <FormLabel className="!mt-0">Controlar estoque</FormLabel>
                  </FormItem>
                )} />
                <div className="grid grid-cols-3 gap-4">
                  <FormField control={form.control} name="estoque_atual" render={({ field }) => (
                    <FormItem><FormLabel>Estoque Atual</FormLabel><FormControl><Input type="number" step="0.001" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="estoque_minimo" render={({ field }) => (
                    <FormItem><FormLabel>Estoque Mínimo</FormLabel><FormControl><Input type="number" step="0.001" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="estoque_maximo" render={({ field }) => (
                    <FormItem><FormLabel>Estoque Máximo</FormLabel><FormControl><Input type="number" step="0.001" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </TabsContent>

              <TabsContent value="fiscal" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="ncm" render={({ field }) => (
                    <FormItem><FormLabel>NCM</FormLabel><FormControl><Input {...field} placeholder="00000000" maxLength={8} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="cest" render={({ field }) => (
                    <FormItem><FormLabel>CEST</FormLabel><FormControl><Input {...field} placeholder="0000000" maxLength={7} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="origem" render={({ field }) => (
                    <FormItem><FormLabel>Origem</FormLabel>
                      <Select onValueChange={v => field.onChange(Number(v))} value={String(field.value)}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="0">0 - Nacional</SelectItem>
                          <SelectItem value="1">1 - Estrangeira (importação direta)</SelectItem>
                          <SelectItem value="2">2 - Estrangeira (mercado interno)</SelectItem>
                        </SelectContent>
                      </Select><FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="cfop_padrao" render={({ field }) => (
                    <FormItem><FormLabel>CFOP Padrão</FormLabel><FormControl><Input {...field} placeholder="5102" maxLength={4} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? 'Salvar Alterações' : 'Criar Produto'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
