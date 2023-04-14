import {mountWithAppContext} from 'tests/modern';

import {useDateRanges} from '../hooks';
import type {DateRange} from '../types';

describe('dateRanges', () => {
  function TestComponent({date}: {date: Date}) {
    const {quarterDateRangesFromDate} = useDateRanges();

    const quarterArray: DateRange[] = Object.values(
      quarterDateRangesFromDate(date),
    );
    const [latest, secondlatest, thirdlatest, oldest] = quarterArray;

    function formatOutput(dateRange: DateRange) {
      return `title: ${dateRange.title}, alias: ${dateRange.alias}, period: {since: ${dateRange.period?.since}, until: ${dateRange.period?.until}}`;
    }

    return (
      <>
        <div id="arraySize">{quarterArray.length}</div>
        <div id="latest">{formatOutput(latest)}</div>
        <div id="secondlatest">{formatOutput(secondlatest)}</div>
        <div id="thirdlatest">{formatOutput(thirdlatest)}</div>
        <div id="oldest">{formatOutput(oldest)}</div>
      </>
    );
  }

  it('returns the expected quarters on 1st day of month', async () => {
    const mockDate = new Date('2018-05-01T12:00:00+00:00');
    const wrapper = await mountWithAppContext(
      <TestComponent date={mockDate} />,
    );

    expect(wrapper.find('div', {id: 'arraySize'})).toContainReactText('4');
    expect(wrapper.find('div', {id: 'latest'})).toContainReactText(
      `title: 1st Quarter (2018), alias: quarter-1-2018, period: {since: -1q, until: -1q}`,
    );
    expect(wrapper.find('div', {id: 'secondlatest'})).toContainReactText(
      `title: 4th Quarter (2017), alias: quarter-4-2017, period: {since: -2q, until: -2q}`,
    );
    expect(wrapper.find('div', {id: 'thirdlatest'})).toContainReactText(
      `title: 3rd Quarter (2017), alias: quarter-3-2017, period: {since: -3q, until: -3q}`,
    );
    expect(wrapper.find('div', {id: 'oldest'})).toContainReactText(
      `title: 2nd Quarter (2017), alias: quarter-2-2017, period: {since: -4q, until: -4q}`,
    );
  });

  it('returns the expected quarters on 31st day of month', async () => {
    const mockDate = new Date('2021-03-31T23:01:01+08:00');
    const wrapper = await mountWithAppContext(
      <TestComponent date={mockDate} />,
    );

    expect(wrapper.find('div', {id: 'arraySize'})).toContainReactText('4');
    expect(wrapper.find('div', {id: 'latest'})).toContainReactText(
      `title: 4th Quarter (2020), alias: quarter-4-2020, period: {since: -1q, until: -1q}`,
    );
    expect(wrapper.find('div', {id: 'secondlatest'})).toContainReactText(
      `title: 3rd Quarter (2020), alias: quarter-3-2020, period: {since: -2q, until: -2q}`,
    );
    expect(wrapper.find('div', {id: 'thirdlatest'})).toContainReactText(
      `title: 2nd Quarter (2020), alias: quarter-2-2020, period: {since: -3q, until: -3q}`,
    );
    expect(wrapper.find('div', {id: 'oldest'})).toContainReactText(
      `title: 1st Quarter (2020), alias: quarter-1-2020, period: {since: -4q, until: -4q}`,
    );
  });

  it('returns the expected quarters on 28 of February', async () => {
    const mockDate = new Date('2018-02-28T12:00:00+00:00');
    const wrapper = await mountWithAppContext(
      <TestComponent date={mockDate} />,
    );

    expect(wrapper.find('div', {id: 'arraySize'})).toContainReactText('4');
    expect(wrapper.find('div', {id: 'latest'})).toContainReactText(
      `title: 4th Quarter (2017), alias: quarter-4-2017, period: {since: -1q, until: -1q}`,
    );
    expect(wrapper.find('div', {id: 'secondlatest'})).toContainReactText(
      `title: 3rd Quarter (2017), alias: quarter-3-2017, period: {since: -2q, until: -2q}`,
    );
    expect(wrapper.find('div', {id: 'thirdlatest'})).toContainReactText(
      `title: 2nd Quarter (2017), alias: quarter-2-2017, period: {since: -3q, until: -3q}`,
    );
    expect(wrapper.find('div', {id: 'oldest'})).toContainReactText(
      `title: 1st Quarter (2017), alias: quarter-1-2017, period: {since: -4q, until: -4q}`,
    );
  });

  it('returns the expected quarters on 29 of February', async () => {
    const mockDate = new Date('2020-02-29T12:00:00+00:00');
    const wrapper = await mountWithAppContext(
      <TestComponent date={mockDate} />,
    );

    expect(wrapper.find('div', {id: 'arraySize'})).toContainReactText('4');
    expect(wrapper.find('div', {id: 'latest'})).toContainReactText(
      `title: 4th Quarter (2019), alias: quarter-4-2019, period: {since: -1q, until: -1q}`,
    );
    expect(wrapper.find('div', {id: 'secondlatest'})).toContainReactText(
      `title: 3rd Quarter (2019), alias: quarter-3-2019, period: {since: -2q, until: -2q}`,
    );
    expect(wrapper.find('div', {id: 'thirdlatest'})).toContainReactText(
      `title: 2nd Quarter (2019), alias: quarter-2-2019, period: {since: -3q, until: -3q}`,
    );
    expect(wrapper.find('div', {id: 'oldest'})).toContainReactText(
      `title: 1st Quarter (2019), alias: quarter-1-2019, period: {since: -4q, until: -4q}`,
    );
  });
});
