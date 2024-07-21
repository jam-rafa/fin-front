// Importe a API corretamente



import Api from "./API";
import DonutChart from "@/app/component/donoutchart";
import MonthChart from "@/app/component/monthChart";

import MostProfitProducts from "./component/mostProfitProducts";
import LossProducts from "./component/lossProducts";
import Balance from "./component/balance";

import { useEffect, useState } from "react";
import Entradas from "./component/entradas";
import Saidas from "./component/saidas";

interface Ibalance {
  month: number;
  totalEntradas: number;
  totalDebitos: number;
  lucroPrejuizo: number;
  entradaPercentChange: number;
  debitoPercentChange: number;
  lucroPrejuizoPercentChange: number;
}




export default async function Home() {


  return (
    <main className="min-h-screen bg-ground w-100 p-5 text-light">
        <>
          <section className="w-100 p-5">
            <div className="grid lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 gap-5 w-full">
              {/* Primeira linha */}
              <div className="text-light col-span-1 bg-ground-10 rounded-lg shadow-lg px-4 py-5 ">
                <h3 className="text-lg">Faturamento</h3>
                <Balance/>
              </div>
              <div className="text-light md:col-span-1 sm:col-span-1 bg-ground-10 rounded-lg shadow-lg px-4 py-5 ">
                <h3 className="text-lg">Entradas</h3>
                <Entradas/>
              </div>
              <div className="text-light md:col-span-1 sm:col-span-1 bg-ground-10 rounded-lg shadow-lg px-4 py-5 ">
                <h3 className="text-lg">Saídas</h3>
                <Saidas/>
              </div>

              {/* Segunda linha */}
              <div className="col-span-2 bg-ground-10 rounded-lg shadow-lg px-4 py-5 w-100 ">
                <h3 className="text-lg">Evolução de faturamento</h3>
                <MonthChart/>
              </div>
              <div className="col-span-1 w-full flex flex-col gap-4">
                <div className="h-full bg-ground-10 shadow-lg rounded-lg p-2">
                  pa
                </div>
                <div className="h-full bg-ground-10 shadow-lg rounded-lg p-2">
                  nao sei 
                </div>
              </div>

              {/* Terceira linha */}
              <div className="col-span-1 bg-ground-10 rounded-lg shadow-lg px-4 py-5 w-100 ">
              Top 6 maiores gastos
                <LossProducts/>
              </div>
              <div className="col-span-1 bg-ground-10 rounded-lg shadow-lg px-4 py-5 ">
                Lucro por setor
                <div className="h-full w-full flex items-center justify-center">
                  <DonutChart />
                </div>
              </div>
              <div className="col-span-1 bg-ground-10 rounded-lg shadow-lg px-4 py-5 w-100 ">
              Top 6 Produtos Mais Lucrativos
              <MostProfitProducts/>
              </div>

       
            </div>
          </section>
        </>
    </main>
  );
}
