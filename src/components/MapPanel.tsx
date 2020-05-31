import * as React from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { YMaps, Map } from 'react-yandex-maps';
import { Coordinates, ApplicationState } from '../state/ApplicationState';
import AppConfig from '../config';
import { Language, LANG_EN } from '../Utils/Constants';

const { apiKey } = AppConfig.yandex.maps;

export interface MapPanelProps {
  coordinates?: Coordinates;
  language?: Language;
}

const PLACEHOLDER = 'x.x';

const MapPanel: React.FunctionComponent<MapPanelProps> = (props: MapPanelProps) => {
  const { coordinates, language } = props;

  const center = coordinates ? [coordinates.latitude, coordinates.longitude] : [0, 0];
  const lang = (language === LANG_EN ? 'en_US' : 'ru_RU');

  return (
    <Paper elevation={3}>
      <YMaps
        query={{
          apikey: apiKey,
          lang,
        }}
      >
        <Map
          state={{ center, zoom: 10 }}
          width="100%"
          height="60vh"
        />
      </YMaps>
      <div>
        <div>
          Latitude:
          {coordinates ? coordinates.latitude : PLACEHOLDER}
        </div>
        <div>
          Longitude:
          {coordinates ? coordinates.longitude : PLACEHOLDER}
        </div>
      </div>
    </Paper>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  coordinates: state.coords,
  language: state.settings.language,
});

export default connect(
  mapStateToProps,
)(MapPanel);
