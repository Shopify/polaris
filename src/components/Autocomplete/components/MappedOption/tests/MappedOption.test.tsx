import React from 'react';
import {mountWithListBoxProvider} from 'test-utilities/list-box';

import {ListBox} from '../../../../ListBox';
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
    const mappedOption = mountWithListBoxProvider(
      <MappedOption {...defaultProps} label={label} />,
    );

    expect(mappedOption).toContainReactText(label);
  });

  describe('accessibility', () => {
    it('does not apply an accessibility label when label is not a string', () => {
      const label = <div>test label</div>;
      const mappedOption = mountWithListBoxProvider(
        <MappedOption {...defaultProps} label={label} />,
      );

      expect(mappedOption).toContainReactComponent(ListBox.Option, {
        accessibilityLabel: undefined,
      });
    });
  });

  describe('ListBox', () => {
    it('renders ListBox.Option', () => {
      const mappedOption = mountWithListBoxProvider(
        <MappedOption {...defaultProps} />,
      );

      expect(mappedOption).toContainReactComponent(ListBox.Option);
    });

    it('renders ListBox.TextOption', () => {
      const mappedOption = mountWithListBoxProvider(
        <MappedOption {...defaultProps} />,
      );

      expect(mappedOption).toContainReactComponent(ListBox.TextOption);
    });
  });

  describe('media', () => {
    it('renders markup when provided', () => {
      const mappedOption = mountWithListBoxProvider(
        <MappedOption {...defaultProps} media={<MockComponent />} />,
      );

      expect(mappedOption).toContainReactComponent(MockComponent);
    });

    it('renders with disabled styles when disabled', () => {
      const mappedOption = mountWithListBoxProvider(
        <MappedOption {...defaultProps} disabled media={<MockComponent />} />,
      );

      expect(mappedOption).toContainReactComponent('div', {
        className: 'Media disabledMedia',
      });
    });

    it('renders with single selection styles when singleSelection is true', () => {
      const mappedOption = mountWithListBoxProvider(
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
