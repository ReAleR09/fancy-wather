import * as React from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { Coordinates, ApplicationState } from '../state/ApplicationState';
import AppConfig from '../config';
import {
  Language, LANG_EN, LANG_RU, LANG_BE,
} from '../Utils/Constants';
import { TranslationsTree, createTranslator } from '../Utils/Translator';

const { apiKey } = AppConfig.yandex.maps;

export interface MapPanelProps {
  coordinates?: Coordinates;
  language?: Language;
}

const PLACEHOLDER = 'x.x';

const TRANSLATIONS: TranslationsTree = {
  LATITUDE: {
    [LANG_RU]: 'Широта',
    [LANG_EN]: 'Latitude',
    [LANG_BE]: 'Шыраты',
  },
  LONGITUDE: {
    [LANG_RU]: 'Долгота',
    [LANG_EN]: 'Longitude',
    [LANG_BE]: 'Даўгата',
  },
};
const TRANSLATE = createTranslator(TRANSLATIONS);

const formatCoord = (coord: number, lat: boolean = false) => {
  let direction: string;
  if (lat) {
    if (coord > 0) {
      direction = 'N';
    } else {
      direction = 'S';
    }
  } else if (coord > 0) {
    direction = 'E';
  } else {
    direction = 'W';
  }
  const deg = Math.floor(coord);
  const min = Math.floor((coord - deg) * 60);
  return `${direction} ${Math.abs(deg)}' ${min} '' `;
};

const MapPanel: React.FunctionComponent<MapPanelProps> = (props: MapPanelProps) => {
  const { coordinates, language } = props;

  const center = coordinates ? [coordinates.latitude, coordinates.longitude] : [0, 0];
  const lang = (language === LANG_EN ? 'en_US' : 'ru_RU');

  return (
    <Paper elevation={3} className="map-panel">
      <div className="map-panel__map">
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
          >
            <Placemark geometry={center} />
          </Map>
        </YMaps>
      </div>
      <div>
        <div className="map-panel__coord">
          {`${TRANSLATE(language, 'LATITUDE')}: ${coordinates ? formatCoord(coordinates.latitude, true) : PLACEHOLDER}`}
        </div>
        <div className="map-panel__coord">
          {`${TRANSLATE(language, 'LONGITUDE')}: ${coordinates ? formatCoord(coordinates.longitude) : PLACEHOLDER}`}
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
