/* eslint-disable import/no-unresolved */
import * as React from 'react';

export interface ExampleProps {
  children?: React.ReactNode;
}

/* This is to prevent false positives in visual regression testing.
   Set a minimum height so that examples don't shift and triger
   a failure if an example above them changes height */
const containerStyle = {
  minHeight: '720px',
  margin: '0 10px',
};

export default function Example({children}: ExampleProps) {
  return <div style={containerStyle}>{children}</div>;
}
