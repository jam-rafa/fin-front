"use client"; // Se estiver usando o diretório 'app', adicione esta linha

import { useState } from "react";
import dynamic from "next/dynamic";
import { IMonthChart } from "../../../pages/dashBoard";
import { ApexOptions } from "apexcharts"; // Importar os tipos de ApexCharts

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function MonthChart({ monthChart }: { monthChart: IMonthChart[] }) {
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!monthChart) {
    return <div>Loading...</div>;
  }

  // Verificar se monthChart contém as propriedades esperadas
  if (!Array.isArray(monthChart) || monthChart.length === 0) {
    console.error("Data format is incorrect or empty");
    return <div>Data format is incorrect or empty</div>;
  }

  // Formatar os dias para o nome do dia por extenso
  const days = monthChart.map(item => item.label);
  const entradas = monthChart.map(item => item.entradas);
  const saidas = monthChart.map(item => item.saidas);

  const options: ApexOptions = {
    chart: {
      height: 400,
      type: "area",
      toolbar: {
        show: false
      }
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
          colors: "#718096" // Define a cor do texto como branco
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
            colors: '#718096',
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
      borderColor: '#7180964D' ,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 2 // Define o arredondamento das barras
      }
    }
    
    
  };

  const series = [
    // {
    //   name: 'Entradas',
    //   type: "line" as const,
    //   data: entradas,
    // },
    {
      name: 'Saídas',
      type: "column" as const,
      data: saidas,
    },
  ];

  return (
    <div>
      <ApexChart
        type="line"
        options={options}
        series={series}
        height={430}
      />
    </div>
  );
}
