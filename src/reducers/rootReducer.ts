import { ApplicationState } from '../state/ApplicationState';
import { LANG_EN, TEMP_C } from '../Utils/Constants';
import {
  Action, CHANGE_LANGUAGE, CHANGE_TEMPERATURE_FORMAT,
} from '../actions/actions';

const initialState: ApplicationState = {
  isRequesting: false,
  coords: {
    latitude: 55.75,
    longitude: 37.57,
  },
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
    default:
      return state;
  }
};

export default rootReducer;
