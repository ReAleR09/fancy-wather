import * as React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { ApplicationState } from '../state/ApplicationState';

interface ProgressProps {
  locationRequest: boolean;
  weatherRequest: boolean;
  imageReqeust: boolean;
  locationGeoRequest: boolean;
}

const Progress: React.FunctionComponent<ProgressProps> = (props: ProgressProps) => {
  const {
    locationRequest, weatherRequest, imageReqeust, locationGeoRequest,
  } = props;
  const isProgressing = locationRequest || weatherRequest || imageReqeust || locationGeoRequest;
  return (
    <CircularProgress
      color="secondary"
      variant={isProgressing ? 'indeterminate' : 'static'}
      value={0}
    />
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  locationRequest: state.requests.location,
  weatherRequest: state.requests.weather,
  imageReqeust: state.requests.image,
  locationGeoRequest: state.requests.locationGeo,
});


export default connect(
  mapStateToProps,
)(Progress);
