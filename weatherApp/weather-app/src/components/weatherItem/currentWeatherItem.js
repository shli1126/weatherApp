const CurrentWeatherItem = ({city, temperature, humidity, wind, condition}) => {

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <ol className="list-group list-group-numbered" style={{maxWidth: '400px', width: '100%'}}>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">City:</div>
                        {city}
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Current temperature:</div>
                        {temperature}
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Current humidity:</div>
                        {humidity}
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Current wind:</div>
                        {wind}
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">General weather condition:</div>
                        {condition}
                    </div>
                </li>
            </ol>
        </div>
    );
}

export default CurrentWeatherItem;
