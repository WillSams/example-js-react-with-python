import {
  actionCreators,
  createComponentReducer,
  onSuccessful,
} from '@/shared/base';

const initialState = {
  reservations: [],
  loading: true,
};

const actionHandlers = {
  [onSuccessful(actionCreators.GET_RESERVATIONS)]: (state, action) => {
    const reservations = action?.response?.data || [];
    return {
      ...state,
      reservations,
      loading: false,
    };
  },
  [onSuccessful(actionCreators.DELETE_RESERVATION)]: (state, action) => {
    const reservations = action?.response?.data || [];
    return {
      ...state,
      reservations,
      loading: false,
    };
  },
};

const reducer = createComponentReducer(
  actionCreators.HOME_COMPONENT,
  initialState,
  actionHandlers,
);

export { reducer };
