import React from 'react';

import {textContent} from '../utils/text-content';

describe('textContent', () => {
  it('returns empty string when empty', () => {
    expect(textContent()).toBeUndefined();
  });

  it('returns text string when string is given', () => {
    expect(textContent('test')).toContain('test');
  });

  it('returns innerText from react component', () => {
    expect(textContent(<div>DIV Toggle page actions</div>)).toContain(
      'DIV Toggle page actions',
    );
  });

  it('returns innerText from JSX component', () => {
    expect(textContent(<TestComponent />)).toContain('test component text');
  });

  it('returns innerText combination', () => {
    const content = textContent(
      <div>
        <p>First text thing</p>
        <TestComponent />
      </div>,
    );
    expect(content).toContain('First text thing');
    expect(content).toContain('test component text');
  });
});

const TestComponent = () => <p>test component text</p>;
