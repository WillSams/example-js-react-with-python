import { all } from 'redux-saga/effects';

import { default as sharedSagas } from './shared/sagas';
import { default as homeComponentSagas } from './components/home/sagas';
import { default as reservationComponentSagas } from './components/reservations/sagas';

export default function* rootSaga() {
  yield all(
    [
      sharedSagas(),
      homeComponentSagas(),
      reservationComponentSagas(),
    ]);
};
