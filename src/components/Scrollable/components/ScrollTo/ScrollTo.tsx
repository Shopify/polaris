import React, {useContext, useEffect, useRef} from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import ScrollableContext from '../../context';

export default function ScrollTo() {
  const anchorNode = useRef<HTMLAnchorElement>(null);
  const {scrollToPosition} = useContext(ScrollableContext);

  useEffect(
    () => {
      if (!scrollToPosition || !anchorNode.current) {
        return;
      }

      scrollToPosition(anchorNode.current.offsetTop);
    },
    [scrollToPosition],
  );

  const getUniqueId = createUniqueIDFactory(`ScrollTo`);
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  return <a id={getUniqueId()} ref={anchorNode} />;
}
