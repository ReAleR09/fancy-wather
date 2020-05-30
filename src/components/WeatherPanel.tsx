import * as React from 'react';
import { connect } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import { ApplicationState, FullWeather } from '../reducers/rootReducer';

export interface WeatherPanelProps {
  weather: FullWeather;
};

const PLACEHOLDER = '--';

const WeatherPanel: React.FunctionComponent<WeatherPanelProps> = (props: WeatherPanelProps) => {

  let currentWeather: FullWeather = undefined;
  if (props.weather) {
    currentWeather = props.weather;
  }

  let foreCastElement;
  if (currentWeather === undefined) {
    foreCastElement = <div></div>;
  } else {
    foreCastElement = currentWeather.foreCast.map((daylyWeather) => {
      return (
        <div>
          <div>{daylyWeather.dayOfWeek}</div>
          <div>{daylyWeather.type}</div>
          <div>{daylyWeather.temperature}</div>
        </div>
      );
    })
  }
   
  
  return (
    <Paper elevation={3} style={{padding: "14px"}}>
      <Grid container spacing={3} justify="space-between">
        <Grid item md={12}>
          <div style={{fontSize: "4.4rem"}}>City name</div>
        </Grid>
        <Grid item md={12}>
          <div style={{fontSize: "2.2rem"}}>Date, time</div>
        </Grid>
        <Grid item md={8}>
          <div style={{fontSize: "24rem"}}>
            {currentWeather ? currentWeather.temperature : PLACEHOLDER}
          </div>
        </Grid>
        <Grid item md={4}>
          <div>
            <div>weather icon</div>
            <div>{currentWeather ? currentWeather.type : PLACEHOLDER}</div>
            <div>{currentWeather ? currentWeather.feels : PLACEHOLDER}</div>
            <div>{currentWeather ? currentWeather.wind : PLACEHOLDER}</div>
            <div>{currentWeather ? currentWeather.humidity : PLACEHOLDER}</div>
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
}

const mapStateToProps = (state: ApplicationState /*, ownProps */) => {
  return {
    weather: state.weather
  };
};

export default connect(
  mapStateToProps
)(WeatherPanel);