import { put, takeLatest } from 'redux-saga/effects';

import { actionTypes } from '../base';

export function* unloadComponent({ componentName }) {
  yield put({
    type: `UNLOAD_${componentName}`,
  });
}

function* saga() {
  yield takeLatest(actionTypes.UNLOAD_COMPONENT, unloadComponent);
}

export default saga;
