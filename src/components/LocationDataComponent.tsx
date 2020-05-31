import { connect } from 'react-redux';
import * as React from 'react';
import { Grid } from '@material-ui/core';
import { Coordinates, LocationData, ApplicationState } from '../state/ApplicationState';
import { Language } from '../Utils/Constants';
import { getCurrentWithTimezoneOffset } from '../Utils/Time';
import { getLocationData } from '../actions/actions';


export interface LocationDataComponentProps {
  coords: Coordinates;
  language: Language;
  locationData: LocationData;
  getLocationData: (coords: Coordinates, language: Language) => Promise<void>;
}

const PLACEHOLDER = '--';

const LocationDataComponent: React.FunctionComponent<LocationDataComponentProps> = (
  props: LocationDataComponentProps,
) => {
  const { coords, language, locationData } = props;

  // if coords or language changes
  // we tell app to request API and update the state of store.locationData
  // (timezone and location name)
  React.useEffect(
    () => {
      if (coords === undefined) return;
      props.getLocationData(coords, language);
    },
    [coords, language],
  );

  // refresh date + time string
  const [dateTimeString, setDateTimeString] = React.useState(PLACEHOLDER);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (locationData) {
        const resultDateTimeString = getCurrentWithTimezoneOffset(
          locationData.timezone,
          language,
        );
        setDateTimeString(resultDateTimeString);
      } else {
        setDateTimeString(PLACEHOLDER);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [locationData, language]);

  return (
    <>
      <Grid item md={12}>
        <div style={{ fontSize: '4.4rem' }}>{locationData ? locationData.locationName : PLACEHOLDER}</div>
      </Grid>
      <Grid item md={12}>
        <div style={{ fontSize: '2.2rem' }}>{dateTimeString}</div>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  coords: state.coords,
  language: state.settings.language,
  locationData: state.location,
});

const mapDispatchToProps = { getLocationData };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationDataComponent);
