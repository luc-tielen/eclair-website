import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js";
import { useEffect, useState } from "react";

interface LineChartProps {
  title: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}

const options = (title: string) => ({
  responsive: true,
  maintainAspectRatio: false,
  // animation: false, TODO turn off
  interaction: {
    intersect: false,
    mode: "index" as const,
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Time (s)",
        font: { size: 14 },
      },
      ticks: { padding: 12 },
    },
  },
  plugins: {
    title: {
      display: true,
      text: title,
      align: "start" as const,
      font: { size: 16 },
      padding: { bottom: 16 },
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        footer: (context: any) => {
          const line = context[0];
          const value = line.dataset.data[line.dataIndex];
          const valueMs = value * 1000;
          const roundedValue = Math.round(valueMs * 100) / 100;
          return `${roundedValue} ms`;
        },
        label: () => "",
      },
    },
  },
});

const LineChart = ({ data, title }: LineChartProps) => {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    ChartJS.register(
      LineElement,
      PointElement,
      LinearScale,
      Title,
      CategoryScale,
      Tooltip,
      Filler
    );
    setIsRegistered(true);
  }, []);

  if (!isRegistered) return <></>;

  return (
    <div className="w-screen h-[200px] p-4">
      <Line data={data} options={options(title)} />
    </div>
  );
};

export default LineChart;
