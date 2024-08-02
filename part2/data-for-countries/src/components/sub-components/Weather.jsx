import axios from "axios"
import { useEffect, useState } from "react"
import coutrieServices from "../../services/coutrieServices"

const Weather = ({ capital, lat, lon }) => {
    const [datas, setDatas] = useState({
        temp: 0,
        icon: "xx",
        main: "xx",
        windSpeed: 0

    })
    const api_key = import.meta.env.VITE_WEATHER_KEY

    useEffect(() => {
        coutrieServices
            .fetchWeather(lat, lon, api_key)
            .then(weather => {
                setDatas({
                    temp: weather.main.temp,
                    main: weather.weather[0].main,
                    icon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                    windSpeed: weather.wind.speed
                })
            })
    }, [])

    return(
        <div key={capital}>
            <h2>Weather in {capital}</h2>
            <p>temperature {datas.temp} Celsius</p>
            <img src={datas.icon} />
            <p>wind {datas.windSpeed} m/s</p>
        </div>
    )

}

export default Weather