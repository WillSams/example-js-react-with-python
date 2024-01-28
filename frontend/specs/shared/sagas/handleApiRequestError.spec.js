import { expectSaga } from 'redux-saga-test-plan';
import { takeLatest } from 'redux-saga/effects';

import { default as sharedSagas } from '../../../src/shared/sagas';
import { handleApiRequestError } from '../../../src/shared/sagas/handleApiRequestError';
import { actionTypes, } from '../../../src/shared/base';

describe('handleApiRequestError Saga', () => {
  it('should dispatch SET_ALERT action with error message', () => {
    const error = {
      name: 'TestError',
      message: 'This is a test error',
    };

    return expectSaga(handleApiRequestError, { error })
      .put({
        type: actionTypes.SET_ALERT,
        message: `Oops! Something went wrong. ${error.name}:  ${error.message}`,
        alertType: 'danger',
      })
      .silentRun();
  });

  it('should be invoked by latest API_REQUEST_ERROR dispatch', () => {
    const error = {
      name: 'TestError',
      message: 'This is a test error',
    };

    return expectSaga(sharedSagas)
      .provide([
        [takeLatest(actionTypes.API_REQUEST_ERROR, handleApiRequestError), error],
      ])
      .silentRun();
  });
});



