import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Container} from '../Container';

describe('<Container />', () => {
  it('renders its children', () => {
    const content = 'Container text';
    const container = mountWithApp(<Container>{content}</Container>);
    expect(container).toContainReactText(content);
  });
});
