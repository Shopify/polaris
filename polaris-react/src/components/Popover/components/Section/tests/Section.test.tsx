import {mountWithApp} from 'tests/utilities';

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

    expect(section.find(TextContainer)).toContainReactHtml('<p>Content</p>');
  });

  it('renders a div', () => {
    const section = mountWithApp(<Section>{children}</Section>);

    expect(section).toContainReactComponent('div');
  });
});
