import React from 'react';

interface MyComponentProps {
  prop?: string;
  newProp?: string;
  children?: React.ReactNode;
}

const Child = (props: {prop: string}) => <>{props.prop}</>;

function MyComponent(props: MyComponentProps) {
  const value = props.newProp ?? props.prop;
  return <div data-prop={value}>{props.children}</div>;
}

function SubComponent({...props}: any) {
  return <div {...props} />;
}

export function App() {
  return (
    <MyComponent>
      <MyComponent.SubComponent prop="value" />
      Hello
      <Child prop="value" />
    </MyComponent>
  );
}

MyComponent.SubComponent = SubComponent;
