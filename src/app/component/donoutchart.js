"use client"; // Se estiver usando o diretório 'app', adicione esta linha

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Api from "../API";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DonutChart() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Api.get("/sector");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error);
      }
    }
    fetchData();
  }, []);


  if (!data) {
    return <div>Loading...</div>;
  }

  const options = {
    chart: {
      id: "apexchart-example",
      type: "donut",
      width: "100%", // Ajuste a largura do gráfico para ocupar todo o espaço disponível
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: "14px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
      },
    },
    labels: data.map(item => item.centroDeCusto),
    stroke: {
      show: true,
      curve: "straight",
      lineCap: "butt",
      colors: undefined,
      width: 2,
      dashArray: 0,
    },
    markers: {
      colors: ["#F44336", "#E91E63", "#9C27B0"],
    },
    plotOptions: {
      pie: {
        dataLabels: {
          style: {
            colors: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"], // Cores das labels ajustadas para branco
            fontSize: "14px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
          },
        },
      },
    },
  };

  const series = data.map((item) => item.totalArrecadado);

  return (
    <div>
      <ApexChart
        type="donut"
        options={options}
        series={series}
        height={300}
        width={400} // A largura aqui é apenas uma sugestão, o gráfico vai se ajustar ao espaço disponível
      />
    </div>
  );
}
