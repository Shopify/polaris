import {UnstyledLink} from '@shopify/polaris';

import {mountWithAppContext} from 'tests/modern';

import {Item} from '../Item';

describe('<Item />', () => {
  const mockProps = {
    id: 'foo',
    focused: false,
  };

  it('renders UnstyledLink when item has url', async () => {
    const url = 'http://shopify.com';

    const item = await mountWithAppContext(<Item {...mockProps} url={url} />);

    expect(item).toContainReactComponent(UnstyledLink);
    expect(item).not.toContainReactComponent('button');
  });

  it('renders button when item does not have url', async () => {
    const item = await mountWithAppContext(
      <Item {...mockProps} url={undefined} />,
    );

    expect(item).not.toContainReactComponent(UnstyledLink);
    expect(item).toContainReactComponent('button');
  });
});
