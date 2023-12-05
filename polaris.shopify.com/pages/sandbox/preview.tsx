import type {InferGetServerSidePropsType, GetServerSideProps} from 'next';

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
  const copyUrl = `${
    typeof window !== 'undefined' ? window.location.origin : ''
  }/sandbox/preview${initialSearchParams}`;
  const editUrl = `${
    typeof window !== 'undefined' ? window.location.origin : ''
  }/sandbox${initialSearchParams}`;

  return (
    <SandboxContainer>
      <SandboxHeader copyUrl={copyUrl} editUrl={editUrl} />
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
        src={`/playroom/preview${initialSearchParams}`}
        width="100%"
        height="100%"
      />
    </SandboxContainer>
  );
}
