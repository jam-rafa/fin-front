import React, { useEffect, useState } from "react";
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
import moment from "moment";
import WekeendGrowth from "../app/component/dashboard/wekeendGrowth";
import { IconReportMoney } from '@tabler/icons-react';
import { IconCreditCardRefund} from '@tabler/icons-react';
import { IconCreditCardPay} from '@tabler/icons-react';
import { IconCreditCard} from '@tabler/icons-react';


interface IBalance {
  month: number;
  totalEntradas: number;
  totalDebitos: number;
  lucroPrejuizo: number;
  entradaPercentChange: number;
  debitoPercentChange: number;
  lucroPrejuizoPercentChange: number;
}

export interface Imedia {
  mediaEntradaDiaria: number,
  mediaSaidaDiaria: number,
  mediaEntradaMensal: number,
  mediaSaidaMensal: number,
  daysWithData: number,
  daysWithNoData: number
}

export interface IMonthChart {
  label: any;
  mes: string;
  entradas: number;
  saidas: number;
  saldo: number;
  status: 'Lucro' | 'Prejuízo'; // Status é sempre uma dessas duas strings
}

export interface Icost {
  fixo: number,
  variavel: number
}


export interface IWekendlyGrowth{
  dayOfWeek: string,
  average: number
}

interface IProduct {
  produto: string;
  lucro: number;
  quantidade: number;
  setor: string
}

// Definindo a interface para a resposta da API
export interface ILossResp {
  topProducts: IProduct[];
  valorTotalLucro: number;
}


const DashBoard = ({ profitProducts, lossProducts,initialData, initialCashFlow, initialMedia, initialCost, wekendlyGrowth }: {profitProducts: ILossResp,  lossProducts:ILossResp, wekendlyGrowth: IWekendlyGrowth[], initialData: IBalance, initialCashFlow: IMonthChart[], initialMedia: Imedia, initialCost: Icost,  }) => {
  const defaultMonth = moment().month() - 1;
  const [date, setDate] = useState(-1);
  const [data, setData] = useState(initialData);
  const [cashFlow, setCashFlow] = useState(initialCashFlow);
  const [media, setMedia] = useState(initialMedia);
  const [cost, setCost] = useState(initialCost);
  const [firstLoad, setfirstLoad] = useState(0)
  const [montGrowth, setMonthGrowth] = useState(wekendlyGrowth)
  const [lossProductsState, setLossProductsState] = useState(lossProducts)
  const [profitProductsState, setProfitProductsState] = useState(profitProducts)

  const fetchData = async (selectedDate: number) => {
    if(firstLoad === 0 ) {
      setfirstLoad(firstLoad + 1)
      return
    }
    try {
      let dateString = ''
      if(selectedDate > 0) dateString = moment().month(selectedDate).format('YYYY-MM');
      const [balanceRes, financeRes, mediaRes, costRes, lossProducts, profitProducts ,wekendlyGrowthRes] = await Promise.all([
        Api.get(`/balance?date=${dateString}`),
        Api.get(`/finance?date=${dateString}`),
        Api.get(`/media?date=${dateString}`),
        Api.get(`/costs?date=${dateString}`),
        Api.get(`/loss-products/?date=${dateString}`),
        Api.get(`/profit-products/?date=${dateString}`),
        Api.get(`monthly-growth/?date=${dateString}`)
      ]);
      setData(balanceRes.data);
      setCashFlow(financeRes.data);
      setMedia(mediaRes.data);
      setCost(costRes.data);
      setLossProductsState(lossProducts.data)
      setProfitProductsState(profitProducts.data)
      setMonthGrowth(wekendlyGrowthRes.data)
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(date);
  }, [date]);

  return (
    <div className="w-100 p-1">
      <section className="w-full mb-8 rounded">
        <FiltersDash date={date} setDate={setDate} />
      </section>
      <section>
        <div className="grid lg:grid-cols-12  gap-6 w-full">
          {/* Primeira linha */}
          <div className="relative text-light xl:col-span-5 lg:col-span-6  md:col-span- sm:col-span-12 bg-card rounded shadow-lg px-4 pt-5 pb-0">
            <WekeendGrowth weekendChart={montGrowth}/>
          </div>
          <div className="text-light sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 bg-card rounded shadow-lg px-4 py-5">
            <Balance title={'Receita'} total={data.lucroPrejuizo} icon={<IconReportMoney  size={30} />} />
          </div>
          <div className="text-light md:col-span-6 sm:col-span-6 lg:col-span-4 xl:col-span-2 bg-card rounded shadow-lg px-4 py-5">
            <Balance title={'Entradas'} total={data.totalEntradas} icon={<IconCreditCardRefund  size={30} />} />
          </div>
          <div className="text-light md:col-span-6 sm:col-span-6 lg:col-span-4 xl:col-span-2 bg-card rounded shadow-lg px-4 py-5">
            <Balance title={'Saídas'} total={data.totalDebitos} icon={<IconCreditCardPay  size={30} />}/>
          </div>

          {/* Segunda linha */}
          <div className="col-span-8 bg-card rounded shadow-lg px-4 py-5 w-100">
            <h3 className="text-lg">Evolução de Saídas</h3>
            <MonthChart monthChart={cashFlow} />
          </div>
          <div className="col-span-4 w-full h-full flex flex-col gap-4">
            <div className="h-full bg-card shadow-lg rounded px-5 py-5">
              <h3>Média de movimentações</h3>
              <Media media={media} />
            </div>
            <div className="h-full bg-card shadow-lg rounded px-5 relative">
              <h3 className="pt-5">Custos fixos e variáveis</h3>
              <Costs cost={cost} />
            </div>
          </div>

          {/* Terceira linha */}
          <div className="col-span-4 bg-card rounded shadow-lg px-4 py-5 w-100">
            Top 6 maiores gastos
            <LossProducts lossProducts={lossProductsState} />
          </div>
          <div className="col-span-4 bg-card rounded shadow-lg px-4 py-5">
            <h3>Centro de custo</h3>
            <div className="h-full w-full flex items-center justify-center">
              <DonutChart />
            </div>
          </div>
          <Link href="/products" className="col-span-4 bg-card rounded shadow-lg px-4 py-5 w-100">
            <div className="">
              Top 6 Produtos Mais Lucrativos
              <MostProfitProducts profitProducts={profitProductsState} />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context: { query: { date?: string } }) {
  const date = context.query.date || '';
  console.log(date, 'data')
  const response = await Api.get(`/balance?date=${date}`);
  const finance = await Api.get(`/finance?date=${date}`);
  let media = await Api.get(`/media?date=${date}`);
  let cost = await Api.get(`/costs?date=${date}`);
  let wekendlyGrowth = await Api.get(`monthly-growth?date=${date}`)
  let lossProducts = await Api.get("/loss-products");
  let profitProducts = await Api.get("/profit-products");



  const initialData = response.data;
  const initialCashFlow = finance.data;
  media = media.data;
  cost = cost.data;
  wekendlyGrowth = wekendlyGrowth.data
  lossProducts = lossProducts.data
  profitProducts = profitProducts.data

  return {
    props: {
      initialData,
      initialCashFlow,
      initialMedia: media,
      initialCost: cost,
      wekendlyGrowth,
      lossProducts,
      profitProducts
    },
  };
}

export default DashBoard;
