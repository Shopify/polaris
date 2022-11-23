import {useEffect, useRef} from 'react';
import {useRouter} from 'next/router';
import {GrowFrame} from '../src/components/ComponentExamples/ComponentExamples';

export default function AppEmulator() {
  const {query} = useRouter();
  const stringifiedQuery = new URLSearchParams(
    query as Record<string, string>,
  ).toString();
  const iframeSrc = `/playroom/preview/?${stringifiedQuery}`;
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  useEffect(() => {
    const messageListener = (e: any) => {
      // TODO filter so we only log messages from app-bridge;
      if (e.source?.frameElement === frameRef?.current) {
        console.log(e);
      }
    };
    // We listen in to window.top here
    // Because appbridge posts all messages to
    // window.top https://developer.mozilla.org/en-US/docs/Web/API/Window/top
    // This app-emulator is itself an iframe inside of the polaris docs site
    // this iFrame is not the top.
    window.top!.addEventListener('message', messageListener);
    return () => {
      return window.top!.removeEventListener('message', messageListener);
    };
  }, []);
  return (
    <>
      <GrowFrame
        ref={frameRef}
        style={{
          display: 'block',
          resize: 'horizontal',
          overflow: 'auto',
          width: '100%',
          maxWidth: '100%',
          minWidth: '375px',
        }}
        defaultHeight="400px"
        id="app-emulator-iframe"
        src={iframeSrc}
        calculateIframeHeight={(iframeDoc) => {
          return `${iframeDoc.body?.scrollHeight ?? 0}px`;
        }}
        extractRenderedHTML={(iframeDoc) => {
          return iframeDoc.getElementById('polaris-sandbox-wrapper')?.innerHTML;
        }}
      />
    </>
  );
}
