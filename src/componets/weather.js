import React from "react";

const Weather = props => {
    return (
        <div className = "infoWeather">
            {props.city && //Проверка ввели ли что-либо
                <div>
                    <p>Местоположение: {props.city}, {props.country} </p>
                    <p>Температура: {props.temp}</p>
                    <p>Давление: {props.pressure}</p>
                    <p>Закат солнца: {props.sunset}</p>
                </div>
            }
            <p className = "error"> {props.error}</p>
        </div>
    );
}

export default Weather;