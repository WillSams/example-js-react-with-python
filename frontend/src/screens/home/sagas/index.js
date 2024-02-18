import { all } from 'redux-saga/effects';

import cancelReservation from './cancelReservation';
import getAllReservations from './getAllReservations';

export default function* rootSaga() {
  yield all([cancelReservation(), getAllReservations()]);
}
