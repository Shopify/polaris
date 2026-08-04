import {useEffect, useState} from 'react';

import SandboxHeader from '../../src/components/SandboxHeader';
import SandboxContainer from '../../src/components/SandboxContainer';
import {withBasePath} from '../../src/utils/basePath';

export default function Sandbox() {
  // See the note in `pages/sandbox/index.tsx`: the query string is read in the
  // browser now that there is no server to run `getServerSideProps`.
  const [initialSearchParams, setInitialSearchParams] = useState<string>();

  useEffect(() => {
    setInitialSearchParams(window.location.search);
  }, []);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const search = initialSearchParams ?? '';
  const copyUrl = `${origin}${withBasePath('/sandbox/preview')}${search}`;
  // `SandboxHeader` hands this to `next/link`, which applies the base path
  // itself, so this one has to stay unprefixed or it ends up doubled.
  const editUrl = `/sandbox${search}`;

  return (
    <SandboxContainer>
      <SandboxHeader copyUrl={copyUrl} editUrl={editUrl} />
      {initialSearchParams !== undefined && (
        <iframe
          id="main"
          // Important: DO NOT add "allow-same-origin" - it will open a
          // security/XSS hole.
          sandbox="allow-scripts"
          style={{
            border: 0,
            padding: 0,
            margin: 0,
          }}
          // Spelled out to `index.html` rather than the directory: GitHub Pages
          // answers a bare directory with a 301 to the trailing-slash form, and
          // there's no reason to make the iframe follow a redirect.
          src={`${withBasePath(
            '/playroom/preview/index.html',
          )}${initialSearchParams}`}
          width="100%"
          height="100%"
        />
      )}
    </SandboxContainer>
  );
}
