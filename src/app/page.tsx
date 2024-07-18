// Importe a API corretamente
import Api from "./API/index";
import { IPlanilha } from "./interface";
import DonutChart from "@/app/component/donoutchart";
import MonthChart from "@/app/component/monthChart";

import { IMockData } from "./interface-mock";
import MostProfitProducts from "./component/mostProfitProducts";
import LossProducts from "./component/lossProducts";

// Função assíncrona para buscar dados da API

function calcularLucro(total: number, gastos: number) {
  const lucro = total - gastos;
  const percentual = (lucro / total) * 100; // Calcula o percentual de lucro ou prejuízo
  const label = lucro >= 0 ? "Lucro" : "Prejuízo";
  const colour = lucro >= 0 ? "success" : "danger";

  return (
    <div>
      <div className={`px-4 py-5 bg-success/10 rounded-full w-fit text-${colour}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-pig"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 11v.01" />
          <path d="M16 3l0 3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342a6.008 6.008 0 0 1 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3z" />
        </svg>
      </div>
      <p className="my-2">Resumo da receita</p>
      <p className="text-3xl">R$ {Math.abs(lucro).toFixed(2)}</p>
      <p className={`text-${colour}`}>{Math.abs(percentual).toFixed(2)}%  {label}</p>
    </div>
  );
}

async function teste() {
  try {
    const res = await Api.get<IMockData[]>("/dados-mockados");
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return null;
  }
}

// Componente Home (funcional) assíncrono
export default async function Home() {
  const data = 'teste'

  return (
    <main className="min-h-screen bg-ground w-100 p-5 text-light">
      {data ? (
        <>
          <section className="w-100 p-5">
            <div className="grid lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 gap-5 w-full">
              {/* Primeira linha */}
              <div className="text-light col-span-1 bg-ground-10 rounded-lg shadow-lg px-4 py-5 ">
                <i className="icon-tabler icon-tabler-home"></i>

     
              </div>
              <div className="text-light md:col-span-2 sm:col-span-1 bg-ground-10 rounded-lg shadow-lg px-4 py-5 ">
                <h3 className="text-lg">teste nosso</h3>
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
                  pa
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
      ) : (
        <div>Carregando...</div>
      )}
    </main>
  );
}
