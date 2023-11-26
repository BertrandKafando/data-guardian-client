import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Graph = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data) {
      
      const processedData = processData(data);

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Statistiques de la Table',
          },
        },
      };

      
      const myChart = new Chart(chartRef.current, {
        type: 'doughnut', 
        data: processedData,
        options: chartOptions,
      });

      return () => {
        
        myChart.destroy();
      };
    }
  }, [data]);

  const processData = (data) => {

    // Exemple de Calcul du pourcentage des valeurs manquantes
    const missingValues = data.filter(item => !item.value);
    const percentageMissing = (missingValues.length / data.length) * 100;

    const chartData = {
      labels: ['Valeurs Manquantes', 'Valeurs Existantes'],
      datasets: [{
        data: [percentageMissing, 100 - percentageMissing],
        backgroundColor: ['#FF5733', '#36A2EB'], 
      }],
    };

    return chartData;
  };

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default Graph;
