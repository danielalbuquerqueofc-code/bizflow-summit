export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      categorias_financeiras: {
        Row: {
          created_at: string | null
          id: string
          nome: string
          parent_id: string | null
          tenant_id: string
          tipo: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          nome: string
          parent_id?: string | null
          tenant_id: string
          tipo?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nome?: string
          parent_id?: string | null
          tenant_id?: string
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categorias_financeiras_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categorias_financeiras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categorias_financeiras_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias_produtos: {
        Row: {
          created_at: string | null
          id: string
          nome: string
          parent_id: string | null
          tenant_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          nome: string
          parent_id?: string | null
          tenant_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          nome?: string
          parent_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "categorias_produtos_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categorias_produtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categorias_produtos_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          ativo: boolean | null
          bairro: string | null
          celular: string | null
          cep: string | null
          cidade: string | null
          complemento: string | null
          cpf_cnpj: string | null
          created_at: string | null
          dia_vencimento_padrao: number | null
          email: string | null
          endereco: string | null
          estado: string | null
          id: string
          ie: string | null
          im: string | null
          limite_credito: number | null
          nome_fantasia: string | null
          nome_razao: string
          numero: string | null
          observacoes: string | null
          pais: string | null
          rg: string | null
          telefone: string | null
          tenant_id: string
          tipo_pessoa: string | null
          updated_at: string | null
          vendedor_id: string | null
          whatsapp: string | null
        }
        Insert: {
          ativo?: boolean | null
          bairro?: string | null
          celular?: string | null
          cep?: string | null
          cidade?: string | null
          complemento?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          dia_vencimento_padrao?: number | null
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          ie?: string | null
          im?: string | null
          limite_credito?: number | null
          nome_fantasia?: string | null
          nome_razao: string
          numero?: string | null
          observacoes?: string | null
          pais?: string | null
          rg?: string | null
          telefone?: string | null
          tenant_id: string
          tipo_pessoa?: string | null
          updated_at?: string | null
          vendedor_id?: string | null
          whatsapp?: string | null
        }
        Update: {
          ativo?: boolean | null
          bairro?: string | null
          celular?: string | null
          cep?: string | null
          cidade?: string | null
          complemento?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          dia_vencimento_padrao?: number | null
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          ie?: string | null
          im?: string | null
          limite_credito?: number | null
          nome_fantasia?: string | null
          nome_razao?: string
          numero?: string | null
          observacoes?: string | null
          pais?: string | null
          rg?: string | null
          telefone?: string | null
          tenant_id?: string
          tipo_pessoa?: string | null
          updated_at?: string | null
          vendedor_id?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clientes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clientes_vendedor_id_fkey"
            columns: ["vendedor_id"]
            isOneToOne: false
            referencedRelation: "vendedores"
            referencedColumns: ["id"]
          },
        ]
      }
      contas_bancarias: {
        Row: {
          agencia: string | null
          ativo: boolean | null
          banco: string | null
          conta: string | null
          created_at: string | null
          id: string
          nome: string
          saldo_atual: number | null
          saldo_inicial: number | null
          tenant_id: string
          tipo: string | null
        }
        Insert: {
          agencia?: string | null
          ativo?: boolean | null
          banco?: string | null
          conta?: string | null
          created_at?: string | null
          id?: string
          nome: string
          saldo_atual?: number | null
          saldo_inicial?: number | null
          tenant_id: string
          tipo?: string | null
        }
        Update: {
          agencia?: string | null
          ativo?: boolean | null
          banco?: string | null
          conta?: string | null
          created_at?: string | null
          id?: string
          nome?: string
          saldo_atual?: number | null
          saldo_inicial?: number | null
          tenant_id?: string
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contas_bancarias_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      contas_pagar: {
        Row: {
          categoria_id: string | null
          conta_financeira_id: string | null
          created_at: string | null
          data_pagamento: string | null
          desconto: number | null
          descricao: string
          forma_pagamento_id: string | null
          fornecedor_id: string | null
          id: string
          juros: number | null
          multa: number | null
          numero_documento: string | null
          observacoes: string | null
          recorrente: boolean | null
          status: string | null
          tenant_id: string
          tipo: string | null
          updated_at: string | null
          valor_original: number
          valor_pago: number | null
          vencimento: string
        }
        Insert: {
          categoria_id?: string | null
          conta_financeira_id?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          desconto?: number | null
          descricao: string
          forma_pagamento_id?: string | null
          fornecedor_id?: string | null
          id?: string
          juros?: number | null
          multa?: number | null
          numero_documento?: string | null
          observacoes?: string | null
          recorrente?: boolean | null
          status?: string | null
          tenant_id: string
          tipo?: string | null
          updated_at?: string | null
          valor_original: number
          valor_pago?: number | null
          vencimento: string
        }
        Update: {
          categoria_id?: string | null
          conta_financeira_id?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          desconto?: number | null
          descricao?: string
          forma_pagamento_id?: string | null
          fornecedor_id?: string | null
          id?: string
          juros?: number | null
          multa?: number | null
          numero_documento?: string | null
          observacoes?: string | null
          recorrente?: boolean | null
          status?: string | null
          tenant_id?: string
          tipo?: string | null
          updated_at?: string | null
          valor_original?: number
          valor_pago?: number | null
          vencimento?: string
        }
        Relationships: [
          {
            foreignKeyName: "contas_pagar_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_financeiras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_pagar_conta_financeira_id_fkey"
            columns: ["conta_financeira_id"]
            isOneToOne: false
            referencedRelation: "contas_bancarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_pagar_forma_pagamento_id_fkey"
            columns: ["forma_pagamento_id"]
            isOneToOne: false
            referencedRelation: "formas_pagamento"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_pagar_fornecedor_id_fkey"
            columns: ["fornecedor_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_pagar_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      contas_receber: {
        Row: {
          categoria_id: string | null
          cliente_id: string | null
          conta_financeira_id: string | null
          created_at: string | null
          data_recebimento: string | null
          desconto: number | null
          descricao: string
          forma_pagamento_id: string | null
          id: string
          juros: number | null
          multa: number | null
          numero_documento: string | null
          observacoes: string | null
          pedido_venda_id: string | null
          status: string | null
          tenant_id: string
          tipo: string | null
          updated_at: string | null
          valor_original: number
          valor_recebido: number | null
          vencimento: string
        }
        Insert: {
          categoria_id?: string | null
          cliente_id?: string | null
          conta_financeira_id?: string | null
          created_at?: string | null
          data_recebimento?: string | null
          desconto?: number | null
          descricao: string
          forma_pagamento_id?: string | null
          id?: string
          juros?: number | null
          multa?: number | null
          numero_documento?: string | null
          observacoes?: string | null
          pedido_venda_id?: string | null
          status?: string | null
          tenant_id: string
          tipo?: string | null
          updated_at?: string | null
          valor_original: number
          valor_recebido?: number | null
          vencimento: string
        }
        Update: {
          categoria_id?: string | null
          cliente_id?: string | null
          conta_financeira_id?: string | null
          created_at?: string | null
          data_recebimento?: string | null
          desconto?: number | null
          descricao?: string
          forma_pagamento_id?: string | null
          id?: string
          juros?: number | null
          multa?: number | null
          numero_documento?: string | null
          observacoes?: string | null
          pedido_venda_id?: string | null
          status?: string | null
          tenant_id?: string
          tipo?: string | null
          updated_at?: string | null
          valor_original?: number
          valor_recebido?: number | null
          vencimento?: string
        }
        Relationships: [
          {
            foreignKeyName: "contas_receber_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_financeiras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_receber_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_receber_conta_financeira_id_fkey"
            columns: ["conta_financeira_id"]
            isOneToOne: false
            referencedRelation: "contas_bancarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_receber_forma_pagamento_id_fkey"
            columns: ["forma_pagamento_id"]
            isOneToOne: false
            referencedRelation: "formas_pagamento"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_receber_pedido_venda_id_fkey"
            columns: ["pedido_venda_id"]
            isOneToOne: false
            referencedRelation: "pedidos_venda"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_receber_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      contratos: {
        Row: {
          cliente_id: string
          created_at: string | null
          descricao: string | null
          dia_vencimento: number | null
          gerar_cobranca_automatica: boolean | null
          id: string
          numero: string
          status: string | null
          tenant_id: string
          valor_mensal: number
          vigencia_fim: string | null
          vigencia_inicio: string
        }
        Insert: {
          cliente_id: string
          created_at?: string | null
          descricao?: string | null
          dia_vencimento?: number | null
          gerar_cobranca_automatica?: boolean | null
          id?: string
          numero: string
          status?: string | null
          tenant_id: string
          valor_mensal: number
          vigencia_fim?: string | null
          vigencia_inicio?: string
        }
        Update: {
          cliente_id?: string
          created_at?: string | null
          descricao?: string | null
          dia_vencimento?: number | null
          gerar_cobranca_automatica?: boolean | null
          id?: string
          numero?: string
          status?: string | null
          tenant_id?: string
          valor_mensal?: number
          vigencia_fim?: string | null
          vigencia_inicio?: string
        }
        Relationships: [
          {
            foreignKeyName: "contratos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      envios: {
        Row: {
          codigo_rastreio: string | null
          created_at: string | null
          data_entrega: string | null
          data_postagem: string | null
          id: string
          pedido_venda_id: string | null
          status: string | null
          tenant_id: string
          transportadora: string | null
        }
        Insert: {
          codigo_rastreio?: string | null
          created_at?: string | null
          data_entrega?: string | null
          data_postagem?: string | null
          id?: string
          pedido_venda_id?: string | null
          status?: string | null
          tenant_id: string
          transportadora?: string | null
        }
        Update: {
          codigo_rastreio?: string | null
          created_at?: string | null
          data_entrega?: string | null
          data_postagem?: string | null
          id?: string
          pedido_venda_id?: string | null
          status?: string | null
          tenant_id?: string
          transportadora?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "envios_pedido_venda_id_fkey"
            columns: ["pedido_venda_id"]
            isOneToOne: false
            referencedRelation: "pedidos_venda"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "envios_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      formas_pagamento: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          id: string
          nome: string
          tenant_id: string
          tipo: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          id?: string
          nome: string
          tenant_id: string
          tipo?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          id?: string
          nome?: string
          tenant_id?: string
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formas_pagamento_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      movimentacoes_bancarias: {
        Row: {
          categoria_id: string | null
          conciliado: boolean | null
          conta_destino_id: string | null
          conta_id: string
          created_at: string | null
          data: string
          descricao: string
          documento_id: string | null
          id: string
          tenant_id: string
          tipo: string
          valor: number
        }
        Insert: {
          categoria_id?: string | null
          conciliado?: boolean | null
          conta_destino_id?: string | null
          conta_id: string
          created_at?: string | null
          data?: string
          descricao: string
          documento_id?: string | null
          id?: string
          tenant_id: string
          tipo: string
          valor: number
        }
        Update: {
          categoria_id?: string | null
          conciliado?: boolean | null
          conta_destino_id?: string | null
          conta_id?: string
          created_at?: string | null
          data?: string
          descricao?: string
          documento_id?: string | null
          id?: string
          tenant_id?: string
          tipo?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "movimentacoes_bancarias_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_financeiras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_bancarias_conta_destino_id_fkey"
            columns: ["conta_destino_id"]
            isOneToOne: false
            referencedRelation: "contas_bancarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_bancarias_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas_bancarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_bancarias_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      movimentacoes_estoque: {
        Row: {
          created_at: string | null
          documento_id: string | null
          documento_tipo: string | null
          id: string
          motivo: string
          produto_id: string
          quantidade: number
          quantidade_anterior: number | null
          quantidade_posterior: number | null
          tenant_id: string
          tipo: string
          usuario_id: string | null
        }
        Insert: {
          created_at?: string | null
          documento_id?: string | null
          documento_tipo?: string | null
          id?: string
          motivo: string
          produto_id: string
          quantidade: number
          quantidade_anterior?: number | null
          quantidade_posterior?: number | null
          tenant_id: string
          tipo: string
          usuario_id?: string | null
        }
        Update: {
          created_at?: string | null
          documento_id?: string | null
          documento_tipo?: string | null
          id?: string
          motivo?: string
          produto_id?: string
          quantidade?: number
          quantidade_anterior?: number | null
          quantidade_posterior?: number | null
          tenant_id?: string
          tipo?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movimentacoes_estoque_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_estoque_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      notas_fiscais: {
        Row: {
          autorizacao: string | null
          cfop: string | null
          chave_acesso: string | null
          cliente_id: string | null
          created_at: string | null
          emissao: string | null
          id: string
          modelo: string | null
          natureza_operacao: string | null
          numero: string
          pdf: string | null
          pedido_venda_id: string | null
          protocolo: string | null
          serie: string
          status: string | null
          tenant_id: string
          tipo: string | null
          valor_desconto: number | null
          valor_frete: number | null
          valor_impostos: number | null
          valor_produtos: number | null
          valor_total: number | null
          xml: string | null
        }
        Insert: {
          autorizacao?: string | null
          cfop?: string | null
          chave_acesso?: string | null
          cliente_id?: string | null
          created_at?: string | null
          emissao?: string | null
          id?: string
          modelo?: string | null
          natureza_operacao?: string | null
          numero: string
          pdf?: string | null
          pedido_venda_id?: string | null
          protocolo?: string | null
          serie?: string
          status?: string | null
          tenant_id: string
          tipo?: string | null
          valor_desconto?: number | null
          valor_frete?: number | null
          valor_impostos?: number | null
          valor_produtos?: number | null
          valor_total?: number | null
          xml?: string | null
        }
        Update: {
          autorizacao?: string | null
          cfop?: string | null
          chave_acesso?: string | null
          cliente_id?: string | null
          created_at?: string | null
          emissao?: string | null
          id?: string
          modelo?: string | null
          natureza_operacao?: string | null
          numero?: string
          pdf?: string | null
          pedido_venda_id?: string | null
          protocolo?: string | null
          serie?: string
          status?: string | null
          tenant_id?: string
          tipo?: string | null
          valor_desconto?: number | null
          valor_frete?: number | null
          valor_impostos?: number | null
          valor_produtos?: number | null
          valor_total?: number | null
          xml?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notas_fiscais_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notas_fiscais_pedido_venda_id_fkey"
            columns: ["pedido_venda_id"]
            isOneToOne: false
            referencedRelation: "pedidos_venda"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notas_fiscais_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      notas_fiscais_itens: {
        Row: {
          cfop: string | null
          cofins_valor: number | null
          icms_aliquota: number | null
          icms_base: number | null
          icms_valor: number | null
          id: string
          ncm: string | null
          nota_fiscal_id: string
          pis_valor: number | null
          produto_id: string | null
          quantidade: number
          valor_total: number
          valor_unitario: number
        }
        Insert: {
          cfop?: string | null
          cofins_valor?: number | null
          icms_aliquota?: number | null
          icms_base?: number | null
          icms_valor?: number | null
          id?: string
          ncm?: string | null
          nota_fiscal_id: string
          pis_valor?: number | null
          produto_id?: string | null
          quantidade: number
          valor_total: number
          valor_unitario: number
        }
        Update: {
          cfop?: string | null
          cofins_valor?: number | null
          icms_aliquota?: number | null
          icms_base?: number | null
          icms_valor?: number | null
          id?: string
          ncm?: string | null
          nota_fiscal_id?: string
          pis_valor?: number | null
          produto_id?: string | null
          quantidade?: number
          valor_total?: number
          valor_unitario?: number
        }
        Relationships: [
          {
            foreignKeyName: "notas_fiscais_itens_nota_fiscal_id_fkey"
            columns: ["nota_fiscal_id"]
            isOneToOne: false
            referencedRelation: "notas_fiscais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notas_fiscais_itens_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      ordens_servico: {
        Row: {
          agendamento: string | null
          assinatura_cliente: string | null
          cliente_id: string
          conclusao: string | null
          contrato_id: string | null
          created_at: string | null
          descricao_problema: string
          id: string
          numero: string
          prioridade: string | null
          solucao_aplicada: string | null
          status: string | null
          tecnico_id: string | null
          tenant_id: string
          tipo: string | null
          valor_mao_obra: number | null
          valor_pecas: number | null
          valor_total: number | null
        }
        Insert: {
          agendamento?: string | null
          assinatura_cliente?: string | null
          cliente_id: string
          conclusao?: string | null
          contrato_id?: string | null
          created_at?: string | null
          descricao_problema: string
          id?: string
          numero: string
          prioridade?: string | null
          solucao_aplicada?: string | null
          status?: string | null
          tecnico_id?: string | null
          tenant_id: string
          tipo?: string | null
          valor_mao_obra?: number | null
          valor_pecas?: number | null
          valor_total?: number | null
        }
        Update: {
          agendamento?: string | null
          assinatura_cliente?: string | null
          cliente_id?: string
          conclusao?: string | null
          contrato_id?: string | null
          created_at?: string | null
          descricao_problema?: string
          id?: string
          numero?: string
          prioridade?: string | null
          solucao_aplicada?: string | null
          status?: string | null
          tecnico_id?: string | null
          tenant_id?: string
          tipo?: string | null
          valor_mao_obra?: number | null
          valor_pecas?: number | null
          valor_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ordens_servico_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ordens_servico_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ordens_servico_tecnico_id_fkey"
            columns: ["tecnico_id"]
            isOneToOne: false
            referencedRelation: "vendedores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ordens_servico_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos_itens: {
        Row: {
          desconto: number | null
          id: string
          pedido_id: string
          produto_id: string | null
          quantidade: number
          valor_total: number
          valor_unitario: number
        }
        Insert: {
          desconto?: number | null
          id?: string
          pedido_id: string
          produto_id?: string | null
          quantidade: number
          valor_total: number
          valor_unitario: number
        }
        Update: {
          desconto?: number | null
          id?: string
          pedido_id?: string
          produto_id?: string | null
          quantidade?: number
          valor_total?: number
          valor_unitario?: number
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_itens_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos_venda"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_itens_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos_venda: {
        Row: {
          cliente_id: string | null
          condicao_pagamento: string | null
          created_at: string | null
          data_entrega_prevista: string | null
          data_entrega_realizada: string | null
          data_pedido: string | null
          desconto_total: number | null
          forma_pagamento_id: string | null
          frete: number | null
          id: string
          numero: string
          observacoes: string | null
          observacoes_internas: string | null
          outras_despesas: number | null
          status: string | null
          subtotal: number | null
          tenant_id: string
          tipo: string | null
          updated_at: string | null
          valor_total: number
          vendedor_id: string | null
        }
        Insert: {
          cliente_id?: string | null
          condicao_pagamento?: string | null
          created_at?: string | null
          data_entrega_prevista?: string | null
          data_entrega_realizada?: string | null
          data_pedido?: string | null
          desconto_total?: number | null
          forma_pagamento_id?: string | null
          frete?: number | null
          id?: string
          numero: string
          observacoes?: string | null
          observacoes_internas?: string | null
          outras_despesas?: number | null
          status?: string | null
          subtotal?: number | null
          tenant_id: string
          tipo?: string | null
          updated_at?: string | null
          valor_total?: number
          vendedor_id?: string | null
        }
        Update: {
          cliente_id?: string | null
          condicao_pagamento?: string | null
          created_at?: string | null
          data_entrega_prevista?: string | null
          data_entrega_realizada?: string | null
          data_pedido?: string | null
          desconto_total?: number | null
          forma_pagamento_id?: string | null
          frete?: number | null
          id?: string
          numero?: string
          observacoes?: string | null
          observacoes_internas?: string | null
          outras_despesas?: number | null
          status?: string | null
          subtotal?: number | null
          tenant_id?: string
          tipo?: string | null
          updated_at?: string | null
          valor_total?: number
          vendedor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_venda_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_venda_forma_pagamento_id_fkey"
            columns: ["forma_pagamento_id"]
            isOneToOne: false
            referencedRelation: "formas_pagamento"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_venda_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_venda_vendedor_id_fkey"
            columns: ["vendedor_id"]
            isOneToOne: false
            referencedRelation: "vendedores"
            referencedColumns: ["id"]
          },
        ]
      }
      produtos: {
        Row: {
          ativo: boolean | null
          categoria_id: string | null
          cest: string | null
          cfop_padrao: string | null
          codigo: string
          controla_estoque: boolean | null
          created_at: string | null
          descricao: string | null
          ean: string | null
          estoque_atual: number | null
          estoque_maximo: number | null
          estoque_minimo: number | null
          id: string
          imagens: string[] | null
          ncm: string | null
          nome: string
          origem: number | null
          preco_custo: number | null
          preco_venda: number
          tenant_id: string
          unidade: string
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          categoria_id?: string | null
          cest?: string | null
          cfop_padrao?: string | null
          codigo: string
          controla_estoque?: boolean | null
          created_at?: string | null
          descricao?: string | null
          ean?: string | null
          estoque_atual?: number | null
          estoque_maximo?: number | null
          estoque_minimo?: number | null
          id?: string
          imagens?: string[] | null
          ncm?: string | null
          nome: string
          origem?: number | null
          preco_custo?: number | null
          preco_venda?: number
          tenant_id: string
          unidade?: string
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          categoria_id?: string | null
          cest?: string | null
          cfop_padrao?: string | null
          codigo?: string
          controla_estoque?: boolean | null
          created_at?: string | null
          descricao?: string | null
          ean?: string | null
          estoque_atual?: number | null
          estoque_maximo?: number | null
          estoque_minimo?: number | null
          id?: string
          imagens?: string[] | null
          ncm?: string | null
          nome?: string
          origem?: number | null
          preco_custo?: number | null
          preco_venda?: number
          tenant_id?: string
          unidade?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "produtos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_produtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produtos_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          nome: string | null
          role: string | null
          tenant_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          nome?: string | null
          role?: string | null
          tenant_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          nome?: string | null
          role?: string | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          cnpj: string | null
          created_at: string | null
          id: string
          nome: string
          plano: string | null
          updated_at: string | null
        }
        Insert: {
          cnpj?: string | null
          created_at?: string | null
          id?: string
          nome: string
          plano?: string | null
          updated_at?: string | null
        }
        Update: {
          cnpj?: string | null
          created_at?: string | null
          id?: string
          nome?: string
          plano?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      vendedores: {
        Row: {
          ativo: boolean | null
          celular: string | null
          comissao_padrao: number | null
          cpf: string | null
          created_at: string | null
          data_admissao: string | null
          data_demissao: string | null
          email: string | null
          id: string
          meta_anual: number | null
          meta_mensal: number | null
          meta_trimestral: number | null
          nome: string
          telefone: string | null
          tenant_id: string
          tipo_comissao: string | null
          user_id: string | null
        }
        Insert: {
          ativo?: boolean | null
          celular?: string | null
          comissao_padrao?: number | null
          cpf?: string | null
          created_at?: string | null
          data_admissao?: string | null
          data_demissao?: string | null
          email?: string | null
          id?: string
          meta_anual?: number | null
          meta_mensal?: number | null
          meta_trimestral?: number | null
          nome: string
          telefone?: string | null
          tenant_id: string
          tipo_comissao?: string | null
          user_id?: string | null
        }
        Update: {
          ativo?: boolean | null
          celular?: string | null
          comissao_padrao?: number | null
          cpf?: string | null
          created_at?: string | null
          data_admissao?: string | null
          data_demissao?: string | null
          email?: string | null
          id?: string
          meta_anual?: number | null
          meta_mensal?: number | null
          meta_trimestral?: number | null
          nome?: string
          telefone?: string | null
          tenant_id?: string
          tipo_comissao?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendedores_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_tenant_id: { Args: never; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
