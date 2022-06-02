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

    const iconWrapper = icon.find('span');

    const firstIconWrapper = iconWrapper?.findAll('span')[1];
    const secondIconWrapper = iconWrapper?.findAll('span')[4];

    expect(firstIconWrapper).toHaveReactProps({className: 'Icon Up Active'});
    expect(secondIconWrapper).toHaveReactProps({className: 'Icon Down'});
  });

  it('sets the active class on the down icon when the sortDirection is set to descending', () => {
    const icon = mountWithApp(
      <SortIcon sortDirection="descending" accessibilityLabel="test" />,
    );

    const iconWrapper = icon.find('span', {className: 'SortIcon'});

    const firstIconWrapper = iconWrapper?.findAll('span')[1];
    const secondIconWrapper = iconWrapper?.findAll('span')[4];

    expect(firstIconWrapper).toHaveReactProps({
      className: 'Icon Up',
    });
    expect(secondIconWrapper).toHaveReactProps({className: 'Icon Down Active'});
  });

  it('sets no active class on the down icon when the sortDirection is set to none', () => {
    const icon = mountWithApp(
      <SortIcon sortDirection="none" accessibilityLabel="test" />,
    );

    const iconWrapper = icon.find('span');

    const firstIconWrapper = iconWrapper?.findAll('span')[1];
    const secondIconWrapper = iconWrapper?.findAll('span')[4];

    expect(firstIconWrapper).toHaveReactProps({
      className: 'Icon Up',
    });
    expect(secondIconWrapper).toHaveReactProps({
      className: 'Icon Down',
    });
  });
});
