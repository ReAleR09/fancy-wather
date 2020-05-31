import { Coordinates, LocationData } from '../state/ApplicationState';
import AppConfig from '../config';

const { apiKey, baseUrl } = AppConfig.openCage;

const COMP_COUNTRY = 'country';
const COMP_CITY = 'city';
const COMP_COUNTY = 'county';

const getLocationData = (coords: Coordinates, language: string = 'en', limit: number = 1): Promise<LocationData> => {
  const latLon = `${coords.latitude}+${coords.longitude}`;
  const requestLang = language.toLocaleLowerCase();
  const requestUri = `${baseUrl}?key=${apiKey}&q=${latLon}&language=${requestLang}&limi=${limit}`;

  const promise = fetch(requestUri)
    .then((response) => response.json())
    .then((data) => {
      const result = data.results[0];
      const { components } = result;
      const locationParts: Array<string> = [];

      if (components[COMP_CITY]) {
        locationParts.push(components[COMP_CITY]);
      } else if (components[COMP_COUNTY]) {
        locationParts.push(components[COMP_COUNTY]);
      }
      if (components[COMP_COUNTRY]) {
        locationParts.push(components[COMP_COUNTRY]);
      }

      const locationName = locationParts.join(', ');

      const timezone = result.annotations.timezone.name;

      return {
        locationName,
        timezone,
      };
    });

  return promise;
};

const OpenCageApi = {
  getLocationData,
};

export default OpenCageApi;
