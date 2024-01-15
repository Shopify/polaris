import React from 'react';
import {PlusCircleIcon, NoteIcon} from '@shopify/polaris-icons';
import {mountWithApp} from 'tests/utilities';

import {ExceptionList} from '../ExceptionList';
import {Icon} from '../../Icon';
import {Truncate} from '../../Truncate';

describe('<ExceptionList />', () => {
  it('renders its items', () => {
    const exceptionList = mountWithApp(
      <ExceptionList
        items={[
          {
            icon: NoteIcon,
            description:
              'This customer is awesome. Make sure to treat them right!',
          },
          {
            icon: PlusCircleIcon,
            description: 'Add a gift to this order',
          },
        ]}
      />,
    );
    expect(exceptionList).toContainReactComponentTimes('li', 2);
  });

  it('renders its items icon as an <Icon />', () => {
    const exceptionList = mountWithApp(
      <ExceptionList
        items={[
          {
            icon: NoteIcon,
            description:
              'This customer is awesome. Make sure to treat them right!',
          },
        ]}
      />,
    );

    expect(exceptionList).toContainReactComponent(Icon);
  });

  it('renders an item without an icon', () => {
    const exceptionList = mountWithApp(
      <ExceptionList
        items={[
          {
            description:
              'This customer is awesome. Make sure to treat them right!',
          },
        ]}
      />,
    );

    expect(exceptionList).not.toContainReactComponent(Icon);
  });

  it('renders an item with a truncate', () => {
    const exceptionList = mountWithApp(
      <ExceptionList
        items={[
          {
            truncate: true,
            title: 'Favorite customer',
          },
        ]}
      />,
    );

    expect(exceptionList).toContainReactComponent(Truncate);
  });

  it('renders an item with a title', () => {
    const exceptionList = mountWithApp(
      <ExceptionList
        items={[
          {
            title: 'Favorite customer',
          },
        ]}
      />,
    );
    expect(exceptionList).toContainReactText('Favorite customer');
  });
});
