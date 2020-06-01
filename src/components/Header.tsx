import * as React from 'react';
import { connect } from 'react-redux';
import {
  MenuItem, Select, Button, Grid, TextField, Toolbar,
} from '@material-ui/core';
import {
  Language, LANG_NAMES, Temperature, TEMP_F, TEMP_C,
  STORAGE_LANG, STORAGE_TEMP_TYPE, LANG_RU, LANG_EN, LANG_BE,
} from '../Utils/Constants';
import {
  changeLanguage, changeTemperatureFormat,
  findLocationByQuery, changeBackgroundImage,
} from '../actions/actions';
import { ApplicationState } from '../state/ApplicationState';
import LocalStorage from '../Utils/LocalStorage';
import { createTranslator, TranslationsTree } from '../Utils/Translator';
import Progress from './Progress';

export interface HeaderProps {
  language: Language,
  changeLanguage: (newVal: unknown) => void;
  temperatueFormat: Temperature;
  changeTemperatureFormat: (newVal: unknown) => void;
  findLocationByQuery: (query: string) => void;
  changeBackgroundImage: () => void;
  anyRequestActive: boolean;
}

const TRANSLATIONS: TranslationsTree = {
  INPUT_PLACEHOLDER: {
    [LANG_RU]: 'Найти город или индекс',
    [LANG_EN]: 'Find city or post index',
    [LANG_BE]: 'Знайсці горад або індэкс',
  },
  SEARCH_BUTTON: {
    [LANG_RU]: 'Найти',
    [LANG_EN]: 'Search',
    [LANG_BE]: 'Пошук',
  },
};

const TRANSLATOR = createTranslator(TRANSLATIONS);

const SYMBOL_CELSIUS = '°C';
const SYMBOL_FAHRENHEIT = '°F';

const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const languages = LANG_NAMES.map((lang) => (<MenuItem key={lang} value={lang}>{lang}</MenuItem>));

  const { language, temperatueFormat, anyRequestActive } = props;

  const dispatchSwitchTempFormat = (newTempFormat: Temperature) => {
    props.changeTemperatureFormat(newTempFormat);
    LocalStorage.set(STORAGE_TEMP_TYPE, newTempFormat);
  };

  const [searchInput, setSearchInput] = React.useState('');

  return (
    <Toolbar>
      <Grid container spacing={3} justify="space-between">
        <Grid item xs={12} md={6}>
          <Button
            disabled={anyRequestActive}
            onClick={() => {
              if (!anyRequestActive) {
                props.changeBackgroundImage();
              }
            }}
          >
            <div className="spinner" />
          </Button>
          <Select
            value={language}
            onChange={(event) => {
              props.changeLanguage(event.target.value);
              LocalStorage.set(STORAGE_LANG, event.target.value);
            }}
          >
            {languages}
          </Select>
          <div style={{ display: 'inline-flex', margin: '0 20px' }}>
            <Button
              onClick={() => dispatchSwitchTempFormat(TEMP_F)}
              variant={temperatueFormat === TEMP_F ? 'contained' : 'outlined'}
            >
              {SYMBOL_FAHRENHEIT}
            </Button>
            <Button
              onClick={() => dispatchSwitchTempFormat(TEMP_C)}
              variant={temperatueFormat === TEMP_C ? 'contained' : 'outlined'}
            >
              {SYMBOL_CELSIUS}
            </Button>
          </div>
          <Progress />
        </Grid>
        <Grid item xs={12} md={6} style={{ display: 'flex' }}>
          <TextField
            label={TRANSLATOR(language, 'INPUT_PLACEHOLDER')}
            variant="standard"
            type="search"
            placeholder="*"
            style={{ width: '100%' }}
            disabled={anyRequestActive}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'NumpadEnter' || event.key === 'Enter') {
                if (!anyRequestActive) {
                  props.findLocationByQuery(searchInput);
                }
              }
            }}
          />
          <Button
            disabled={anyRequestActive}
            variant="outlined"
            onClick={() => {
              if (!anyRequestActive) {
                props.findLocationByQuery(searchInput);
              }
            }}
          >
            {TRANSLATOR(language, 'SEARCH_BUTTON')}
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  language: state.settings.language,
  temperatueFormat: state.settings.temperatureFormat,
  anyRequestActive: (state.requests.image || state.requests.weather
    || state.requests.location || state.requests.locationGeo),
});

const mapDispatchToProps = {
  changeLanguage,
  changeTemperatureFormat,
  findLocationByQuery,
  changeBackgroundImage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
