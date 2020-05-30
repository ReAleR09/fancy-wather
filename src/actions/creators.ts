import * as TYPES from './types';
import { Language, Temperature } from '../Utils/Constants';
import { FullWeather } from '../Store/ApplicationStore';

export interface Action {
  type: string,
  newLang?: Language;
  newTempFormat?: Temperature;
  newWeather?: FullWeather;
}

export type ActionCreator = (payload: any) => Action;

export const changeLanguage = (newLang: Language) => ({
  type: TYPES.CHANGE_LANGUAGE,
  newLang,
});

export const changeTemperatureFormat = (newTempFormat: Temperature) => ({
  type: TYPES.CHANGE_TEMPERATURE_FORMAT,
  newTempFormat,
});

export const setWeather = (newWeather: FullWeather) => ({
  type: TYPES.SET_FULL_WEATHER,
  newWeather,
});
