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
  const editUrl = `${origin}${withBasePath('/sandbox')}${search}`;

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
          src={`${withBasePath('/playroom/preview')}${initialSearchParams}`}
          width="100%"
          height="100%"
        />
      )}
    </SandboxContainer>
  );
}
