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
    x: {
      ticks: {
        callback: function(idx: any) {
          const label = (this as any).getLabelForValue(idx);
          return label.substring(0, label.indexOf(" "));
        },
      },
    },
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
  onClick: (_event: any, elements: any, chart: any) => {
    if (elements[0]) {
      const i = elements[0].index;
      const label = chart.data.labels[i];
      const commitHash = label.substring(label.indexOf("-") + 2);
      window.open(
        `https://github.com/luc-tielen/eclair-lang/commit/${commitHash}`,
        "_blank"
      );
    }
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
