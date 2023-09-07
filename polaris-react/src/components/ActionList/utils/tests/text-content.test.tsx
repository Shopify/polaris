import React from 'react';

import {textContent} from '../text-content';

describe('textContent', () => {
  it('returns empty string when empty', () => {
    expect(textContent()).toBeUndefined();
  });

  it('returns text string when string is given', () => {
    expect(textContent('test')).toBe('test');
  });

  it('returns innerText from react component', () => {
    expect(textContent(<div>DIV Toggle page actions</div>)).toBe(
      'DIV Toggle page actions',
    );
  });

  it('returns innerText from JSX component', () => {
    expect(textContent(<TestComponent />)).toBe('test component text');
  });

  it('returns innerText from JSX component with children', () => {
    expect(
      textContent(
        <TestComponentWithProps>
          test component text from props
        </TestComponentWithProps>,
      ),
    ).toBe('test component text from props');
  });

  it('returns innerText combination', () => {
    expect(
      textContent(
        <div>
          <p>First text thing</p>
          <TestComponent />
        </div>,
      ),
    ).toBe('First text thingtest component text');
  });
});

const TestComponent = () => <p>test component text</p>;
const TestComponentWithProps = (props: any) => <p>{props.children}</p>;
