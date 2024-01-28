import { expectSaga } from 'redux-saga-test-plan';
import { call, takeLatest } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';

import { actionTypes, onFailure, onSuccessful } from '../../../../src/shared/base';
import { fetchQuery, getRoomIds } from '../../../../src/shared/graphql';

import { default as reservationComponentSagas } from '../../../../src/components/reservations/sagas';
import { getAllRoomIds } from '../../../../src/components/reservations/sagas/getAllRoomIds';

describe('getAllRoomIds Saga', () => {
  let scenario;

  const action = { type: actionTypes.GET_ROOM_IDS };
  const expectedRequestParams = {};
  const mockRooms = [{ id: 'room1' }, { id: 'room2' }, { id: 'room3' }];

  beforeEach(() => {
    scenario = expectSaga(getAllRoomIds, action);
  });

  afterEach(() => {
    scenario = null;
  });

  it('should handle successful API response', () => {
    const mockResponse = {
      data: {
        data: {
          getAllRooms: {
            rooms: mockRooms,
          },
        },
      },
    };

    return scenario
      .provide([
        [call(fetchQuery, getRoomIds, expectedRequestParams), mockResponse],
      ])
      .put({
        type: onSuccessful(action.type),
        response: {
          data: mockRooms.map(room => room.id),
        },
      })
      .silentRun();
  });

  it('should handle API response with errors', () => {
    const errMessage = 'Some error message';
    const mockResponse = {
      data: {
        data: {
          getAllRooms: {
            rooms: null,
            errors: errMessage,
          },
        }
      },
    };
    const alertType = 'danger';
    const expectedErrMessage = `Could not retrieve room identifiers:  Error: getallreservations-saga-error:  "${errMessage}"`;

    return scenario
      .provide([
        [call(fetchQuery, getRoomIds, expectedRequestParams), mockResponse],
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
    const expectedErrMessage = `Could not retrieve room identifiers:  ${errMessage}`;

    return scenario
      .provide([
        [call(fetchQuery, getRoomIds, expectedRequestParams), throwError(errMessage)],
      ])
      .put({
        type: onFailure(action.type),
        alertType,
        message: expectedErrMessage
      })
      .put({
        type: actionTypes.SET_ALERT,
        alertType,
        message: expectedErrMessage
      })
      .silentRun();
  });

  it('should be invoked by latest GET_ROOM_IDS dispatch', () => {
    return expectSaga(reservationComponentSagas)
      .provide([
        [takeLatest(action.type, getRoomIds),],
      ])
      .silentRun();
  });
});

