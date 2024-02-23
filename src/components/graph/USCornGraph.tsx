import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


interface ChartDataType {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }>;
}

const USCornGraph: React.FC = () => {
  const [chartData, setChartData] = useState<ChartDataType>({
    labels: [],
    datasets: [
      {
        label: 'Corn Prices',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });
   
  const fetchData = async () => {
    try {
      const response = await axios.get('/usGovtCorn');
      const data = response.data;
      const lines = data.split('\n');
      const yearlyPrices: { [key: string]: number[] } = {};
      const startYear = 2019;
      const endYear = 2024; 
  
      lines.forEach((line: string) => {
        const match = line.match(/(\d{4}) (January|February|March|April|May|June|July|August|September|October|November|December) \.\.: +([\d.]+)/);
        if (match) {
          const year = parseInt(match[1]);
     
          if (year >= startYear && year <= endYear) {
            const price = parseFloat(match[3]);
            if (!yearlyPrices[year]) {
              yearlyPrices[year] = [];
            }
            yearlyPrices[year].push(price);
          }
        }
      });
  

      const labels = Object.keys(yearlyPrices).sort();
      const prices = Object.values(yearlyPrices).map((prices) =>
        prices.reduce((acc, curr) => acc + curr, 0) / prices.length 
      );
  
      setChartData({
        labels,
        datasets: [
          {
            label: 'Average Annual Corn Prices (2019-2023)',
            data: prices,
            
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching corn price data:", error);
    }
  };
  
  

  useEffect(() => {
    fetchData();
  }, []);

  

  const options = {
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: '$ / bushel', 
          font: {
            size: 16,
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'US Corn Prices by Month', // Chart title
        font: {
          size: 20,
        },
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

return <Line data={chartData} options={{ ...options, plugins: { ...options.plugins, legend: { ...options.plugins.legend, position: 'top' } } }} />;
};

export default USCornGraph;
