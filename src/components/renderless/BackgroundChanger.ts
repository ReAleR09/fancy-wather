import { useEffect } from 'react';
import { connect } from 'react-redux';
import { changeBackgroundImage } from '../../actions/actions';
import { ApplicationState } from '../../state/ApplicationState';

interface BackgroundChangerProps {
  locationDataRequestStatus: boolean;
  weatherDataRequestStatus: boolean;
  changeBackgroundImage: () => void;
}

const BackgroundChanger = (props: BackgroundChangerProps): any => {
  const { locationDataRequestStatus, weatherDataRequestStatus } = props;

  // issue side-effect only when both weather and locationData requests are not in progress
  useEffect(() => {
    if (!locationDataRequestStatus && !weatherDataRequestStatus) {
      props.changeBackgroundImage();
    }
  }, [locationDataRequestStatus, weatherDataRequestStatus]);

  return null;
};

const mapStateToProps = (state: ApplicationState) => ({
  locationDataRequestStatus: state.requests.location,
  weatherDataRequestStatus: state.requests.weather,
});

const mapDispatchToProps = { changeBackgroundImage };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BackgroundChanger);
