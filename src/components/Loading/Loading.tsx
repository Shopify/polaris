import React, {useEffect} from 'react';

import {useFrame} from '../../utilities/frame';

export interface LoadingProps {}

export const Loading = React.memo(function Loading() {
  const {startLoading, stopLoading} = useFrame();

  useEffect(() => {
    startLoading();

    return () => {
      stopLoading();
    };
  }, [startLoading, stopLoading]);

  return null;
});
