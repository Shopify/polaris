import React from 'react';

declare function MyComponent(props: any): JSX.Element;
export function App() {
  const useFoo = true;
  return (
    <MyComponent
      {...(useFoo
        ? {
            display: 'flex',
            color: 'red',
            fontWeight: 'bold',
          }
        : {
            display: 'block',
            color: 'green',
            borderRadius: '4px',
          })}
    >
      Hello world
    </MyComponent>
  );
}
