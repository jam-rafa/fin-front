// pages/dashboard.tsx

import React from "react";
import Api from "../app/API";
import LossProducts from "../app/component/dashboard/lossProducts";
import MostProfitProducts from "../app/component/dashboard/mostProfitProducts";
import DonutChart from "../app/component/dashboard/donoutchart";
import Balance from "../app/component/dashboard/balance";
import MonthChart from "../app/component/dashboard/monthChart";
import Link from "next/link";
import Media from "../app/component/dashboard/media";
import Costs from "../app/component/dashboard/cost";
import FiltersDash from "../app/component/dashboard/filter";

interface IBalance {
  month: number;
  totalEntradas: number;
  totalDebitos: number;
  lucroPrejuizo: number;
  entradaPercentChange: number;
  debitoPercentChange: number;
  lucroPrejuizoPercentChange: number;
}

export interface Imedia{
    mediaEntradaDiaria: number,
    mediaSaidaDiaria: number,
    mediaEntradaMensal: number,
    mediaSaidaMensal: number,
    daysWithData: number,
    daysWithNoData: number
}

export interface IMonthChart {
  dia: number;
  mes: string;
  entradas: number;
  saidas: number;
  saldo: number;
  status: 'Lucro' | 'Prejuízo'; // Status é sempre uma dessas duas strings
}

export interface Icost{
  fixo: number,
  variavel: number
}

const DashBoard = ({ data, cashFlow, media, cost }: {data: IBalance, cashFlow: IMonthChart[], media: Imedia, cost: Icost} ) => {
  return (
    <div className="w-100 p-1">
    <section className="w-full  mb-8 rounded">
      <FiltersDash/> 
    </section>
    <section>
      <div className="grid lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 gap-6 w-full">
        {/* Primeira linha */}
        <div className="text-light border-b-2 border-danger/80 col-span-1 bg-card rounded shadow-lg px-4 py-5 ">
          <Balance title={'Receita'} total={data.lucroPrejuizo}/>
        </div>
        <div className="text-light border-b-2 border-success/80 md:col-span-1 sm:col-span-1 bg-card rounded shadow-lg px-4 py-5 ">
          <Balance title={'Entradas'} total={data.totalEntradas}/>
        </div>
        <div className="text-light border-b-2 border-warning/80 md:col-span-1 sm:col-span-1 bg-card rounded shadow-lg px-4 py-5 ">
          <Balance title={'Saídas'} total={data.totalDebitos}/>

        </div>

        {/* Segunda linha */}
        <div className="col-span-2 bg-card rounded shadow-lg px-4 py-5 w-100 ">
          <h3 className="text-lg">Evolução de faturamento</h3>
          <MonthChart monthChart={cashFlow} />
        </div>
        <div className="col-span-1 w-full h-full flex flex-col gap-4">
          <div className="h-full bg-card shadow-lg rounded px-4 py-5">
            <h3>Média de movimentações</h3>
            <Media media={media}/>
          </div>
          <div className="h-full bg-card shadow-lg rounded px-4 relative">
              <h3 className=" pt-5">Custos fixos e variaveis</h3>
              <Costs cost={cost}/>
          </div>
        </div>

        {/* Terceira linha */}
        <div className="col-span-1 bg-card rounded shadow-lg px-4 py-5 w-100 ">
          Top 6 maiores gastos
          <LossProducts />
        </div>
        <div className="col-span-1 bg-card rounded shadow-lg px-4 py-5 ">
          <h3>Centro de custo</h3>
          <div className="h-full w-full flex items-center justify-center">
            <DonutChart />
          </div>
        </div>
        <Link href="/products" className="col-span-1 bg-card rounded shadow-lg px-4 py-5 w-100">
          <div className=" ">
            Top 6 Produtos Mais Lucrativos
            <MostProfitProducts />
          </div>
        </Link>
      </div>
    </section>
    </div>
  );
};

export async function getServerSideProps() {
  const response = await Api.get("/balance");
  const finance = await Api.get("/finance")
  let media = await Api.get("/media")
  let cost = await Api.get("/costs")


  const data = response.data;
  const cashFlow = finance.data
  media = media.data
  cost = cost.data
  return {
    props: {
      data,
      cashFlow,
      media,
      cost
    },
  };
}
export default DashBoard;
