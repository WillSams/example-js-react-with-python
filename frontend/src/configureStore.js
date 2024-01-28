import _ from 'lodash';

import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

import { actionTypes, createBaseApi } from './shared/base';

const history = createBrowserHistory({});

const configureMiddleware = () => {
  const logger = createLogger({
    collapsed: true,
    predicate: (getState, action) =>
      process.env.NODE_ENV === 'development' &&
      !_.includes(
        [actionTypes.API_REQUEST, actionTypes.API_REQUEST_DONE],
        action.type
      ),
  });

  const sagaMiddleware = createSagaMiddleware();

  return {
    routerMiddleware: routerMiddleware(history),
    sagaMiddleware,
    logger
  };
};

const configureReduxStore = (initialState = {}) => {
  const { routerMiddleware, sagaMiddleware, logger } = configureMiddleware();

  const store = createStore(
    rootReducer(history),
    initialState,
    composeWithDevTools(
      applyMiddleware(routerMiddleware, sagaMiddleware, logger)
    )
  );

  return { sagaMiddleware, store };
};

const configureStore = (initialState = {}) => {
  const { sagaMiddleware, store } = configureReduxStore(initialState);

  createBaseApi(store);
  sagaMiddleware.run(rootSaga);

  return store;
};

export { configureStore, configureReduxStore, configureMiddleware, history };
