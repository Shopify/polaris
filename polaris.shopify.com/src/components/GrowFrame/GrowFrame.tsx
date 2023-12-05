import {forwardRef, ForwardedRef, useRef, useEffect, useState} from 'react';
import {mergeRefs} from 'react-merge-refs';
import {nanoid} from 'nanoid';

interface GrowFrameProps extends React.HTMLProps<HTMLIFrameElement> {
  // A CSS length value to set the default height during initial render (before
  // the iframe has reported its actual height). Default: 400px
  defaultHeight?: string;
  // Prevent an iframe from going too small. Default: 0px
  minHeight?: string;
  onContentLoad?: () => void;
}

export const updateGrowFrameHeight = (height: string) => {
  // No-op when not an iframe, or for cross-origin iframes
  if (!window.frameElement) {
    return;
  }

  window.parent.postMessage({
    height,
    id: window.frameElement.getAttribute('data-frame-id'),
  });
};

const GrowFrame = forwardRef(
  (
    {
      defaultHeight = '400px',
      minHeight = '0px',
      onContentLoad,
      ...props
    }: GrowFrameProps,
    ref: ForwardedRef<HTMLIFrameElement>,
  ) => {
    const growFrameRef = useRef<HTMLIFrameElement | null>(null);
    const [height, setHeight] = useState(defaultHeight);

    // Every frame gets a unique ID to send messages back and forth without
    // cross-communication when there's multiple iframes on a page
    const frameId = useRef<string>(nanoid());

    // We need to render a placeholder, attach the grow frame event listener,
    // THEN render the iframe to ensure we don't miss any incoming events
    // accidentally.
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    useEffect(() => {
      const messageReceiver = (e: MessageEvent) => {
        if (
          e.source !== growFrameRef?.current?.contentWindow ||
          typeof e.data !== 'object'
        ) {
          return;
        }
        const {id, height} = e.data;
        if (id === frameId.current && typeof height === 'string') {
          setHeight(height);
          requestAnimationFrame(() => onContentLoad?.());
        }
      };
      window.addEventListener('message', messageReceiver);

      // Now that we're ready to receive events, we can go ahead and render the
      // iframe instead
      setShowPlaceholder(false);
      return () => {
        window.removeEventListener('message', messageReceiver);
      };
    }, [onContentLoad]);

    return showPlaceholder ? (
      <div style={{height, minHeight}} />
    ) : (
      <iframe
        ref={mergeRefs([growFrameRef, ref])}
        {...props}
        data-frame-id={frameId.current}
        style={{height, minHeight}}
      />
    );
  },
);

GrowFrame.displayName = 'GrowFrame';
export default GrowFrame;
