import { expectSaga } from 'redux-saga-test-plan';
import { call, race, take, takeLatest } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';

import { actionTypes, onCancellation, onFailure, } from '../../../../src/shared/base';
import { fetchQuery, deleteReservation } from '../../../../src/shared/graphql';

import { default as homeComponentSagas } from '../../../../src/components/home/sagas';
import { cancelReservation } from '../../../../src/components/home/sagas/cancelReservation';
import { getAllReservations } from '../../../../src/components/home/sagas/getAllReservations';

describe('cancelReservation Saga', () => {
  let scenario;

  const action = { type: actionTypes.DELETE_RESERVATION, reservationId: '123' };
  const expectedRequestParams = { reservationId: '123' };
  const mockGetAllReservationsResponse = {
    data: {
      data: {
        getAllReservations: {
          errors: null,
          reservations: [
            { id: '1', Name: 'Test Reservation 1' },
            { id: '2', Name: 'Test Reservation 2' },
          ],
        },
      },
    },
  };

  beforeEach(() => {
    scenario = expectSaga(cancelReservation, action);
  });

  afterEach(() => {
    scenario = null;
  });

  it('should handle successful reservation cancellation', () => {
    const mockResponse = {
      data: {
        data: {
          deleteReservation: {
            errors: null,
          },
        },
      },
    };

    return scenario
      .provide([
        [call(fetchQuery, deleteReservation, expectedRequestParams), mockResponse],
        [race({
          confirm: take(actionTypes.CONFIRM_CONFIRMATION_MODAL),
          no: take(actionTypes.REJECT_CONFIRMATION_MODAL),
        }), { confirm: true }],
        [call(getAllReservations), mockGetAllReservationsResponse],
      ])
      .put({
        type: actionTypes.OPEN_CONFIRMATION_MODAL,
        title: 'Are you sure you?',
        message: 'You will not be able to  reverse cancellation (id: 123).',
        cancellationText: 'Cancel',
        buttonStyle: 'danger',
      })
      .call(getAllReservations)
      .put({
        type: actionTypes.SET_ALERT,
        alertType: 'success',
        message: 'Reservation cancelled.',
      })
      .silentRun();
  });

  it('should handle cancellation rejection', () => {
    const response = { no: true };

    return scenario
      .provide([
        [race({
          confirm: take(actionTypes.CONFIRM_CONFIRMATION_MODAL),
          no: take(actionTypes.REJECT_CONFIRMATION_MODAL),
        }), response],
      ])
      .put({
        type: onCancellation(actionTypes.REJECT_CONFIRMATION_MODAL),
      })
      .silentRun();
  });

  it('should handle API response with errors', () => {
    const errMessage = 'Some error message'
    const mockResponse = {
      data: {
        data: {
          deleteReservation: {
            errors: errMessage,
          },
        },
      },
    };
    const expectedErrMessage = `Could not delete reservation.Error: deletereservation-saga-error:  "${errMessage}"`;

    return scenario
      .provide([
        [call(fetchQuery, deleteReservation, expectedRequestParams), mockResponse],
        [race({
          confirm: take(actionTypes.CONFIRM_CONFIRMATION_MODAL),
          no: take(actionTypes.REJECT_CONFIRMATION_MODAL),
        }), { confirm: true }],
        [call(getAllReservations), mockGetAllReservationsResponse],
      ])
      .put({
        type: actionTypes.OPEN_CONFIRMATION_MODAL,
        title: 'Are you sure you?',
        message: 'You will not be able to  reverse cancellation (id: 123).',
        cancellationText: 'Cancel',
        buttonStyle: 'danger',
      })
      .put({
        type: onFailure(actionTypes.DELETE_RESERVATION),
        alertType: 'danger',
        message: expectedErrMessage,
      })
      .put({
        type: actionTypes.SET_ALERT,
        alertType: 'danger',
        message: expectedErrMessage,
      })
      .silentRun();
  });

  it('should handle unexpected non-API errors', () => {
    const errMessage = 'Some error message';

    return scenario
      .provide([
        [call(fetchQuery, deleteReservation, expectedRequestParams), throwError(errMessage)],
        [race({
          confirm: take(actionTypes.CONFIRM_CONFIRMATION_MODAL),
          no: take(actionTypes.REJECT_CONFIRMATION_MODAL),
        }), { confirm: true }],
        [call(getAllReservations), mockGetAllReservationsResponse],
      ])
      .put({
        type: actionTypes.OPEN_CONFIRMATION_MODAL,
        title: 'Are you sure you?',
        message: 'You will not be able to  reverse cancellation (id: 123).',
        cancellationText: 'Cancel',
        buttonStyle: 'danger',
      })
      .put({
        type: onFailure(actionTypes.DELETE_RESERVATION),
        alertType: 'danger',
        message: `Could not delete reservation.${errMessage}`,
      })
      .put({
        type: actionTypes.SET_ALERT,
        alertType: 'danger',
        message: `Could not delete reservation.${errMessage}`,
      })
      .silentRun();
  });

  it('should be invoked by latest DELETE_RESERVATION dispatch', () => {
    return expectSaga(homeComponentSagas)
      .provide([
        [takeLatest(actionTypes.DELETE_RESERVATION, deleteReservation), expectedRequestParams],
      ])
      .silentRun();
  });
});

