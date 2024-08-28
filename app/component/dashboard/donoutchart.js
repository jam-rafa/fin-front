"use client"; // Se estiver usando o diretório 'app', adicione esta linha

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Api from "../../API";
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
      parentHeightOffset: 0,
      type: 'donut'
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: "14px",
        fontFamily: "Poppins, Arial, sans-serif",
      },
    },
    labels: data.map(item => item.centroDeCusto),
    stroke: {
      show: false,
      curve: "straight",
      lineCap: "butt",
      colors: undefined,
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      labels: {
        colors: '#ffffff',
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: false,
              label: 'Total',
              formatter: function (value) {
                return new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(value);
              }
            }
          },
          position: "bottom",
          dataLabels: {
            style: {
              fontSize: "14px",
              fontFamily: "Poppins, Arial, sans-serif",
            },
          },
        }
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(value);
        }
      }
    }
  };

  const series = data.map((item) => item.totalArrecadado);

  return (
    <div>
      <ApexChart
        type="donut"
        options={options}
        series={series}
        width={500} // A largura aqui é apenas uma sugestão, o gráfico vai se ajustar ao espaço disponível
      />
    </div>
  );
}
