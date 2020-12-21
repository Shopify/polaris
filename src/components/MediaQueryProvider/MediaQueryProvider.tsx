import React, {useEffect, useState, useCallback} from 'react';
import debounce from 'lodash/debounce';

import {MediaQueryContext} from '../../utilities/media-query';
import {navigationBarCollapsed} from '../../utilities/breakpoints';
import {EventListener} from '../EventListener';

interface Props {
  children?: React.ReactNode;
}

export const MediaQueryProvider = function MediaQueryProvider({
  children,
}: Props) {
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(
    navigationBarCollapsed().matches,
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleResize = useCallback(
    debounce(
      () => {
        if (isNavigationCollapsed !== navigationBarCollapsed().matches) {
          setIsNavigationCollapsed(!isNavigationCollapsed);
        }
      },
      40,
      {trailing: true, leading: true, maxWait: 40},
    ),
    [isNavigationCollapsed],
  );

  useEffect(() => {
    setIsNavigationCollapsed(navigationBarCollapsed().matches);
  }, []);

  return (
    <MediaQueryContext.Provider value={{isNavigationCollapsed}}>
      <EventListener event="resize" handler={handleResize} />
      {children}
    </MediaQueryContext.Provider>
  );
};
