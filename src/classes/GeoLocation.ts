import { Coordinates } from '../state/ApplicationState';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const detectUserLocation = (): Promise<Coordinates> => {
  const promise: Promise<Coordinates> = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  }).then((position: Position) => {
    const { latitude, longitude } = position.coords;
    return {
      latitude,
      longitude,
    };
  });

  return promise;
};


export default {
  Location,
  detectUserLocation,
};
