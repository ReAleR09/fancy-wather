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
    <Container maxWidth="xl">
      <AppBar position="static">
        <Header />
      </AppBar>

      <Grid container spacing={3} justify="space-between" style={{ marginTop: '10px' }}>
        <Grid item xs={12} md={7}>
          <WeatherPanel />
        </Grid>
        <Grid item xs={12} md={5}>
          <MapPanel />
        </Grid>
      </Grid>
    </Container>
  </>
);


export default connect()(App);
