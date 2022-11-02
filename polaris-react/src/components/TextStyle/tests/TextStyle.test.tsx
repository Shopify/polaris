import React from 'react';
import {mountWithApp} from 'tests/utilities';

// eslint-disable-next-line import/no-deprecated
import {TextStyle} from '../TextStyle';

describe('<TextStyle />', () => {
  it('mounts', () => {
    const textStyle = mountWithApp(<TextStyle />);
    expect(textStyle).not.toBeNull();
  });

  it('renders children', () => {
    const textStyle = mountWithApp(<TextStyle>Hello Polaris</TextStyle>);
    expect(textStyle.find('span')).toContainReactText('Hello Polaris');
  });

  it('renders a span by default', () => {
    const textStyle = mountWithApp(<TextStyle>Hello Polaris</TextStyle>);
    expect(textStyle).toContainReactComponent('span');
  });

  it('renders a span when the variant positive is provided', () => {
    const textStyle = mountWithApp(
      <TextStyle variation="positive">Hello Polaris</TextStyle>,
    );
    expect(textStyle).toContainReactComponent('span');
  });

  it('renders a span when the variant negative is provided', () => {
    const textStyle = mountWithApp(
      <TextStyle variation="negative">Hello Polaris</TextStyle>,
    );
    expect(textStyle).toContainReactComponent('span');
  });

  it('renders a span when the variant warning is provided', () => {
    const textStyle = mountWithApp(
      <TextStyle variation="warning">Hello Polaris</TextStyle>,
    );
    expect(textStyle).toContainReactComponent('span');
  });

  it('renders a span when the variant subdued is provided', () => {
    const textStyle = mountWithApp(
      <TextStyle variation="subdued">Hello Polaris</TextStyle>,
    );
    expect(textStyle).toContainReactComponent('span');
  });

  it('renders a span tag when the strong variant is provided', () => {
    const textStyle = mountWithApp(
      <TextStyle variation="strong">Hello Polaris</TextStyle>,
    );
    expect(textStyle).toContainReactComponent('span');
  });

  it('renders a code tag when the code variant is provided', () => {
    const textStyle = mountWithApp(
      <TextStyle variation="code">Hello Polaris</TextStyle>,
    );
    expect(textStyle).toContainReactComponent('code');
  });
});
