import {forwardRef, ForwardedRef, useRef, useEffect} from 'react';
import {mergeRefs} from 'react-merge-refs';

interface GrowFrameProps extends React.HTMLProps<HTMLIFrameElement> {
  defaultHeight: string;
  onContentLoad?: () => void;
}

const FRAME_ID = 'POLARIS_GROWFRAME';
export const updateGrowFrameHeight = (height: string) => {
  const payload = {height, id: FRAME_ID};
  window.parent.postMessage(payload);
};
const GrowFrame = forwardRef(
  (
    {defaultHeight, onContentLoad, ...props}: GrowFrameProps,
    ref: ForwardedRef<HTMLIFrameElement>,
  ) => {
    const growFrameRef = useRef<HTMLIFrameElement | null>(null);
    // TODO: we'll need to make this reliable to address network delay.
    useEffect(() => {
      const messageReceiver = (e: MessageEvent) => {
        if (
          e.source !== growFrameRef?.current?.contentWindow ||
          !e.data ||
          typeof e.data !== 'object'
        ) {
          return;
        }
        const {id, height} = e.data;
        if (id === FRAME_ID && typeof height === 'string') {
          growFrameRef.current.height = height;
          requestAnimationFrame(() => onContentLoad?.());
        }
      };
      window.addEventListener('message', messageReceiver);
      return () => {
        window.removeEventListener('message', messageReceiver);
      };
    }, [onContentLoad]);
    return (
      <iframe
        ref={mergeRefs([growFrameRef, ref])}
        {...props}
        height={defaultHeight}
      />
    );
  },
);

GrowFrame.displayName = 'GrowFrame';
export default GrowFrame;
