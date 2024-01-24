import '../index.css'
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Main from '../components/Main'
import * as Icon from 'react-bootstrap-icons'
import Chart from '../components/Chart'
import NextDays from '../components/NextDays'

const SearchResults = () => {
    const location = useLocation();
    const searchTerms = new URLSearchParams(location.search).get('cerca');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    const searchLocation = async () => {
        try {
            setLoading(true);
            const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerms}&APPID=f31099d3657a9bc9492af703cf2113ea&lang=it&units=metric`);
            const data = await resp.json();
            setWeatherData(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (searchTerms?.length > 2) {
            searchLocation();
        }
    }, [searchTerms]);

    return (
        <div className='app root'>
            <Main/>
           <div className='container'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="top">
                        <div className="location">
                            <p>{weatherData?.name}</p>
                            <div className="temp">
                                <h1 className='bold'>{weatherData?.main.temp}°C</h1>
                            </div>
                            <div className="description">
                                <p>{weatherData?.weather[0].description}</p>
                            </div>
                            {weatherData?.weather[0].icon && (
                                <div className="icon">
                                    <img
                                        src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                                        alt="Weather Icon"
                                        className="weather-icon"
                                    />
                                </div>
                              )} 
                     </div>
                     <div className='half'>
                    <NextDays/>
                        </div>
                     <div className='chart'>
                    
                        <Chart/></div>
                    </div>
                    
                )}
                <div className="bottom">
        <div className="results">
        <div className="icon">
        <Icon.ThermometerHalf />
            </div>
            <div className="text-container">
           <p className='bold'>{weatherData?.main.feels_like}°C</p>
          <p>T. Percepita</p>
          </div>
         </div>
         <div className="results">
         
            <div className="icon">
                <Icon.Moisture />
            </div>
           
           
           <div className="text-container">
           <p className='bold'>{weatherData?.main.humidity}%</p>
           <p>Umidità</p>
           </div>
         </div>
         <div className="results">
         <div className="icon">
         <Icon.Wind />
            </div>
            <div className="text-container">
           <p className='bold'> {weatherData?.wind.speed}km/h</p>
           <p>Vento</p>
           </div>
         </div>
       </div>
       </div> 
        </div>
    );
}

export default SearchResults;



