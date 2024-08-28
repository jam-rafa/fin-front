"use client"; // Se estiver usando o diretório 'app', adicione esta linha


import { useEffect, useState } from "react";
import Api from "../../API";
import FormatMoney from "../../utils/formatMoney";
import { ILossResp } from "../../../pages/dashBoard";



export default function LossProducts({lossProducts} : {lossProducts: ILossResp}) {



  if (!lossProducts) {
    return <div>Carregando...</div>;
  }

  return (
    <ul>
      {lossProducts.topProducts.map((product, index) => (
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
