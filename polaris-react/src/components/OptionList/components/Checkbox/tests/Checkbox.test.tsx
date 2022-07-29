import {mountWithApp} from 'tests/utilities';

import {Key} from '../../../../../types';
import {Checkbox, CheckboxProps} from '../Checkbox';

describe('<Checkbox />', () => {
  const defaultProps: CheckboxProps = {
    checked: true,
    disabled: false,
    id: 'checkboxId',
    name: 'Checkbox',
    value: 'checkbox',
    onChange: noop,
  };

  it('sets pass through props for input', () => {
    const input = mountWithApp(<Checkbox {...defaultProps} />);

    expect(input).toContainReactComponent('input', defaultProps);
  });

  it('calls onChange', () => {
    const spy = jest.fn();

    const input = mountWithApp(
      <Checkbox {...defaultProps} onChange={spy} />,
    ).find('input');

    input!.trigger('onChange');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  describe('Focus className', () => {
    it('on keyUp adds a keyFocused class to the input', () => {
      const checkbox = mountWithApp(<Checkbox onChange={noop} />);

      const event = {
        keyCode: Key.Space,
      };
      checkbox.find('input')!.trigger('onKeyUp', event);
      expect(checkbox).toContainReactComponent('input', {
        className: 'Input keyFocused',
      });
    });

    it('removes the keyFocused class on blur', () => {
      const checkbox = mountWithApp(<Checkbox onChange={noop} />);

      const event = {
        keyCode: Key.Space,
      };

      checkbox.find('input')!.trigger('onKeyUp', event);
      checkbox.find('input')!.trigger('onBlur');

      expect(checkbox).toContainReactComponent('input', {
        className: 'Input',
      });
    });

    it('on change does not add a keyFocused class to the input', () => {
      const checkbox = mountWithApp(<Checkbox onChange={noop} />);
      const checkboxInput = checkbox.find('input');
      checkboxInput!.trigger('onChange', {
        currentTarget: checkboxInput!.domNode as HTMLInputElement,
      });

      expect(checkbox).not.toContainReactComponent('input', {
        className: 'Input keyFocused',
      });
    });
  });
});

function noop() {}
