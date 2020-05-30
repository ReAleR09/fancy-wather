import { createStore, applyMiddleware, AnyAction } from 'redux';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { ApplicationState } from '../state/ApplicationState';

type MiddlewareType = ThunkMiddleware<ApplicationState, AnyAction>;

export const AppStore = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware as MiddlewareType,
  ),
);

export type AppDispatch = typeof AppStore.dispatch;
