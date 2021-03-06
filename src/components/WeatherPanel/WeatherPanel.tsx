import * as React from 'react';
import { connect } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import { FullWeather, ApplicationState } from '../../state/ApplicationState';
import LocationDataComponent from '../LocationDataComponent';
import { getWeatherForLocation } from '../../actions/actions';
import { Temperature, Language } from '../../Utils/Constants';
import { formatToMeasure as tFormat } from '../../Utils/TemperatureUtils';
import W_TRANS from './WeatherConditions';
import { getNextThreeWeekDays } from '../../Utils/Time';

export interface WeatherPanelProps {
  weather: FullWeather;
  coords: Coordinates;
  temperatureFormat: Temperature;
  language: Language;
  getWeatherForLocation: (coords: Coordinates) => Promise<void>;
  timeZone?: string;
}

const PLACEHOLDER = '--';

const WeatherPanel: React.FunctionComponent<WeatherPanelProps> = (props: WeatherPanelProps) => {
  const {
    weather, coords, temperatureFormat,
    language, timeZone,
  } = props;


  React.useEffect(
    () => {
      if (coords === undefined) return;
      props.getWeatherForLocation(coords);
    },
    [coords],
  );

  let foreCastElement;
  if (weather === undefined || timeZone === undefined) {
    foreCastElement = <div />;
  } else {
    const weekDayNames = getNextThreeWeekDays(timeZone, language);
    foreCastElement = weather.foreCast.map((daylyWeather) => {
      const weekdayName = weekDayNames.shift();
      return (
        <Grid item xs={12} md={4} key={weekdayName} className="weather__daily">
          <div>
            <div
              className="weather__current_icon"
              style={{
                backgroundImage: `url(${daylyWeather.icon})`,
              }}
            />
          </div>
          <div>
            <div>{weekdayName}</div>
            <div>{W_TRANS(language, daylyWeather.type)}</div>
            <div>{tFormat(daylyWeather.temperature, temperatureFormat)}</div>
          </div>
        </Grid>
      );
    });
  }

  return (
    <Paper elevation={3} className="weather">
      <Grid container spacing={3} justify="space-between">
        <LocationDataComponent />
        <Grid item sm={12} md={8}>
          <div className="weather__current_temp">
            {weather ? tFormat(weather.temperature, temperatureFormat) : PLACEHOLDER}
          </div>
        </Grid>
        <Grid item sm={12} md={4}>
          <div
            className="weather__current_icon"
            style={{
              backgroundImage: weather ? `url(${weather.icon})` : 'none',
            }}
          />
          <div className="weather__current_desc">{weather ? W_TRANS(language, weather.type) : PLACEHOLDER}</div>
          <div className="weather__current_feels">
            {`${W_TRANS(language, 'FEELS')}: ${weather ? tFormat(weather.feels, temperatureFormat) : PLACEHOLDER}`}
          </div>
          <div className="weather__current_wind">
            {`${W_TRANS(language, 'WIND')}: ${weather ? weather.wind : PLACEHOLDER} ${W_TRANS(language, 'WIND_SPEED_MS')}`}
          </div>
          <div className="weather__current_humidity">
            {`${W_TRANS(language, 'HUMIDITY')}: ${weather ? weather.humidity : PLACEHOLDER} %`}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="space-between">
            {foreCastElement}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  weather: state.weather,
  coords: state.coords,
  temperatureFormat: state.settings.temperatureFormat,
  language: state.settings.language,
  timeZone: state.location ? state.location.timezone : undefined,
});

const mapDispatchToProps = { getWeatherForLocation };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WeatherPanel);
