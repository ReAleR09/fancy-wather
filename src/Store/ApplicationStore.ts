import { Language, Temperature } from '../Utils/Constants';

interface DayWeather {
  temperature: number;
  type: string;
  dayOfWeek?: number;
}

export interface FullWeather extends DayWeather {
  feels: number;
  wind: number;
  humidity: number;
  foreCast: Array<DayWeather>;
}

export interface ApplicationState {
  settings: {
    language: Language;
    temperatureFormat: Temperature;
    backgroundImage?: string;
  };
  weather?: FullWeather;
  location?: {
    lat: number;
    lon: number;
    name: string;
    timeZone: string;
  };
}
