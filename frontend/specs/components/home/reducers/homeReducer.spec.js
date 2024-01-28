import { actionTypes, onSuccessful } from '../../../../src/shared/base';
import { homeReducer } from '../../../../src/components/home/reducers';

describe('home/reducers/homeReducer tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle site/home/GET_RESERVATIONS_SUCCESS', () => {

    const response = {
      data: {
        reservations: [{ id: '1', Name: 'Test Reservation 1' }, { id: '2', Name: 'Test Reservation 2' }]
      },
    };

    const initialState = { loading: true, reservations: [], };

    const action = {
      type: onSuccessful(actionTypes.GET_RESERVATIONS),
      response,
    };

    const state = homeReducer(initialState, action);

    const expectedState = {
      loading: false,
      reservations: response?.data || [],
    };

    expect(state).toEqual(expectedState);
  });
});

