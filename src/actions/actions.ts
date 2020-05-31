import { Dispatch } from 'redux';
import { Language, Temperature } from '../Utils/Constants';
import { Coordinates, ApplicationState, FullWeather } from '../state/ApplicationState';
import GeoLocation from '../classes/GeoLocation';
import OpenCageApi from '../classes/OpenCageApi';
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
}

export const SET_REQUEST_STATE = 'SET_REQUEST_STATE';
export const setRequestState = (isRequesting: boolean) => ({
  type: SET_REQUEST_STATE,
  isRequesting,
});

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

export const SET_LOCATION_DATA = 'SET_LOCATION_DATA';
export const setLocationData = (payload: { locationName: string, timezone: string }) => ({
  type: SET_LOCATION_DATA,
  ...payload,
});

export const getLocationData = (coords: Coordinates, language: string) => {
  const thunkedAction = async (dispatch: Dispatch) => {
    try {
      const geoCoderResponse = await OpenCageApi
        .getLocationData(coords, language);
      console.log(geoCoderResponse);
      const { locationName, timezone } = geoCoderResponse;
      dispatch(setLocationData({ locationName, timezone }));
    } catch (error) {
      console.error(error);
    } finally {
      console.log('getLocationDataByCoordinatesAndLanguage done');
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
      const state: ApplicationState = getState();
      const { coords } = state;
      const weather = await OpenWeatherMapApi.getWeatherByCoordinates(coords);
      dispatch(setWeatherData(weather));
    } catch (error) {
      console.error(error);
    } finally {
      console.log('getWeatherForLocation done');
    }
  };

  return thunkedAction;
};
