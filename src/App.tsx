import axios from 'axios';
import { FC, KeyboardEvent, useEffect, useState } from 'react';
import Weather from './componets/Weather';
import "./sass/App.css";
const App: FC = () => {
   const [weather, setWeather] = useState<any>(null);
   const [city, setCity] = useState<string>("");
   const [error, setError] = useState<string>("");
   const [loading, setLoading] = useState<boolean>(false);
   const [image, setImage] = useState<string>("https://www.bobrlife.by/wp-content/uploads/2020/01/122.jpg");
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ed94d09a48c2b34bc0010d0050ec626f`;
   useEffect(() => {
      const temperature: number = Number(Math.round(weather?.main.temp - 273.15));
      if (temperature > 0 && temperature <= 5) {
         setImage("https://c.pxhere.com/photos/12/4d/sunset_sea_ocean_water_summer_sunrise_sunlight_landscape-1078986.jpg!d")
      }
      else if (temperature > 5 && temperature <= 10) {
         setImage("https://catherineasquithgallery.com/uploads/posts/2021-03/1614857433_63-p-fon-okeana-83.jpg")
      }
      else if (temperature > 10) {
         setImage("https://www.neizvestniy-geniy.ru/images/works/photo/2015/07/1431877_1.jpg")
      }
      else if (temperature < 0) {
         setImage("https://pp.userapi.com/c840720/v840720301/60037/MZNdDdVNprI.jpg")
      }
   }, [weather])
   const getWeather = () => {
      if (city.length > 0 && city.trim() !== "") {
         setError(city)
         setLoading(true);
         try {
            axios.get(url).then(res => {
               setWeather(res.data)
               console.log(res.data)
            }).catch(err => {
               console.log(err)
               setWeather(null)
               setImage(image)
            }
            )
         }
         catch (e) {
            console.log(e)
         }
      }
      setCity("");
   }
   const Search = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         getWeather();
      }
   }
   return (
      <div className='App' style={{ backgroundImage: `url(${image})` }}>
         <div className="search">
            <input type="text"
               maxLength={16}
               value={city}
               placeholder="Search" onKeyPress={Search} onChange={(e) => setCity(e.target.value)} />
            <button onClick={getWeather} className='btn' >Search</button>
         </div>
         {loading && <div className="wrapper">
            <Weather weather={weather} city={error} />
         </div>}
      </div>
   )
}

export default App