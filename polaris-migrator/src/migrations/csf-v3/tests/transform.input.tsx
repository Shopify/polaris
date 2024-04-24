import React from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  foo: 'bar',
};

export const Blah = () => {
  return <div>hello</div>;
};

Blah.parameters = {};

export function App() {
  return <div>hello</div>;
}

App.parameters = {};

export const Comp = {
  render() {
    return <div>hello</div>;
  },
};

Comp.parameters = {};

export const Zip = () => (
  <div>
    <p>hello</p>
  </div>
);
