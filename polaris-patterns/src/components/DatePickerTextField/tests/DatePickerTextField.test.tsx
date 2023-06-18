import React from 'react';
import {Popover, TextField} from '@shopify/polaris';
import {mountWithApp} from 'tests/utilities';

import {DatePicker} from '../../DatePicker';
import {
  formatDateToYearMonthDayDateString,
  parseYearMonthDayDateString,
} from '../../../utilities/dates';
import type {Props} from '../DatePickerTextField';
import {DatePickerTextField} from '../DatePickerTextField';

describe('<DatePickerTextField />', () => {
  const defaultProps: Props = {
    value: '2019-10-17',
    label: 'Expected Arrival',
    onChange: () => {},
  };

  it('passes preferredAlignment prop into the Popover', () => {
    const component = mountWithApp(
      <DatePickerTextField {...defaultProps} preferredAlignment="left" />,
    );

    expect(component).toContainReactComponent(Popover, {
      preferredAlignment: 'left',
    });
  });

  it('passes preferredPosition prop into the Popover', () => {
    const component = mountWithApp(
      <DatePickerTextField {...defaultProps} preferredPosition="above" />,
    );

    expect(component).toContainReactComponent(Popover, {
      preferredPosition: 'above',
    });
  });

  describe('<TextField />', () => {
    it('renders with passed label', () => {
      const component = mountWithApp(<DatePickerTextField {...defaultProps} />);

      expect(component).toContainReactComponent(TextField, {
        label: defaultProps.label,
      });
    });

    it('is passed the labelHidden prop', () => {
      const component = mountWithApp(
        <DatePickerTextField {...defaultProps} labelHidden />,
      );

      expect(component).toContainReactComponent(TextField, {
        labelHidden: true,
      });
    });

    it('renders the combobox role when disabled is false', () => {
      const component = mountWithApp(
        <DatePickerTextField {...defaultProps} disabled={false} />,
      );

      expect(component).toContainReactComponent(TextField, {
        role: 'combobox',
        disabled: false,
      });
    });

    it('renders only the TextField if disabled is true', () => {
      const component = mountWithApp(
        <DatePickerTextField {...defaultProps} disabled />,
      );

      expect(component).toContainReactComponent(TextField, {
        role: undefined,
        disabled: true,
      });

      expect(component).not.toContainReactComponent(Popover);
      expect(component).not.toContainReactComponent(DatePicker);
    });

    it('is passed the helpText prop', () => {
      const component = mountWithApp(
        <DatePickerTextField {...defaultProps} helpText="help" />,
      );

      expect(component).toContainReactComponent(TextField, {
        helpText: 'help',
      });
    });

    it('is passed the error prop', () => {
      const component = mountWithApp(
        <DatePickerTextField {...defaultProps} error />,
      );

      expect(component).toContainReactComponent(TextField, {error: true});
    });

    it('calls the DatePicker onChange when given a valid date', () => {
      const component = mountWithApp(<DatePickerTextField {...defaultProps} />);
      const textField = component.find(TextField)!;

      textField.trigger('onFocus');
      textField.trigger('onChange', '2019-10-17');

      const selected = component.find(DatePicker)!.prop('selected') as Date;

      expect(formatDateToYearMonthDayDateString(selected)).toBe('2019-10-17');
    });

    it('does not call the DatePicker onChange when given an invalid date', () => {
      const component = mountWithApp(<DatePickerTextField {...defaultProps} />);
      const textField = component.find(TextField)!;

      textField.trigger('onFocus');
      textField.trigger('onChange', '2019-10-17');
      textField.trigger('onChange', '2019-145234-17');

      const selected = component.find(DatePicker)!.prop('selected') as Date;

      expect(formatDateToYearMonthDayDateString(selected)).toBe('2019-10-17');
    });

    it('passes the selectedDate to DatePicker month and year props when one is passed', () => {
      const component = mountWithApp(<DatePickerTextField {...defaultProps} />);

      component.find(TextField)!.trigger('onFocus');

      expect(component).toContainReactComponent(DatePicker, {
        month: 9,
        year: 2019,
      });
    });

    it('passes the current month and year to DatePicker when no selected date is passed', () => {
      const component = mountWithApp(
        <DatePickerTextField {...defaultProps} value="" />,
      );

      component.find(TextField)!.trigger('onFocus');

      const today = new Date();

      expect(component).toContainReactComponent(DatePicker, {
        month: today.getMonth(),
        year: today.getFullYear(),
      });
    });
  });

  describe('<Popover />', () => {
    it('does not open by default', () => {
      const component = mountWithApp(<DatePickerTextField {...defaultProps} />);

      expect(component).toContainReactComponent(Popover, {
        active: false,
      });
    });

    it('does not render a DatePicker when the hideDatePicker is set to true', () => {
      const component = mountWithApp(
        <DatePickerTextField {...defaultProps} hideDatePicker />,
      );
      component.find(TextField)!.trigger('onFocus');

      expect(component).not.toContainReactComponent(DatePicker);
    });

    it('opens when the textfield is focused', () => {
      const component = mountWithApp(<DatePickerTextField {...defaultProps} />);

      component.find(TextField)!.trigger('onFocus');

      expect(component).toContainReactComponent(Popover, {
        active: true,
      });
    });
  });

  describe('onChange prop', () => {
    it('is called with valid characters typed into the textfield', () => {
      const spy = jest.fn();
      const component = mountWithApp(
        <DatePickerTextField {...defaultProps} onChange={spy} />,
      );

      const textField = component.find(TextField)!;

      textField.trigger('onChange', '2019-10-17');

      expect(spy).toHaveBeenCalledWith('2019-10-17');

      textField.trigger('onChange', '2019-abc10-def!18');

      expect(spy).not.toHaveBeenCalledWith('2019-abc10-def!18');
      expect(spy).toHaveBeenCalledWith('2019-10-18');
    });

    it('is called with an empty string when a date is cleared', () => {
      const spy = jest.fn();
      const component = mountWithApp(
        <DatePickerTextField {...defaultProps} onChange={spy} />,
      );

      const textField = component.find(TextField)!;

      textField.trigger('onChange', '');

      expect(spy).toHaveBeenCalledWith('');
    });
  });

  describe('<DatePicker />', () => {
    it('calls onChange prop when a date is selected', () => {
      const spy = jest.fn();

      const component = mountWithApp(
        <DatePickerTextField {...defaultProps} onChange={spy} />,
      );

      component.find(TextField)!.trigger('onFocus');
      component.find(DatePicker)!.trigger('onChange', {
        start: parseYearMonthDayDateString('2019-10-22'),
        end: parseYearMonthDayDateString('2019-10-22'),
      });

      expect(spy).toHaveBeenCalledWith('2019-10-22');
    });

    it('is passed the disableDatesBefore and disableDatesAfter prop', () => {
      const spy = jest.fn();
      const startDate = new Date('2020-03-01');
      const endDate = new Date('2020-03-31');
      const component = mountWithApp(
        <DatePickerTextField
          disableDatesBefore={startDate}
          disableDatesAfter={endDate}
          {...defaultProps}
          onChange={spy}
        />,
      );
      component.find(TextField)!.trigger('onFocus');

      expect(component).toContainReactComponent(DatePicker, {
        disableDatesBefore: startDate,
        disableDatesAfter: endDate,
      });
    });
  });
});
