import * as React from 'react';
import { connect } from 'react-redux';
import {
  Grid, Container, AppBar,
} from '@material-ui/core';
import Header from './Header';
import WeatherPanel from './WeatherPanel/WeatherPanel';
import MapPanel from './MapPanel';
import BackgroundChanger from './renderless/BackgroundChanger';


const App = () => (
  <>
    <BackgroundChanger />
    <Container maxWidth="lg">
      <AppBar position="static">
        <Header />
      </AppBar>

      <Grid container spacing={3} justify="space-between" style={{ marginTop: '10px' }}>
        <Grid item md={7} xs={12}>
          <WeatherPanel />
        </Grid>
        <Grid item md={5} xs={12}>
          <MapPanel />
        </Grid>
      </Grid>
    </Container>
  </>
);


export default connect()(App);
