import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {TextField} from 'components';

import {Group} from '../Group';

describe('<Group />', () => {
  let children: React.ReactNode;
  let title: string;
  let helpText: string;
  let item: any;

  beforeAll(() => {
    children = <TextField onChange={noop} label="test" />;
    title = 'Title';
    helpText = 'Help text';
    item = mountWithAppProvider(
      <Group title={title} helpText={helpText}>
        {children}
      </Group>,
    );
  });

  it('renders its children', () => {
    expect(item.contains(children)).toBe(true);
  });

  it('renders its title', () => {
    expect(item.contains(title)).toBe(true);
  });

  it('renders its help text', () => {
    expect(item.contains(helpText)).toBe(true);
  });
});

function noop() {}
