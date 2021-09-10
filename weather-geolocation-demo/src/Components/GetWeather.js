import React, {useState} from "react";
import UseGeolocation from "./UseGeolocation";
import Weather from "./Weather";

const GetWeather = () => {

    // const [lat, setLat] = useState('');
    // const [lon, setLon] = useState('');
    const url = `e6fb171aedd87ac1e36240cc86b2811c`;
    let [lat, setLat] = useState('');
    let [lon, setLon] = useState('');
    let [result, setResult] = useState({
        weather:[{
            decription: "",
        }],
    });

    const fetcher = () => {
        setLat= UseGeolocation().lat;
        setLon= UseGeolocation().lon;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${url}`)
        .then(res => {
            if (res.status !==200){
                throw new Error('fetch error');
            }else return res.json();
        })
        .then(json => {
            if (json.data.length ===0){
                throw new Error('no results');
            }else{
                console.log(json.data.current)
                setResult=json.data.current;
            }
        })
    }

    return(
        <div>
            <h1>Get the current weather for your location!</h1>
            <button onClick={fetcher}>Get Weather</button>
            <div>
                <Weather weather={result}/>
            </div>
        </div>

    )
}

export default GetWeather;