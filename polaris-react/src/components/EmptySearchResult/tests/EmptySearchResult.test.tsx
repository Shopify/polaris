import React from 'react';
import {mountWithApp} from 'tests/utilities';

// eslint-disable-next-line import/no-deprecated
import {DisplayText} from '../../DisplayText';
// eslint-disable-next-line import/no-deprecated
import {TextStyle} from '../../TextStyle';
import {EmptySearchResult} from '../EmptySearchResult';
import {emptySearch} from '../illustrations';

describe('<EmptySearchResult />', () => {
  it("displays the title with style 'Display Small'", () => {
    const wrapper = mountWithApp(<EmptySearchResult title="Foo" />);
    const displaySmalls = wrapper.findWhere(
      // eslint-disable-next-line import/no-deprecated
      (wrap) => wrap.is(DisplayText) && wrap.prop('size') === 'small',
    );

    // eslint-disable-next-line import/no-deprecated
    expect(wrapper).toContainReactComponent(DisplayText, {size: 'small'});
    expect(displaySmalls).toContainReactText('Foo');
  });

  it("displays the description with style 'Body Subdued'", () => {
    const wrapper = mountWithApp(
      <EmptySearchResult title="Foo" description="Bar" />,
    );
    const subdued = wrapper.findWhere(
      // eslint-disable-next-line import/no-deprecated
      (wrap) => wrap.is(TextStyle) && wrap.prop('variation') === 'subdued',
    );
    // eslint-disable-next-line import/no-deprecated
    expect(wrapper).toContainReactComponent(TextStyle, {variation: 'subdued'});
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
