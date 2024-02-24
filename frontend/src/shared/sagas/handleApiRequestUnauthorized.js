import { put, takeLatest } from 'redux-saga/effects';

import { actionCreators } from '../base';

export function* handleApiRequestUnauthorized() {
  yield put({ type: actionCreators.LOGOUT });
}

function* handleApiRequestUnauthorizedSaga() {
  yield takeLatest(
    actionCreators.API_REQUEST_UNAUTHORIZED,
    handleApiRequestUnauthorized,
  );
}

export default handleApiRequestUnauthorizedSaga;
