import React from 'react';

interface MyComponentProps {
  prop?: string;
  newProp?: string;
  children?: React.ReactNode;
}

function MyComponent(props: MyComponentProps) {
  const value = props.newProp || props.prop;
  return <div data-prop={value}>{props.children}</div>;
}

export function App() {
  return <MyComponent newProp="value">Hello</MyComponent>;
}
