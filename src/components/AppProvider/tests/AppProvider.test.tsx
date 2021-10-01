import React, {useContext} from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'test-utilities';
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
    const Child: React.FunctionComponent = () => {
      return useContext(LinkContext) ? <div id="child" /> : null;
    };
    const LinkComponent = () => <div />;

    const wrapper = mountWithApp(
      <AppProvider i18n={{}}>
        <Child />
      </AppProvider>,
    );

    expect(wrapper).not.toContainReactComponent('div', {id: 'child'});
    wrapper.setProps({linkComponent: LinkComponent});
    wrapper.forceUpdate();
    expect(wrapper).toContainReactComponent('div', {id: 'child'});
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
