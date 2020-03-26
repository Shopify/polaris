import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {VisuallyHidden} from 'components';

import {Badge} from '../Badge';

describe('<Badge />', () => {
  it('renders its children', () => {
    const badge = mountWithAppProvider(<Badge>Badge test</Badge>);
    expect(badge.text()).toBe('Badge test');
  });

  it('accepts a status prop and renders a visually hidden label', () => {
    const badge = mountWithAppProvider(<Badge status="success" />);
    expect(badge.find(VisuallyHidden).exists()).toBe(true);
  });

  it('accepts a progress prop and renders a visually hidden label', () => {
    const badge = mountWithAppProvider(<Badge progress="incomplete" />);
    expect(badge.find(VisuallyHidden).exists()).toBe(true);
  });
});
