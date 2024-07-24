export interface IMockData {
    Id: number;
    NomePessoa: string;
    CargoPessoa: string;
    CentroDeCusto: string;
    TipoPagamento: 'Entrada' | 'Saída';
    Produto: string;
    Data: string; // Ou você pode usar Date se os dados forem convertidos para objetos Date
    FormaDePagamento: 'Cartão' | 'Transferência' | 'Dinheiro';
  }