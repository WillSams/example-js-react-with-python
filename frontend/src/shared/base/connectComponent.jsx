import React from 'react';
import { connect } from 'react-redux';

import { useLoadComponent } from '@/shared/hooks';

/*
 type Config = {
  state: (state: any, ownProps: any) => object;
  dispatch?: (dispatch: Redux.Dispatch) => object;
  componentName: string;
  load?: object;
};
*/

const loadComponent = (WrappedComponent, config) => {
  const WithLoadComponent = (props) => {
    useLoadComponent({ props, config });

    return <WrappedComponent {...props} />;
  };

  WithLoadComponent.displayName = `WithLoadComponent${
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
  }`;

  return WithLoadComponent;
};

export const connectComponent = (WrappedComponent, config) => {
  const mapStateToProps = (state, ownProps) => {
    const stateFromConfig = config.state;

    return {
      ...stateFromConfig(state, ownProps),
    };
  };
  const mapDispatchToProps = (dispatch) => {
    const dispatchFromConfig = config.dispatch ? config.dispatch(dispatch) : {};

    dispatchFromConfig.getDispatch = () => dispatch;

    return dispatchFromConfig;
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(loadComponent(WrappedComponent, config));
};
