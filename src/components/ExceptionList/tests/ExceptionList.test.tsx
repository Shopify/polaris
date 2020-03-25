import React from 'react';
import {CirclePlusMinor, NoteMinor} from '@shopify/polaris-icons';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {Icon} from 'components';

import {ExceptionList} from '../ExceptionList';
import {Truncate} from '../../Truncate';

describe('<ExceptionList />', () => {
  it('renders its items', () => {
    const exceptionList = mountWithAppProvider(
      <ExceptionList
        items={[
          {
            icon: NoteMinor,
            description:
              'This customer is awesome. Make sure to treat them right!',
          },
          {
            icon: CirclePlusMinor,
            description: 'Add a gift to this order',
          },
        ]}
      />,
    );
    expect(exceptionList.find('li')).toHaveLength(2);
  });

  it('renders its items icon as an <Icon />', () => {
    const exceptionList = mountWithAppProvider(
      <ExceptionList
        items={[
          {
            icon: NoteMinor,
            description:
              'This customer is awesome. Make sure to treat them right!',
          },
        ]}
      />,
    );
    expect(exceptionList.find(Icon)).toHaveLength(1);
  });

  it('renders an item without an icon', () => {
    const exceptionList = mountWithAppProvider(
      <ExceptionList
        items={[
          {
            description:
              'This customer is awesome. Make sure to treat them right!',
          },
        ]}
      />,
    );
    expect(exceptionList.find(Icon)).toHaveLength(0);
  });

  it('renders an item with a truncate', () => {
    const exceptionList = mountWithAppProvider(
      <ExceptionList
        items={[
          {
            truncate: true,
            title: 'Favorite customer',
          },
        ]}
      />,
    );
    expect(exceptionList.find(Truncate)).toHaveLength(1);
  });

  it('renders an item with a title', () => {
    const exceptionList = mountWithAppProvider(
      <ExceptionList
        items={[
          {
            title: 'Favorite customer',
          },
        ]}
      />,
    );
    expect(exceptionList.text()).toBe('Favorite customer');
  });
});
