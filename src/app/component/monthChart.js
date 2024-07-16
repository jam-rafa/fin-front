"use client"; // Se estiver usando o diretório 'app', adicione esta linha

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import Api from "../API";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function MonthChart() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Api.get("/finance");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error);
      }
    }
    fetchData();
  }, []);

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

  // Formatar os meses para o nome do mês por extenso
  const categories = data.map(item => moment(item.month).format("MMMM"));
  const entradas = data.map(item => item.entradas);
  const saidas = data.map(item => item.saidas);
  const saldo = data.map(item => item.saldo);

  const options = {
    chart: {
      height: 350,
      type: 'line',
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [4, 4, 4]
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "#FFFFFF" // Define a cor do texto como branco
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
          }
        },
        tooltip: {
          enabled: true
        }
      },
    ],
    colors: ['#00FF00', '#FF0000', '#0000FF'], // Verde para Entradas, Vermelho para Saídas, Azul para Saldo
    grid: {
      borderColor: '#e0e0e0',
      strokeDashArray: 1, // Define a opacidade das linhas de fundo
    },
    plotOptions: {
      bar: {
        borderRadius: 5 // Define o arredondamento das barras
      }
    }
  };

  const series = [
    {
      name: 'Entradas',
      type: 'column',
      data: entradas,
    },
    {
      name: 'Saídas',
      type: 'column',
      data: saidas
    },
    {
      name: 'Saldo',
      type: 'column',
      data: saldo
    }
  ];

  return (
    <div>
      <ApexChart
        type="line"
        options={options}
        series={series}
        height={500}
      />
    </div>
  );
}
