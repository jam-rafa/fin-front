// Função utilitária para formatar valor em dinheiro
export default function FormatMoney(value) {
    // Formata o número para o formato de moeda brasileira (R$)
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
  
  
  