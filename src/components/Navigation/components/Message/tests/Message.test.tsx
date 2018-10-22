import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'test-utilities';
import Message from '../Message';
import Badge from '../../../../Badge';

const messageProps = {
  title: 'Polaris',
  description: 'Hello Polaris',
  action: {
    onClick: noop,
    content: 'click me',
  },
  link: {to: '/', content: 'home'},
};

describe('<Message />', () => {
  it('mounts', () => {
    const message = mountWithAppProvider(<Message {...messageProps} />);

    expect(message.exists()).toBe(true);
  });

  it('will not render badge content by default', () => {
    const message = mountWithAppProvider(<Message {...messageProps} />);

    expect(message.find(Badge)).toHaveLength(0);
  });

  it('renders a badge when the badge prop is provided', () => {
    const message = mountWithAppProvider(
      <Message
        {...messageProps}
        badge={{content: 'new', status: 'new' as 'new'}}
      />,
    );

    expect(message.find(Badge)).toHaveLength(1);
  });
});
