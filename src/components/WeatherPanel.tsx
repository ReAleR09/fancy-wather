import * as React from 'react';
import { connect } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import { FullWeather, ApplicationState } from '../state/ApplicationState';
import LocationDataComponent from './LocationDataComponent';
import { getWeatherForLocation } from '../actions/actions';
import { Temperature, Language } from '../Utils/Constants';
import { formatToMeasure as tFormat } from '../Utils/TemperatureUtils';

export interface WeatherPanelProps {
  weather: FullWeather;
  coords: Coordinates;
  temperatureFormat: Temperature;
  language: Language;
  getWeatherForLocation: (coords: Coordinates) => void;
}

const PLACEHOLDER = '--';

const WeatherPanel: React.FunctionComponent<WeatherPanelProps> = (props: WeatherPanelProps) => {
  const {
    weather, coords, temperatureFormat,
    // language
  } = props;

  React.useEffect(
    () => {
      if (coords === undefined) return;
      props.getWeatherForLocation(coords);
    },
    [coords],
  );

  let foreCastElement;
  if (weather === undefined) {
    foreCastElement = <div />;
  } else {
    foreCastElement = weather.foreCast.map((daylyWeather) => {
      console.log('mappin');
      return (
        <div>
          <div>DayOfWeek</div>
          <div>{daylyWeather.type}</div>
          <div>{tFormat(daylyWeather.temperature, temperatureFormat)}</div>
        </div>
      );
    });
  }

  return (
    <Paper elevation={3} style={{ padding: '14px' }}>
      <Grid container spacing={3} justify="space-between">
        <LocationDataComponent />
        <Grid item md={8}>
          <div className="weather__current_temp">
            {weather ? tFormat(weather.temperature, temperatureFormat) : PLACEHOLDER}
          </div>
        </Grid>
        <Grid item md={4}>
          <div>
            <div className="weather__current_icon">weather icon</div>
            <div className="weather__current_desc">{weather ? weather.type : PLACEHOLDER}</div>
            <div className="weather__current_feels">{weather ? tFormat(weather.feels, temperatureFormat) : PLACEHOLDER}</div>
            <div className="weather__current_wind">{weather ? weather.wind : PLACEHOLDER}</div>
            <div className="weather__current_humidity">{weather ? weather.humidity : PLACEHOLDER}</div>
          </div>
        </Grid>
        <Grid item md={12}>
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
});

const mapDispatchToProps = { getWeatherForLocation };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WeatherPanel);
