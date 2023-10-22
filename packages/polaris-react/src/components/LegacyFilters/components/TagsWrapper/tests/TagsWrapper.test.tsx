import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {TagsWrapper} from '../TagsWrapper';
import {Text} from '../../../../Text';

const MockChild = () => <div />;

describe('<TagsWrapper />', () => {
  it('renders visually hidden component when hidden is true', () => {
    const tagsWrapper = mountWithApp(
      <TagsWrapper hidden>
        <MockChild />
      </TagsWrapper>,
    );

    expect(tagsWrapper).toContainReactComponent(Text, {visuallyHidden: true});
    expect(
      tagsWrapper.find(Text, {visuallyHidden: true}),
    ).toContainReactComponent(MockChild);
  });

  it('renders children directly when hidden is false', () => {
    const tagsWrapper = mountWithApp(
      <TagsWrapper hidden={false}>
        <MockChild />
      </TagsWrapper>,
    );

    expect(tagsWrapper).not.toContainReactComponent(Text, {
      visuallyHidden: true,
    });
    expect(tagsWrapper).toContainReactComponent(MockChild);
  });
});
