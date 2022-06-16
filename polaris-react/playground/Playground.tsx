import React from 'react';

import {Page} from '../src';
import {useEventListener} from '../src/utilities/use-event-listener';

export function Playground() {
  const ref = React.useRef<HTMLParagraphElement>(null);

  const [coords, setCoords] = React.useState({x: 0, y: 0});

  useEventListener('mousemove', (event) =>
    setCoords({
      x: event.clientX,
      y: event.clientY,
    }),
  );

  useEventListener('click', (event) => event);
  useEventListener('keydown', (event) => event);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useEventListener('copy', (event) => event);
  useEventListener('copy', (event) => event, document);
  useEventListener('copy', (event) => event, ref.current);

  return (
    <Page title="Playground">
      <p ref={ref}>Mouse X: {coords.x}</p>
      <p>Mouse Y: {coords.y}</p>
    </Page>
  );
}
