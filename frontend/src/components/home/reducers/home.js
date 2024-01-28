import { actionTypes, createComponentReducer, onSuccessful } from '../../../shared/base';

const initialState = {
  reservations: [],
  loading: true,
};

const actionHandlers = {
  [onSuccessful(actionTypes.GET_RESERVATIONS)]: (state, action) => {
    const reservations = action?.response?.data || [];
    return {
      ...state,
      reservations,
      loading: false,
    };
  },
  [onSuccessful(actionTypes.DELETE_RESERVATION)]: (state, action) => {
    const reservations = action?.response?.data || [];
    return {
      ...state,
      reservations,
      loading: false,
    };
  },

};

const reducer = createComponentReducer(
  actionTypes.HOME_COMPONENT,
  initialState,
  actionHandlers
);

export { reducer };


