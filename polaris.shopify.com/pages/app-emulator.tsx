import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {GrowFrame} from '../src/components/ComponentExamples/ComponentExamples';

export default function AppEmulator() {
  const {query} = useRouter();
  const stringifiedQuery = new URLSearchParams(
    query as Record<string, string>,
  ).toString();
  const iframeSrc = `/playroom/preview/?${stringifiedQuery}`;
  useEffect(() => {
    const messageListener = (e: any) => {
      console.log(e);
    };
    window.parent.addEventListener('message', messageListener);
    return () => {
      return window.parent.removeEventListener('message', messageListener);
    };
  }, []);
  return (
    <>
      <GrowFrame
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
