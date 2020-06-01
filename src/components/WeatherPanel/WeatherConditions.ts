import { LANG_EN, LANG_RU, LANG_BE } from '../../Utils/Constants';
import { TranslationsTree, createTranslator } from '../../Utils/Translator';

const WEATHER_TRANSLATIONS: TranslationsTree = {
  Thunderstorm: {
    [LANG_EN]: 'Thunderstorm',
    [LANG_RU]: 'Гроза',
    [LANG_BE]: 'Навальніца',
  },
  Drizzle: {
    [LANG_EN]: 'Drizzle',
    [LANG_RU]: 'Изморось',
    [LANG_BE]: 'імжа',
  },
  Rain: {
    [LANG_EN]: 'Rain',
    [LANG_RU]: 'Дождь',
    [LANG_BE]: 'Дождж',
  },
  Snow: {
    [LANG_EN]: 'Snow',
    [LANG_RU]: 'Снег',
    [LANG_BE]: 'Снег',
  },
  Mist: {
    [LANG_EN]: 'Mist',
    [LANG_RU]: 'Туман',
    [LANG_BE]: 'Туман',
  },
  Smoke: {
    [LANG_EN]: 'Smoke',
    [LANG_RU]: 'Дым',
    [LANG_BE]: 'Дым',
  },
  Haze: {
    [LANG_EN]: 'Haze',
    [LANG_RU]: 'Vukf',
    [LANG_BE]: 'Дымка',
  },
  Dust: {
    [LANG_EN]: 'Dust',
    [LANG_RU]: 'Пыль',
    [LANG_BE]: 'Пыл',
  },
  Fog: {
    [LANG_EN]: 'Fog',
    [LANG_RU]: 'Туман',
    [LANG_BE]: 'Туман',
  },
  Sand: {
    [LANG_EN]: 'Sand',
    [LANG_RU]: 'Песок',
    [LANG_BE]: 'Пясок',
  },
  Ash: {
    [LANG_EN]: 'Volcanic ash',
    [LANG_RU]: 'Вулканический пепел',
    [LANG_BE]: 'Вулканічны попел',
  },
  Squall: {
    [LANG_EN]: 'Squalls',
    [LANG_RU]: 'Шквальный ветер',
    [LANG_BE]: 'Шквальны вецер',
  },
  Tornado: {
    [LANG_EN]: 'Tornado',
    [LANG_RU]: 'Торнадо',
    [LANG_BE]: 'Тарнада',
  },
  Clear: {
    [LANG_EN]: 'Clear',
    [LANG_RU]: 'Ясно',
    [LANG_BE]: 'Ясна',
  },
  Clouds: {
    [LANG_EN]: 'Clouds',
    [LANG_RU]: 'Облачно',
    [LANG_BE]: 'Воблачна',
  },
  WIND: {
    [LANG_EN]: 'Wind',
    [LANG_RU]: 'Ветер',
    [LANG_BE]: 'Вецер',
  },
  FEELS: {
    [LANG_EN]: 'Feels',
    [LANG_RU]: 'Ощущается',
    [LANG_BE]: 'Адчуваецца',
  },
  WIND_SPEED_MS: {
    [LANG_EN]: 'm/s',
    [LANG_RU]: 'м/с',
    [LANG_BE]: 'м/с',
  },
  HUMIDITY: {
    [LANG_EN]: 'Humidity',
    [LANG_RU]: 'Влажность',
    [LANG_BE]: 'Вільготнасць',
  },
};

const weatherTranslator = createTranslator(WEATHER_TRANSLATIONS);

export default weatherTranslator;
