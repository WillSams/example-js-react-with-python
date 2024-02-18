import { call, takeLatest, put } from 'redux-saga/effects';

import { actionTypes, onFailure, onSuccessful } from '@/shared/base';
import { fetchQuery, getRoomIdsQuery } from '@/shared/graphql';

export function* getAllRoomIds() {
  try {
    const variables = {};
    const response = yield call(fetchQuery, getRoomIdsQuery, variables);
    const data = response?.data;
    const errors = data?.getAllRooms?.errors;

    if (errors)
      throw new Error(
        `getallreservations-saga-error:  ${JSON.stringify(errors)}`,
      );
    else {
      const { rooms } = data.getAllRooms || [];
      const roomIds = rooms?.map((room) => room.id);

      yield put({
        type: onSuccessful(actionTypes.GET_ROOM_IDS),
        response: {
          data: roomIds,
        },
      });
    }
  } catch (ex) {
    const message = `Could not retrieve room identifiers:  ${ex}`;
    yield put({
      type: onFailure(actionTypes.GET_ROOM_IDS),
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
  yield takeLatest(actionTypes.GET_ROOM_IDS, getAllRoomIds);
}

export default saga;
