import {mountWithApp} from 'tests/utilities';

import {InlineCode} from '../InlineCode';

describe('<Text />', () => {
  const text = 'Hello world';

  it('renders its children', () => {
    const inlineCode = mountWithApp(<InlineCode>{text}</InlineCode>);
    expect(inlineCode).toContainReactText(text);
  });

  it('renders its children inside a code tag', () => {
    const inlineCode = mountWithApp(<InlineCode>{text}</InlineCode>);
    expect(inlineCode).toContainReactComponent('code');
  });

  it('renders its children with code block styling', () => {
    const inlineCode = mountWithApp(<InlineCode>{text}</InlineCode>);
    expect(inlineCode).toContainReactComponent('code', {
      className: expect.stringContaining('Code'),
    });
  });
});
