import { put, takeLatest } from 'redux-saga/effects';

import { actionCreators } from '../base';

export function* handleApiRequestError({ error }) {
  yield put({
    type: actionCreators.SET_ALERT,
    message: `Oops! Something went wrong. ${error?.name}:  ${error?.message}`,
    alertType: 'danger',
  });
}

function* saga() {
  yield takeLatest(actionCreators.API_REQUEST_ERROR, handleApiRequestError);
}

export default saga;
