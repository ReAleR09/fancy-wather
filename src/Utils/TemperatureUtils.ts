import { TEMP_F, Temperature } from './Constants';

export const formatToMeasure = (temp: number, to: Temperature, decimals: number = 1): number => {
  let result;
  if (to === TEMP_F) {
    result = (temp * 9) / 5 - 459.7;
  } else {
    result = temp - 273.16;
  }
  return parseFloat(result.toFixed(decimals));
};

const TemperatureUtils = {
  formatToMeasure,
};

export default TemperatureUtils;
