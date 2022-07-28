import React, {useEffect, useState, useCallback, useMemo} from 'react';

import {debounce} from '../../utilities/debounce';
import {MediaQueryContext} from '../../utilities/media-query';
import {navigationBarCollapsed} from '../../utilities/breakpoints';
// eslint-disable-next-line import/no-deprecated
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

  const context = useMemo(
    () => ({isNavigationCollapsed}),
    [isNavigationCollapsed],
  );

  return (
    <MediaQueryContext.Provider value={context}>
      <EventListener event="resize" handler={handleResize} />
      {children}
    </MediaQueryContext.Provider>
  );
};
