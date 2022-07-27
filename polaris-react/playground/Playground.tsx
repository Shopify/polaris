import React from 'react';

import {Page} from '../src';
import {useEventListener} from '../src/utilities/use-event-listener';

export function Playground() {
  const [element, ref] = useElementRef<HTMLParagraphElement>();

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

  // eslint-disable-next-line no-alert
  useEventListener('dblclick', (_event) => alert('double clicked'), element);

  return (
    <Page title="Playground">
      <p ref={ref}>Double click me</p>
      <p>Mouse X: {coords.x}</p>
      <p>Mouse Y: {coords.y}</p>
    </Page>
  );
}

function useElementRef<T extends HTMLElement>() {
  const [node, setNode] = React.useState<T | null>(null);

  const ref: React.RefCallback<T> = React.useCallback((node) => {
    if (node !== null) setNode(node);
  }, []);

  return [node, ref] as const;
}
