import { expectSaga } from 'redux-saga-test-plan';
import { call, takeLatest } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';

import { actionTypes, onFailure, onSuccessful } from '../../../../src/shared/base';
import { fetchQuery, getExistingReservations } from '../../../../src/shared/graphql';

import { default as homeComponentSagas } from '../../../../src/components/home/sagas';
import getAllReservations from '../../../../src/components/home/sagas/getAllReservations';

describe('getAllReservations Saga', () => {
  let scenario;

  const action = { type: actionTypes.GET_RESERVATIONS, };
  const expectedRequestParams = {};

  beforeEach(() => { scenario = expectSaga(getAllReservations).dispatch(action); });
  afterEach(() => { scenario = null; });

  it('should handle successful API response', () => {
    const mockResponse = {
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

    return scenario
      .provide([
        [call(fetchQuery, getExistingReservations, expectedRequestParams), mockResponse],
      ])
      .put({
        type: onSuccessful(action.type),
        response: {
          data: mockResponse.data.data.getAllReservations.reservations,
        },
      })
      .silentRun();
  });

  it('should handle API response with errors', () => {
    const errMessage = 'Some error message'
    const mockResponse = {
      data: {
        data: {
          getAllReservations: {
            errors: errMessage,
            reservations: [],
          },
        },
      },
    };
    const alertType = 'danger';
    const expectedErrMessage = `Could not retrieve reservations.  Error: getallreservations-saga-error:  "${errMessage}"`;

    return scenario
      .provide([
        [call(fetchQuery, getExistingReservations, expectedRequestParams), mockResponse],
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

      }).silentRun();
  });

  it('should handle unexpected non-API errors', () => {
    const expectedErrMessage = 'Could not retrieve reservations.  '
    const alertType = 'danger';

    return scenario
      .provide([
        [call(fetchQuery, getExistingReservations, expectedRequestParams), throwError('')],
      ])
      .put({
        type: onFailure(action.type),
        alertType,
        message: expectedErrMessage,
      })
      .put({
        type: actionTypes.SET_ALERT,
        alertType,
        message: expectedErrMessage
      }).silentRun();
  });

  it('should be invoked by latest GET_RESERVATIONS dispatch', () => {
    return expectSaga(homeComponentSagas)
      .provide([
        [takeLatest(actionTypes.GET_RESERVATIONS, getAllReservations),],
      ])
      .silentRun();
  });
});
