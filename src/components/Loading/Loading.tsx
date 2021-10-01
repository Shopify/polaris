import {memo, useEffect} from 'react';

import {useFrame} from '../../utilities/frame';

export interface LoadingProps {}

export const Loading = memo(function Loading() {
  const {startLoading, stopLoading} = useFrame();

  useEffect(() => {
    startLoading();

    return () => {
      stopLoading();
    };
  }, [startLoading, stopLoading]);

  return null;
});
