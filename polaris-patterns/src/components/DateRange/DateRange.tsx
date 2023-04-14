import {useState, useEffect, useMemo, useCallback} from 'react';
import type {ButtonProps, PopoverProps} from '@shopify/polaris';
import {useBreakpoints, Popover, PopoverCloseSource} from '@shopify/polaris';
import {useI18n} from '@shopify/react-i18n';
import {applyTimeZoneOffset, getDateTimeParts} from '@shopify/dates';
import {navBarCollapsed} from 'utilities/breakpoints';

import {
  parsePeriod,
  parseRelativeDate,
  TimeUnit,
} from '../../utilities/reportify';
import type {DatePeriod, QueryPeriod} from '../../utilities/reportify';
import {DatePicker as WebDatePicker} from '../DatePicker';

import {formatDateForDatepicker} from './utilities';
import {
  ActivatorButton,
  ActionButtons,
  DateRangeSelector,
  ScrollFeedback,
  TextFields,
} from './components';
import styles from './DateRange.scss';
import type {DateRange} from './types';
import {useDateRanges} from './hooks/useDateRanges';
import type {
  QuickPickSource,
  QuickPick,
  SectionDescriptor,
} from './components/QuickPicks';
import {QuickPicks} from './components/QuickPicks';

export interface QuickPicks {
  options: DateRange[];
  recommended?: DateRange[];
  sections?: SectionDescriptor[];
}

export interface PopoverOptions {
  /** Controls whether the popover should render within a popover. Defaults to true */
  shouldRenderPopover?: boolean;
  popoverAlignment?: PopoverProps['preferredAlignment'];
  /** Optional content to override the default content of the activator button */
  activatorContent?: {text: string; options: ButtonProps};
  /** Callback fired when the popover is opened/closed **/
  onToggle?: (open: boolean) => void;
  /** Controls wether the popover should be forced to close **/
  forcePopoverClose?: boolean;
}

export type DatepickerSource =
  | 'calendar'
  | 'input'
  | 'date-range'
  | `quick-pick-${QuickPickSource}`;

export interface Props {
  /** The current date period */
  datePeriod: DatePeriod | null;
  /** The shop timezone */
  timeZone?: string;
  /** A set of options to control the appearance and behaviour of the popover */
  popoverOptions?: PopoverOptions;
  /** Callback fired when a new date is applied */
  onChange(
    datePeriod: DatePeriod | null,
    queryPeriod?: QueryPeriod | null,
    DatepickerSource?: string | null,
  ): void;
  /** Determines whether the date picker should take up the full width of its container */
  fullWidth?: boolean;
  /** The list of quick pick options */
  quickPicks?: QuickPicks;
}

interface Range {
  start: Date;
  end: Date;
}
const defaultPopoverOptions: PopoverOptions = {
  shouldRenderPopover: true,
  popoverAlignment: 'left',
  activatorContent: {text: '', options: {}},
  onToggle: () => {},
};

export function DateRange({
  timeZone,
  fullWidth = true,
  datePeriod,
  onChange,
  quickPicks,
  popoverOptions = defaultPopoverOptions,
}: Props) {
  const [_, ShareTranslations] = useI18n();
  const {deriveDateRange} = useDateRanges();

  const combinedPopoverOptions = {...defaultPopoverOptions, ...popoverOptions};
  const {
    shouldRenderPopover,
    popoverAlignment,
    activatorContent,
    onToggle,
    forcePopoverClose,
  } = combinedPopoverOptions;

  const dateRanges = useMemo(() => {
    return [
      ...(quickPicks?.recommended || []),
      ...(quickPicks?.options || []),
      ...(quickPicks?.sections?.flatMap((section) => section.options) || []),
    ];
  }, [quickPicks]);

  const [activeDateRange, setActiveDateRange] = useState<DateRange | null>(
    deriveDateRange(dateRanges, datePeriod, timeZone),
  );
  const [selectedQuickPick, setSelectedQuickPick] = useState<QuickPick>();

  const [datePickerSource, setDatePickerSource] = useState<DatepickerSource>();

  const [viewerActive, setViewerActive] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(
    getDateTimeParts(datePeriod?.until || new Date(), timeZone).month(),
  );
  const [visibleYear, setVisibleYear] = useState(
    getDateTimeParts(datePeriod?.until || new Date(), timeZone).year(),
  );
  const [isDirty, setIsDirty] = useState(false);
  const [monthShouldUpdate, setMonthShouldUpdate] = useState(false);

  useEffect(() => {
    setActiveDateRange(deriveDateRange(dateRanges, datePeriod, timeZone));
  }, [dateRanges, datePeriod, timeZone, deriveDateRange]);

  const {mdDown, lgUp} = useBreakpoints();
  const shouldShowMultiMonth = lgUp;

  useEffect(() => {
    if (!monthShouldUpdate) {
      return;
    }

    if (!activeDateRange?.period) {
      const now = new Date();

      setVisibleMonth(now.getMonth());
      setVisibleYear(now.getFullYear());

      return;
    }

    const {until} = parsePeriod(activeDateRange.period, timeZone);

    if (shouldShowMultiMonth) {
      const oneMonth = {quantity: 1, unit: TimeUnit.Month};
      const previousMonth = parseRelativeDate(until, oneMonth, timeZone);
      const {month, year} = getDateTimeParts(previousMonth, timeZone);

      setVisibleMonth(month);
      setVisibleYear(year);
    } else {
      const {month, year} = getDateTimeParts(until, timeZone);

      setVisibleMonth(month);
      setVisibleYear(year);
    }
  }, [activeDateRange, monthShouldUpdate, timeZone, shouldShowMultiMonth]);

  function hidePopover() {
    setViewerActive(false);
  }
  function showPopover() {
    setViewerActive(true);
  }
  function apply() {
    hidePopover();

    const datePeriod = activeDateRange?.period
      ? parsePeriod(activeDateRange.period, timeZone)
      : null;

    onChange(datePeriod, activeDateRange?.period, datePickerSource);

    setIsDirty(false);
    if (popoverOptions?.onToggle) {
      popoverOptions.onToggle(false);
    }
  }

  function cancel() {
    hidePopover();
    setActiveDateRange(deriveDateRange(dateRanges, datePeriod, timeZone));

    setIsDirty(false);
    setMonthShouldUpdate(true);
    if (popoverOptions?.onToggle) {
      popoverOptions.onToggle(false);
    }
  }

  function toggleViewer(closeSource?: PopoverCloseSource) {
    if (onToggle) {
      onToggle(viewerActive);
    }
    if (viewerActive) {
      if (
        navBarCollapsed().matches &&
        closeSource === PopoverCloseSource.ScrollOut
      ) {
        return;
      }
      cancel();
    } else {
      showPopover();
    }
  }

  function handleDatePickerChange({start, end}: Range) {
    const since = applyTimeZoneOffset(start, timeZone);
    const until = applyTimeZoneOffset(end, timeZone);
    const newDateRange = deriveDateRange(dateRanges, {since, until}, timeZone);
    setMonthShouldUpdate(false);
    setIsDirty(true);

    setActiveDateRange(newDateRange);
    setDatePickerSource('calendar');
  }

  function handleDatePickerMonthChange(
    visibleMonth: number,
    visibleYear: number,
  ) {
    setVisibleMonth(visibleMonth + 1);
    setVisibleYear(visibleYear);
  }

  const findMatchingQuickPick = useCallback(
    (dateRange: DateRange): QuickPick | undefined => {
      if (!quickPicks) {
        return undefined;
      }
      const {alias} = dateRange;

      const recommended: QuickPick[] =
        quickPicks.recommended?.map((quickPick) => ({
          value: quickPick.alias,
          period: quickPick.period,
          source: 'recommended-option',
        })) || [];

      const sections: QuickPick[] =
        quickPicks.sections?.flatMap((section) =>
          section.options.map((quickPick) => ({
            value: quickPick.alias,
            period: quickPick.period,
            source: 'section-option',
          })),
        ) || [];

      const options: QuickPick[] = quickPicks?.options?.map((quickPick) => ({
        value: quickPick.alias,
        period: quickPick.period,
        source: 'option',
      }));

      const flattenedQuickPicks: QuickPick[] = [
        ...recommended,
        ...sections,
        ...options,
      ];

      return flattenedQuickPicks.find(({value}) => value === alias);
    },
    [quickPicks],
  );

  useEffect(() => {
    if (!activeDateRange) {
      return;
    }
    setSelectedQuickPick(findMatchingQuickPick(activeDateRange));
  }, [activeDateRange, findMatchingQuickPick]);

  function handleTextFieldsChange(reportingPeriod: DatePeriod) {
    const dateRange = deriveDateRange(dateRanges, reportingPeriod, timeZone);

    setIsDirty(true);
    setActiveDateRange(dateRange);
    setMonthShouldUpdate(true);
    setDatePickerSource('input');
  }

  function handleDateRangeSelect(dateRange: DateRange) {
    setActiveDateRange(dateRange);
    setDatePickerSource('date-range');
  }

  function handleQuickPickChange(value: QuickPick) {
    const newDateRange = dateRanges.find(
      (range) => range.alias === value.value,
    );

    if (newDateRange) {
      setDatePickerSource(`quick-pick-${value.source}`);
      setIsDirty(true);
      setActiveDateRange(newDateRange);
      setSelectedQuickPick(value);
      setMonthShouldUpdate(true);
    }
  }

  const parsedDateRange =
    activeDateRange && activeDateRange.period
      ? parsePeriod(activeDateRange.period, timeZone)
      : null;

  useEffect(() => {
    if (viewerActive && forcePopoverClose) {
      cancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewerActive, forcePopoverClose]);

  function DatePickerContents() {
    return (
      <>
        <div className={styles.DatePickerContainer}>
          <ScrollFeedback>
            <div className={styles.DateRangeSelector}>
              {dateRanges && mdDown ? (
                <DateRangeSelector
                  activeDateRange={activeDateRange}
                  dateRanges={dateRanges}
                  setIsDirty={setIsDirty}
                  setDateRange={handleDateRangeSelect}
                  setMonthShouldUpdate={setMonthShouldUpdate}
                  timeZone={timeZone}
                />
              ) : (
                <QuickPicks
                  options={quickPicks?.options}
                  sections={quickPicks?.sections}
                  recommended={quickPicks?.recommended}
                  onSelect={handleQuickPickChange}
                  selected={selectedQuickPick}
                />
              )}
            </div>
          </ScrollFeedback>

          <div className={styles.DatePicker}>
            <div className={styles.TextFieldsWrapper}>
              <TextFields
                datePeriod={parsedDateRange}
                timeZone={timeZone}
                onChange={handleTextFieldsChange}
              />
            </div>
            <WebDatePicker
              month={visibleMonth - 1}
              year={visibleYear}
              onChange={handleDatePickerChange}
              disableDatesAfter={formatDateForDatepicker(new Date(), timeZone)}
              onMonthChange={handleDatePickerMonthChange}
              selected={
                parsedDateRange
                  ? {
                      start: formatDateForDatepicker(
                        parsedDateRange.since,
                        timeZone,
                      ),
                      end: formatDateForDatepicker(
                        parsedDateRange.until,
                        timeZone,
                      ),
                    }
                  : undefined
              }
              multiMonth={shouldShowMultiMonth}
              allowRange
            />
          </div>
        </div>
        <div className={styles.ActionButtonWrapper}>
          <ActionButtons cancel={cancel} isDirty={isDirty} apply={apply} />
        </div>
      </>
    );
  }

  return (
    <ShareTranslations>
      {shouldRenderPopover ? (
        <div className={styles.PopoverPicker}>
          <Popover
            activator={
              <ActivatorButton
                toggleViewer={toggleViewer}
                fullWidth={fullWidth}
                timeZone={timeZone}
                datePeriod={datePeriod}
                content={activatorContent?.text}
                options={activatorContent?.options}
                dateRanges={dateRanges}
              />
            }
            active={viewerActive}
            onClose={toggleViewer}
            preferredPosition="below"
            preferredAlignment={popoverAlignment}
            sectioned={false}
            fluidContent
          >
            <DatePickerContents />
          </Popover>
        </div>
      ) : (
        <>
          <DatePickerContents />
        </>
      )}
    </ShareTranslations>
  );
}
