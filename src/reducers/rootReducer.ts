import { ApplicationState } from '../Store/ApplicationStore';
import { LANG_EN, TEMP_C } from '../Utils/Constants';
import {
  Action, CHANGE_LANGUAGE, CHANGE_TEMPERATURE_FORMAT, SET_FULL_WEATHER,
} from '../actions/actions';

const initialState: ApplicationState = {
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
    case SET_FULL_WEATHER:
      // TODO
      newState.weather = {
        temperature: 25,
        type: 'noice',
        feels: 25,
        wind: 8,
        humidity: 76,
        foreCast: [
          {
            temperature: 20,
            type: 'Poidet',
            dayOfWeek: 3,
          },
          {
            temperature: 22,
            type: 'PoidetNorm',
            dayOfWeek: 4,
          },
          {
            temperature: 5,
            type: 'WTF',
            dayOfWeek: 5,
          },
        ],
      };
      return newState;
    default:
      return state;
  }
};

export default rootReducer;
