import React, {PropsWithChildren} from 'react';
// import isChromatic from 'chromatic/isChromatic';
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

const trackRenderPerformance = (data: Data) => {
  const commitSha = process.env.STORYBOOK_GITHUB_SHA
    ? process.env.STORYBOOK_GITHUB_SHA
    : 'localdev';

  const body = JSON.stringify({...data, commitSha, version});

  console.log(body);

  fetch('//localhost:3000/api/test', {
    method: 'POST',
    keepalive: true,
    mode: 'no-cors',
    body,
  });
};

const Profiler = ({id, kind, children}: PropsWithChildren<ProfileProps>) => {
  return (
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
};

// TODO const IdentityComponent = ({children}: PropsWithChildren<{}>) => <>{children}</>;

// TODO only run in Chromatic
// export const RenderPerformanceProfiler = isChromatic()
//   ? Profiler
//   : IdentityComponent;

export const RenderPerformanceProfiler = Profiler;
