import { call, takeLatest, put } from 'redux-saga/effects';

import { actionTypes, onFailure, onSuccessful } from '../../../shared/base';
import { fetchQuery, getExistingReservations } from '../../../shared/graphql';

export function* getAllReservations() {
  try {
    const variables = {};
    const response = yield call(fetchQuery, getExistingReservations, variables);

    const data = response?.data?.data;
    const errors = data?.getAllReservations?.errors;

    if (errors) throw new Error(`getallreservations-saga-error:  ${JSON.stringify(errors)}`);
    else {
      const { reservations } = data.getAllReservations || [];
      yield put({
        type: onSuccessful(actionTypes.GET_RESERVATIONS),
        response: {
          data: reservations
        }
      });
    }
  } catch (ex) {
    const message = `Could not retrieve reservations.  ${ex}`;
    yield put({
      type: onFailure(actionTypes.GET_RESERVATIONS),
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
  yield takeLatest(actionTypes.GET_RESERVATIONS, getAllReservations);
}

export default saga;

