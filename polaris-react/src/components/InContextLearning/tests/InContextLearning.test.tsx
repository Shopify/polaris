import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {InContextLearning} from '../InContextLearning';

describe('< />', () => {
  it('renders a InContextLearning', () => {
    const inContextLearning = mountWithApp(<InContextLearning />);

    expect(inContextLearning).toContainReactHtml('<div></div>');
  });
});