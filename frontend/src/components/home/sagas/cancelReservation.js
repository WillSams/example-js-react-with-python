import { call, take, takeLatest, put, race } from 'redux-saga/effects';

import { actionTypes, onCancellation, onFailure, onSuccessful } from '../../../shared/base';
import { fetchQuery, deleteReservation, } from '../../../shared/graphql';

import { getAllReservations } from './getAllReservations';

export function* cancelReservation({ reservationId }) {
  try {
    yield put({
      type: actionTypes.OPEN_CONFIRMATION_MODAL,
      title: 'Are you sure you?',
      message: `You will not be able to  reverse cancellation (id: ${reservationId}).`,
      cancellationText: 'Cancel',
      buttonStyle: 'danger',
    });

    const { confirm } = yield race({
      confirm: take(actionTypes.CONFIRM_CONFIRMATION_MODAL),
      no: take(actionTypes.REJECT_CONFIRMATION_MODAL),
    });

    let reservations = [];
    
    if (!confirm) {
      yield put({
        type: onCancellation(actionTypes.REJECT_CONFIRMATION_MODAL),
      });
      return;
    } else {
      const variables = { reservationId };
      const response = yield call(fetchQuery, deleteReservation, variables);

      const data = response?.data?.data;
      const errors = data?.deleteReservation?.errors;
      if (errors) throw new Error(`deletereservation-saga-error:  ${JSON.stringify(errors)}`);
      else {
        const response = yield call(getAllReservations);
        reservations  = response.data.data?.getAllReservations?.reservations || [];
        yield put({
          type: actionTypes.SET_ALERT,
          alertType: 'success',
          message: 'Reservation cancelled.',
        });
      }
      yield put({ type: onSuccessful(actionTypes.DELETE_RESERVATION), reservations });
    }
  } catch (ex) {
    const message = `Could not delete reservation.${ex}`;
    yield put({
      type: onFailure(actionTypes.DELETE_RESERVATION),
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
  yield takeLatest(actionTypes.DELETE_RESERVATION, cancelReservation);
}

export default saga;

