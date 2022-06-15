import React, {PropsWithChildren} from 'react';
import isChromatic from 'chromatic/isChromatic';
import {version} from '../../package.json';

interface Data {
  id: string;
  kind: string;
  phase: 'mount' | 'update';
  actualDuration: number;
  baseDuration: number;
}

interface ProfileProps {
  id: string;
  kind: string;
}

const isDevelopment = process.env.NODE_ENV === 'development';

const trackRenderPerformance = (data: Data) => {
  const commitSha = process.env.STORYBOOK_GITHUB_SHA
    ? process.env.STORYBOOK_GITHUB_SHA
    : 'localdev';

  const body = JSON.stringify({...data, commitSha, version});

  const target = isDevelopment
    ? '//localhost:3000/api/profiler'
    : 'https://polaris-coverage.shopifycloud.com/api/profiler';

  fetch(target, {
    method: 'POST',
    keepalive: true,
    mode: 'no-cors',
    body,
  });
};

const Profiler = ({id, kind, children}: PropsWithChildren<ProfileProps>) => (
  <React.Profiler
    id={id}
    // https://reactjs.org/docs/profiler.html#onrender-callback
    onRender={(_, phase, actualDuration, baseDuration) => {
      trackRenderPerformance({
        id,
        kind,
        phase,
        actualDuration,
        baseDuration,
      });
    }}
  >
    {children}
  </React.Profiler>
);

const Component = ({children}: PropsWithChildren<{}>) => <>{children}</>;

export const RenderPerformanceProfiler =
  isDevelopment || isChromatic() ? Profiler : Component;
