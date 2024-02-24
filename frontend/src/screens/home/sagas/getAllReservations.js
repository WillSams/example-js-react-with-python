import { call, takeLatest, put } from 'redux-saga/effects';

import { actionCreators, onFailure, onSuccessful } from '@/shared/base';
import { fetchQuery, getExistingReservationsQuery } from '@/shared/graphql';

export function* getAllReservations() {
  try {
    const variables = {};
    const response = yield call(
      fetchQuery,
      getExistingReservationsQuery,
      variables,
    );

    const data = response?.data;
    const errors = data?.getAllReservations?.errors;
    if (errors)
      throw new Error(
        `getallreservations-saga-error:  ${JSON.stringify(errors)}`,
      );
    else {
      const { reservations } = data?.getAllReservations || [];
      yield put({
        type: onSuccessful(actionCreators.GET_RESERVATIONS),
        response: {
          data: reservations,
        },
      });
    }
  } catch (ex) {
    const message = `Could not retrieve reservations.  ${ex}`;
    yield put({
      type: onFailure(actionCreators.GET_RESERVATIONS),
      alertType: 'danger',
      message,
    });
    yield put({
      type: actionCreators.SET_ALERT,
      alertType: 'danger',
      message,
    });
  }
}

function* saga() {
  yield takeLatest(actionCreators.GET_RESERVATIONS, getAllReservations);
}

export default saga;
