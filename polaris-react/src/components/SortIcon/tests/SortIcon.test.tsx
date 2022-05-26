import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {SortIcon} from '../SortIcon';

describe('<SortIcon/>', () => {
  it('renders with an accessibility label', () => {
    const iconWrapper = mountWithApp(
      <div>
        <SortIcon sortDirection="none" accessibilityLabel="label test" />,
      </div>,
    );

    expect(iconWrapper).toContainReactComponent(SortIcon, {
      accessibilityLabel: 'label test',
    });
  });

  it('sets the active class on the up icon when the sortDirection is set to ascending', () => {
    const icon = mountWithApp(
      <SortIcon sortDirection="ascending" accessibilityLabel="test" />,
    );

    const iconWrapper = icon.find('div');

    const firstIconWrapper = iconWrapper?.findAll('div')[0];
    const secondIconWrapper = iconWrapper?.findAll('div')[1];

    expect(firstIconWrapper).toHaveReactProps({className: 'Icon Active'});
    expect(secondIconWrapper).not.toHaveReactProps({className: 'Icon Active'});
  });

  it('sets the active class on the down icon when the sortDirection is set to descending', () => {
    const icon = mountWithApp(
      <SortIcon sortDirection="descending" accessibilityLabel="test" />,
    );

    const iconWrapper = icon.find('div');

    const firstIconWrapper = iconWrapper?.findAll('div')[0];
    const secondIconWrapper = iconWrapper?.findAll('div')[1];

    expect(firstIconWrapper).not.toHaveReactProps({
      className: 'Icon Active',
    });
    expect(secondIconWrapper).toHaveReactProps({className: 'Icon Active'});
  });

  it('sets no active class on the down icon when the sortDirection is set to none', () => {
    const icon = mountWithApp(
      <SortIcon sortDirection="none" accessibilityLabel="test" />,
    );

    const iconWrapper = icon.find('div');

    const firstIconWrapper = iconWrapper?.findAll('div')[0];
    const secondIconWrapper = iconWrapper?.findAll('div')[1];

    expect(firstIconWrapper).not.toHaveReactProps({
      className: 'Icon Active',
    });
    expect(secondIconWrapper).not.toHaveReactProps({className: 'Icon Active'});
  });
});
