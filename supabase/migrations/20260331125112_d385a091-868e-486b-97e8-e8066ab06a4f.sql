
-- Fix RLS on pedidos_itens and notas_fiscais_itens
ALTER TABLE public.pedidos_itens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notas_fiscais_itens ENABLE ROW LEVEL SECURITY;

-- RLS for pedidos_itens (via pedido's tenant)
CREATE POLICY "Tenant isolation via pedido" ON public.pedidos_itens
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.pedidos_venda pv
      WHERE pv.id = pedidos_itens.pedido_id
        AND pv.tenant_id = public.get_user_tenant_id()
    )
  );

-- RLS for notas_fiscais_itens (via nota's tenant)
CREATE POLICY "Tenant isolation via nota" ON public.notas_fiscais_itens
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.notas_fiscais nf
      WHERE nf.id = notas_fiscais_itens.nota_fiscal_id
        AND nf.tenant_id = public.get_user_tenant_id()
    )
  );

-- Fix function search paths
ALTER FUNCTION public.update_updated_at() SET search_path = public;
ALTER FUNCTION public.atualizar_estoque_pedido() SET search_path = public;
ALTER FUNCTION public.gerar_contas_receber_pedido() SET search_path = public;
ALTER FUNCTION public.atualizar_saldo_recebimento() SET search_path = public;
ALTER FUNCTION public.atualizar_saldo_pagamento() SET search_path = public;

-- Fix profiles insert policy to be tenant-scoped
DROP POLICY "Service role inserts profiles" ON public.profiles;
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (id = auth.uid());
