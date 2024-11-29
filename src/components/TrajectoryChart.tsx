import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface TrajectoryChartProps {
  xValues: number[];
  yValues: number[];
  xMax: number;
  yMax: number;
  currentIndex: number;
}

export const TrajectoryChart: React.FC<TrajectoryChartProps> = ({
  xValues,
  yValues,
  xMax,
  yMax,
  currentIndex,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [
          {
            label: 'Quỹ đạo chuyển động',
            data: yValues,
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.4,
          },
          {
            label: 'Vị trí hiện tại',
            data: yValues.map((_, index) => 
              index === currentIndex ? yValues[currentIndex] : null
            ),
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgb(239, 68, 68)',
            pointRadius: 6,
            pointStyle: 'circle',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 100,
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Khoảng cách (m)',
            },
            max: xMax,
          },
          y: {
            title: {
              display: true,
              text: 'Độ cao (m)',
            },
            max: yMax,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [xValues, yValues, xMax, yMax, currentIndex]);

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-lg shadow-md">
      <canvas ref={chartRef} />
    </div>
  );
};