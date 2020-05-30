import { Dispatch } from 'redux';
import { Language, Temperature } from '../Utils/Constants';
import { FullWeather, Coordinates, ApplicationState } from '../state/ApplicationState';
import GeoLocation from '../classes/GeoLocation';
import OpenCageApi from '../classes/OpenCageApi';

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

export const SET_INITIAL_LOCATION_AND_WEATHER = 'SET_INITIAL_LOCATION_AND_WEATHER';
export const setInitialLocationAndWeather = (payload: any) => ({
  type: SET_INITIAL_LOCATION_AND_WEATHER,
  payload,
});

export const detectInitialLocationAndWeather = () => {
  const thunkedAction = async (dispatch: Dispatch, getState: () => ApplicationState) => {
    const state: ApplicationState = getState();
    const { language } = state.settings;
    // blocking UI user from requesting new location
    dispatch(setRequestState(true));

    try {
      const newLocation: Coordinates = await GeoLocation.detectUserLocation();
      const geoCoderResponse = await OpenCageApi
        .getLocationDataByCoordinates(newLocation, language);
      console.log(geoCoderResponse);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setRequestState(false));
    }
  };

  return thunkedAction;
};
