"use client"; // Se estiver usando o diretório 'app', adicione esta linha

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DonutChart() {
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
    labels: ["Apple", "Mango", "Orange", "Banana", "Pineapple"],
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
            colors: ["#ffffff", "#ffcc00", "#ff6347", "#00ff00", "#6495ed"], // Cores diferentes para cada label
            fontSize: "14px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
          },
        },
      },
    },
  };

  const series = [30, 40, 35, 50, 20];

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
