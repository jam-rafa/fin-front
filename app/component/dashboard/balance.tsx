"use client"; // Se estiver usando o diretório 'app', adicione esta linha

import { useEffect, useState } from "react";
import Api from "../../API";
import FormatMoney from "../../utils/formatMoney";
import { IconReportMoney } from '@tabler/icons-react';

// Definindo a interface para um produto
interface IProduct {
  produto: string;
  lucro: number;
  quantidade: number;
  setor: string;
}

// Definindo a interface para a resposta da API
interface IApiResponse {
  month: number;
  totalEntradas: number;
  totalDebitos: number;
  lucroPrejuizo: number;
  entradaPercentChange: number;
  debitoPercentChange: number;
  lucroPrejuizoPercentChange: number;
}


export default function Balance({ title, total, icon }: {title: string, total: number, icon:any}) {
  const [data, setData] = useState<IApiResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Api.get<IApiResponse>("/balance");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-2 relative">

      {/* <span className="bg-secondary-10 px-2 rounded text-secondary text-sm flex items-center absolute bottom-0 right-1">
        <span>0 {data.lucroPrejuizoPercentChange} %</span>
      </span> */}


      <div className="text-primary">
        {icon}
      </div>

      <section className="flex flex-col mt-1 items-center">
        <div className="text-2xl">{FormatMoney(total)}</div>
      </section>
      <h2 className="text-lg text-secondary">{title}</h2>
    </div>
  );
  
}



