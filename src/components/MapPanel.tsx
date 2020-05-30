import * as React from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { YMaps, Map } from 'react-yandex-maps';
import { Coordinates, ApplicationState } from '../state/ApplicationState';
import AppConfig from '../config';

const { apiKey } = AppConfig.yandex.maps;

export interface MapPanelProps {
  coordinates?: Coordinates;
}

const MapPanel: React.FunctionComponent<MapPanelProps> = (props: MapPanelProps) => {
  const { coordinates } = props;

  return (
    <Paper elevation={3}>
      <YMaps
        query={{
          apikey: apiKey,
          // TODO lang:
        }}
      >
        <Map
          state={{ center: [coordinates.latitude, coordinates.longitude], zoom: 10 }}
          width="100%"
          height="60vh"
        />
      </YMaps>
      <div>
        <div>
          Latitude:
          {coordinates.latitude}
        </div>
        <div>
          Longitude:
          {coordinates.longitude}
        </div>
      </div>
    </Paper>
  );
};

const mapStateToProps = (state: ApplicationState /* , ownProps */) => ({
  coordinates: state.coords,
});

export default connect(
  mapStateToProps,
)(MapPanel);
