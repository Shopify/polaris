import * as React from 'react';
import {mount} from 'enzyme';
import isInputFocused from '../isInputFocused';

describe('isInputFocused', () => {
  it('returns true when the the focused element is not input, textarea, select or has the attribute contenteditable', () => {
    const markup = mount(<button />);
    (markup.getDOMNode() as HTMLElement).focus();
    expect(isInputFocused()).toBe(false);
  });

  it('returns true when an element with contenteditable is focused', () => {
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    const markup = mount(<div contentEditable tabIndex={0} />);
    (markup.getDOMNode() as HTMLElement).focus();
    expect(isInputFocused()).toBe(true);
  });

  it('returns true when a select element is focused', () => {
    const markup = mount(<select />);
    (markup.getDOMNode() as HTMLElement).focus();
    expect(isInputFocused()).toBe(true);
  });

  it('returns true when a textarea element is focused', () => {
    const markup = mount(<textarea />);
    (markup.getDOMNode() as HTMLElement).focus();
    expect(isInputFocused()).toBe(true);
  });

  it('returns true when a input element is focused', () => {
    const markup = mount(<input />);
    (markup.getDOMNode() as HTMLElement).focus();
    expect(isInputFocused()).toBe(true);
  });
});
