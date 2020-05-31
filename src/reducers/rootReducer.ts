import { ApplicationState } from '../state/ApplicationState';
import { LANG_EN, TEMP_C } from '../Utils/Constants';
import {
  Action, CHANGE_LANGUAGE, CHANGE_TEMPERATURE_FORMAT,
  SET_COORDINATES, SET_LOCATION_DATA, SET_WEATHER_DATA,
} from '../actions/actions';

const initialState: ApplicationState = {
  isRequesting: false,
  settings: {
    language: LANG_EN,
    temperatureFormat: TEMP_C,
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
    default:
      return state;
  }
};

export default rootReducer;
