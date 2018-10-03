import * as React from 'react';
import {mountWithAppProvider} from 'tests/utilities';
import {Icon} from 'src/components';
import ExceptionList from '../ExceptionList';

describe('<ExceptionList />', () => {
  it('renders its items', () => {
    const exceptionList = mountWithAppProvider(
      <ExceptionList
        items={[
          {
            icon: 'notes',
            description:
              'This customer is awesome. Make sure to treat them right!',
          },
          {
            icon: 'circlePlus',
            description: 'Add a gift to this order',
          },
        ]}
      />,
    );
    expect(exceptionList.find('li').length).toBe(2);
  });

  it('renders its items icon as an <Icon />', () => {
    const exceptionList = mountWithAppProvider(
      <ExceptionList
        items={[
          {
            icon: 'notes',
            description:
              'This customer is awesome. Make sure to treat them right!',
          },
        ]}
      />,
    );
    expect(exceptionList.find(Icon).length).toBe(1);
  });
});
