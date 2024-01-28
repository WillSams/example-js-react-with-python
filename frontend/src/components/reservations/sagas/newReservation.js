import { call, put, take, takeLatest, } from 'redux-saga/effects';

import { actionTypes, onFailure, onSuccessful } from '../../../shared/base';
import { fetchQuery, createReservation, } from '../../../shared/graphql';

import { getAllReservations } from '../../home/sagas/getAllReservations';

export function* newReservation({ room_id, checkin_date, checkout_date }) {
  try {
    const variables = {
      input: { room_id, checkin_date, checkout_date, }
    };
    const response = yield call(fetchQuery, createReservation, variables);
    const data = response?.data?.data;
    const errors = data?.createReservation?.errors;
    if (errors) throw new Error(`createreservation-saga-error:  ${JSON.stringify(errors)}`);
    else {
      yield call(getAllReservations);
      yield put({
        type: actionTypes.SET_ALERT,
        alertType: 'success',
        message: 'Reservation created.',
      });
    };
  } catch (ex) {
    const message = `Could not create reservation.  ${ex}`;
    yield put({
      type: onFailure(actionTypes.CREATE_RESERVATION),
      alertType: 'danger',
      message
    });
    yield put({
      type: actionTypes.SET_ALERT,
      alertType: 'danger',
      message
    });
  }
}

function* saga() {
  yield takeLatest(actionTypes.CREATE_RESERVATION, newReservation);
}

export default saga;


