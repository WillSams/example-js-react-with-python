import { put, takeLatest } from 'redux-saga/effects';

import { actionCreators } from '@/shared/base';

export function* logout() {
  yield put({ type: actionCreators.CLEAR_USER_DATA });
}

function* saga() {
  yield takeLatest(actionCreators.LOGOUT, logout);
}

export default saga;
