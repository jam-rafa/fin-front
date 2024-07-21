"use client"; // Se estiver usando o diretório 'app', adicione esta linha


import { useEffect, useState } from "react";
import Api from "../API";
import FormatMoney from "../utils/formatMoney";

// Definindo a interface para um produto
interface IProduct {
  produto: string;
  lucro: number;
  quantidade: number;
  setor: string
}

// Definindo a interface para a resposta da API
interface IApiResponse {
  month: number
  totalEntradas:number
  totalDebitos:number
  lucroPrejuizo:number
  entradaPercentChange: number
  debitoPercentChange: number
  lucroPrejuizoPercentChange:number
}

export default function Balance() {
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
    <section className="gap-2 mt-4">
      <div className="text-4xl text-primary">{FormatMoney(data.lucroPrejuizo)}</div>
      <div className="flex gap-2 items-center mt-3">
        <span className="bg-danger-10 px-2 rounded text-danger flex items-center ">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M16 9l-4 -4" /><path d="M8 9l4 -4" /></svg> 
          <span>{data.lucroPrejuizoPercentChange} %</span>
        </span>
        <span className="text-secondary">vs ultimo mes</span>
      </div>
    </section>
    // <ul>
    //   {data.map((product, index) => (
    //     <li key={index} className="grid grid-cols-7 px-2 gap-2 w-full items-center self-center mb-3 mt-4 h-full">
    //       <div className="flex col-span-4 gap-3 items-center">
    //         <p className="px-3 py-1 bg-success-10 text-success rounded">{index + 1}</p>             
    //         <p>{product.produto}</p>
    //       </div>
    //       <div className="flex flex-col col-span-2 items-start">
    //         <small className="text-secondary">Receita</small>
    //         <p className="col-span-1 ">{product.lucro.toFixed(2)}</p>
    //       </div>
    //       <div className="flex justify-end flex-col items-end">
    //       <small className="px-2 py-1 text-primary bg-primary-10 rounded">{product.setor}</small>
        
    //       </div>
    //     </li>
    //   ))}
    // </ul>
  );
  
}
