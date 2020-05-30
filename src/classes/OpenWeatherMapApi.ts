import { Coordinates } from '../state/ApplicationState';
import AppConfig from '../config';

const { apiKey, baseUrl } = AppConfig.openWeatherMap;

const getWeatherByCoordinates = (coords: Coordinates) => {
  const latLon = `lat=${coords.latitude}&lon=${coords.longitude}`;
  const requestUri = `${baseUrl}?appid=${apiKey}&${latLon}&exclude=minutely,hourly`;
  const promise = fetch(requestUri)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
  return promise;
};

const OpenWeatherMapApi = {
  getWeatherByCoordinates,
};

export default OpenWeatherMapApi;
