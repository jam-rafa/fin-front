interface Entrada {
  "RECEITA TOTAL": number;
  "FORMA DE PAGAMENTO ": string;
  CLIENTE: string;
  OBS: string;
}

interface Saida {
  DESCRICAO?: string;
  PRODUTO?: string;
  CATEGORIA: string;
  VALOR: number;
  QTD?: number;
  __EMPTY_1?: number;
  __EMPTY_2?: number;
  __EMPTY_3?: number;
  "FORMAS DE PAGAMENTO"?: string;
}

interface Consolidado {
  PRODUTO: string;
  CATEGORIA: string;
  "CUSTO POR PRODUTO": number;
  "CUSTO TOTAL": number;
}

interface CustoFixo {
  "DESCRICAO DO CUSTO"?: string;
  VALOR: number;
  "RATEIO FRETE POR PECA "?: number;
}

interface ClassificacaoConta {
  "DEBITO/CREDITO": string;
  FORNECEDOR: string;
  NOME: string;
  "FIXA /VARIAVEL": string;
  "PATRIMONIAL/ RESULTADO": string;
}

interface Resumo {
  "RECEITA TOTAL MÊS": number;
  "DESPESAS TOTAIS DO MÊS": number;
  "LUCRO/PREJUIZO": number;
}

export interface IPlanilha {
  ENTRADAS: Entrada[];
  SAIDAS: Saida[];
  CONSOLIDADO: Consolidado[];
  "CUSTOS FIXOS": CustoFixo[];
  "CUSTOS VARIAVEIS": any[]; // Pode ser de outro tipo se houver estrutura definida
  "CLASSIFICACAO DAS CONSTAS": ClassificacaoConta[];
  ESTOQUE: any[]; // Pode ser de outro tipo se houver estrutura definida
  RESUMO: Resumo[];
  Planilha2: any[]; // Pode ser de outro tipo se houver estrutura definida
}
