import {
  actionCreators,
  createComponentReducer,
  onSuccessful,
} from '@/shared/base';

const initialState = {
  roomIds: [],
  loading: true,
};

const actionHandlers = {
  [onSuccessful(actionCreators.GET_ROOM_IDS)]: (state, action) => {
    const roomIds = action?.response?.data || [];
    return {
      ...state,
      roomIds,
      loading: false,
    };
  },
  [onSuccessful(actionCreators.CREATE_RESERVATION)]: (state, action) => {
    const reservations = action?.response?.data || [];
    return {
      ...state,
      reservations,
      loading: false,
    };
  },
};

const reducer = createComponentReducer(
  actionCreators.NEW_RESERVATION_COMPONENT,
  initialState,
  actionHandlers,
);

export { reducer };
