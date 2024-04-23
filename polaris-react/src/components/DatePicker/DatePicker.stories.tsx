import React, {useCallback, useState} from 'react';
import type {Meta} from '@storybook/react';
import {Box, Card, DatePicker, BlockStack} from '@shopify/polaris';

export default {
  component: DatePicker,
  parameters: {
    chromatic: {delay: 300},
  },
} as Meta<typeof DatePicker>;

export const All = {
  render() {
    return (
      /* eslint-disable react/jsx-pascal-case */
      <BlockStack gap="400">
        <Box maxWidth="290px">
          <Card>
            <Default.render />
          </Card>
        </Box>
        <Box maxWidth="556px">
          <Card>
            <Ranged.render />
          </Card>
        </Box>
        <Box maxWidth="556px">
          <Card>
            <MultiMonthRanged.render />
          </Card>
        </Box>
        <Box maxWidth="290px">
          <Card>
            <WithDisabledDateRanges.render />
          </Card>
        </Box>
        <Box maxWidth="290px">
          <Card>
            <WithSpecificDisabledDates.render />
          </Card>
        </Box>
      </BlockStack>
      /* eslint-enable react/jsx-pascal-case */
    );
  },
};

export const Default = {
  render() {
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
  },
};

export const Ranged = {
  render() {
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
  },
};

export const MultiMonthRanged = {
  render() {
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
  },
};

export const WithDisabledDateRanges = {
  render() {
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
  },
};

export const WithSpecificDisabledDates = {
  render() {
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
  },
};
