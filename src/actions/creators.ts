import * as TYPES from './types';
import { Language, Temperature } from '../Utils/Constants';
import { FullWeather } from '../reducers/rootReducer';

export interface Action {
  type: string,
  newLang?: Language;
  newTempFormat?: Temperature;
  newWeather?: FullWeather;
}

export type ActionCreator = (payload: any) => Action;

export const changeLanguage = (newLang: Language) => {
  return {
    type: TYPES.CHANGE_LANGUAGE,
    newLang
  };
};

export const changeTemperatureFormat = (newTempFormat: Temperature) => {
  return {
    type: TYPES.CHANGE_TEMPERATURE_FORMAT,
    newTempFormat
  };  
};

export const setWeather = (newWeather: FullWeather) => {
  return {
    type: TYPES.SET_FULL_WEATHER,
    newWeather
  }
};