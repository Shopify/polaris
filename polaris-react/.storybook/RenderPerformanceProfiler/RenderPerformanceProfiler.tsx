import React from 'react';
import type {PropsWithChildren} from 'react';

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
  printToDOM?: boolean;
}

export const RenderPerformanceProfiler = ({
  id,
  kind,
  children,
  printToDOM,
}: PropsWithChildren<ProfileProps>) => {
  function printDataToDOM(data: Data) {
    const id = 'render-performance-profiler';
    const container =
      document.getElementById(id) || document.createElement('div');
    const prevData = JSON.parse(container.innerHTML || '[]');

    container.id = id;
    container.style.display = 'none';
    container.innerHTML = JSON.stringify([...prevData, data]);

    document.body.appendChild(container);
  }

  return (
    <React.Profiler
      id={id}
      onRender={(_, phase, actualDuration, baseDuration) => {
        const data = {
          id,
          kind: kind.replace('All Components/', ''),
          phase,
          actualDuration,
          baseDuration,
        };
        printToDOM ? printDataToDOM(data) : console.log(data);
      }}
    >
      {children}
    </React.Profiler>
  );
};
