
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tenants (multi-tenant)
CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  cnpj TEXT,
  plano TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  nome TEXT,
  email TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Categorias de Produtos
CREATE TABLE public.categorias_produtos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  parent_id UUID REFERENCES public.categorias_produtos(id),
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.categorias_produtos ENABLE ROW LEVEL SECURITY;

-- Formas de Pagamento
CREATE TABLE public.formas_pagamento (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  tipo TEXT CHECK (tipo IN ('dinheiro','debito','credito','pix','boleto','transferencia','cheque')),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.formas_pagamento ENABLE ROW LEVEL SECURITY;

-- Categorias Financeiras
CREATE TABLE public.categorias_financeiras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  tipo TEXT CHECK (tipo IN ('receita','despesa')),
  parent_id UUID REFERENCES public.categorias_financeiras(id),
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.categorias_financeiras ENABLE ROW LEVEL SECURITY;

-- Contas Bancárias
CREATE TABLE public.contas_bancarias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  tipo TEXT CHECK (tipo IN ('conta_corrente','poupanca','caixa','carteira')),
  banco TEXT,
  agencia TEXT,
  conta TEXT,
  saldo_inicial NUMERIC(12,2) DEFAULT 0,
  saldo_atual NUMERIC(12,2) DEFAULT 0,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.contas_bancarias ENABLE ROW LEVEL SECURITY;

-- Vendedores
CREATE TABLE public.vendedores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  nome TEXT NOT NULL,
  cpf TEXT,
  email TEXT,
  telefone TEXT,
  celular TEXT,
  tipo_comissao TEXT CHECK (tipo_comissao IN ('percentual','valor_fixo')) DEFAULT 'percentual',
  comissao_padrao NUMERIC(5,2) DEFAULT 0,
  meta_mensal NUMERIC(12,2),
  meta_trimestral NUMERIC(12,2),
  meta_anual NUMERIC(12,2),
  ativo BOOLEAN DEFAULT true,
  data_admissao DATE DEFAULT CURRENT_DATE,
  data_demissao DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.vendedores ENABLE ROW LEVEL SECURITY;

-- Clientes
CREATE TABLE public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  tipo_pessoa TEXT CHECK (tipo_pessoa IN ('fisica','juridica')) DEFAULT 'fisica',
  nome_razao TEXT NOT NULL,
  nome_fantasia TEXT,
  cpf_cnpj TEXT,
  ie TEXT,
  im TEXT,
  rg TEXT,
  email TEXT,
  telefone TEXT,
  celular TEXT,
  whatsapp TEXT,
  cep TEXT,
  endereco TEXT,
  numero TEXT,
  complemento TEXT,
  bairro TEXT,
  cidade TEXT,
  estado TEXT,
  pais TEXT DEFAULT 'Brasil',
  vendedor_id UUID REFERENCES public.vendedores(id),
  limite_credito NUMERIC(12,2) DEFAULT 0,
  dia_vencimento_padrao INTEGER,
  observacoes TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

-- Produtos
CREATE TABLE public.produtos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  codigo TEXT NOT NULL,
  ean TEXT,
  nome TEXT NOT NULL,
  descricao TEXT,
  categoria_id UUID REFERENCES public.categorias_produtos(id),
  unidade TEXT NOT NULL DEFAULT 'UN',
  preco_custo NUMERIC(12,2) DEFAULT 0,
  preco_venda NUMERIC(12,2) NOT NULL DEFAULT 0,
  estoque_atual NUMERIC(12,3) DEFAULT 0,
  estoque_minimo NUMERIC(12,3) DEFAULT 0,
  estoque_maximo NUMERIC(12,3) DEFAULT 0,
  controla_estoque BOOLEAN DEFAULT true,
  ncm TEXT,
  cest TEXT,
  origem INTEGER DEFAULT 0,
  cfop_padrao TEXT,
  imagens TEXT[] DEFAULT '{}',
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(tenant_id, codigo)
);
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;

-- Pedidos de Venda
CREATE TABLE public.pedidos_venda (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  numero TEXT NOT NULL,
  tipo TEXT CHECK (tipo IN ('orcamento','pedido','venda')) DEFAULT 'pedido',
  status TEXT CHECK (status IN ('rascunho','aprovado','faturado','entregue','cancelado')) DEFAULT 'rascunho',
  cliente_id UUID REFERENCES public.clientes(id),
  vendedor_id UUID REFERENCES public.vendedores(id),
  subtotal NUMERIC(12,2) DEFAULT 0,
  desconto_total NUMERIC(12,2) DEFAULT 0,
  frete NUMERIC(12,2) DEFAULT 0,
  outras_despesas NUMERIC(12,2) DEFAULT 0,
  valor_total NUMERIC(12,2) NOT NULL DEFAULT 0,
  forma_pagamento_id UUID REFERENCES public.formas_pagamento(id),
  condicao_pagamento TEXT,
  data_pedido DATE DEFAULT CURRENT_DATE,
  data_entrega_prevista DATE,
  data_entrega_realizada DATE,
  observacoes TEXT,
  observacoes_internas TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(tenant_id, numero)
);
ALTER TABLE public.pedidos_venda ENABLE ROW LEVEL SECURITY;

-- Itens do Pedido
CREATE TABLE public.pedidos_itens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id UUID NOT NULL REFERENCES public.pedidos_venda(id) ON DELETE CASCADE,
  produto_id UUID REFERENCES public.produtos(id),
  quantidade NUMERIC(12,3) NOT NULL,
  valor_unitario NUMERIC(12,2) NOT NULL,
  desconto NUMERIC(12,2) DEFAULT 0,
  valor_total NUMERIC(12,2) NOT NULL
);

-- Movimentações de Estoque
CREATE TABLE public.movimentacoes_estoque (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  tipo TEXT CHECK (tipo IN ('entrada','saida','ajuste','transferencia','devolucao')) NOT NULL,
  produto_id UUID NOT NULL REFERENCES public.produtos(id),
  quantidade NUMERIC(12,3) NOT NULL,
  quantidade_anterior NUMERIC(12,3),
  quantidade_posterior NUMERIC(12,3),
  motivo TEXT NOT NULL,
  documento_tipo TEXT,
  documento_id UUID,
  usuario_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.movimentacoes_estoque ENABLE ROW LEVEL SECURITY;

-- Contas a Receber
CREATE TABLE public.contas_receber (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  tipo TEXT CHECK (tipo IN ('venda','servico','outras_receitas')) DEFAULT 'venda',
  cliente_id UUID REFERENCES public.clientes(id),
  pedido_venda_id UUID REFERENCES public.pedidos_venda(id),
  categoria_id UUID REFERENCES public.categorias_financeiras(id),
  descricao TEXT NOT NULL,
  numero_documento TEXT,
  valor_original NUMERIC(12,2) NOT NULL,
  juros NUMERIC(12,2) DEFAULT 0,
  multa NUMERIC(12,2) DEFAULT 0,
  desconto NUMERIC(12,2) DEFAULT 0,
  valor_recebido NUMERIC(12,2) DEFAULT 0,
  vencimento DATE NOT NULL,
  data_recebimento DATE,
  status TEXT CHECK (status IN ('pendente','recebido_parcial','recebido','vencido','cancelado')) DEFAULT 'pendente',
  forma_pagamento_id UUID REFERENCES public.formas_pagamento(id),
  conta_financeira_id UUID REFERENCES public.contas_bancarias(id),
  observacoes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.contas_receber ENABLE ROW LEVEL SECURITY;

-- Contas a Pagar
CREATE TABLE public.contas_pagar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  tipo TEXT CHECK (tipo IN ('compra','despesa_fixa','despesa_variavel','impostos','folha_pagamento')) DEFAULT 'despesa_variavel',
  fornecedor_id UUID REFERENCES public.clientes(id),
  categoria_id UUID REFERENCES public.categorias_financeiras(id),
  descricao TEXT NOT NULL,
  numero_documento TEXT,
  valor_original NUMERIC(12,2) NOT NULL,
  juros NUMERIC(12,2) DEFAULT 0,
  multa NUMERIC(12,2) DEFAULT 0,
  desconto NUMERIC(12,2) DEFAULT 0,
  valor_pago NUMERIC(12,2) DEFAULT 0,
  vencimento DATE NOT NULL,
  data_pagamento DATE,
  status TEXT CHECK (status IN ('pendente','pago_parcial','pago','vencido','cancelado')) DEFAULT 'pendente',
  recorrente BOOLEAN DEFAULT false,
  forma_pagamento_id UUID REFERENCES public.formas_pagamento(id),
  conta_financeira_id UUID REFERENCES public.contas_bancarias(id),
  observacoes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.contas_pagar ENABLE ROW LEVEL SECURITY;

-- Notas Fiscais
CREATE TABLE public.notas_fiscais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  numero TEXT NOT NULL,
  serie TEXT NOT NULL DEFAULT '1',
  modelo TEXT CHECK (modelo IN ('55','65')) DEFAULT '55',
  tipo TEXT CHECK (tipo IN ('saida','entrada')) DEFAULT 'saida',
  chave_acesso TEXT,
  pedido_venda_id UUID REFERENCES public.pedidos_venda(id),
  cliente_id UUID REFERENCES public.clientes(id),
  natureza_operacao TEXT,
  cfop TEXT,
  valor_produtos NUMERIC(12,2) DEFAULT 0,
  valor_frete NUMERIC(12,2) DEFAULT 0,
  valor_desconto NUMERIC(12,2) DEFAULT 0,
  valor_total NUMERIC(12,2) DEFAULT 0,
  valor_impostos NUMERIC(12,2) DEFAULT 0,
  status TEXT CHECK (status IN ('rascunho','autorizada','cancelada','denegada')) DEFAULT 'rascunho',
  protocolo TEXT,
  xml TEXT,
  pdf TEXT,
  emissao TIMESTAMPTZ DEFAULT now(),
  autorizacao TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.notas_fiscais ENABLE ROW LEVEL SECURITY;

-- Itens da NF
CREATE TABLE public.notas_fiscais_itens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nota_fiscal_id UUID NOT NULL REFERENCES public.notas_fiscais(id) ON DELETE CASCADE,
  produto_id UUID REFERENCES public.produtos(id),
  cfop TEXT,
  ncm TEXT,
  quantidade NUMERIC(12,3) NOT NULL,
  valor_unitario NUMERIC(12,2) NOT NULL,
  valor_total NUMERIC(12,2) NOT NULL,
  icms_base NUMERIC(12,2) DEFAULT 0,
  icms_aliquota NUMERIC(5,2) DEFAULT 0,
  icms_valor NUMERIC(12,2) DEFAULT 0,
  pis_valor NUMERIC(12,2) DEFAULT 0,
  cofins_valor NUMERIC(12,2) DEFAULT 0
);

-- Contratos de Serviço
CREATE TABLE public.contratos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  numero TEXT NOT NULL,
  cliente_id UUID NOT NULL REFERENCES public.clientes(id),
  descricao TEXT,
  valor_mensal NUMERIC(12,2) NOT NULL,
  dia_vencimento INTEGER DEFAULT 10,
  vigencia_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
  vigencia_fim DATE,
  status TEXT CHECK (status IN ('ativo','suspenso','cancelado')) DEFAULT 'ativo',
  gerar_cobranca_automatica BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.contratos ENABLE ROW LEVEL SECURITY;

-- Ordens de Serviço
CREATE TABLE public.ordens_servico (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  numero TEXT NOT NULL,
  cliente_id UUID NOT NULL REFERENCES public.clientes(id),
  contrato_id UUID REFERENCES public.contratos(id),
  tipo TEXT CHECK (tipo IN ('instalacao','manutencao','reparo','consultoria')) DEFAULT 'manutencao',
  prioridade TEXT CHECK (prioridade IN ('baixa','media','alta','urgente')) DEFAULT 'media',
  descricao_problema TEXT NOT NULL,
  solucao_aplicada TEXT,
  tecnico_id UUID REFERENCES public.vendedores(id),
  agendamento TIMESTAMPTZ,
  conclusao TIMESTAMPTZ,
  status TEXT CHECK (status IN ('aberta','agendada','em_execucao','concluida','cancelada')) DEFAULT 'aberta',
  valor_pecas NUMERIC(12,2) DEFAULT 0,
  valor_mao_obra NUMERIC(12,2) DEFAULT 0,
  valor_total NUMERIC(12,2) DEFAULT 0,
  assinatura_cliente TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.ordens_servico ENABLE ROW LEVEL SECURITY;

-- Envios / Logística
CREATE TABLE public.envios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  pedido_venda_id UUID REFERENCES public.pedidos_venda(id),
  transportadora TEXT,
  codigo_rastreio TEXT,
  status TEXT CHECK (status IN ('postado','em_transito','saiu_para_entrega','entregue','devolucao')) DEFAULT 'postado',
  data_postagem DATE DEFAULT CURRENT_DATE,
  data_entrega DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.envios ENABLE ROW LEVEL SECURITY;

-- Movimentações Bancárias
CREATE TABLE public.movimentacoes_bancarias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  conta_id UUID NOT NULL REFERENCES public.contas_bancarias(id),
  tipo TEXT CHECK (tipo IN ('entrada','saida','transferencia')) NOT NULL,
  categoria_id UUID REFERENCES public.categorias_financeiras(id),
  descricao TEXT NOT NULL,
  valor NUMERIC(12,2) NOT NULL,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  conta_destino_id UUID REFERENCES public.contas_bancarias(id),
  documento_id UUID,
  conciliado BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.movimentacoes_bancarias ENABLE ROW LEVEL SECURITY;

-- =====================
-- RLS POLICIES
-- =====================

-- Helper function for tenant isolation
CREATE OR REPLACE FUNCTION public.get_user_tenant_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT tenant_id FROM public.profiles WHERE id = auth.uid()
$$;

-- Tenants: users see only their own tenant
CREATE POLICY "Users see own tenant" ON public.tenants FOR ALL USING (id = public.get_user_tenant_id());

-- Profiles: users see own profile
CREATE POLICY "Users see own profile" ON public.profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Service role inserts profiles" ON public.profiles FOR INSERT WITH CHECK (true);

-- Generic tenant isolation for all other tables
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'categorias_produtos','formas_pagamento','categorias_financeiras','contas_bancarias',
    'vendedores','clientes','produtos','pedidos_venda','movimentacoes_estoque',
    'contas_receber','contas_pagar','notas_fiscais','contratos','ordens_servico',
    'envios','movimentacoes_bancarias'
  ])
  LOOP
    EXECUTE format(
      'CREATE POLICY "Tenant isolation" ON public.%I FOR ALL USING (tenant_id = public.get_user_tenant_id())',
      tbl
    );
  END LOOP;
END $$;

-- =====================
-- TRIGGERS
-- =====================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY['produtos','clientes','pedidos_venda','contas_receber','contas_pagar'])
  LOOP
    EXECUTE format(
      'CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.update_updated_at()',
      tbl
    );
  END LOOP;
END $$;

-- Stock update trigger on pedido approval
CREATE OR REPLACE FUNCTION public.atualizar_estoque_pedido()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'aprovado' AND (OLD.status IS DISTINCT FROM 'aprovado') THEN
    UPDATE public.produtos p
    SET estoque_atual = p.estoque_atual - pi.quantidade
    FROM public.pedidos_itens pi
    WHERE pi.pedido_id = NEW.id AND p.id = pi.produto_id;

    INSERT INTO public.movimentacoes_estoque (tenant_id, tipo, produto_id, quantidade, quantidade_anterior, quantidade_posterior, motivo, documento_tipo, documento_id, usuario_id)
    SELECT NEW.tenant_id, 'saida', pi.produto_id, pi.quantidade,
      p.estoque_atual + pi.quantidade, p.estoque_atual,
      'Venda - Pedido ' || NEW.numero, 'pedido', NEW.id, auth.uid()
    FROM public.pedidos_itens pi
    JOIN public.produtos p ON p.id = pi.produto_id
    WHERE pi.pedido_id = NEW.id;
  END IF;

  IF NEW.status = 'cancelado' AND OLD.status = 'aprovado' THEN
    UPDATE public.produtos p
    SET estoque_atual = p.estoque_atual + pi.quantidade
    FROM public.pedidos_itens pi
    WHERE pi.pedido_id = NEW.id AND p.id = pi.produto_id;

    INSERT INTO public.movimentacoes_estoque (tenant_id, tipo, produto_id, quantidade, quantidade_anterior, quantidade_posterior, motivo, documento_tipo, documento_id, usuario_id)
    SELECT NEW.tenant_id, 'entrada', pi.produto_id, pi.quantidade,
      p.estoque_atual - pi.quantidade, p.estoque_atual,
      'Cancelamento - Pedido ' || NEW.numero, 'pedido', NEW.id, auth.uid()
    FROM public.pedidos_itens pi
    JOIN public.produtos p ON p.id = pi.produto_id
    WHERE pi.pedido_id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_estoque_pedido
  AFTER UPDATE ON public.pedidos_venda
  FOR EACH ROW
  EXECUTE FUNCTION public.atualizar_estoque_pedido();

-- Generate contas_receber on pedido approval
CREATE OR REPLACE FUNCTION public.gerar_contas_receber_pedido()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'aprovado' AND (OLD.status IS DISTINCT FROM 'aprovado') THEN
    INSERT INTO public.contas_receber (
      tenant_id, tipo, cliente_id, pedido_venda_id, descricao,
      valor_original, vencimento, status, forma_pagamento_id
    ) VALUES (
      NEW.tenant_id, 'venda', NEW.cliente_id, NEW.id,
      'Pedido ' || NEW.numero,
      NEW.valor_total, COALESCE(NEW.data_entrega_prevista, NEW.data_pedido + INTERVAL '30 days'), 'pendente',
      NEW.forma_pagamento_id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_contas_receber_pedido
  AFTER UPDATE ON public.pedidos_venda
  FOR EACH ROW
  EXECUTE FUNCTION public.gerar_contas_receber_pedido();

-- Update bank balance on conta_receber payment
CREATE OR REPLACE FUNCTION public.atualizar_saldo_recebimento()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status IN ('recebido','recebido_parcial') AND OLD.status NOT IN ('recebido','recebido_parcial') AND NEW.conta_financeira_id IS NOT NULL THEN
    UPDATE public.contas_bancarias
    SET saldo_atual = saldo_atual + NEW.valor_recebido
    WHERE id = NEW.conta_financeira_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_saldo_recebimento
  AFTER UPDATE ON public.contas_receber
  FOR EACH ROW
  EXECUTE FUNCTION public.atualizar_saldo_recebimento();

-- Update bank balance on conta_pagar payment
CREATE OR REPLACE FUNCTION public.atualizar_saldo_pagamento()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status IN ('pago','pago_parcial') AND OLD.status NOT IN ('pago','pago_parcial') AND NEW.conta_financeira_id IS NOT NULL THEN
    UPDATE public.contas_bancarias
    SET saldo_atual = saldo_atual - NEW.valor_pago
    WHERE id = NEW.conta_financeira_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_saldo_pagamento
  AFTER UPDATE ON public.contas_pagar
  FOR EACH ROW
  EXECUTE FUNCTION public.atualizar_saldo_pagamento();
