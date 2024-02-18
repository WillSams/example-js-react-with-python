import { useEffect } from 'react';
import { useLocation } from 'react-router';

const useLoadComponent = ({ config, props }) => {
  const loads = config?.load;
  const location = useLocation();

  useEffect(() => {
    const dispatch = props?.getDispatch?.();
    if (loads) {
      Object.values(loads).forEach((loadAction) => {
        if (typeof loadAction === 'function') {
          const actionCreator = loadAction(props);
          dispatch?.(actionCreator);
        }
      });
    }
  }, [config?.componentName, location?.pathname]);

  return;
};

export default useLoadComponent;
