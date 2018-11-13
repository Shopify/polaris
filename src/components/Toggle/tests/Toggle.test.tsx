import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'test-utilities';
import Labelled from '../../Labelled';
import TextContainer from '../../TextContainer';
import Icon from '../../Icon';
import Toggle from '../Toggle';

describe('<Toggle />', () => {
  const mockProps = {
    label: 'label',
    onChange: noop,
  };

  describe('role', () => {
    it('gets set to switch', () => {
      const toggle = mountWithAppProvider(<Toggle {...mockProps} />);

      const button = toggle.find('button');

      expect(button.prop('role')).toBe('switch');
    });
  });

  describe('checked', () => {
    it('sets aria-checked if true', () => {
      const toggle = mountWithAppProvider(<Toggle {...mockProps} checked />);
      const button = toggle.find('button');

      expect(button.prop('aria-checked')).toBeTruthy();
    });

    it('does not set aria-checked if false', () => {
      const toggle = mountWithAppProvider(<Toggle {...mockProps} />);
      const button = toggle.find('button');

      expect(button.prop('aria-checked')).toBeFalsy();
    });

    it('is set to false by default', () => {
      const toggle = mountWithAppProvider(<Toggle {...mockProps} />);
      const button = toggle.find('button');

      expect(button.prop('checked')).toBeFalsy();
    });
  });

  describe('disabled', () => {
    it('sets aria-disabled if true', () => {
      const toggle = mountWithAppProvider(<Toggle {...mockProps} disabled />);
      const button = toggle.find('button');

      expect(button.prop('aria-disabled')).toBeTruthy();
    });

    it('does not set aria-disabled if false', () => {
      const toggle = mountWithAppProvider(<Toggle {...mockProps} />);
      const button = toggle.find('button');

      expect(button.prop('aria-disabled')).toBeFalsy();
    });

    it('does not allow checked to become true when toggle is clicked', () => {
      const toggle = mountWithAppProvider(<Toggle {...mockProps} disabled />);
      const button = toggle.find('button');

      button.simulate('click');
      expect(button.prop('checked')).toBeFalsy();
    });
  });

  describe('id', () => {
    it('sets the id on the button', () => {
      const id = 'uniqueID';
      const toggle = mountWithAppProvider(<Toggle {...mockProps} id={id} />);
      const button = toggle.find('button');

      expect(button.prop('id')).toBe(id);
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

      const button = toggle.find('button');

      expect(button.prop('aria-label')).toBe(label);
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

      expect(toggle.contains(prefix)).toBeTruthy();
    });
  });

  describe('suffix', () => {
    it('sets the suffix content', () => {
      const suffix = <TextContainer>On</TextContainer>;
      const toggle = mountWithAppProvider(
        <Toggle {...mockProps} suffix={suffix} />,
      );

      expect(toggle.contains(suffix)).toBeTruthy();
    });
  });

  describe('onChange', () => {
    it('gets called when toggle is clicked', () => {
      const onChangeSpy = jest.fn();

      const toggle = mountWithAppProvider(
        <Toggle {...mockProps} onChange={onChangeSpy} />,
      );

      const button = toggle.find('button');
      button.simulate('click');

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('<Icon />', () => {
    it('renders an indigo checkmark icon when checked', () => {
      const toggle = mountWithAppProvider(<Toggle {...mockProps} checked />);

      const button = toggle.find('button');

      expect(button.find(Icon).prop('source')).toBe('checkmark');
      expect(button.find(Icon).prop('color')).toBe('indigo');
    });

    it('renders a skyDark cancelSmall icon when not checked', () => {
      const toggle = mountWithAppProvider(
        <Toggle {...mockProps} checked={false} />,
      );

      const button = toggle.find('button');

      expect(button.find(Icon).prop('source')).toBe('cancelSmall');
      expect(button.find(Icon).prop('color')).toBe('skyDark');
    });
  });
});
