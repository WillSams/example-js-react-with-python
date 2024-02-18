import { all } from 'redux-saga/effects';

import sharedSagas from '@/shared/sagas/index';
import homeComponentSagas from '@/components/home/sagas/index';
import reservationComponentSagas from '@/components/reservations/sagas/index';

export default function* rootSaga() {
  yield all([sharedSagas(), homeComponentSagas(), reservationComponentSagas()]);
}
