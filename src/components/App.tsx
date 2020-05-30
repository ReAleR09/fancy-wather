import * as React from 'react';
import { connect } from 'react-redux';
import { Grid, Container, AppBar, Paper } from '@material-ui/core';
import { YMaps, Map } from 'react-yandex-maps';
import Header from './Header';
import WeatherPanel from './WeatherPanel';


const App = () => (
  <Container maxWidth="xl">
    <AppBar position="static">
      <Header/>
    </AppBar>
    
    <Grid container spacing={3} justify="space-between" style={{marginTop: "10px"}}>
        <Grid item xs={12} md={7}>
          <WeatherPanel/>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} >
            <YMaps>
              <Map 
                defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                width="100%"
                height="60vh"
              />
            </YMaps>
            <div>Coordinates</div>
          </Paper>
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
