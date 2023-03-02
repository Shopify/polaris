import React from 'react';
import {mountWithApp} from 'tests/utilities';

// eslint-disable-next-line import/no-deprecated
import {TextContainer} from '../../../../TextContainer';
import {Section} from '../Section';

describe('<Section />', () => {
  const children = (
    <TextContainer>
      <p>Content</p>
    </TextContainer>
  );

  it('renders its children', () => {
    const section = mountWithApp(<Section>{children}</Section>);

    // eslint-disable-next-line import/no-deprecated
    expect(section.find(TextContainer)).toContainReactHtml('<p>Content</p>');
  });

  it('renders a div', () => {
    const section = mountWithApp(<Section>{children}</Section>);

    expect(section).toContainReactComponent('div');
  });
});
