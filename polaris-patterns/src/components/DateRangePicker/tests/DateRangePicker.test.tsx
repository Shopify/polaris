import {
  Button,
  DatePicker,
  OptionList,
  Popover,
  TextField,
} from '@shopify/polaris';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';
import React from 'react';

import {
  daysAgo,
  formatDateToYearMonthDayDateString,
  today,
} from '../../../utilities/dates';
import {DateRangePicker} from '../DateRangePicker';

describe('DateRangePicker', () => {
  beforeAll(() => {
    matchMedia.mock();
  });

  afterAll(() => {
    matchMedia.restore();
  });

  let mockOnChange: () => void;
  let defaultProps: React.ComponentProps<typeof DateRangePicker>;

  beforeEach(() => {
    mockOnChange = jest.fn();
    defaultProps = {
      onChange: mockOnChange,
      initialRange: {
        since: new Date('2023-03-01'),
        until: new Date('2023-03-08'),
      },
      timeZone: 'UTC',
    };
  });

  describe('initial values', () => {
    it('is closed until clicked', async () => {
      const wrapper = await mountWithApp(<DateRangePicker {...defaultProps} />);

      expect(wrapper).not.toContainReactComponent(DatePicker);
      expect(wrapper).toContainReactComponent(Popover, {active: false});

      wrapper.act(() => {
        wrapper.find(Button)?.trigger('onClick');
      });
      expect(wrapper).toContainReactComponent(DatePicker);
      expect(wrapper).toContainReactComponent(Popover, {active: true});
    });

    it('displays the initial values in the input fields', async () => {
      const wrapper = await mountWithApp(<DateRangePicker {...defaultProps} />);
      wrapper.act(() => {
        wrapper.find(Button)?.trigger('onClick');
      });

      const input1 = wrapper.find(TextField, {value: '2023-03-01'});
      expect(input1).not.toBeNull();

      const input2 = wrapper.find(TextField, {value: '2023-03-08'});
      expect(input2).not.toBeNull();
    });

    describe('predefined ranges', () => {
      it('displays the yesterday days in the text fields when the yesterday range is selected', async () => {
        const wrapper = await mountWithApp(
          <DateRangePicker {...defaultProps} />,
        );
        await wrapper.act(async () => {
          await wrapper.find(Button)?.trigger('onClick');
        });

        await wrapper.act(async () => {
          const optionList = await wrapper.find(OptionList);
          await optionList!.trigger('onChange', ['yesterday']);
        });

        const yesterday = formatDateToYearMonthDayDateString(daysAgo(1));

        const input1 = wrapper.find(TextField, {value: yesterday});
        expect(input1).not.toBeNull();

        const input2 = wrapper.find(TextField, {value: yesterday});
        expect(input2).not.toBeNull();
      });

      it('selects the last 7 days range when the last 7 days are selected in the text fields', async () => {
        const wrapper = await mountWithApp(
          <DateRangePicker {...defaultProps} />,
        );

        await wrapper.act(async () => {
          await wrapper.find(Button)?.trigger('onClick');
        });

        const inputs = await wrapper.findAll(TextField);

        await wrapper.act(async () => {
          await inputs[0].trigger(
            'onChange',
            formatDateToYearMonthDayDateString(daysAgo(7)),
          );
          await inputs[1].trigger(
            'onChange',
            formatDateToYearMonthDayDateString(today()),
          );
        });

        const optionList = await wrapper.find(OptionList);
        expect(optionList?.props.selected).toStrictEqual(['last7days']);
      });
    });

    describe('custom input values', () => {
      it('calls the onChange callback when the apply button is clicked', async () => {
        const wrapper = await mountWithApp(
          <DateRangePicker {...defaultProps} />,
        );

        await wrapper.act(async () => {
          await wrapper.find(Button)?.trigger('onClick');
        });

        const inputs = await wrapper.findAll(TextField);

        const twoDaysAgo = formatDateToYearMonthDayDateString(daysAgo(2));
        const sameDay = formatDateToYearMonthDayDateString(today());

        await wrapper.act(async () => {
          await inputs[0].trigger('onChange', twoDaysAgo);
          await inputs[1].trigger('onChange', sameDay);
        });

        wrapper.act(() => {
          wrapper.find(Button, {children: 'Apply'})?.trigger('onClick');
        });
        expect(mockOnChange).toHaveBeenCalledWith(
          {
            since: twoDaysAgo,
            until: sameDay,
          },
          {
            since: formatDateToYearMonthDayDateString(daysAgo(5)),
            until: formatDateToYearMonthDayDateString(daysAgo(3)),
          },
        );
      });

      it('resets the input values when the cancel button is clicked', async () => {
        const wrapper = await mountWithApp(
          <DateRangePicker {...defaultProps} />,
        );
        await wrapper.act(async () => {
          await wrapper.find(Button)?.trigger('onClick');
        });

        let inputs = await wrapper.findAll(TextField);

        const twoDaysAgo = formatDateToYearMonthDayDateString(daysAgo(2));
        const sameDay = formatDateToYearMonthDayDateString(today());

        await wrapper.act(async () => {
          await inputs[0].trigger('onChange', twoDaysAgo);
          await inputs[1].trigger('onChange', sameDay);
        });

        await wrapper.act(async () => {
          await wrapper.find(Button, {children: 'Cancel'})?.trigger('onClick');
        });

        inputs = await wrapper.findAll(TextField);
        expect(mockOnChange).not.toHaveBeenCalled();
        expect(inputs[0].props.value).toBe(
          formatDateToYearMonthDayDateString(defaultProps.initialRange.since),
        );
        expect(inputs[1].props.value).toBe(
          formatDateToYearMonthDayDateString(defaultProps.initialRange.until),
        );
      });

      it('resets the input values when the popover is closed without applying', async () => {
        const wrapper = await mountWithApp(
          <DateRangePicker {...defaultProps} />,
        );

        await wrapper.act(async () => {
          await wrapper.find(Button)?.trigger('onClick');
        });

        let inputs = await wrapper.findAll(TextField);

        const twoDaysAgo = formatDateToYearMonthDayDateString(daysAgo(2));
        const sameDay = formatDateToYearMonthDayDateString(today());

        await wrapper.act(async () => {
          await inputs[0].trigger('onChange', twoDaysAgo);
          await inputs[1].trigger('onChange', sameDay);
        });

        await wrapper.act(async () => {
          await wrapper.find(Popover)?.trigger('onClose');
        });

        inputs = await wrapper.findAll(TextField);
        expect(mockOnChange).not.toHaveBeenCalled();
        expect(inputs[0].props.value).toBe(
          formatDateToYearMonthDayDateString(defaultProps.initialRange.since),
        );
        expect(inputs[1].props.value).toBe(
          formatDateToYearMonthDayDateString(defaultProps.initialRange.until),
        );
      });
    });
  });
});
