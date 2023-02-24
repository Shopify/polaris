import React, {useContext, useEffect, useRef} from 'react';

import {useUniqueId} from '../../../../utilities/unique-id';
import {ScrollableContext} from '../../context';

export interface ScrollToProps extends React.HTMLProps<HTMLAnchorElement>  {
  scrollKey?: string;
}

export function ScrollTo({scrollKey}: ScrollToProps) {
  const anchorNode = useRef<HTMLAnchorElement>(null);
  const scrollToPosition = useContext(ScrollableContext);

  useEffect(() => {
    if (!scrollToPosition || !anchorNode.current) {
      return;
    }

    scrollToPosition(anchorNode.current.offsetTop);
  }, [scrollToPosition, scrollKey]);

  const id = useUniqueId(`ScrollTo`);
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  return <a id={id} ref={anchorNode} />;
}
