import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Text} from '../../Text';
import {EmptySearchResult} from '../EmptySearchResult';
import {emptySearch} from '../illustrations';

describe('<EmptySearchResult />', () => {
  it("displays the title with style 'Display Small'", () => {
    const wrapper = mountWithApp(<EmptySearchResult title="Foo" />);
    const textHeadingLg = wrapper.findWhere(
      (wrap) => wrap.is(Text) && wrap.prop('variant') === 'headingLg',
    );

    expect(wrapper).toContainReactComponent(Text, {
      variant: 'headingLg',
      as: 'p',
    });
    expect(textHeadingLg).toContainReactText('Foo');
  });

  it("displays the description with style 'Body Subdued'", () => {
    const wrapper = mountWithApp(
      <EmptySearchResult title="Foo" description="Bar" />,
    );
    const subdued = wrapper.findWhere(
      (wrap) => wrap.is(Text) && wrap.prop('color') === 'subdued',
    );
    expect(wrapper).toContainReactComponent(Text, {color: 'subdued'});
    expect(subdued).toContainReactText('Bar');
  });

  it('does not display an image when `withIllustration` is false', () => {
    const wrapper = mountWithApp(<EmptySearchResult title="Foo" />);
    expect(wrapper).not.toContainReactComponent('img');
  });

  it('displays the illustration when `withIllustration` is true', () => {
    const wrapper = mountWithApp(
      <EmptySearchResult title="Foo" description="Bar" withIllustration />,
    );
    expect(wrapper).toContainReactComponentTimes('img', 1, {src: emptySearch});
  });
});
