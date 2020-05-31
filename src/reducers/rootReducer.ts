import { ApplicationState } from '../state/ApplicationState';
import {
  LANG_EN, TEMP_C, Language, STORAGE_LANG, Temperature, STORAGE_TEMP_TYPE,
} from '../Utils/Constants';
import {
  Action, CHANGE_LANGUAGE, CHANGE_TEMPERATURE_FORMAT,
  SET_COORDINATES, SET_LOCATION_DATA, SET_WEATHER_DATA, CHANGE_REQUEST_STATUS,
} from '../actions/actions';
import LocalStorage from '../Utils/LocalStorage';

let INIT_LANGUAGE: Language = LANG_EN;
const storedLang = LocalStorage.get(STORAGE_LANG);
if (storedLang !== null) {
  INIT_LANGUAGE = storedLang;
}

let INIT_TEMP_FORMAT: Temperature = TEMP_C;
const storedTFormat = LocalStorage.get(STORAGE_TEMP_TYPE);
if (storedTFormat !== null) {
  INIT_TEMP_FORMAT = storedTFormat;
}

const initialState: ApplicationState = {
  settings: {
    language: INIT_LANGUAGE,
    temperatureFormat: INIT_TEMP_FORMAT,
  },
  keywords: 'random',
  requests: {
    weather: false,
    location: false,
  },
};

const rootReducer = (state: ApplicationState = initialState, action: Action) => {
  const newState: ApplicationState = { ...state };
  switch (action.type) {
    case CHANGE_LANGUAGE:
      newState.settings.language = action.newLang;
      return newState;
    case CHANGE_TEMPERATURE_FORMAT:
      newState.settings.temperatureFormat = action.newTempFormat;
      return newState;
    case SET_COORDINATES:
      newState.coords = action.newCoordinates;
      return newState;
    case SET_LOCATION_DATA:
      return {
        ...newState,
        location: {
          locationName: action.locationName,
          timezone: action.timezone,
        },
      };
    case SET_WEATHER_DATA:
      return {
        ...newState,
        weather: action.newWeather,
      };
    case CHANGE_REQUEST_STATUS:
      switch (action.status) {
        case 'locationData':
          newState.requests.location = action.statusValue;
          break;
        case 'weather':
          newState.requests.weather = action.statusValue;
          break;
        default:
          console.log(`Incorrect request status name: ${action.status}`);
      }
      return newState;
    default:
      return state;
  }
};

export default rootReducer;
