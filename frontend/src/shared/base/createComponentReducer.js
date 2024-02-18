export const createComponentReducer = (
  componentName,
  initialState,
  actionHandlers,
) => {
  actionHandlers[`LOAD_${componentName}`] = (state, action) => ({
    ...state,
    loading: true,
  });

  actionHandlers[`LOAD_${componentName}_SUCCESS`] = (state, action) => ({
    ...state,
    loading: false,
  });

  actionHandlers[`UNLOAD_${componentName}`] = (state, action) => ({
    ...initialState,
    loading: true,
  });

  return (
    state = {
      ...initialState,
      componentLoading: true,
    },
    action,
  ) => {
    const effect = actionHandlers[action.type];

    if (effect) return effect(state, action);
    else return state;
  };
};
