import {useState} from "react";
import axios from "axios";
import {API_KEY} from "../../config";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentWeatherItem} from "../../features/home/currentWeatherSlice";
import {getForecastItem} from "../../features/home/forecastWeatherSlice";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const [city, setCity] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {savedCities} = useSelector((store) => store.favorite);

    //First get city name from using input, then use city name to make first API call to get city coordinate.
    //Use coordinate to make second and third API calls to get current weather data and forecast weather data.
    //One trade off I made is that the name appear on the weather information list doesn't always match the name
    //use input because the city name second and third API calls returned sometimes different from the user input name
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (!city) {
                alert('City cannot be empty');
                return
            }
            // user input a city name, use city name to get city coordinate, use coordinate to get city
            // weather and condition
            const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
            if (response) {
                const lat = response.data[0].lat
                const lon = response.data[0].lon
                //API calls to get current weather and forecast weather
                const resCurrent = dispatch(getCurrentWeatherItem(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`));
                const resForecast = dispatch(getForecastItem(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`));
                navigate('/')
                return response;
            } else {
                throw new Error("Invalid response")
                return
            }
        } catch (err) {
            console.log(err)
            alert("Please enter a valid city name")
            return
        }
    }

    const handleClick = (e) => {
        // click to go back to home screen
        e.preventDefault()
        navigate('/')
    }


    //Get use's favorite list and make API call on each coordinate in the favorite list to get their current weather
    const handleCheckSaved = async (e) => {
        e.preventDefault();
        const savedCitiesWeather = [];
        try {
            const promises = savedCities.map(async (city) => {
                const lat = city[0]
                const lon = city[1]
                if (lat && lon) {
                    const resCurrent =  dispatch(getCurrentWeatherItem(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`));
                    return resCurrent;
                } else {
                    alert("Cannot fetch data for this city")
                    return;
                }
            });
            const resolvedData = await Promise.all(promises);
            const validResponses = resolvedData.filter((data) => data !== null);
            savedCitiesWeather.push(...validResponses);
            navigate('/favorite', {state: {weatherData: savedCitiesWeather}});
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-brand" onClick={handleClick}>My Weather App</button>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <button className="btn btn-outline-success" type="submit"
                                onClick={handleCheckSaved}>Favorite
                        </button>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                               onChange={e => setCity(e.target.value.toLowerCase())}/>
                        <button className="btn btn-outline-success" type="submit"
                                onClick={handleSubmit}>Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Header;
