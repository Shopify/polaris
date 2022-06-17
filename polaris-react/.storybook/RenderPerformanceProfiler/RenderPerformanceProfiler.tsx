import React, {PropsWithChildren} from 'react';
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

  console.log({...data, commitSha, version});
};

export const RenderPerformanceProfiler = ({
  id,
  kind,
  children,
}: PropsWithChildren<ProfileProps>) => (
  <React.Profiler
    id={id}
    // https://reactjs.org/docs/profiler.html#onrender-callback
    onRender={(_, phase, actualDuration, baseDuration) => {
      trackRenderPerformance({
        id,
        kind: kind.replace('All Components/', ''),
        phase,
        actualDuration,
        baseDuration,
      });
    }}
  >
    {children}
  </React.Profiler>
);
