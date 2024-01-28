import { all } from 'redux-saga/effects';

import getAllRoomIds from './getAllRoomIds';
import newReservation from './newReservation';

export default function* rootSaga() {
  yield all([
    getAllRoomIds(),
    newReservation(),
  ]);
};

