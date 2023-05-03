import {
  VerticalStack,
  Box,
  Button,
  HorizontalGrid,
  DatePicker,
  Icon,
  HorizontalStack,
  OptionList,
  Popover,
  Scrollable,
  Select,
  TextField,
  TextStyle,
  useBreakpoints,
} from '@shopify/polaris';
import {ArrowRightMinor, CalendarMinor} from '@shopify/polaris-icons';
import {useI18n} from '@shopify/react-i18n';
import React, {useEffect, useMemo, useState} from 'react';

import {
  daysAgo,
  firstDayOfWeek,
  formatDateToYearMonthDayDateString,
  isValidDate,
  monthsAgo,
  parseYearMonthDayDateString,
  today,
  yearsAgo,
  yesterday,
} from '../../utilities/dates';

import {
  formatQueryDate,
  getComparisonPeriod,
  getDateRangeString,
  getRangeFromDates,
  areRangesDifferent,
} from './utilities';
import styles from './DateRangePicker.scss';
import type {
  DateRangePickerPeriod,
  DateRangePickerRange,
  StringDatePeriod,
} from './types';

export interface DateRangePickerProps {
  onChange: (
    selectedRange: StringDatePeriod,
    comparisonRange: StringDatePeriod,
  ) => void;
  initialRange: DateRangePickerPeriod;
  showComparisonRange?: boolean;
  timeZone: string;
}

export const DateRangePicker = ({
  onChange,
  initialRange,
  showComparisonRange = false,
  timeZone = '',
}: DateRangePickerProps) => {
  const [i18n] = useI18n();
  const {mdDown, lgUp: shouldShowMultiMonth} = useBreakpoints();
  const customRangeTitle = i18n.translate('periods.custom');

  const popoverContainerId = 'popover-container';

  const [popoverActive, setPopoverActive] = useState(false);

  const ranges = useMemo(
    () => [
      {
        title: i18n.translate('periods.today'),
        alias: 'today',
        period: {
          since: today(),
          until: today(),
        },
      },
      {
        title: i18n.translate('periods.yesterday'),
        alias: 'yesterday',
        period: {
          since: yesterday(),
          until: yesterday(),
        },
      },
      {
        title: i18n.translate('periods.last7Days'),
        alias: 'last7days',
        period: {
          since: daysAgo(7),
          until: today(),
        },
      },
      {
        title: i18n.translate('periods.last30Days'),
        alias: 'last30days',
        period: {
          since: daysAgo(30),
          until: today(),
        },
      },
      {
        title: i18n.translate('periods.last90Days'),
        alias: 'last90Days',
        period: {
          since: daysAgo(90),
          until: today(),
        },
      },
      {
        title: i18n.translate('periods.lastMonth'),
        alias: 'lastMonth',
        period: {
          since: monthsAgo(1),
          until: today(),
        },
      },
      {
        title: i18n.translate('periods.lastYear'),
        alias: 'lastYear',
        period: {
          since: yearsAgo(1),
          until: today(),
        },
      },
      {
        title: i18n.translate('periods.weekToDate'),
        alias: 'weekToDate',
        period: {
          since: firstDayOfWeek(),
          until: today(),
        },
      },
    ],
    [i18n],
  );

  const defaultRange = getRangeFromDates(initialRange, ranges) || ranges[0];

  const [activeDateRange, setActiveDateRange] =
    useState<DateRangePickerRange>(defaultRange);

  const [activeDateRangeOnOpen, setActiveDateRangeOnOpen] =
    useState<DateRangePickerRange>(defaultRange);

  const [inputValues, setInputValues] = useState<{
    since: string;
    until: string;
  }>({
    since: formatDateToYearMonthDayDateString(defaultRange.period.since),
    until: formatDateToYearMonthDayDateString(defaultRange.period.until),
  });

  const [{month, year}, setDate] = useState({
    month: activeDateRange.period.since.getMonth(),
    year: activeDateRange.period.since.getFullYear(),
  });

  const [comparisonDateRange, setComparisonDateRange] = useState(
    getComparisonPeriod(inputValues),
  );

  const handleStartInputValueChange = (value: string) => {
    setInputValues((prevState) => {
      return {...prevState, since: value};
    });

    if (isValidDate(value)) {
      const newSince = parseYearMonthDayDateString(value);

      if (newSince) {
        setActiveDateRange((prevState) => {
          const newPeriod =
            prevState?.period && newSince <= prevState?.period.until
              ? {since: newSince, until: prevState.period.until}
              : {since: newSince, until: newSince};
          return getRangeFromDates(newPeriod, ranges);
        });
      }
    }
  };

  const handleEndInputValueChange = (value: string) => {
    setInputValues((prevState) => {
      return {...prevState, until: value};
    });

    if (isValidDate(value)) {
      const newUntil = parseYearMonthDayDateString(value);

      if (newUntil) {
        setActiveDateRange((prevState) => {
          const newPeriod =
            prevState.period && newUntil >= prevState.period.since
              ? {since: prevState.period.since, until: newUntil}
              : {since: newUntil, until: newUntil};
          return getRangeFromDates(newPeriod, ranges);
        });
      }
    }
  };

  const handleInputBlur = (relatedTarget: any) => {
    // If focus moves from the TextField to the Popover
    // we don't want to close the popover
    const popoverContainer = document.getElementById(popoverContainerId);

    if (popoverContainer?.contains(relatedTarget.currentTarget)) {
      return;
    }
    cancelSelection();
  };

  const handleMonthChange = (month: number, year: number) => {
    setDate({month, year});
  };

  const handleCalendarChange = (dateRange: {start: Date; end: Date}) => {
    const newDateRange = getRangeFromDates(
      {
        since: dateRange.start,
        until: dateRange.end,
      },
      ranges,
    );
    setActiveDateRange(newDateRange);
  };

  const applySelection = () => {
    const isSelectionValid =
      isValidDate(inputValues.since) && isValidDate(inputValues.until);
    const comparisonValues = getComparisonPeriod(inputValues);
    if (isSelectionValid && comparisonValues) {
      onChange(
        {
          since: inputValues.since,
          until: inputValues.until,
        },
        {
          since: formatQueryDate(comparisonValues.since),
          until: formatQueryDate(comparisonValues.until),
        },
      );
      setPopoverActive(false);
    } else {
      cancelSelection();
    }
  };

  const cancelSelection = () => {
    if (
      areRangesDifferent(activeDateRange.period, activeDateRangeOnOpen.period)
    ) {
      setActiveDateRange(activeDateRangeOnOpen);
    } else {
      updateDatePickerDates();
    }
    setPopoverActive(false);
  };

  const updateDatePickerDates = () => {
    const formatDate = (date: Date) => {
      return formatDateToYearMonthDayDateString(date);
    };

    setInputValues({
      since: formatDate(activeDateRange.period.since),
      until: formatDate(activeDateRange.period.until),
    });

    setComparisonDateRange(
      getComparisonPeriod(
        {
          since: formatDate(activeDateRange.period.since),
          until: formatDate(activeDateRange.period.until),
        },
        timeZone,
      ),
    );

    setDate({
      month: activeDateRange.period.until.getMonth(),
      year: activeDateRange.period.until.getFullYear(),
    });
  };

  useEffect(() => {
    if (popoverActive) {
      setActiveDateRangeOnOpen(activeDateRange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popoverActive]);

  useEffect(() => {
    if (activeDateRange) {
      updateDatePickerDates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDateRange, timeZone]);

  const buttonValue =
    activeDateRange?.title === customRangeTitle
      ? getDateRangeString(
          {
            since: formatDateToYearMonthDayDateString(
              activeDateRange.period.since,
            ),
            until: formatDateToYearMonthDayDateString(
              activeDateRange.period.until,
            ),
          },
          i18n,
          timeZone,
        )
      : activeDateRange?.title;

  const handleSelectChange = (value: string): void => {
    const result =
      ranges.find(({title, alias}) => title === value || alias === value) ||
      ranges[0];
    setActiveDateRange(result);
  };

  const handleOptionListChange = (value: string[]): void => {
    setActiveDateRange(
      ranges.find((range) => range.alias === value[0]) || ranges[0],
    );
  };

  const onPopoverClick = () =>
    popoverActive ? cancelSelection() : setPopoverActive(!popoverActive);

  const selectOptions = useMemo(
    () => ranges.map(({alias, title}) => title || alias),
    [ranges],
  );

  const boxMaxWidthHigh = '516px';
  const boxMaxWidthMed = '320px';
  const boxMaxWidthLow = '212px';
  const scrollableHeight = '334px';

  const showComparisonLabel = useMemo(() => {
    return (
      showComparisonRange &&
      comparisonDateRange &&
      areRangesDifferent(
        {
          since: activeDateRange.period.since,
          until: activeDateRange.period.until,
        },
        comparisonDateRange,
      )
    );
  }, [
    activeDateRange.period.since,
    activeDateRange.period.until,
    comparisonDateRange,
    showComparisonRange,
  ]);

  return (
    <div className={styles.DateRangeWrapper}>
      <Popover
        active={popoverActive}
        autofocusTarget="none"
        preferredAlignment="left"
        preferredPosition="below"
        fluidContent
        sectioned={false}
        fullHeight
        activator={
          <Button size="slim" icon={CalendarMinor} onClick={onPopoverClick}>
            {buttonValue}
          </Button>
        }
        onClose={() => cancelSelection()}
      >
        <div id={popoverContainerId}>
          <Popover.Pane fixed>
            <HorizontalGrid
              columns={{
                xs: '1fr',
                md: 'max-content max-content',
              }}
            >
              <Box
                maxWidth={mdDown ? boxMaxWidthHigh : boxMaxWidthLow}
                width={mdDown ? '100%' : boxMaxWidthLow}
                padding={{xs: '5', md: '0'}}
                paddingBlockEnd={{xs: '1', md: '0'}}
              >
                {mdDown ? (
                  <Select
                    label="dateRangeLabel"
                    labelHidden
                    onChange={handleSelectChange}
                    value={
                      activeDateRange?.title || activeDateRange?.alias || ''
                    }
                    options={selectOptions}
                  />
                ) : (
                  <Scrollable style={{height: scrollableHeight}}>
                    <OptionList
                      options={ranges.map((range) => ({
                        value: range.alias,
                        label: range.title,
                      }))}
                      selected={[activeDateRange?.alias || '']}
                      onChange={handleOptionListChange}
                    />
                  </Scrollable>
                )}
              </Box>
              <Box
                padding={{xs: '5'}}
                maxWidth={mdDown ? boxMaxWidthMed : boxMaxWidthHigh}
              >
                <VerticalStack gap="4">
                  <HorizontalStack>
                    <div style={{flexGrow: 1}}>
                      <TextField
                        role="combobox"
                        label={i18n.translate('labels.since')}
                        labelHidden
                        prefix={<Icon source={CalendarMinor} />}
                        value={inputValues.since}
                        onChange={handleStartInputValueChange}
                        onBlur={handleInputBlur}
                        autoComplete="off"
                      />
                    </div>
                    <Icon source={ArrowRightMinor} />
                    <div style={{flexGrow: 1}}>
                      <TextField
                        role="combobox"
                        label=""
                        labelHidden
                        prefix={<Icon source={CalendarMinor} />}
                        value={inputValues.until}
                        onChange={handleEndInputValueChange}
                        onBlur={handleInputBlur}
                        autoComplete="off"
                      />
                    </div>
                  </HorizontalStack>
                  <>
                    <DatePicker
                      month={month}
                      year={year}
                      selected={{
                        start: activeDateRange?.period.since,
                        end: activeDateRange?.period.until,
                      }}
                      onMonthChange={handleMonthChange}
                      onChange={handleCalendarChange}
                      multiMonth={shouldShowMultiMonth}
                      allowRange
                    />
                  </>
                </VerticalStack>
              </Box>
            </HorizontalGrid>
          </Popover.Pane>
          <Popover.Pane fixed>
            <Popover.Section>
              <HorizontalStack align="end" gap="2">
                <Button onClick={cancelSelection}>
                  {i18n.translate('buttons.cancel')}
                </Button>
                <Button primary onClick={applySelection}>
                  {i18n.translate('buttons.apply')}
                </Button>
              </HorizontalStack>
            </Popover.Section>
          </Popover.Pane>
        </div>
      </Popover>
      {showComparisonLabel && comparisonDateRange && (
        <TextStyle variation="subdued">
          {i18n.translate('comparedTo', {
            date: getDateRangeString(
              {
                since: formatQueryDate(comparisonDateRange.since),
                until: formatQueryDate(comparisonDateRange.until),
              },
              i18n,
              timeZone,
            ),
          })}
        </TextStyle>
      )}
    </div>
  );
};
