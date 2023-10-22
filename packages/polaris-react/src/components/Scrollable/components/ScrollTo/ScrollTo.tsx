import React, {useContext, useEffect, useRef, useId} from 'react';

import {ScrollableContext} from '../../context';

export function ScrollTo() {
  const anchorNode = useRef<HTMLAnchorElement>(null);
  const scrollToPosition = useContext(ScrollableContext);

  useEffect(() => {
    if (!scrollToPosition || !anchorNode.current) {
      return;
    }

    scrollToPosition(anchorNode.current.offsetTop);
  }, [scrollToPosition]);

  const id = useId();
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  return <a id={id} ref={anchorNode} />;
}
