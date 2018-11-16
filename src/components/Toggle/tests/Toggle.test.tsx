import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider, findByTestID} from 'test-utilities';
import Labelled from '../../Labelled';
import TextContainer from '../../TextContainer';
import Icon from '../../Icon';
import Toggle, {Prefix, Suffix} from '../Toggle';

describe('<Toggle />', () => {
  const mockProps = {
    label: 'label',
    onChange: noop,
  };

  describe('role', () => {
    it('gets set to checkbox', () => {
      const toggle = mountWithAppProvider(<Toggle {...mockProps} />);
      const input = findByTestID(toggle, 'ToggleInput');

      expect(input.prop('role')).toBe('checkbox');
    });
  });

  describe('checked', () => {
    it('sets aria-checked if true', () => {
      const toggle = mountWithAppProvider(<Toggle {...mockProps} checked />);
      const input = findByTestID(toggle, 'ToggleInput');

      expect(input.prop('aria-checked')).toBeTruthy();
    });

    it('does not set aria-checked if false', () => {
      const toggle = mountWithAppProvider(<Toggle {...mockProps} />);
      const input = findByTestID(toggle, 'ToggleInput');

      expect(input.prop('aria-checked')).toBeFalsy();
    });

    it('is set to false by default', () => {
      const toggle = mountWithAppProvider(<Toggle {...mockProps} />);
      const input = findByTestID(toggle, 'ToggleInput');

      expect(input.prop('checked')).toBeFalsy();
    });
  });

  describe('disabled', () => {
    it('sets aria-disabled if true', () => {
      const toggle = mountWithAppProvider(<Toggle {...mockProps} disabled />);
      const input = findByTestID(toggle, 'ToggleInput');

      expect(input.prop('aria-disabled')).toBeTruthy();
    });

    it('does not set aria-disabled if false', () => {
      const toggle = mountWithAppProvider(<Toggle {...mockProps} />);
      const input = findByTestID(toggle, 'ToggleInput');

      expect(input.prop('aria-disabled')).toBeFalsy();
    });

    it('does not allow interaction when toggle is clicked', () => {
      const onChangeSpy = jest.fn();
      const toggle = mountWithAppProvider(
        <Toggle {...mockProps} onChange={onChangeSpy} disabled />,
      );
      const input = findByTestID(toggle, 'ToggleInput');

      input.simulate('click');
      expect(onChangeSpy).not.toHaveBeenCalled();
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const id = 'uniqueID';
      const toggle = mountWithAppProvider(<Toggle {...mockProps} id={id} />);
      const input = findByTestID(toggle, 'ToggleInput');

      expect(input.prop('id')).toBe(id);
    });
  });

  describe('label', () => {
    it('gets passed to Labelled', () => {
      const label = 'label';
      const toggle = mountWithAppProvider(
        <Toggle {...mockProps} label={label} />,
      );
      const labelled = toggle.find(Labelled);

      expect(labelled.prop('label')).toBe(label);
    });

    it('gets passed to aria-label', () => {
      const label = 'label';
      const toggle = mountWithAppProvider(
        <Toggle {...mockProps} label={label} />,
      );

      const input = findByTestID(toggle, 'ToggleInput');

      expect(input.prop('aria-label')).toBe(label);
    });
  });

  describe('labelHidden', () => {
    it('gets passed to Labelled', () => {
      const toggle = mountWithAppProvider(
        <Toggle {...mockProps} labelHidden />,
      );
      const labelled = toggle.find(Labelled);

      expect(labelled.prop('labelHidden')).toBeTruthy();
    });
  });

  describe('prefix', () => {
    it('sets the prefix content', () => {
      const prefix = <TextContainer>Off</TextContainer>;
      const toggle = mountWithAppProvider(
        <Toggle {...mockProps} prefix={prefix} />,
      );

      expect(toggle.find(Prefix)).toHaveLength(1);
    });

    it('calls onChange with false when clicked', () => {
      const onChangeSpy = jest.fn();
      const prefix = <TextContainer>Off</TextContainer>;
      const toggle = mountWithAppProvider(
        <Toggle
          {...mockProps}
          prefix={prefix}
          checked
          onChange={onChangeSpy}
        />,
      );

      const prefixElement = toggle.find(Prefix);

      prefixElement.simulate('click');
      expect(onChangeSpy).toHaveBeenCalledWith(false);
    });
  });

  describe('suffix', () => {
    it('sets the suffix content', () => {
      const onChangeSpy = jest.fn();
      const suffix = <TextContainer>On</TextContainer>;
      const toggle = mountWithAppProvider(
        <Toggle {...mockProps} suffix={suffix} onChange={onChangeSpy} />,
      );

      const suffixElement = toggle.find(Suffix);

      suffixElement.simulate('click');
      expect(onChangeSpy).toHaveBeenCalledWith(true);
    });

    it('calls onChange with true when clicked', () => {
      const onChangeSpy = jest.fn();
      const prefix = <TextContainer>Off</TextContainer>;
      const toggle = mountWithAppProvider(
        <Toggle
          {...mockProps}
          prefix={prefix}
          checked
          onChange={onChangeSpy}
        />,
      );

      const prefixElement = toggle.find(Prefix);

      prefixElement.simulate('click');
      expect(onChangeSpy).toHaveBeenCalledWith(false);
    });
  });

  describe('onChange', () => {
    it('gets called when toggle is clicked', () => {
      const onChangeSpy = jest.fn();

      const toggle = mountWithAppProvider(
        <Toggle {...mockProps} onChange={onChangeSpy} />,
      );

      const input = findByTestID(toggle, 'ToggleInput');
      input.simulate('click');

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('<Icon />', () => {
    it('renders an indigo checkmark icon when checked', () => {
      const toggle = mountWithAppProvider(<Toggle {...mockProps} checked />);

      const input = findByTestID(toggle, 'ToggleInput');

      expect(input.find(Icon).prop('source')).toBe('checkmark');
      expect(input.find(Icon).prop('color')).toBe('indigo');
    });

    it('renders an inkLighter cancelSmall icon when not checked', () => {
      const toggle = mountWithAppProvider(
        <Toggle {...mockProps} checked={false} />,
      );

      const input = findByTestID(toggle, 'ToggleInput');

      expect(input.find(Icon).prop('source')).toBe('cancelSmall');
      expect(input.find(Icon).prop('color')).toBe('inkLighter');
    });
  });
});
