/* eslint-disable no-alert */
/* eslint-disable no-console */
import { Dispatch } from 'redux';
import { Language, Temperature } from '../Utils/Constants';
import { Coordinates, ApplicationState, FullWeather } from '../state/ApplicationState';
import GeoLocation from '../classes/GeoLocation';
import OpenCageApi from '../classes/OpenCageApi';
import UnsplashApi from '../classes/UnsplashApi';
import OpenWeatherMapApi from '../classes/OpenWeatherMapApi';

export interface Action {
  type: string;
  newLang?: Language;
  newTempFormat?: Temperature;
  isRequesting?: boolean;
  newCoordinates?: Coordinates;
  locationName?: string;
  timezone?: number;
  newWeather?: FullWeather;
  statusValue?: boolean;
  status: string;
}

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const changeLanguage = (newLang: Language) => ({
  type: CHANGE_LANGUAGE,
  newLang,
});

export const CHANGE_TEMPERATURE_FORMAT = 'CHANGE_TEMPERATURE_FORMAT';
export const changeTemperatureFormat = (newTempFormat: Temperature) => ({
  type: CHANGE_TEMPERATURE_FORMAT,
  newTempFormat,
});

export const SET_COORDINATES = 'SET_COORDINATES';
export const setCoordinates = (newCoordinates: Coordinates) => ({
  type: SET_COORDINATES,
  newCoordinates,
});

export const detectInitialLocation = () => {
  const thunkedAction = async (dispatch: Dispatch) => {
    try {
      const newLocation: Coordinates = await GeoLocation.detectUserLocation();
      dispatch(setCoordinates(newLocation));
    } catch (error) {
      console.error(error);
    } finally {
      console.log('detectInitialLocation done');
    }
  };

  return thunkedAction;
};

export const CHANGE_REQUEST_STATUS = 'CHANGE_REQUEST_STATUS';
export const changeRequestStatus = (status: string, statusValue: boolean) => ({
  type: CHANGE_REQUEST_STATUS,
  status,
  statusValue,
});

export const findLocationByQuery = (query: string) => {
  const thunkedAction = async (dispatch: Dispatch) => {
    if (query.trim().length < 3) {
      return;
    }
    try {
      dispatch(changeRequestStatus('locationGeo', true));
      const newCoordinates = await OpenCageApi
        .getCoordinatesByQuery(query);

      dispatch(setCoordinates(newCoordinates));
    } catch (error) {
      console.error(error);
      alert('Error: failed to find location');
    } finally {
      dispatch(changeRequestStatus('locationGeo', false));
      console.log('findLocationByQuery done');
    }
  };

  return thunkedAction;
};

export const SET_LOCATION_DATA = 'SET_LOCATION_DATA';
export const setLocationData = (payload: { locationName: string, timezone: string }) => ({
  type: SET_LOCATION_DATA,
  ...payload,
});

export const getLocationData = (coords: Coordinates, language: string) => {
  const thunkedAction = async (dispatch: Dispatch) => {
    try {
      dispatch(changeRequestStatus('locationData', true));
      const geoCoderResponse = await OpenCageApi
        .getLocationData(coords, language);
      const { locationName, timezone } = geoCoderResponse;
      dispatch(setLocationData({ locationName, timezone }));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(changeRequestStatus('locationData', false));
    }
  };

  return thunkedAction;
};

export const SET_WEATHER_DATA = 'SET_WEATHER_DATA';
export const setWeatherData = (newWeather: FullWeather) => ({
  type: SET_WEATHER_DATA,
  newWeather,
});

export const getWeatherForLocation = () => {
  const thunkedAction = async (dispatch: Dispatch, getState: () => ApplicationState) => {
    try {
      dispatch(changeRequestStatus('weather', true));
      const state: ApplicationState = getState();
      const { coords } = state;
      const weather = await OpenWeatherMapApi.getWeatherByCoordinates(coords);
      dispatch(setWeatherData(weather));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(changeRequestStatus('weather', false));
    }
  };

  return thunkedAction;
};

export const changeBackgroundImage = () => {
  const thunkedAction = async (dispatch: Dispatch, getState: () => ApplicationState) => {
    try {
      dispatch(changeRequestStatus('image', true));
      const state: ApplicationState = getState();
      // we didn't set any location data yet, meaning we're only on the startup of the app
      if (state.location === undefined) return;

      const keyWords: Array<string> = [];
      const timeZone = state.location.timezone;

      const weatherKeyword = `${state.weather.type} weather`;

      keyWords.push(weatherKeyword);
      // getting time dependant keywords
      const date = new Date();
      const month = date.getMonth();
      switch (month) {
        case 0:
        case 1:
        case 11:
          keyWords.push('winter');
          break;
        case 2:
        case 3:
        case 4:
          keyWords.push('spring');
          break;
        case 5:
        case 6:
        case 7:
          keyWords.push('summer');
          break;
        default:
          keyWords.push('autumn');
      }
      const formatter = new Intl.DateTimeFormat(
        'en-US',
        {
          timeZone,
          hour: 'numeric',
          month: 'long',
        },
      );
      const parts = formatter.formatToParts(date);
      const monthName = parts[0].value;
      keyWords.push(monthName);
      const hourDigit = Number.parseInt(parts[2].value, 10);
      const dayPart = parts[4].value;
      let timeOfDayKeyword;
      if (dayPart === 'PM') {
        if (hourDigit < 6) {
          timeOfDayKeyword = 'day';
        } else {
          timeOfDayKeyword = 'evening';
        }
      } else if (hourDigit < 6) {
        timeOfDayKeyword = 'night';
      } else {
        timeOfDayKeyword = 'morning';
      }
      keyWords.push(timeOfDayKeyword);

      console.log(`Запрос картинки с ключ. словами: ${keyWords.join(', ')}`);

      const imgUrl = await UnsplashApi.getRandomPhotoByKeywords(keyWords);

      const image = new Image();
      image.addEventListener('load', () => {
        document.body.setAttribute('style', `background-image: url(${imgUrl})`);
      });
      image.src = imgUrl;

      console.log(imgUrl);
    } catch (error) {
      document.body.removeAttribute('style');
      console.error(error);
      alert('Error: out of daily free requests to the unsplash api.');
    } finally {
      dispatch(changeRequestStatus('image', false));
      console.log('changeBackgroundImage done');
    }
  };

  return thunkedAction;
};
