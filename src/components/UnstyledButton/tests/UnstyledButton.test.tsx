import * as React from 'react';
import {shallow} from 'enzyme';

import UnstyledButton from '..';
import {Keys} from '../../types';

describe('<UnstyledButton />', () => {
  let preventDefault: () => void;

  beforeEach(() => {
    preventDefault = jest.fn();
  });

  it('adds the required attributes', () => {
    const element = shallow(<UnstyledButton>Button</UnstyledButton>);
    expect(element.prop('role')).toBe('button');
    expect(element.prop('tabIndex')).toBe(0);
  });

  it('passes down any additional props', () => {
    const element = shallow(<UnstyledButton data-foo="bar">Button</UnstyledButton>);
    expect(element.prop('data-foo')).toBe('bar');
  });

  describe('accessibilityLabel', () => {
    it('Uses the label as the aria-label of the content', () => {
      const element = shallow(<UnstyledButton accessibilityLabel="My button">Button</UnstyledButton>);
      expect(element.prop('aria-label')).toBe('My button');
    });
  });

  describe('className', () => {
    it('includes the passed class name', () => {
      const element = shallow(<UnstyledButton className="my-class">Button</UnstyledButton>);
      expect(element.prop('className').includes('my-class')).toBe(true);
    });
  });

  describe('disabled', () => {
    it('sets the required disabled attributes', () => {
      const element = shallow(<UnstyledButton disabled>Button</UnstyledButton>);
      expect(element.prop('aria-disabled')).toBe(true);
      expect(element.prop('tabindex')).toBeUndefined();
    });
  });

  describe('onClick()', () => {
    it('is called when clicked', () => {
      const spy = jest.fn();
      const element = shallow(<UnstyledButton onClick={spy}>Button</UnstyledButton>);
      element.simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('is called when SPACE is pressed', () => {
      const spy = jest.fn();
      const element = shallow(<UnstyledButton onClick={spy}>Button</UnstyledButton>);
      element.simulate('keyPress', {which: Keys.SPACE, preventDefault});
      expect(spy).toHaveBeenCalled();
    });

    it('is called when ENTER is pressed', () => {
      const spy = jest.fn();
      const element = shallow(<UnstyledButton onClick={spy}>Button</UnstyledButton>);
      element.simulate('keyPress', {which: Keys.ENTER, preventDefault});
      expect(spy).toHaveBeenCalled();
    });

    it('is not called when other keys are pressed', () => {
      const spy = jest.fn();
      const element = shallow(<UnstyledButton onClick={spy}>Button</UnstyledButton>);
      element.simulate('keyPress', {which: Keys.ESCAPE, preventDefault});
      element.simulate('keyPress', {which: Keys.CTRL, preventDefault});
      expect(spy).not.toHaveBeenCalled();
    });

    it('is not called when it is disabled', () => {
      const spy = jest.fn();
      const element = shallow(<UnstyledButton disabled onClick={spy}>Button</UnstyledButton>);
      element.simulate('click', {preventDefault});
      element.simulate('keyPress', {which: Keys.ENTER, preventDefault});
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onKeyPress()', () => {
    it('calls the passed key press listener', () => {
      const spy = jest.fn();
      const element = shallow(<UnstyledButton onKeyPress={spy}>Button</UnstyledButton>);
      element.simulate('keyPress', {which: Keys.ENTER, preventDefault});
      expect(spy).toHaveBeenCalled();
    });
  });
});
