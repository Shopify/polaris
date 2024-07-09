import React from 'react';
import {timer} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

import {UnstyledLink} from '../../../../UnstyledLink';
import {Item} from '../Item';

describe('<Item />', () => {
  const mockProps = {
    id: 'foo',
    focused: false,
  };

  beforeEach(() => {
    timer.mock();
  });

  afterEach(() => {
    timer.restore();
  });

  it('renders UnstyledLink when item has url', () => {
    const url = 'http://shopify.com';

    const item = mountWithApp(<Item {...mockProps} url={url} />);

    expect(item).toContainReactComponent(UnstyledLink);
    expect(item).not.toContainReactComponent('button');
  });

  it('renders button when item does not have url', () => {
    const item = mountWithApp(<Item {...mockProps} url={undefined} />);

    expect(item).not.toContainReactComponent(UnstyledLink);
    expect(item).toContainReactComponent('button');
  });

  it('focuses itself when focused is true', () => {
    const item = mountWithApp(<Item {...mockProps} focused />);

    timer.runAllTimers();

    expect(document.activeElement).toStrictEqual(item.find('button')!.domNode);
  });
});
