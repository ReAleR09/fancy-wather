import { Coordinates } from '../state/ApplicationState';
import AppConfig from '../config';

type LocationData = {
  country: string;
  countryCode: string;
  city: string;
}

const { apiKey, baseUrl } = AppConfig.openCage;

const getLocationDataByCoordinates = (coords: Coordinates, language: string = 'en'): Promise<LocationData> => {
  const latLon = `${coords.latitude}+${coords.longitude}`;
  const requestUri = `${baseUrl}?key=${apiKey}&q=${latLon}&language=${language}`;

  const promise = fetch(requestUri)
    .then((response) => response.json())
    .then((data) => {
      const { components } = data.results[0];

      const { country } = components;
      const countryCode = components.country_code;
      const city = `${components.state}, ${components.city}`;

      return {
        country,
        countryCode,
        city,
      };
    });

  return promise;
};

const OpenCageApi = {
  getLocationDataByCoordinates,
};

export default OpenCageApi;
