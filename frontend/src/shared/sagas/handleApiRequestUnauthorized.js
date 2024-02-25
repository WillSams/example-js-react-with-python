import { put, takeLatest } from 'redux-saga/effects';

import { actionTypes } from '../base';

export function* handleApiRequestUnauthorized() {
  yield put({ type: actionTypes.LOGOUT });
}

function* handleApiRequestUnauthorizedSaga() {
  yield takeLatest(
    actionTypes.API_REQUEST_UNAUTHORIZED,
    handleApiRequestUnauthorized,
  );
}

export default handleApiRequestUnauthorizedSaga;
