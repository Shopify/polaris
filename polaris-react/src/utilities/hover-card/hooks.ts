import {useContext} from 'react';

import {HoverCardContext} from './context';

export function useHoverCardActivatorWrapperProps() {
  const context = useContext(HoverCardContext);
  return context;
}
