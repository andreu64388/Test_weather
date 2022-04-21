import React, { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react'
import "./sass/App.css"
import Weather from './componets/Weather';
import axios from 'axios';

const App: FC = () => {
   const [weather, setWeather] = useState<any>(null);
   const [city, setCity] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const [image, setImage] = useState("https://www.neizvestniy-geniy.ru/images/works/photo/2015/07/1431877_1.jpg");
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ed94d09a48c2b34bc0010d0050ec626f`;
   useEffect(() => {
      const temperature = Number(Math.round(weather?.main.temp - 273.15));
      if (temperature > 0 && temperature <= 5) {
         setImage("https://c.pxhere.com/photos/c0/1d/sunset_evening_sky_the_sun_landscape_twilight_scenery_cloud_cover-947827.jpg!d")
      }
      else if (temperature > 5 && temperature <= 10) {

         setImage("https://pbs.twimg.com/media/DFKOLlIWAAAlBJr.jpg:large")
      }
      else if (temperature > 10) {
         setImage("https://www.neizvestniy-geniy.ru/images/works/photo/2015/07/1431877_1.jpg")
      }
      else {
         setImage("https://pp.userapi.com/c840720/v840720301/60037/MZNdDdVNprI.jpg")
      }
   }, [weather])
   const Search = (e: KeyboardEvent<HTMLInputElement>) => {

      if (e.key === "Enter") {
         if (city.length > 0) {
            setError(city)
            setLoading(true);
            axios.get(url).then(res => {
               setWeather(res.data)

            })
         }
         setCity("");
      }


   }

   return (
      <div className='App' style={{ backgroundImage: `url(${image})` }}>

         <div className="search">
            <input type="text"
               value={city}
               placeholder="Search" onKeyPress={Search} onChange={(e) => setCity(e.target.value)} />
         </div>

         {loading && <div className="wrapper">
            <Weather weather={weather} city={error} />
         </div>}

      </div>
   )
}

export default App