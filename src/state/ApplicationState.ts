import { Language, Temperature } from '../Utils/Constants';

// note the temperature units are Kelvins
export interface DayWeather {
  temperature: number;
  type: string;
  icon: string;
}

export interface LocationData {
  locationName: string;
  timezone: string;
}

export interface FullWeather extends DayWeather {
  feels: number;
  wind: number;
  humidity: number;
  foreCast?: Array<DayWeather>;
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
  settings: {
    language: Language;
    temperatureFormat: Temperature;
    backgroundImage?: string;
  };
  weather?: FullWeather;
  coords?: Coordinates;
  location?: LocationData;
  keywords: Array<string> | 'random';
  requests: {
    weather: boolean;
    location: boolean;
    image: boolean;
  }
}
