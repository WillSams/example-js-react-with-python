export const createComponentReducer = (
  componentName,
  initialState,
  actionHandlers,
) => {
  const handlers = {
    ...actionHandlers,
    [`LOAD_${componentName}`]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [`LOAD_${componentName}_SUCCESS`]: (state, action) => ({
      ...state,
      loading: false,
    }),
    [`UNLOAD_${componentName}`]: (state, action) => ({
      ...initialState,
      loading: true,
    }),
  };

  return (
    state = {
      ...initialState,
      componentLoading: true,
    },
    action,
  ) => {
    const effect = handlers[action.type];

    if (effect) return effect(state, action);
    else return state;
  };
};
