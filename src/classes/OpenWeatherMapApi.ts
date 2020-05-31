import { Coordinates, FullWeather, DayWeather } from '../state/ApplicationState';
import AppConfig from '../config';

const { apiKey, baseUrl } = AppConfig.openWeatherMap;
const threeDaysForecastKeys = [1, 2, 3];

const getWeatherByCoordinates = (coords: Coordinates): Promise<FullWeather> => {
  const latLon = `lat=${coords.latitude}&lon=${coords.longitude}`;
  const requestUri = `${baseUrl}?appid=${apiKey}&${latLon}&exclude=minutely,hourly`;
  const promise = fetch(requestUri)
    .then((response) => response.json())
    .then((data) => {
      // mapping current weather
      const {
        // eslint-disable-next-line camelcase
        temp, feels_like, wind_speed, humidity,
      } = data.current;

      const { main, icon } = data.current.weather[0];
      const full: FullWeather = {
        temperature: temp,
        type: main,
        icon: `http://openweathermap.org/img/wn/${icon}@2x.png`,
        feels: feels_like,
        wind: wind_speed,
        humidity,
      };

      const foreCast: Array<DayWeather> = threeDaysForecastKeys.map((key) => {
        const dayObj = data.daily[key];
        const dayWeather: DayWeather = {
          temperature: dayObj.temp.day,
          type: dayObj.weather[0].main,
          icon: `http://openweathermap.org/img/wn/${dayObj.weather[0].icon}@2x.png`,
        };
        return dayWeather;
      });

      full.foreCast = foreCast;
      return full;
    });
  return promise;
};

const OpenWeatherMapApi = {
  getWeatherByCoordinates,
};

export default OpenWeatherMapApi;
