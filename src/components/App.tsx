import * as React from 'react';
import { connect } from 'react-redux';
import {
  Grid, Container, AppBar,
} from '@material-ui/core';
import Header from './Header';
import WeatherPanel from './WeatherPanel';
import MapPanel from './MapPanel';


const App = () => (
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
);
// const mapStateToProps = (state: ApplicationState /*, ownProps */) => {
//   return {
//     counter: state.counter,
//   };
// };

// const mapDispatchToProps = { increment, decrement, reset }

export default connect(
  // mapStateToProps,
  // mapDispatchToProps,
)(App);
