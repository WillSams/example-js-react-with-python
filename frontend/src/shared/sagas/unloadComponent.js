import { put, takeLatest } from 'redux-saga/effects';

import { actionCreators } from '../base';

export function* unloadComponent({ componentName }) {
  yield put({
    type: `UNLOAD_${componentName}`,
  });
}

function* saga() {
  yield takeLatest(actionCreators.UNLOAD_COMPONENT, unloadComponent);
}

export default saga;
