import React, {useContext} from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities/react-testing';
import {MediaQueryProvider} from 'components/MediaQueryProvider';

import {LinkContext} from '../../../utilities/link';
import {AppProvider} from '../AppProvider';
import {FocusManager} from '../../FocusManager';

describe('<AppProvider />', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  it('updates context when props change', () => {
    const Child: React.SFC = () => {
      return useContext(LinkContext) ? <div id="child" /> : null;
    };
    const LinkComponent = () => <div />;

    const wrapper = mountWithAppProvider(
      <AppProvider i18n={{}}>
        <Child />
      </AppProvider>,
    );

    expect(wrapper.find('#child')).toHaveLength(0);
    wrapper.setProps({linkComponent: LinkComponent});
    wrapper.update();
    expect(wrapper.find('#child')).toHaveLength(1);
  });

  it('renders a MediaProvider', () => {
    const appProvider = mountWithApp(
      <AppProvider i18n={{}}>
        <div>Child</div>
      </AppProvider>,
    );
    expect(appProvider).toContainReactComponent(MediaQueryProvider);
  });

  it('renders a FocusManager', () => {
    const appProvider = mountWithApp(
      <AppProvider i18n={{}}>
        <div>Child</div>
      </AppProvider>,
    );
    expect(appProvider).toContainReactComponent(FocusManager);
  });
});
