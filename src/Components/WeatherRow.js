import React from 'react'
import "./WeatherRow.css"
function WeatherRow({data,day}) {
    const getDate=()=>{
        const today=new Date()
        const tom=new Date(today)
        tom.setDate(tom.getDate()+day)
        // console.log()
        var arr=tom.toString().split(" ")
        return `${arr[0]}, ${arr[1]}, ${arr[2]}`;
    }
    // console.log(data);
    return (
        <div className="row">
            <p>{getDate()}</p>
            <span class="row_temp">
            <img src={`http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`} alt="not available"/>
            <p>{`${data.temp.max}/${data.temp.min}`}</p>
            </span>
            <p>{data.weather[0].description}</p>
        </div>
    )
}

export default WeatherRow
