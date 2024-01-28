import { takeLatest } from 'redux-saga/effects';

import { actionTypes } from '../base';

export function* logout() {
  window.location = '/logout';
}

function* saga() {
  yield takeLatest(actionTypes.LOGOUT, logout);
}

export default saga;
