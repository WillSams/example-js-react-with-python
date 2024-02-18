import { all } from 'redux-saga/effects';

import handleApiRequestError from './handleApiRequestError';
import handleApiRequestUnauthorized from './handleApiRequestUnauthorized';
import loadComponent from './loadComponent';
import unloadComponent from './unloadComponent';
import logout from './logout';

export default function* rootSaga() {
  yield all([
    handleApiRequestError(),
    handleApiRequestUnauthorized(),
    loadComponent(),
    logout(),
    unloadComponent(),
  ]);
}
