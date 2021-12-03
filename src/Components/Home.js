import React from 'react'
import {useState,useEffect} from 'react'
import NewMap from './NewMap';
import Weather from './Weather';
import Currency from './Currency';
import "./Home.css"
function Home(){
    const [location,setLocation]=useState({
        loaded:false,
        coordinates:{lat:0,lng:0}
    });
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 2000,
      };

    const onSuccess=(location)=>{
        console.log(location.coords.accuracy)
        getCountry(location.coords.latitude,location.coords.longitude)
    }

    const getCountry=(lat,lan)=>{
        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lan}&limit=1&appid=e22162a875a2489b09e37b589c3b3b0a`)
        .then(response => response.json())
            .then(data => {
                setLocation({
                    lat:lat,
                    lng:lan,
                    loaded:true,
                    country:data[0].country,
                    city: data[0].name
                })
            });
    }

    const onError=(error)=>{
        setLocation({
            loaded:true,
            error,
        });
    }  

    useEffect(() => {
        if(!("geolocation" in navigator))
        {
            onError({
                code:0,
                message:"Geolocation not supported",
            });
        }
        navigator.geolocation.getCurrentPosition(onSuccess,onError,options);
    }, [])
    if(!location.loaded)
    return "Location Data Not available";
    else if(location.error)
    return location.error.message;
    return (
        <div className="main">
            <div className="weather">
                <Weather location={location}></Weather>
            </div>
            <div className="right">
                <NewMap location={location}></NewMap>
                <Currency location={location}></Currency>
            </div>
        </div>
    )
}

export default Home
