import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWeatherData, selectWeatherDataNextDays } from '../reducers/nextDaysReducer';

const NextDays = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeatherDataNextDays);
  const searchTerms = new URLSearchParams(location.search).get('cerca');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerms}&appid=f31099d3657a9bc9492af703cf2113ea&units=metric&lang=it`
        );

        if (response.ok) {
          const data = await response.json();
          dispatch(setWeatherData(data));
        } else {
          console.error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [searchTerms, dispatch]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  // Estrai le informazioni necessarie dal weatherData qui
  const hourlyForecastData = weatherData.list.slice(0, 3); // Prendi solo i primi tre elementi

  return (
    <div className='small'>
      <p style={{ whiteSpace: 'nowrap' }}>Previsioni orarie:</p>
      <hr />
      {hourlyForecastData.map((hour, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <p>Ore: {new Date(hour.dt_txt).toLocaleTimeString('it-IT', { hour: 'numeric', minute: 'numeric' })}</p>
          </div>
          <div style={{ marginLeft: '30px' }}>
            <p>Temp.: {hour.main.temp}°C</p>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
              <p>{hour.weather[0].description}</p>
              {/* Utilizza l'icona dal campo icon dell'oggetto weather */}
              {hour.weather[0].icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                  alt={hour.weather[0].description}
                  style={{ marginLeft: '5px' }}
                />
              )}
            </div>
            <hr />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NextDays;
