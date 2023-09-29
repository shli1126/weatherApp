import {useLocation} from "react-router-dom";
import CurrentWeatherItem from "../weatherItem/currentWeatherItem";

const FavoritePage = () => {
    const location = useLocation();
    const weatherData = location.state.weatherData;

    return (
        <div className="row">
            {weatherData.map((cityWeather, index) => (
                <div key={index} className="col-md-4">
                    <CurrentWeatherItem
                        city={cityWeather.payload.name}
                        temperature={cityWeather.payload.main.temp}
                        humidity={cityWeather.payload.main.humidity}
                        wind={cityWeather.payload.wind.speed}
                        condition={cityWeather.payload.weather[0].description}
                    />
                </div>
            ))}
        </div>
    );
};
export default FavoritePage;
