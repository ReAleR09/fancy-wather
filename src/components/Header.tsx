import * as React from 'react';
import { connect } from 'react-redux';
import { MenuItem, Select, Button, Grid, TextField, Toolbar } from '@material-ui/core';
import { Language, LANG_NAMES, Temperature, TEMP_F, TEMP_C } from '../Utils/Constants';
import { ApplicationState } from '../reducers/rootReducer';
import { changeLanguage, changeTemperatureFormat, setWeather } from '../actions/creators';

export interface HeaderProps {
  language: Language,
  changeLanguage: (newVal: unknown) => void;
  temperatueFormat: Temperature;
  changeTemperatureFormat: (newVal: unknown) => void;
  // TODO: remove
  setWeather: (cityName: unknown) => void;
};

const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps) => {

  const languages = [];
  for (const lang of LANG_NAMES) {
    languages.push(<MenuItem key={lang} value={lang}>{lang}</MenuItem>);
  }

  const { language, temperatueFormat } = props;


  const dispatchSwitchTempFormat = (newTempFormat: Temperature) => {
    props.changeTemperatureFormat(newTempFormat);
  }

  const [searchInput, setSearchInput] = React.useState('');
  
  return (
    <Toolbar>
      <Grid container spacing={3} justify="space-between">
          <Grid item xs={12} md={4}>
            <Button>
              <div className={"spinner"}></div>
            </Button>
            <Select
              value={language}
              style={{color: 'white!important'}}
              onChange={(event) => {
                props.changeLanguage(event.target.value)
              }}
            >
              {languages}
            </Select>
            <div style={{display: "inline-flex", margin: "0 20px"}}>
              <Button
                onClick={() => dispatchSwitchTempFormat(TEMP_F)}
                variant={temperatueFormat === TEMP_F ? "contained" : "outlined"}
              >°F</Button>
              <Button
                onClick={() => dispatchSwitchTempFormat(TEMP_C)}
                variant={temperatueFormat === TEMP_C ? "contained" : "outlined"}
              >°C</Button>
            </div>
          </Grid>
          <Grid item xs={12} md={4} style={{display: "flex"}}>
            <TextField
              label="Найти город или индекс"
              variant="standard"
              type="search"
              placeholder="*"
              style={{width: "100%"}}
              onChange={(event) => {
                setSearchInput(event.target.value);
              }}
            />
            <Button 
              variant="outlined"
              onClick={() => {
                props.setWeather(searchInput);
              }}
            >Поиск</Button>
          </Grid>
      </Grid>
    </Toolbar>
  );
};

const mapStateToProps = (state: ApplicationState /*, ownProps */) => {
  return {
    language: state.settings.language,
    temperatueFormat: state.settings.temperatureFormat
  };
};

const mapDispatchToProps = {
  changeLanguage,
  changeTemperatureFormat,
  setWeather // TODO remove
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);