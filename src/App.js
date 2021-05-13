import React from "react";

import Info from "./componets/info";
import Form from "./componets/form";
import Weather from "./componets/weather";

const API_KEY = "834f2c301cbc05d1f7292db27c4fcc77";


class App extends React.Component {

  state = { //Значения для JSON файла
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault(); //Изменение поведения кнопки
    const city = e.target.elements.city.value; //Получение данных с формы
    if(city){
      const api_url = await 
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`); //Изменение ссылки
      const data = await api_url.json(); //Получение данных в формате JSON
      
      //Проверка есть ли город в списке
      if(data.cod === '404') {
        this.setState({
          error: 'Вашего города нет в списке'
        })
        return;
      }
      
      //Переводим давление в превычный формат
      let pressure = data.main.pressure;
      let pressureInMmHg = Math.floor(pressure * 0.75006); 

      //Переводим время заката солнца в привычный формат
      let sunsetInSec = data.sys.sunset
      let date = new Date(sunsetInSec * 1000)
      let timeSunset = date.toLocaleTimeString()

      //Переводим градусы из Фаренгейта в Цельсий
      let temp = data.main.temp;
      let tempFToCel = Math.floor(temp - 273.15);

      this.setState({ //Получаем данные из JSON 
        temp: tempFToCel,
        city: data.name,
        country: data.sys.country,
        pressure: pressureInMmHg,
        sunset: timeSunset,
        error: undefined
      });

    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Введите название города"
      });
    } 
  }

  render() {
    return (
      <div className = "wrapper">
        <div className = "main">
          <div className = "container">
            <div className = "row">
              <div className = "col-sm-5 info"><Info/></div>
              <div className = "col-sm-7 form">
                <Form weatherMethod = {this.gettingWeather}/>
                <Weather //Передаем данные в компонент Weather
                  temp = {this.state.temp}
                  city = {this.state.city}
                  country = {this.state.country}
                  pressure = {this.state.pressure}
                  sunset = {this.state.sunset}
                  error = {this.state.error}
                />
              </div>
            </div>
          </div>
        </div>


        
        
      </div>
    );
  }
}

export default App;