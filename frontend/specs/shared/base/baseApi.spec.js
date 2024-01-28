import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { actionTypes, createBaseApi, } from '../../../src/shared/base';

describe('baseApi', () => {
  let mock;
  let store;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = {
      dispatch: jest.fn(),
    };
  });

  afterEach(() => {
    mock.restore();
  });

  it('creates a base API instance', async () => {
    // Mock the token request
    mock.onPost(`${process.env.REACT_APP_API_URL}/token`).reply(200, {
      access_token: 'test-token',
    });

    const baseApi = createBaseApi(store);

    expect(baseApi).toBeTruthy();

    mock.onGet(`${process.env.REACT_APP_API_URL}/test`).reply(200, {
      data: 'test-data',
    });

    const response = await baseApi.get('/test');

    expect(response.status).toBe(200);
    expect(store.dispatch).toHaveBeenCalledWith({ type: actionTypes.API_REQUEST });
    expect(store.dispatch).toHaveBeenCalledWith({ type: actionTypes.API_REQUEST_DONE });
  });

});

