import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

function ChartContainer({ data, chartConfig }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new Chart(chartRef.current, {
      type: chartConfig.type,
      data: {
        labels: data.map((row) => row[chartConfig.xAxisLabel]),
        datasets: [{
          label: chartConfig.yAxisLabel,
          data: data.map((row) => row[chartConfig.yAxisLabel]),
        }],
      },
    });
    return () => chart.destroy();
  }, [data, chartConfig]);

  return <canvas ref={chartRef} />;
}

export default ChartContainer;
