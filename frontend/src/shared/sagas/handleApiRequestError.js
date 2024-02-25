import { put, takeLatest } from 'redux-saga/effects';

import { actionTypes } from '../base';

export function* handleApiRequestError({ error }) {
  yield put({
    type: actionTypes.SET_ALERT,
    message: `Oops! Something went wrong. ${error?.name}:  ${error?.message}`,
    alertType: 'danger',
  });
}

function* saga() {
  yield takeLatest(actionTypes.API_REQUEST_ERROR, handleApiRequestError);
}

export default saga;
