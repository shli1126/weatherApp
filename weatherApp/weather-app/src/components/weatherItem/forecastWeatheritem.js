const ForecastWeatherItem = ({ forecast }) => {
    //There are total 5 days, each day has 8 weather data because it updates every 3 hours throughout the day
    //First group the data by days and then find their highest and lowest
    const groupByDay = (forecastData) => {
        const groupedData = {};
        forecastData.forEach((day) => {
            const date = day.dt_txt.split(' ')[0];
            if (!groupedData[date]) {
                groupedData[date] = [];
            }
            groupedData[date].push(day);
        });
        return groupedData;
    };

    const groupedForecast = groupByDay(forecast);
    // const firstDate = Object.keys(groupedForecast)[0];
    // if (firstDate) {
    //     delete groupedForecast[firstDate];
    // }

    return (
        <div className="row">
            <h3>Five days forecasts:</h3>
            {Object.keys(groupedForecast).map((date) => (
                <div key={date} className="col-md-4">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <p>Date: {date}</p>
                            <p>
                                Lowest Temp:{' '}
                                {Math.min(
                                    ...groupedForecast[date].map((day) => day.main.temp_min)
                                )}{' '}
                                &deg;C
                            </p>
                            <p>
                                Highest Temp:{' '}
                                {Math.max(
                                    ...groupedForecast[date].map((day) => day.main.temp_max)
                                )}{' '}
                                &deg;C
                            </p>
                        </li>
                    </ul>
                </div>
            ))}
        </div>

    );
};

export default ForecastWeatherItem;

