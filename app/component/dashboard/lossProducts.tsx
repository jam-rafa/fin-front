"use client"; // Se estiver usando o diretório 'app', adicione esta linha


import { useEffect, useState } from "react";
import Api from "../../API";
import FormatMoney from "../../utils/formatMoney";

// Definindo a interface para um produto
interface IProduct {
  produto: string;
  lucro: number;
  quantidade: number;
  setor: string
}

// Definindo a interface para a resposta da API
interface IApiResponse {
  topProducts: IProduct[];
  valorTotalLucro: number;
}

export default function LossProducts() {
  const [data, setData] = useState<IApiResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Api.get<IApiResponse>("/loss-products");
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
    <ul>
      {data.topProducts.map((product, index) => (
        <li key={index} className="grid grid-cols-7 px-2 gap-2 w-full items-center self-center mb-3 mt-4 h-full">
          <div className="flex col-span-4 gap-3 items-center">
            <p className="px-3 py-1 bg-danger-10 text-danger rounded">{index + 1}</p>             
            <p className="text-sm">{product.produto}</p>
          </div>
          <div className="flex flex-col col-span-2 items-start">
            <small className="text-secondary">Receita</small>
            <p className="col-span-1 ">{FormatMoney(product.lucro.toFixed(2))}</p>
          </div>
          <div className="flex justify-end flex-col items-end">
            <small className="px-2 py-1 text-primary bg-primary-10 rounded">{product.setor}</small>
            {/* <p className="col-span-1 flex items-center text-warning px-2  justify-end rounded">{product.quantidade}<small>X</small></p>         */}
          </div>
        </li>
      ))}
    </ul>
  );
  
}
