import { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import WeatherInformations from './components/WeatherInformations/WeatherInfo';
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInfo5Days';

function App() {
  const [weather, setWeather] = useState(); 
  const [weather5Days, setWeather5Days] = useState();

  const inputRef = useRef();

  // Função de busca da cidade
  async function searchCity() {
    const city = inputRef.current.value;
    const key = "3ff99cbe686d1a88d232d06d0cafadf2";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    // Limpa os dados antes de fazer a nova requisição
    setWeather(null);  
    setWeather5Days(null);  

    try {
      // Buscando as informações da cidade
      const apiInfo = await axios.get(url);
      const api5Days = await axios.get(url5Days);

      setWeather(apiInfo.data);  // Atualiza o estado do clima
      setWeather5Days(api5Days.data);  // Atualiza o estado das previsões de 5 dias
    } catch (error) {
      console.error("Erro ao buscar os dados da cidade", error);
    }
  }

  return (
    <div className="container">
      <h1>Previsão do Clima</h1>
      <input ref={inputRef} type="text" placeholder="Digite o nome da cidade" />
      <button onClick={searchCity}>Buscar</button>

      {weather && <WeatherInformations weather={weather} />}
      {weather5Days && <WeatherInformations5Days weather5Days={weather5Days} />}
    </div>
  );
}

export default App;

