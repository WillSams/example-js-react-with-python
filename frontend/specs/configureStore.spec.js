import { configureMiddleware, configureReduxStore, } from '../src/configureStore';

describe('configureStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should configure middleware correctly', () => {
    const middleware = configureMiddleware();

    expect(middleware.routerMiddleware).toBeDefined();
    expect(middleware.sagaMiddleware).toBeDefined();
    expect(middleware.logger).toBeDefined();
  });

  it('should configure the Redux store correctly', () => {
    const initialState = {};
    const { sagaMiddleware, store } = configureReduxStore(initialState);

    expect(sagaMiddleware).toBeDefined();
    expect(store).toBeDefined();
  });
});
