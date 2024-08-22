"use client"; // Se estiver usando o diretório 'app', adicione esta linha

import { useState } from "react";
import { Icost } from "../../../pages/dashBoard";
import FormatMoney from "../../utils/formatMoney";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Costs({ cost }: { cost: Icost }) {
  // Definindo o estado inicial diretamente a partir da prop `cost`
  const [data] = useState<Icost>(cost);

  return (
    <section className="mt-4 h-full relative">
      <div className="flex gap-4 items-center mt-2">
        <div className="p-2 bg-primary/20 text-primary rounded flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icon-tabler-coins"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z" />
            <path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4" />
            <path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z" />
            <path d="M3 6v10c0 .888 .772 1.45 2 2" />
            <path d="M3 11c0 .888 .772 1.45 2 2" />
          </svg>
        </div>
        <div>
          <p className="text-xl mb-0">{FormatMoney(data.fixo)}</p>
          <small className="text-secondary">Custos fixos</small>
        </div>
      </div>

      <div className="flex gap-4 items-center mt-6">
        <div className="p-2 bg-info/20 text-info rounded flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icon-tabler-coins"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z" />
            <path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4" />
            <path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z" />
            <path d="M3 6v10c0 .888 .772 1.45 2 2" />
            <path d="M3 11c0 .888 .772 1.45 2 2" />
          </svg>
        </div>
        <div>
          <p className="text-xl">{FormatMoney(data.variavel)}</p>
          <small className="text-secondary">Custos variáveis</small>
        </div>
      </div>
      
      <div className="w-10 h-[40%] bg-primary/50 border-2 border-primary absolute rounded bottom-0 right-16"></div>
      <div className="w-10 h-[80%] bg-info/50 absolute border-2 border-info rounded bottom-0 right-5"></div>
    </section>
  );
}
