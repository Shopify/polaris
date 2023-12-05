import {useEffect, useRef} from 'react';
import type {InferGetServerSidePropsType, GetServerSideProps} from 'next';
import {useRouter} from 'next/router';

import SandboxHeader from '../../src/components/SandboxHeader';
import SandboxContainer from '../../src/components/SandboxContainer';

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  // We need to pass initial query param to our nested iframe
  const initialSearchParams = new URLSearchParams(
    query as Record<string, string>,
  ).toString();
  return {
    props: {
      initialSearchParams: `?${initialSearchParams}`,
    },
  };
};

export default function Sandbox({
  initialSearchParams,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();
  const searchValue = useRef('');

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
  }/sandbox${initialSearchParams}`;

  return (
    <SandboxContainer>
      <SandboxHeader copyUrl={copyUrl} />
      <iframe
        id="main"
        ref={iframeRef}
        style={{
          border: 0,
          padding: 0,
          margin: 0,
        }}
        src={`/playroom${initialSearchParams}`}
        width="100%"
        height="100%"
      />
    </SandboxContainer>
  );
}
