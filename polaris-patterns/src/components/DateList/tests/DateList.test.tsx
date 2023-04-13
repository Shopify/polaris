import React from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

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

  beforeEach(() => {
    matchMedia.mock();
  });

  describe('DateList', () => {
    it('renders date options', () => {
      const datepicker = mountWithApp(
        <DateList
          selected={defaultRanges[0]}
          onChange={noop}
          options={defaultRanges}
        />,
      );

      datepicker.find('button')?.trigger('onClick');

      expect(
        datepicker.findAllWhere<'li'>((node) => {
          return (
            node.is('li') &&
            node.prop('className') === 'Polaris-OptionList-Option'
          );
        }),
      ).toHaveLength(defaultRanges.length);
    });
  });
});
