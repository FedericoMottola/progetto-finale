import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom"
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  import colorLib from '@kurkle/color';

   const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    white: 'rgb(255, 255, 255)',
  };

  import {Filler} from 'chart.js'

  const NAMED_COLORS = [
    CHART_COLORS.red,
    CHART_COLORS.orange,
    CHART_COLORS.yellow,
    CHART_COLORS.green,
    CHART_COLORS.blue,
    CHART_COLORS.purple,
    CHART_COLORS.grey,
  ];
  
  function transparentize(value, opacity) {
    var alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return colorLib(value).alpha(alpha).rgbString();
  }

const Chart = () => {
  const [weatherData, setWeatherData] = useState(null);
  const location = useLocation();
  const searchTerms = new URLSearchParams(location.search).get('cerca');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerms}&appid=f31099d3657a9bc9492af703cf2113ea&units=metric&lang=it`
        );

        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          console.error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  // Filtra i dati per ottenere solo le informazioni alla stessa ora ogni giorno
  const targetHour = '15:00:00';
  
  // Filtra i dati per ottenere solo le informazioni alla stessa ora ogni giorno
  const filteredData = weatherData.list.filter(
    (item) => item.dt_txt.split(' ')[1] === targetHour
  );

  const labels = filteredData.map((item) => {
    const date = new Date(item.dt * 1000);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });

  const temperatures = filteredData.map((item) => item.main.temp);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature nei prossimi giorni alla stessa ora',
        data: temperatures,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: transparentize(CHART_COLORS.blue),
        fill: {below: 'blue', target: {value: 0}}
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'white',
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'white',
        },
      },
    },
    
  };


  return (
    
      
      <Line data={data} options={options} />
    
  );
};



export default Chart;

