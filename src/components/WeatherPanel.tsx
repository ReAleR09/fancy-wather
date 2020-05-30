import * as React from 'react';
import { connect } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import { FullWeather, ApplicationState } from '../state/ApplicationState';

export interface WeatherPanelProps {
  weather: FullWeather;
}

const PLACEHOLDER = '--';

const WeatherPanel: React.FunctionComponent<WeatherPanelProps> = (props: WeatherPanelProps) => {
  const { weather } = props;

  let foreCastElement;
  if (weather === undefined) {
    foreCastElement = <div />;
  } else {
    foreCastElement = weather.foreCast.map((daylyWeather) => (
      <div>
        <div>{daylyWeather.dayOfWeek}</div>
        <div>{daylyWeather.type}</div>
        <div>{daylyWeather.temperature}</div>
      </div>
    ));
  }

  return (
    <Paper elevation={3} style={{ padding: '14px' }}>
      <Grid container spacing={3} justify="space-between">
        <Grid item md={12}>
          <div style={{ fontSize: '4.4rem' }}>City name</div>
        </Grid>
        <Grid item md={12}>
          <div style={{ fontSize: '2.2rem' }}>Date, time</div>
        </Grid>
        <Grid item md={8}>
          <div style={{ fontSize: '24rem' }}>
            {weather ? weather.temperature : PLACEHOLDER}
          </div>
        </Grid>
        <Grid item md={4}>
          <div>
            <div>weather icon</div>
            <div>{weather ? weather.type : PLACEHOLDER}</div>
            <div>{weather ? weather.feels : PLACEHOLDER}</div>
            <div>{weather ? weather.wind : PLACEHOLDER}</div>
            <div>{weather ? weather.humidity : PLACEHOLDER}</div>
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

const mapStateToProps = (state: ApplicationState /* , ownProps */) => ({
  weather: state.weather,
});

export default connect(
  mapStateToProps,
)(WeatherPanel);
