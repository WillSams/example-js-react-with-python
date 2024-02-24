import { put, takeLatest } from 'redux-saga/effects';

import { actionCreators } from '../base';

export function* loadComponent({ componentName }) {
  yield put({
    type: `LOAD_${componentName}`,
  });
}

function* saga() {
  yield takeLatest(actionCreators.LOAD_COMPONENT, loadComponent);
}

export default saga;
