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
      console.log(temperature);
      if (temperature > 0 && temperature <= 5) {
         setImage("https://avatars.mds.yandex.net/get-zen_doc/4719986/pub_60b61583d10b41440a5c5235_60b7731d3efca05eede3b7fa/scale_1200")
      }
      else if (temperature > 5 && temperature <= 10) {

         setImage("https://pbs.twimg.com/media/DFKOLlIWAAAlBJr.jpg:large")
      }
      else if (temperature > 10) {
         setImage("https://www.neizvestniy-geniy.ru/images/works/photo/2015/07/1431877_1.jpg")
      }
      else if (isNaN(temperature)) {
         setImage("https://www.bobrlife.by/wp-content/uploads/2020/01/122.jpg")
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
            try {
               axios.get(url).then(res => {
                  setWeather(res.data)
               }).catch(err => {
                  console.log(err)
                  setWeather(null)
               }
               )
            }
            catch (e) {
               console.log(e)
            }
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