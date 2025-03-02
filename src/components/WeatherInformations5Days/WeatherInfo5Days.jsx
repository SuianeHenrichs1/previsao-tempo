import "./WeatherInfo5Days.css";

function WeatherInformations5Days({ weather5Days }) {
  let dailyForeCast = {};

  for (let forecast of weather5Days.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();

    if (!dailyForeCast[date]) {
      dailyForeCast[date] = forecast;
    }
  }

  const next5DaysForecast = Object.values(dailyForeCast).slice(1, 6);

  function convertDate(date) {
    const newDate = new Date(date.dt * 1000).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
    });

    return newDate;
  }

  return (
    <div className="weather-container">
      <h3>Previsão Próximos 5 Dias</h3>

      <div className="weather-list">
        {next5DaysForecast.map((forecast) => (
          <div key={forecast.dt} className="weather-item">
            <p className="forecast-day">{convertDate(forecast)}</p>
            <img
              src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
            />
            <p className="forecast-description">
              {forecast.weather[0].description}
            </p>
            <p>
              {Math.round(forecast.main.temp_min)} °C min /{" "}
              {Math.round(forecast.main.temp_max)} °C máx{" "}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherInformations5Days;
