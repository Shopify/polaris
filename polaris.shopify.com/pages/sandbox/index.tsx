import {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';

import SandboxHeader from '../../src/components/SandboxHeader';
import SandboxContainer from '../../src/components/SandboxContainer';
import {withBasePath} from '../../src/utils/basePath';

export default function Sandbox() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();
  const searchValue = useRef('');
  // The sandbox state lives entirely in the query string. This page used to
  // read it in `getServerSideProps`, which a static export can't run, so we
  // read it in the browser instead and hold the iframe back until we have it —
  // otherwise it would load once empty and again with the params.
  const [initialSearchParams, setInitialSearchParams] = useState<string>();

  useEffect(() => {
    setInitialSearchParams(window.location.search);
  }, []);

  useEffect(() => {
    /**
     * We want to mirror the iframes url in the parent (aka browser) to support URL sharing.
     * the iframes onload handler isn't invoked when the iframes url changes so we're polling here instead.
     */
    const iframeUrlPoll = setInterval(() => {
      if (
        iframeRef?.current?.contentWindow &&
        iframeRef.current.contentWindow.location.search !== searchValue.current
      ) {
        searchValue.current = iframeRef.current.contentWindow.location.search;
        const iframeQueryObj = Object.fromEntries(
          new URLSearchParams(searchValue.current),
        );

        router.replace(
          {
            query: iframeQueryObj,
          },
          undefined,
          {
            shallow: true,
          },
        );
      }
    }, 200);
    return () => clearInterval(iframeUrlPoll);
  }, [router]);

  const copyUrl = `${
    typeof window !== 'undefined' ? window.location.origin : ''
  }${withBasePath('/sandbox')}${initialSearchParams ?? ''}`;

  return (
    <SandboxContainer>
      <SandboxHeader copyUrl={copyUrl} />
      {initialSearchParams !== undefined && (
        <iframe
          id="main"
          ref={iframeRef}
          style={{
            border: 0,
            padding: 0,
            margin: 0,
          }}
          // Spelled out to `index.html` rather than the directory: GitHub Pages
          // answers a bare directory with a 301 to the trailing-slash form, and
          // there's no reason to make the iframe follow a redirect.
          src={`${withBasePath('/playroom/index.html')}${initialSearchParams}`}
          width="100%"
          height="100%"
        />
      )}
    </SandboxContainer>
  );
}
