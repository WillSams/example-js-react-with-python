import { put, takeLatest } from 'redux-saga/effects';

import { actionTypes } from '../base';

export function* loadComponent({ componentName }) {
  yield put({
    type: `LOAD_${componentName}`,
  });
}

function* saga() {
  yield takeLatest(actionTypes.LOAD_COMPONENT, loadComponent);
}

export default saga;
