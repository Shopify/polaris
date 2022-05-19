import React from 'react';
import {mountWithListboxProvider} from 'tests/utilities/listbox';

import {Listbox} from '../../../../Listbox';
import {MappedOption} from '../MappedOption';

describe('MappedOption', () => {
  const defaultProps = {
    value: 'value',
    label: 'label',
    selected: false,
    singleSelection: false,
  };

  it('renders label markup', () => {
    const label = 'Test label';
    const mappedOption = mountWithListboxProvider(
      <MappedOption {...defaultProps} label={label} />,
    );

    expect(mappedOption).toContainReactText(label);
  });

  describe('accessibility', () => {
    it('does not apply an accessibility label when label is not a string', () => {
      const label = <div>test label</div>;
      const mappedOption = mountWithListboxProvider(
        <MappedOption {...defaultProps} label={label} />,
      );

      expect(mappedOption).toContainReactComponent(Listbox.Option, {
        accessibilityLabel: undefined,
      });
    });
  });

  describe('Listbox', () => {
    it('renders Listbox.Option', () => {
      const mappedOption = mountWithListboxProvider(
        <MappedOption {...defaultProps} />,
      );

      expect(mappedOption).toContainReactComponent(Listbox.Option);
    });

    it('renders Listbox.TextOption', () => {
      const mappedOption = mountWithListboxProvider(
        <MappedOption {...defaultProps} />,
      );

      expect(mappedOption).toContainReactComponent(Listbox.TextOption);
    });
  });

  describe('media', () => {
    it('renders markup when provided', () => {
      const mappedOption = mountWithListboxProvider(
        <MappedOption {...defaultProps} media={<MockComponent />} />,
      );

      expect(mappedOption).toContainReactComponent(MockComponent);
    });

    it('renders with disabled styles when disabled', () => {
      const mappedOption = mountWithListboxProvider(
        <MappedOption {...defaultProps} disabled media={<MockComponent />} />,
      );

      expect(mappedOption).toContainReactComponent('div', {
        className: 'Media disabledMedia',
      });
    });

    it('renders with single selection styles when singleSelection is true', () => {
      const mappedOption = mountWithListboxProvider(
        <MappedOption
          {...defaultProps}
          singleSelection
          media={<MockComponent />}
        />,
      );

      expect(mappedOption).toContainReactComponent('div', {
        className: 'Media singleSelectionMedia',
      });
    });
  });
});

function MockComponent() {
  return null;
}
