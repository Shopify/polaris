import React, {PropsWithChildren} from 'react';

interface ProfileProps {
  id: string;
  kind: string;
}

export const RenderPerformanceProfiler = ({
  id,
  kind,
  children,
}: PropsWithChildren<ProfileProps>) => (
  <React.Profiler
    id={id}
    // https://reactjs.org/docs/profiler.html#onrender-callback
    onRender={(_, phase, actualDuration, baseDuration) => {
      console.log({
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
