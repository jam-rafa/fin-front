
import { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts"; // Importar os tipos de ApexCharts
import FormatMoney from "../../utils/formatMoney";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function WekeendGrowth({ weekendChart }: { weekendChart: { dayOfWeek: string, average: number }[] }) {



  if (!weekendChart) {
    return <div>Loading...</div>;
  }

  // Verificar se weekendChart contém as propriedades esperadas
  if (!Array.isArray(weekendChart) || weekendChart.length === 0) {
    console.error("Data format is incorrect or empty");
    return <div>Data format is incorrect or empty</div>;
  }

  // Organize the data for the chart
  const avaregeDay = weekendChart.reduce((max, item) => {
    // Verifica se o valor médio do item atual é maior do que o valor máximo conhecido
    if (item.average > max.average) {
      return { dayOfWeek: item.dayOfWeek, average: item.average };
    }
    return max;
  }, { dayOfWeek: '', average: -Infinity });



  // const days = data.map(item => item.dayOfWeek);
  const averages = weekendChart.map(item => item.average);
  const labels = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']; // Custom labels

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: "#718096" // Define a cor do texto como branco
        },
        formatter: function (value: string) {
          return value;
        }
      }
    },
    yaxis: {
      show: false,
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
    colors: ['#48BB78'], // Cor das barras
    legend: {
      show: false, // Desativar a legenda se não for necessária
    },
    grid: {
      show: false,
      borderColor: '#7180964D',
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 2, // Define o arredondamento das barras
        horizontal: false,
      columnWidth: '50%',

      }
    }
  };

  const series = [
    {
      name: 'Média',
      data: averages,
    },
  ];

  return (
    <>
    <div className="absolute">  
      <h3 className="text-lg mb-0">Crescimento semanal</h3>
      <small className="text-secondary ">Media saídas nas semanas</small>
    </div>
    <div className="flex items-center justify-between gap-3">
      <div className="mt-[50px]">
        <p className="text-2xl">{FormatMoney(avaregeDay.average)}</p>
        <small className="text-secondary">Maior média <span className="text-success">{avaregeDay.dayOfWeek}</span></small>
      </div>
      <div className="">
        <ApexChart
          type="bar"
          options={options}
          series={series}
          height={180}
        />
      </div>
    </div>
    </>
  );
}
