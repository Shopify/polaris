import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import TextStyle from '../../TextStyle';

describe('<TextStyle />', () => {
  it('mounts', () => {
    const textStyle = mountWithAppProvider(<TextStyle />);
    expect(textStyle.exists()).toBe(true);
  });

  it('renders children', () => {
    const textStyle = mountWithAppProvider(
      <TextStyle>Hello Polaris</TextStyle>,
    );
    expect(textStyle.find('span').text()).toBe('Hello Polaris');
  });

  it('renders a span by default', () => {
    const textStyle = mountWithAppProvider(
      <TextStyle>Hello Polaris</TextStyle>,
    );
    expect(textStyle.find('span')).toHaveLength(1);
  });

  it('renders a code tag when the code variant is provided', () => {
    const textStyle = mountWithAppProvider(
      <TextStyle variation="code">Hello Polaris</TextStyle>,
    );
    expect(textStyle.find('code')).toHaveLength(1);
  });

  it('renders a strong tag when the strong variant is provided', () => {
    const textStyle = mountWithAppProvider(
      <TextStyle variation="strong">Hello Polaris</TextStyle>,
    );
    expect(textStyle.find('b')).toHaveLength(1);
  });
});
