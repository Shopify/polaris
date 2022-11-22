import {useEffect} from 'react';
import {useRouter} from 'next/router';

export default function AppEmulator() {
  const {query} = useRouter();
  const stringifiedQuery = new URLSearchParams(
    query as Record<string, string>,
  ).toString();
  const iframeSrc = `http://localhost:9000/preview/?${stringifiedQuery}`;
  useEffect(() => {
    const messageListener = (e) => {
      console.log('Hello AM I BEING CALLED?', e);
    };
    console.log('ADDING EVENT LISTENER');
    window.parent.addEventListener('message', messageListener);
    return () => {
      return window.parent.removeEventListener('message', messageListener);
    };
  }, []);
  console.log('RENDERING COMPONENT');
  return (
    <>
      <iframe
        style={{
          display: 'block',
          resize: 'horizontal',
          overflow: 'auto',
          width: '100%',
          maxWidth: '100%',
          minWidth: '375px',
        }}
        onLoad={() => {
          console.log('LOADED');
        }}
        src={iframeSrc}
      />
    </>
  );
}
