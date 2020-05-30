import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppStore } from './store/AppStore';
import App from './components/App';
import { detectInitialLocation } from './actions/actions';

ReactDOM.render(
  <Provider store={AppStore}>
    <App />
  </Provider>,
  document.getElementById('app'),
);

// requesting users location
AppStore.dispatch(detectInitialLocation());
