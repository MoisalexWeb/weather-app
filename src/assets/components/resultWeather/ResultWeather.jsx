import useSearchWeather from "./useSearchWeather"
import "./ResultWeather.css"

import { useState, useEffect } from "react"

const ResultCity = ({ data }) => {
    const { searchWeather } = useSearchWeather()
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        searchWeather(data.lat, data.lon)
            .then(result => setWeather(result))
            .catch(error => alert("Ooops, something was wrong"));
    }, [data]);

    return (
        weather && 
        <div className="weather">
            <header className="weather__header">
                <div className="weather__header__texts">
                    <h2 className="weather__header__texts-title">{weather.name}, {weather.sys.country}</h2>
                    <span>{weather.weather[0].description}</span>
                </div>
                <img className="weather__header-icon" src={`https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
            </header>

            <div className="weather__details">
                <h3 className="weather__details-temperature">{(weather.main.temp - 273.15).toFixed(2)}ºC</h3>

                <div className="weather__details__texts">
                    <p className="weather__details__texts-title">Details</p>
                    <p className="weather__details__texts-subtitle">
                        Max temperature: <span>{(weather.main.temp_max - 273.15).toFixed(2)}ºC</span>
                    </p>
                    <p className="weather__details__texts-subtitle">
                        Min temperature: <span>{(weather.main.temp_min - 273.15).toFixed(2)}ºC</span>
                    </p>
                    <p className="weather__details__texts-subtitle">
                        Wind: <span>{weather.wind.speed} m/s</span>
                    </p>
                    <p className="weather__details__texts-subtitle">
                        Humidity: <span>{weather.main.humidity}%</span>
                    </p>
                    <p className="weather__details__texts-subtitle">
                        Pressure: <span>{(weather.main.pressure)} hPa</span>
                    </p>
                </div>
            </div>
            {/* {weather.state && <p className="weather-subtitle"> State: <span className="weather-response">{weather.state}</span> </p>} */}
        </div>
    )
}


const WithoutResultCity = () => {
    return (
        <div className="no-result">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path></svg>
            The city was not found
        </div>
    )
}

const ResultWeather = ({ result }) => {
    return (
        (result.length === 0)
            ? <WithoutResultCity />
            : <ResultCity data={result[0]} />
    )
}

export default ResultWeather