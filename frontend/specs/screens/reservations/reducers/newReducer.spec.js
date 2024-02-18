import { actionTypes, onSuccessful } from '@/shared/base';

import { newReducer } from '@/components/reservations/reducers';

describe('reservations/reducers/newReducer tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle site/reservations/GET_ROOM_IDS_SUCCESS', () => {
    const response = {
      data: {
        roomIds: ['room1', 'room2', 'room3'],
      },
    };

    const initialState = { loading: true, roomIds: [] };

    const action = {
      type: onSuccessful(actionTypes.GET_ROOM_IDS),
      response,
    };

    const state = newReducer(initialState, action);

    const expectedState = {
      loading: false,
      roomIds: response?.data || [],
    };

    expect(state).toEqual(expectedState);
  });
});
