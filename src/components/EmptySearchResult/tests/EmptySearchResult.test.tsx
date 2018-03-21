import * as React from 'react';
import {mount} from 'enzyme';

import EmptySearchResult from '../';
import emptySearch from '../illustrations/empty-search.svg';
import {DisplayText, TextStyle} from '../../';

describe('<EmptySearchResult />', () => {
  it("displays the title with style 'Display Small'", () => {
    const wrapper = mount(<EmptySearchResult title="Foo" />);
    const displaySmalls = wrapper.findWhere(
      (wrap) => wrap.is(DisplayText) && wrap.prop('size') === 'small',
    );
    expect(displaySmalls).toHaveLength(1);
    expect(displaySmalls.first().text()).toBe('Foo');
  });

  it("displays the description with style 'Body Subdued'", () => {
    const wrapper = mount(<EmptySearchResult title="Foo" description="Bar" />);
    const subdued = wrapper.findWhere(
      (wrap) => wrap.is(TextStyle) && wrap.prop('variation') === 'subdued',
    );
    expect(subdued).toHaveLength(1);
    expect(subdued.first().text()).toBe('Bar');
  });

  it('does not display an image when `withIllustration` is false', () => {
    const wrapper = mount(<EmptySearchResult title="Foo" />);
    const images = wrapper.find('img');
    expect(images).toHaveLength(0);
  });

  it('displays the correct illustration when `withIllustration` is true', () => {
    const wrapper = mount(
      <EmptySearchResult title="Foo" description="Bar" withIllustration />,
    );
    const images = wrapper.find('img');
    expect(images).toHaveLength(1);
    expect(images.first().prop('src')).toBe(emptySearch);
  });
});
