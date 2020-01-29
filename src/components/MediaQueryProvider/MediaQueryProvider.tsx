import React, {useEffect, useState, useCallback, useMemo} from 'react';
import debounce from 'lodash/debounce';
import {MediaQueryContext} from '../../utilities/media-query';
import {navigationBarCollapsed} from '../../utilities/breakpoints';
import {EventListener} from '../EventListener';

interface Props {
  children?: React.ReactNode;
}

const RESOURCE_LIST_SMALL_SCREEN_WIDTH = 458;

export const MediaQueryProvider = function MediaQueryProvider({
  children,
}: Props) {
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(
    navigationBarCollapsed().matches,
  );
  const [resourceListSmallScreen, setResourceListSmallScreen] = useState(false);

  const handleResize = useCallback(
    debounce(
      () => {
        if (isNavigationCollapsed !== navigationBarCollapsed().matches) {
          setIsNavigationCollapsed(!isNavigationCollapsed);
        }

        if (
          window.innerWidth < RESOURCE_LIST_SMALL_SCREEN_WIDTH &&
          !resourceListSmallScreen
        ) {
          setResourceListSmallScreen(true);
        }

        if (
          window.innerWidth > RESOURCE_LIST_SMALL_SCREEN_WIDTH &&
          resourceListSmallScreen
        ) {
          setResourceListSmallScreen(false);
        }
      },
      40,
      {trailing: true, leading: true, maxWait: 40},
    ),
    [isNavigationCollapsed, resourceListSmallScreen],
  );

  useEffect(() => {
    setIsNavigationCollapsed(navigationBarCollapsed().matches);
    setResourceListSmallScreen(
      window.innerWidth < RESOURCE_LIST_SMALL_SCREEN_WIDTH,
    );
  }, []);

  const context = useMemo(
    () => ({isNavigationCollapsed, resourceListSmallScreen}),
    [isNavigationCollapsed, resourceListSmallScreen],
  );

  return (
    <MediaQueryContext.Provider value={context}>
      <EventListener event="resize" handler={handleResize} />
      {children}
    </MediaQueryContext.Provider>
  );
};
