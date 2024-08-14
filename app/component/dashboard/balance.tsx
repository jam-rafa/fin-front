"use client"; // Se estiver usando o diretório 'app', adicione esta linha

import { useEffect, useState } from "react";
import Api from "../../API";
import FormatMoney from "../../utils/formatMoney";

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


export default function Balance({ title, total }: {title: string, total: number}) {
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
    <>
      <h2 className="">{title}</h2>
      <section className="gap-2 mt-4">
        <div className="text-3xl ">{FormatMoney(total)}</div>
        <div className="flex gap-2 items-center mt-3">
          <span className="bg-secondary-10 px-2 rounded text-secondary flex items-center ">
            <span>0 {data.lucroPrejuizoPercentChange} %</span>
          </span>
          <span className="text-secondary">vs ultimo mes anterior</span>
        </div>
      </section>
    </>
  );
}
