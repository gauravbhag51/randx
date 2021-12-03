import React, { useEffect,useState } from 'react'
import WeatherRow from './WeatherRow';
function Weather({location}) {
const [state, setState] = useState({
    error:null,
    dataFetched:false,
    data:{}
})
const getDate=()=>{
    var arr=(new Date()).toString().split(" ");
    return `${arr[4].substr(0,5)}, ${arr[1]} ${arr[2]}`;
}
const [fetched,setFetched]=useState(false);
const [current,setCurrent]=useState(null);
const [daily,setDaily]=useState([])
const [showDaily,setShowDaily]=useState(false);
const getWeather = () => {
  
    fetch(`
    https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&exclude=hourly,minutely&units=metric&appid=e22162a875a2489b09e37b589c3b3b0a`)
        .then(response => response.json())
        .then(data => {

            
            setCurrent(data.current);
            setDaily(data.daily.slice(0,3));
            setFetched(true);
            console.log(data);
        });
        
}
useEffect(()=>{
    getWeather();
}
,[])
if(fetched===false)
    return <h3>"Data Not Fetched"</h3>
else if(fetched===true)
{
    return (
        
        <div>
            {/* {console.log(Date(current.dt).split(" "))} */}
            <p>{getDate()}</p>
            <h1>{location.city}, {location.country}</h1>
            <h3> <img src={`http://openweathermap.org/img/wn/${current?.weather[0]?.icon}@2x.png`} alt="Not available" align="center"/> {current?.temp}&#176;C</h3>
            <button onClick={()=>setShowDaily(!showDaily)}>{showDaily?"Hide Future Forecast": "Show Future Firecast"}</button>
            {showDaily && daily.map((weather,i)=>{
                // console.log(weather);
                return <WeatherRow key={i} day={i+1} data={weather}></WeatherRow>
            }
                
            )}
        </div>
    )
}
}

export default Weather
