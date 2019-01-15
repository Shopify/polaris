import * as React from 'react';
import {Weekdays} from '@shopify/javascript-utilities/dates';
import {mountWithAppProvider} from 'test-utilities';
import {Weekday} from '../..';
import Month from '../Month';
import Day from '../../Day';

describe('<Month />', () => {
  describe('title', () => {
    it('passes the correct value to Weekday', () => {
      const month = mountWithAppProvider(
        <Month
          visibleMonth={new Date(2018, 0)}
          weekStartsOn={Weekdays.Monday}
        />,
      );
      expect(
        month
          .find(Weekday)
          .first()
          .prop('title'),
      ).toBe('Mon');
    });
  });

  describe('label', () => {
    it('passes the correct value to Weekday', () => {
      const month = mountWithAppProvider(
        <Month
          visibleMonth={new Date(2018, 0)}
          weekStartsOn={Weekdays.Monday}
        />,
      );
      expect(
        month
          .find(Weekday)
          .first()
          .prop('label'),
      ).toBe(1);
    });
  });

  describe('current', () => {
    const today = new Date();
    const month = mountWithAppProvider(
      <Month visibleMonth={today} weekStartsOn={today.getDay()} />,
    );

    it('passes true to Weekday if month year and weekStartsOn are today', () => {
      expect(
        month
          .find(Weekday)
          .first()
          .prop('current'),
      ).toBe(true);
    });

    it('passes false to Weekday if month year and weekStartsOn are not today', () => {
      const month = mountWithAppProvider(
        <Month
          visibleMonth={new Date(2016, 1)}
          weekStartsOn={Weekdays.Monday}
        />,
      );
      expect(
        month
          .find(Weekday)
          .first()
          .prop('current'),
      ).toBe(false);
    });
  });

  describe('with allowRange prop to true', () => {
    it('range can be created even if start and end have different references', () => {
      const hoverDate = new Date('05 Jan 2018 00:00:00 GMT');
      const month = mountWithAppProvider(
        <Month
          visibleMonth={new Date(2018, 0)}
          weekStartsOn={Weekdays.Monday}
          allowRange
          hoverDate={hoverDate}
          selected={{
            start: new Date('01 Jan 2018 00:00:00 GMT'),
            end: new Date('01 Jan 2018 00:00:00 GMT'),
          }}
        />,
      );

      expect(month.find(Day).get(2).props.inHoveringRange).toBeTruthy();
      expect(month.find(Day).get(10).props.inHoveringRange).toBeFalsy();
    });
  });

  describe('locale', () => {
    it('passes locale prop to all Day components', () => {
      const month = mountWithAppProvider(
        <Month
          locale="ja"
          visibleMonth={new Date(2018, 0)}
          weekStartsOn={Weekdays.Monday}
          allowRange
          selected={{
            start: new Date('01 Jan 2018 00:00:00 GMT'),
            end: new Date('01 Jan 2018 00:00:00 GMT'),
          }}
        />,
      );

      const daysWithExpectedLocale = month.find(Day).filter({locale: 'ja'});

      expect(daysWithExpectedLocale).toHaveLength(35);
    });

    it('weekday labels default to en locale if no locale is set', () => {
      const month = mountWithAppProvider(
        <Month
          visibleMonth={new Date(2018, 0)}
          weekStartsOn={Weekdays.Monday}
          allowRange
          selected={{
            start: new Date('01 Jan 2018 00:00:00 GMT'),
            end: new Date('01 Jan 2018 00:00:00 GMT'),
          }}
        />,
      );

      expect(
        month
          .find('div')
          .filter({role: 'rowheader'})
          .text(),
      ).toEqual('MonTueWedThuFriSatSun');
    });

    it('weekday labels are formatted to match specified locale', () => {
      const month = mountWithAppProvider(
        <Month
          locale="ja"
          visibleMonth={new Date(2018, 0)}
          weekStartsOn={Weekdays.Monday}
          allowRange
          selected={{
            start: new Date('01 Jan 2018 00:00:00 GMT'),
            end: new Date('01 Jan 2018 00:00:00 GMT'),
          }}
        />,
      );

      expect(
        month
          .find('div')
          .filter({role: 'rowheader'})
          .text(),
      ).toEqual('月火水木金土日');
    });

    it('contains visible month / year label formatted to en locale if no locale is set', () => {
      const month = mountWithAppProvider(
        <Month
          visibleMonth={new Date(2018, 0)}
          weekStartsOn={Weekdays.Monday}
          allowRange
          selected={{
            start: new Date('01 Jan 2018 00:00:00 GMT'),
            end: new Date('01 Jan 2018 00:00:00 GMT'),
          }}
        />,
      );

      expect(month.text()).toContain('January 2018');
    });

    it('contains visible month / year label formatted to specified locale', () => {
      const month = mountWithAppProvider(
        <Month
          locale="ja"
          visibleMonth={new Date(2018, 0)}
          weekStartsOn={Weekdays.Monday}
          allowRange
          selected={{
            start: new Date('01 Jan 2018 00:00:00 GMT'),
            end: new Date('01 Jan 2018 00:00:00 GMT'),
          }}
        />,
      );

      expect(month.text()).toContain('2018年1月');
    });
  });
});
