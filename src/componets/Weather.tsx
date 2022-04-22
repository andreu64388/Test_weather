import { FC, useEffect, useState } from 'react';
interface IWeather {
  weather: any;
  city: string;
}
const Weather: FC<IWeather> = ({ weather, city }) => {
  const [color, setColor] = useState<string>("");
  let weathers = weather?.weather[0].icon;
  let weat = weather?.weather[0].main;
  console.log(weathers)
  useEffect(() => {
    const temperature: number = Number(Math.round(weather?.main.temp - 273.15));
    if (temperature > 0 && temperature <= 5) {
      setColor("#00ff00")
    }
    else if (temperature > 5 && temperature <= 10) {
      setColor("#ffff00")
    }
    else if (temperature > 10) {
      setColor("#ff0000")
    }
    else if (temperature < 0) {
      setColor("#0000ff")
    }
  }, [weather])
  const iconurl =
    "http://openweathermap.org/img/wn/" +
    `${weather?.weather[0].icon}` +
    ".png";
  const country = weather?.sys.country;
  if (weather === null) {
    return (
      <div>
        <h1 className='error'>Город <span style={{ color: "red" }}>"{city}"</span> не найден </h1>
      </div>
    )
  }
  return (
    <div className='weather'>
      <div className="block_main_information">
        <div className="temreture">
          <h1 className="temperature_value">
            <h1 className='town'>{weather.name}</h1>
            {weather.main ? <h1
              style={{ color }}>{
                Math.round(weather.main.temp - 273.15)}°</h1> : null}
            <div className="img">
              <img src={iconurl} />
              <p>{weat}</p>

            </div>
          </h1>
          <p style={{ textAlign: "center", color: color }}> {country}</p>
          <div className="info">
            <p>
              <div className="h1">
                {weather.main ? <span>{weather.main.feels_like} </span> : null}
                <span>&#176;</span>
              </div>
              <div className="h2">
                Feels like
              </div>
            </p>
            <p>
              <div className="h1">
                {weather.main ? weather.main.humidity : null}%
              </div>
              <div className="h2">
                Humidity
              </div>
            </p>
            <p>
              <div className="h1">
                {weather.wind ? weather.wind.speed : null}
              </div>
              <div className="h2">
                Wind
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Weather
