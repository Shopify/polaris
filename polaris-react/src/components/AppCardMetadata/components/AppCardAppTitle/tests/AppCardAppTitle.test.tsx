import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {AppCardAppTitle} from '../AppCardAppTitle';
import {Text} from '../../../../Text';

describe('<AppCardAppTitle />', () => {
  it('renders with default props', () => {
    const title = mountWithApp(<AppCardAppTitle appTitle="Shop" />);

    expect(title).toContainReactComponent('div', {
      className: 'TitleLink LinkDisabled',
      role: undefined,
      tabIndex: undefined,
      onClick: expect.any(Function),
    });

    expect(title).toContainReactComponent(Text, {
      truncate: false,
      variant: 'bodyMd',
      children: 'Shop',
    });
  });

  it('renders truncated title with large variant', () => {
    const title = mountWithApp(
      <AppCardAppTitle variant="large" truncate appTitle="Shop" />,
    );

    expect(title).toContainReactComponent('div', {
      className: 'TitleLink LinkDisabled',
      role: undefined,
      tabIndex: undefined,
      onClick: expect.any(Function),
    });

    expect(title).toContainReactComponent(Text, {
      truncate: true,
      variant: 'headingSm',
      children: 'Shop',
    });
  });

  it('renders title as a link', () => {
    const title = mountWithApp(
      <AppCardAppTitle appTitle="Shop" onTitleClick={() => {}} />,
    );

    expect(title).toContainReactComponent('div', {
      className: 'TitleLink',
      role: 'link',
      tabIndex: 0,
      onClick: expect.any(Function),
    });
  });

  it('triggers onTitleClick on link click', () => {
    const spy = jest.fn();
    const title = mountWithApp(
      <AppCardAppTitle appTitle="Shop" onTitleClick={spy} />,
    );

    title.find('div', {className: 'TitleLink'})?.trigger('onClick');

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
