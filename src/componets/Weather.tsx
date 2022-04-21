import React, { FC } from 'react'
interface IWeather {
  weather: any;
  city: string;

}
const Weather: FC<IWeather> = ({ weather, city }) => {
  const tem = Number(Math.round(weather?.main.temp - 273.15));
  console.log(weather);
  if (weather === null || weather === undefined) {
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
            {weather.main ? <h1 className={tem > 5 ? "green" : "red"}>{
              Math.round(weather.main.temp - 273.15)}°</h1> : null}
          </h1>
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
    </div >
  )
}

export default Weather