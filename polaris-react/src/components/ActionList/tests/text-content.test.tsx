import type {PropsWithChildren} from 'react';
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

  it('returns innerText from JSX component with children', () => {
    expect(
      textContent(
        <TestComponentWithProps>
          <TestComponentWithProps>
            test component text from props
          </TestComponentWithProps>
          <TestComponentWithProps>
            test component text from props
            <TestComponentWithProps>
              test component text from props
            </TestComponentWithProps>
          </TestComponentWithProps>
          <p>test component text from props</p>
        </TestComponentWithProps>,
      ),
    ).toContain('test component text from props');
  });
});

const TestComponent = () => <p>test component text</p>;
const TestComponentWithProps = ({children}: PropsWithChildren) => (
  <div>{children}</div>
);
