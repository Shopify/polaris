import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Checkbox} from '../../Checkbox';
import {Scrollable} from '../../../../Scrollable';
import {Option} from '../Option';
import type {OptionProps} from '../Option';

describe('<Option />', () => {
  const defaultProps: OptionProps = {
    id: 'itemId',
    label: 'Option Item',
    value: 'option_item',
    section: 0,
    index: 0,
    onClick: noop,
  };

  it('renders a checkbox if allowMultiple is true', () => {
    const checkbox = mountWithApp(<Option {...defaultProps} allowMultiple />);
    expect(checkbox).toContainReactComponent(Checkbox);
  });

  it('renders a button if allowMultiple is false or undefined', () => {
    const button = mountWithApp(<Option {...defaultProps} />);
    expect(button).toContainReactComponent('button');
  });

  it('calls onClick with section and index if option is not disabled', () => {
    const spy = jest.fn();
    const {section, index} = defaultProps;

    const button = mountWithApp(
      <Option {...defaultProps} onClick={spy} />,
    ).find('button')!;
    button.trigger('onClick');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(section, index);
  });

  it('doesn’t call onClick if option is disabled', () => {
    const spy = jest.fn();

    const button = mountWithApp(
      <Option {...defaultProps} onClick={spy} disabled />,
    ).find('button')!;
    button.trigger('onClick');

    expect(spy).not.toHaveBeenCalled();
  });

  it('calls onClick with section and index if option is not disabled and multiple options are allowed', () => {
    const spy = jest.fn();
    const {section, index} = defaultProps;

    const input = mountWithApp(
      <Option {...defaultProps} onClick={spy} allowMultiple />,
    ).find('input')!;
    input.trigger('onChange');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(section, index);
  });

  it('doesn’t call onClick if option is disabled and multiple options are allowed', () => {
    const spy = jest.fn();

    const input = mountWithApp(
      <Option {...defaultProps} onClick={spy} disabled allowMultiple />,
    ).find('input')!;
    input.trigger('onChange');

    expect(spy).not.toHaveBeenCalled();
  });

  it('sets the pass through props for Checkbox if multiple items are allowed', () => {
    const {id, value, select, disabled} = defaultProps;
    const checkbox = mountWithApp(
      <Option {...defaultProps} allowMultiple />,
    ).find(Checkbox)!;

    expect(checkbox.prop('id')).toBe(id);
    expect(checkbox.prop('value')).toBe(value);
    expect(checkbox.prop('checked')).toBe(select);
    expect(checkbox.prop('disabled')).toBe(disabled);
  });

  it('renders media content when provided', () => {
    const id = 'media';
    const option = mountWithApp(
      <Option {...defaultProps} media={<div id={id} />} />,
    );

    expect(option).toContainReactComponent('div', {id});
  });

  it('adds a `select` class to the label when `allowMultiple` is true', () => {
    const option = mountWithApp(
      <Option {...defaultProps} select allowMultiple />,
    );

    expect(option).toContainReactComponent('label', {
      className: 'Label select',
    });
  });

  it('active option has scrollable markup and active label', () => {
    const option = mountWithApp(
      <Option {...defaultProps} allowMultiple active />,
    );

    expect(option).toContainReactComponent(Scrollable.ScrollTo);
    expect(option).toContainReactComponent('label', {
      className: 'Label active',
    });
  });

  describe('verticalAlignment', () => {
    it('renders with default flex-start alignment if not provided', () => {
      const option = mountWithApp(<Option {...defaultProps} allowMultiple />);

      expect(option).toContainReactComponent('label', {
        className: 'Label',
      });
    });

    it('renders with top alignment', () => {
      const option = mountWithApp(
        <Option {...defaultProps} allowMultiple verticalAlign="top" />,
      );

      expect(option).toContainReactComponent('label', {
        className: 'Label verticalAlignTop',
      });
    });

    it('renders with center alignment', () => {
      const option = mountWithApp(
        <Option {...defaultProps} allowMultiple verticalAlign="center" />,
      );

      expect(option).toContainReactComponent('label', {
        className: 'Label verticalAlignCenter',
      });
    });

    it('renders with bottom alignment', () => {
      const option = mountWithApp(
        <Option {...defaultProps} allowMultiple verticalAlign="bottom" />,
      );

      expect(option).toContainReactComponent('label', {
        className: 'Label verticalAlignBottom',
      });
    });
  });
});

function noop() {}
