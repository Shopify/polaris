import * as React from 'react';
import * as PropTypes from 'prop-types';
import {mountWithAppProvider} from '../../../../tests/utilities';
import Navigation from '../Navigation';

const childContextTypes = {
  location: PropTypes.string,
  onNavigationDismiss: PropTypes.func,
};

describe('<Navigation />', () => {
  it('mounts', () => {
    const navigation = mountWithAppProvider(<Navigation location="/" />);
    expect(navigation.exists()).toBe(true);
  });

  it('passes context', () => {
    const Child: React.SFC<{}> = (_props, context) =>
      context.location ? <div /> : null;
    Child.contextTypes = childContextTypes;

    const navigation = mountWithAppProvider(
      <Navigation location="/">
        <Child />
      </Navigation>,
    );

    const div = navigation
      .find(Child)
      .find('div')
      .first();

    expect(div.exists()).toBe(true);
  });
});
