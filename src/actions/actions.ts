import { Dispatch } from 'redux';
import { Language, Temperature } from '../Utils/Constants';
import { FullWeather, Coordinates } from '../state/ApplicationState';
import GeoLocation from '../classes/GeoLocation';

export interface Action {
  type: string,
  newLang?: Language;
  newTempFormat?: Temperature;
  newWeather?: FullWeather;
  isRequesting?: boolean;
  newCoordinates?: Coordinates;
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

export const SET_FULL_WEATHER = 'SET_FULL_WEATHER';
export const setWeather = (newWeather: FullWeather) => ({
  type: SET_FULL_WEATHER,
  newWeather,
});

export const SET_COORDINATES = 'SET_COORDINATES';
export const setCoordinates = (newCoordinates: Coordinates) => ({
  type: SET_COORDINATES,
  newCoordinates,
});

export const detectInitialLocation = () => {
  const thunkedAction = async (dispatch: Dispatch) => {
    // blocking UI user from requesting new location
    dispatch(setRequestState(true));

    try {
      const newLocation: Coordinates = await GeoLocation.detectUserLocation();
      // const geoCoderResponse = await YandexGeoCoder.getLocationNameByCoordinates(newLocation);
      // console.log(geoCoderResponse);

      dispatch(setCoordinates(newLocation));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setRequestState(false));
    }
  };

  return thunkedAction;
};
