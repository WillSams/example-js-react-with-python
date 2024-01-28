import { expectSaga } from 'redux-saga-test-plan';
import { call, takeLatest } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';

import {
  actionTypes,
  onFailure,
} from '../../../../src/shared/base';
import { fetchQuery, createReservation } from '../../../../src/shared/graphql';

import { default as reservationComponentSagas } from '../../../../src/components/reservations/sagas';
import { newReservation } from '../../../../src/components/reservations/sagas/newReservation';
import { getAllReservations } from '../../../../src/components/home/sagas/getAllReservations';

describe('newReservation Saga', () => {
  let scenario;

  const action = {
    type: actionTypes.CREATE_RESERVATION,
    room_id: 'room1',
    checkin_date: '2024-01-01',
    checkout_date: '2024-01-05',
  };

  const expectedRequestParams = {
    input: {
      room_id: 'room1',
      checkin_date: '2024-01-01',
      checkout_date: '2024-01-05',
    },
  };

  beforeEach(() => {
    scenario = expectSaga(newReservation, action);
  });

  afterEach(() => {
    scenario = null;
  });

  it('should handle successful reservation creation', () => {
    const mockResponse = {
      data: {
        data: {
          createReservation: {
            errors: null,
          },
        },
      },
    };

    return scenario
      .provide([
        [call(fetchQuery, createReservation, expectedRequestParams), mockResponse],
        [call(getAllReservations), {}],
      ])
      .call(getAllReservations)
      .put({
        type: actionTypes.SET_ALERT,
        alertType: 'success',
        message: 'Reservation created.',
      })
      .silentRun();
  });

  it('should handle API response with errors', () => {
    const errMessage = 'Some error message';
    const mockResponse = {
      data: {
        data: {
          createReservation: {
            errors: errMessage,
          },
        },
      },
    };
    const alertType = 'danger';
    const expectedErrMessage = `Could not create reservation.  Error: createreservation-saga-error:  "${errMessage}"`;

    return scenario
      .provide([
        [call(fetchQuery, createReservation, expectedRequestParams), mockResponse],
      ])
      .put({
        type: onFailure(action.type),
        alertType,
        message: expectedErrMessage,
      })
      .put({
        type: actionTypes.SET_ALERT,
        alertType,
        message: expectedErrMessage,
      })
      .silentRun();
  });

  it('should handle unexpected non-API errors', () => {
    const errMessage = 'Some error message';
    const alertType = 'danger';
    const expectedErrMessage = `Could not create reservation.  ${errMessage}`;

    return scenario
      .provide([
        [call(fetchQuery, createReservation, expectedRequestParams), throwError(errMessage)],
      ])
      .put({
        type: onFailure(action.type),
        alertType,
        message: expectedErrMessage,
      })
      .put({
        type: actionTypes.SET_ALERT,
        alertType,
        message: expectedErrMessage,
      })
      .silentRun();
  });

  it('should be invoked by latest CREATE_RESERVATION dispatch', () => {
    return expectSaga(reservationComponentSagas)
      .provide([
        [takeLatest(action.type, createReservation),],
      ])
      .silentRun();
  });;
});

