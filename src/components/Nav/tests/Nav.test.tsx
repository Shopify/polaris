import * as React from 'react';
import * as PropTypes from 'prop-types';
import {mountWithAppProvider} from '../../../../tests/utilities';
import Nav from '../Nav';

const childContextTypes = {
  location: PropTypes.string,
  onNavDismiss: PropTypes.func,
};

describe('<Nav />', () => {
  it('mounts', () => {
    const nav = mountWithAppProvider(<Nav location="/" />);
    expect(nav.exists()).toBe(true);
  });

  it('passes context', () => {
    const Child: React.SFC<{}> = (_props, context) =>
      context.location ? <div /> : null;
    Child.contextTypes = childContextTypes;

    const nav = mountWithAppProvider(
      <Nav location="/">
        <Child />
      </Nav>,
    );

    const div = nav
      .find(Child)
      .find('div')
      .first();

    expect(div.exists()).toBe(true);
  });
});
