import React from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  foo: 'bar',
};

export const Blah = {
  render: () => {
    return <div>hello</div>;
  },

  parameters: {},
};

export const App = {
  render() {
    return <div>hello</div>;
  },

  parameters: {},
};

export const Comp = {
  render() {
    return <div>hello</div>;
  },
};

Comp.parameters = {};

export const Zip = {
  render: () => (
    <div>
      <p>hello</p>
    </div>
  ),
};
