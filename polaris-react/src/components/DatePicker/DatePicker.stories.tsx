import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {DatePicker, Icon, TextField, VerticalStack} from '@shopify/polaris';

export default {
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

export function Default() {
  const [{month, year}, setDate] = useState({month: 1, year: 2018});
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );

  return (
    <DatePicker
      month={month}
      year={year}
      onChange={setSelectedDates}
      onMonthChange={handleMonthChange}
      selected={selectedDates}
    />
  );
}

export function Ranged() {
  const [{month, year}, setDate] = useState({month: 1, year: 2018});
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Sat Feb 10 2018 00:00:00 GMT-0500 (EST)'),
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );

  return (
    <DatePicker
      month={month}
      year={year}
      onChange={setSelectedDates}
      onMonthChange={handleMonthChange}
      selected={selectedDates}
      allowRange
    />
  );
}

export function MultiMonthRanged() {
  const [{month, year}, setDate] = useState({month: 1, year: 2018});
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Mon Mar 12 2018 00:00:00 GMT-0500 (EST)'),
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );

  return (
    <DatePicker
      month={month}
      year={year}
      onChange={setSelectedDates}
      onMonthChange={handleMonthChange}
      selected={selectedDates}
      multiMonth
      allowRange
    />
  );
}

export function WithDisabledDateRanges() {
  const [{month, year}, setDate] = useState({month: 1, year: 2018});
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Sat Feb 10 2018 00:00:00 GMT-0500 (EST)'),
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );

  return (
    <DatePicker
      month={month}
      year={year}
      onChange={setSelectedDates}
      onMonthChange={handleMonthChange}
      selected={selectedDates}
      disableDatesBefore={new Date('Sat Feb 03 2018 00:00:00 GMT-0500 (EST)')}
      disableDatesAfter={new Date('Sun Feb 18 2018 00:00:00 GMT-0500 (EST)')}
      allowRange
    />
  );
}

export function WithSpecificDisabledDates() {
  const [{month, year}, setDate] = useState({month: 1, year: 2018});
  const [selectedDates, setSelectedDates] = useState(
    new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
  );

  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );

  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const disableSpecificDates = [
    new Date('Mon Feb 12 2018 00:00:00 GMT-0500 (EST)'),
    new Date('Sat Feb 10 2018 00:00:00 GMT-0500 (EST)'),
    new Date('Wed Feb 21 2018 00:00:00 GMT-0500 (EST)'),
  ];

  return (
    <DatePicker
      month={month}
      year={year}
      onChange={setSelectedDates}
      onMonthChange={handleMonthChange}
      selected={selectedDates}
      disableDatesBefore={new Date('Sat Feb 03 2018 00:00:00 GMT-0500 (EST)')}
      disableDatesAfter={new Date('Sun Feb 25 2018 00:00:00 GMT-0500 (EST)')}
      disableSpecificDates={disableSpecificDates}
    />
  );
}

export function WrappedInVerticalStack() {
  const [{month, year}, setDate] = useState({month: 4, year: 2023});
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed April 26 2023 00:00:00'),
    end: new Date('Wed May 31 2023 00:00:00'),
  });

  const [inputValue, setInputValue] = useState(
    new Date(Date.parse(`${selectedDates.start.toISOString()}`))
      .toISOString()
      .slice(0, 10),
  );

  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );

  function isValidDate(value: string) {
    return !isNaN(new Date(value).getTime());
  }

  function handleInputChange(value: string) {
    setInputValue(value);

    if (isValidDate(value)) {
      const newDate = new Date(value);
      setSelectedDates({start: newDate, end: newDate});
      handleMonthChange(newDate.getMonth(), newDate.getFullYear());
    }
  }

  return (
    <VerticalStack>
      <DatePicker
        month={month}
        year={year}
        onChange={setSelectedDates}
        onMonthChange={handleMonthChange}
        selected={selectedDates}
        multiMonth={false}
        allowRange={false}
        disableDatesAfter={new Date('Sun Feb 25 2019 00:00:00 GMT-0500 (EST)')}
      />
    </VerticalStack>
  );
}
