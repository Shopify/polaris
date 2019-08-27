import React, {useEffect} from 'react';
import {useFrame} from '../../utilities/frame';

export interface LoadingProps {}

// This does have a display name, but the linting has a bug in it
// https://github.com/yannickcr/eslint-plugin-react/issues/2324
// eslint-disable-next-line react/display-name
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
