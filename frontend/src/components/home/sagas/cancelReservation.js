import { call, take, takeLatest, put, race } from 'redux-saga/effects';

import {
  actionTypes,
  onCancellation,
  onFailure,
  onSuccessful,
} from '@/shared/base';
import { fetchQuery, deleteReservationMutation } from '@/shared/graphql';

export function* confirmation(reservationId) {
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

  return confirm;
}

export function* cancelReservation({ reservationId }) {
  try {
    const confirm = yield call(confirmation, reservationId);
    if (!confirm) {
      yield put({
        type: onCancellation(actionTypes.REJECT_CONFIRMATION_MODAL),
      });
      return;
    } else {
      const variables = { reservationId };
      const response = yield call(
        fetchQuery,
        deleteReservationMutation,
        variables,
      );

      const data = response?.data;
      const errors = data?.deleteReservation?.errors;
      if (errors)
        throw new Error(
          `deletereservation-saga-error:  ${JSON.stringify(errors)}`,
        );
      else {
        const { reservations } = data?.deleteReservation || [];
        yield put({
          type: actionTypes.SET_ALERT,
          alertType: 'success',
          message: 'Reservation cancelled.',
        });
        yield put({
          type: onSuccessful(actionTypes.DELETE_RESERVATION),
          response: {
            data: reservations,
          },
        });
      }
    }
  } catch (ex) {
    const message = `Could not delete reservation.  ${ex}`;
    yield put({
      type: onFailure(actionTypes.DELETE_RESERVATION),
      alertType: 'danger',
      message,
    });
    yield put({
      type: actionTypes.SET_ALERT,
      alertType: 'danger',
      message,
    });
  }
}

function* saga() {
  yield takeLatest(actionTypes.DELETE_RESERVATION, cancelReservation);
}

export default saga;