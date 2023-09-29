import {useDispatch, useSelector} from "react-redux";
import CurrentWeatherItem from "../weatherItem/currentWeatherItem";
import ForecastWeatherItem from "../weatherItem/forecastWeatheritem";
import {addCity} from "../../features/favorite/favoriteSlice";


// App has three components, then header, home page and favorite page shows all cities user saved. WeatherItem has
// two components, one for showing current weather data and one for showing forecast weather data
const Home = () => {
    const dispatch = useDispatch();
    const {city, temperature, humidity, wind, condition, lat, lon} = useSelector((store) => store.current);
    const {forecast} = useSelector((store) => store.forecast);

    // handle user saved city list using redux, when user click save to favorite,
    // dispatch to update favorite list
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            dispatch(addCity([lat, lon]))
            return
        } catch (err) {
            console.log(err)
            alert("Cannot save to favorite")
        }
    }

    if (city) {
        return (
            <div>
                <CurrentWeatherItem city={city} temperature={temperature} humidity={humidity} wind={wind}
                                    condition={condition}></CurrentWeatherItem>
                <ForecastWeatherItem forecast={forecast}></ForecastWeatherItem>
                <button className="btn btn-outline-success" type="submit"
                        onClick={handleSubmit}>Save to favorite
                </button>
            </div>
        )
    } else {
        return (
            <h1>Search a city first</h1>
        )
    }
}

export default Home;
