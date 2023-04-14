import React from 'react';
import {fireEvent, act} from '@testing-library/react';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {renderWithApp} from 'tests/utilities';

import {DateList} from '..';

describe('<DatePicker />', () => {
  const defaultRanges = [
    {
      label: 'Today',
      value: 'today',
      period: {
        since: Date.now().toLocaleString(),
        until: Date.now().toLocaleString(),
      },
    },
    {
      label: 'Yesterday',
      value: 'yesterday',
      period: {
        since: new Date(new Date().setDate(Date.now() - 1)).toLocaleString(),
        until: new Date(new Date().setDate(Date.now() - 1)).toLocaleString(),
      },
    },
    {
      label: 'Last 7 days',
      value: 'last7days',
      period: {
        since: new Date(new Date().setDate(Date.now() - 7)).toLocaleString(),
        until: Date.now().toLocaleString(),
      },
    },
  ];
  const noop = () => {};

  beforeAll(() => {
    matchMedia.mock();
  });

  describe('DateList', () => {
    it('renders date options', () => {
      const datepicker = renderWithApp(
        <DateList
          selected={defaultRanges[0]}
          onChange={noop}
          options={defaultRanges}
        />,
      );

      const trigger = datepicker.getByRole('button', {name: 'Today'});
      act(() => {
        fireEvent.click(trigger);
      });

      expect(datepicker.getAllByRole('button')).toHaveLength(
        defaultRanges.length + 1,
      );
    });

    it('triggers onChange with the expected value when an option is selected', () => {
      const spy = jest.fn();
      const datepicker = renderWithApp(
        <DateList
          selected={defaultRanges[0]}
          onChange={spy}
          options={defaultRanges}
        />,
      );

      const trigger = datepicker.getByRole('button', {name: 'Today'});

      act(() => {
        fireEvent.click(trigger);
      });
      const option = datepicker.getByRole('button', {
        name: defaultRanges[1].label,
      });

      act(() => {
        fireEvent.click(option);
      });

      expect(spy).toHaveBeenCalledWith([defaultRanges[1].value]);
    });
  });
});
