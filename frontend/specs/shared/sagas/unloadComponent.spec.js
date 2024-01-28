import { expectSaga } from 'redux-saga-test-plan';
import { takeLatest } from 'redux-saga/effects';

import { default as sharedSagas } from '../../../src/shared/sagas';
import { unloadComponent } from '../../../src/shared/sagas/unloadComponent';

describe('unloadComponent Saga', () => {
  const componentName = 'TestComponent';
  const actionType = `UNLOAD_${componentName}`;
  const action = { type: actionType, };

  it(`should dispatch the UNLOAD_${componentName} action`, () => {
    return expectSaga(unloadComponent, { componentName })
      .put(action).run();
  });

  it(`should be invoked by latest UNLOAD_${componentName} dispatch`, () => {
    return expectSaga(sharedSagas)
      .provide([
        [takeLatest(action, unloadComponent), { componentName }],
      ])
      .silentRun();
  });
});
