import React,{useState} from 'react'
import ReactMapGL,{Marker} from 'react-map-gl'
function NewMap({location}) {
    // console.log(coordinates.coordinates.lat)
    const [viewport,setViewport]=useState({
        latitude:location.lat,
        longitude:location.lng,
        width:'100%',
        height:'400px',
        zoom:14,
    })
    return (
        <div>
            <ReactMapGL {...viewport} mapboxApiAccessToken="pk.eyJ1IjoiZ2F1cmF2YmhhZzUxIiwiYSI6ImNrd3A3OTJjMTA5d3EycXVzbWNzMWwwaW0ifQ.CG-q_exegPSa0lGV4xwN7A"
            onViewportChange={viewport=>{
                setViewport(viewport);
            }}
            >
                <Marker latitude={location.lat}
                longitude={location.lng}
                >
                    <div>
                        You are here
                    </div>
                    <img src="./map-marker-solid.svg" width="20px"/>
                </Marker>

            </ReactMapGL>
        </div>
    )
}

export default NewMap
