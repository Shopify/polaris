interface MyComponentProps {
  prop?: string;
  newProp?: string;
  children?: React.ReactNode;
}

const Child = (props: {prop: string}) => <>{props.prop}</>;

function MyComponent(props: MyComponentProps) {
  const value = props.newProp || props.prop;
  return <div data-prop={value}>{props.children}</div>;
}

export function App() {
  return (
    <MyComponent newProp="value">
      Hello
      <Child prop="value" />
    </MyComponent>
  );
}
