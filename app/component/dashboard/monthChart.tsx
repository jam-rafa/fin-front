"use client"; // Se estiver usando o diretório 'app', adicione esta linha

import { useState } from "react";
import dynamic from "next/dynamic";
import { IMonthChart } from "../../../pages/dashBoard";
import { ApexOptions } from "apexcharts"; // Importar os tipos de ApexCharts

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function MonthChart({ monthChart }: { monthChart: IMonthChart[] }) {
  const [data, setData] = useState<IMonthChart[]>(monthChart);
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  // Verificar se data contém as propriedades esperadas
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Data format is incorrect or empty");
    return <div>Data format is incorrect or empty</div>;
  }

  // Formatar os dias para o nome do dia por extenso
  const days = data.map(item => item.dia);
  const entradas = data.map(item => item.entradas);
  const saidas = data.map(item => item.saidas);

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [2, 3]
    },
    xaxis: {
      categories: days,
      labels: {
        style: {
          colors: "#FFFFFF" // Define a cor do texto como branco
        },
        formatter: function (value: string) {
          return value;
        }
      }
    },
    yaxis: [
      {
        seriesName: 'Valores',
        axisTicks: {
          show: true,
        },
        labels: {
          style: {
            colors: '#FFFFFF',
          },
          formatter: function (value: number) {
            return new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(value);
          }
        },
      },
    ],
    colors: ['#9f7aea', '#ecc94b', '#0000FF'], // Verde para Entradas, Vermelho para Saídas, Azul para Saldo
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      labels: {
        colors: '#FFFFFF',
      },
    },
    grid: {
      show: false
    },
    plotOptions: {
      bar: {
        borderRadius: 2 // Define o arredondamento das barras
      }
    }
  };

  const series = [
    {
      name: 'Entradas',
      type: "column" as const,
      data: entradas,
    },
    {
      name: 'Saídas',
      type: "line" as const,
      data: saidas,
    },
  ];

  return (
    <div>
      <ApexChart
        type="line"
        options={options}
        series={series}
        height={400}
      />
    </div>
  );
}
