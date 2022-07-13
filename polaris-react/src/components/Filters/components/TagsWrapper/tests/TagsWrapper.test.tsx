import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {TagsWrapper} from '../TagsWrapper';
// eslint-disable-next-line import/no-deprecated
import {VisuallyHidden} from '../../../../VisuallyHidden';

const MockChild = () => <div />;

describe('<TagsWrapper />', () => {
  it('renders visually hidden component when hidden is true', () => {
    const tagsWrapper = mountWithApp(
      <TagsWrapper hidden>
        <MockChild />
      </TagsWrapper>,
    );

    // eslint-disable-next-line import/no-deprecated
    expect(tagsWrapper).toContainReactComponent(VisuallyHidden);
    // eslint-disable-next-line import/no-deprecated
    expect(tagsWrapper.find(VisuallyHidden)).toContainReactComponent(MockChild);
  });

  it('renders children directly when hidden is false', () => {
    const tagsWrapper = mountWithApp(
      <TagsWrapper hidden={false}>
        <MockChild />
      </TagsWrapper>,
    );

    // eslint-disable-next-line import/no-deprecated
    expect(tagsWrapper).not.toContainReactComponent(VisuallyHidden);
    expect(tagsWrapper).toContainReactComponent(MockChild);
  });
});
