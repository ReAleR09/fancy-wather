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

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  name: string;
  timeZone: string;
}

export interface ApplicationState {
  isRequesting: boolean;
  settings: {
    language: Language;
    temperatureFormat: Temperature;
    backgroundImage?: string;
  };
  weather?: FullWeather;
  coords: Coordinates;
  location?: Location;
}
