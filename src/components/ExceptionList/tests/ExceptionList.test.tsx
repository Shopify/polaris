import * as React from 'react';
import {CirclePlusMinor, NoteMinor} from '@shopify/polaris-icons';
import {mountWithAppProvider} from 'test-utilities';
import {Icon} from 'components';
import ExceptionList from '../ExceptionList';

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
});
