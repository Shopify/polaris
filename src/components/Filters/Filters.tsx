import React, {createRef} from 'react';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import {
  SearchMinor,
  ChevronUpMinor,
  ChevronDownMinor,
  CancelSmallMinor,
} from '@shopify/polaris-icons';
import {classNames} from '../../utilities/css';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../utilities/with-app-provider';
import {ResourceListContext} from '../../utilities/resource-list';
import {Button} from '../Button';
import {DisplayText} from '../DisplayText';
import {Collapsible} from '../Collapsible';
import {Scrollable} from '../Scrollable';
import {ScrollLock} from '../ScrollLock';
import {Icon} from '../Icon';
import {TextField} from '../TextField';
import {Tag} from '../Tag';
import {TextStyle} from '../TextStyle';
import {Badge} from '../Badge';
import {Focus} from '../Focus';
import {Sheet} from '../Sheet';
import {Stack} from '../Stack';
import {Key} from '../../types';

import {KeypressListener} from '../KeypressListener';
import {ConnectedFilterControl, PopoverableAction} from './components';

import styles from './Filters.scss';

export interface AppliedFilterInterface {
  /** A unique key used to identify the applied filter */
  key: string;
  /** A label for the applied filter */
  label: string;
  /** Callback when the remove button is pressed */
  onRemove(key: string): void;
}

export interface FilterInterface {
  /** A unique key used to identify the filter */
  key: string;
  /** The label for the filter */
  label: string;
  /** The markup for the given filter */
  filter: React.ReactNode;
  /** Whether or not the filter should have a shortcut popover displayed */
  shortcut?: boolean;
  /** Whether or not the filter is disabled */
  disabled?: boolean;
}

export interface FiltersProps {
  /** Currently entered text in the query field */
  queryValue?: string;
  /** Placeholder text for the query field */
  queryPlaceholder?: string;
  /** Whether the query field is focused */
  focused?: boolean;
  /** Available filters added to the sheet. Shortcut filters are exposed outside of the sheet. */
  filters: FilterInterface[];
  /** Applied filters which are rendered as tags. The remove callback is called with the respective key */
  appliedFilters?: AppliedFilterInterface[];
  /** Callback when the query field is changed */
  onQueryChange(queryValue: string): void;
  /** Callback when the clear button is triggered */
  onQueryClear(): void;
  /** Callback when the reset all button is pressed */
  onClearAll(): void;
  /** Callback when the query field is blurred */
  onQueryBlur?(): void;
  /** Callback when the query field is focused */
  onQueryFocus?(): void;
  /** The content to display inline with the controls */
  children?: React.ReactNode;
  /** Disable all filters */
  disabled?: boolean;
  /** Additional hint text to display below the filters */
  helpText?: string | React.ReactNode;
  /** Hide tags for applied filters */
  hideTags?: boolean;
}

type ComposedProps = FiltersProps & WithAppProviderProps;

interface State {
  open: boolean;
  readyForFocus: boolean;
  [key: string]: boolean;
}

enum Suffix {
  Filter = 'Filter',
  Shortcut = 'Shortcut',
}

class FiltersInner extends React.Component<ComposedProps, State> {
  static contextType = ResourceListContext;

  state: State = {
    open: false,
    readyForFocus: false,
  };

  private moreFiltersButtonContainer = createRef<HTMLDivElement>();
  private focusNode = createRef<HTMLDivElement>();

  render() {
    const {
      filters,
      queryValue,
      onQueryBlur,
      onQueryChange,
      onQueryFocus,
      focused,
      onClearAll,
      appliedFilters,
      polaris: {
        intl,
        mediaQuery: {isNavigationCollapsed},
      },
      onQueryClear,
      queryPlaceholder,
      children,
      disabled = false,
      helpText,
      hideTags,
    } = this.props;
    const {resourceName} = this.context;
    const {open, readyForFocus} = this.state;

    const backdropMarkup = open ? (
      <React.Fragment>
        <ScrollLock />
        <div
          className={styles.Backdrop}
          onClick={this.closeFilters}
          testID="Backdrop"
        />
      </React.Fragment>
    ) : null;

    const filtersContentMarkup = filters.map((filter, index) => {
      const filterIsOpen = this.state[`${filter.key}${Suffix.Filter}`] === true;
      const icon = filterIsOpen ? ChevronUpMinor : ChevronDownMinor;
      const className = classNames(
        styles.FilterTriggerContainer,
        filterIsOpen && styles.open,
        index === 0 && styles.first,
        filters.length !== 1 && index === filters.length - 1 && styles.last,
      );

      const appliedFilterContent = this.getAppliedFilterContent(filter.key);
      const appliedFilterBadgeMarkup = appliedFilterContent ? (
        <div className={styles.AppliedFilterBadgeContainer}>
          <Badge size="small" status="new">
            {appliedFilterContent}
          </Badge>
        </div>
      ) : null;

      const collapsibleID = `${filter.key}Collapsible`;

      return (
        <div key={filter.key} className={className}>
          <button
            onClick={() => this.toggleFilter(filter.key)}
            className={styles.FilterTrigger}
            id={`${filter.key}ToggleButton`}
            type="button"
            aria-controls={collapsibleID}
            aria-expanded={filterIsOpen}
          >
            <div className={styles.FilterTriggerLabelContainer}>
              <h2 className={styles.FilterTriggerTitle}>
                <TextStyle
                  variation={
                    this.props.disabled || filter.disabled
                      ? 'subdued'
                      : undefined
                  }
                >
                  {filter.label}
                </TextStyle>
              </h2>
              <span className={styles.FilterTriggerIcon}>
                <Icon source={icon} color="inkLightest" />
              </span>
            </div>
            {appliedFilterBadgeMarkup}
          </button>
          <Collapsible id={collapsibleID} open={filterIsOpen}>
            <div className={styles.FilterNodeContainer}>
              <Focus
                disabled={!filterIsOpen || !readyForFocus || !open}
                root={this.focusNode.current}
              >
                {this.generateFilterMarkup(filter)}
              </Focus>
            </div>
          </Collapsible>
        </div>
      );
    });

    const appliedFiltersCount = appliedFilters ? appliedFilters.length : 0;
    const moreFiltersLabel =
      hideTags && appliedFiltersCount > 0
        ? intl.translate('Polaris.Filters.moreFiltersWithCount', {
            count: appliedFiltersCount,
          })
        : intl.translate('Polaris.Filters.moreFilters');

    const rightActionMarkup = (
      <div ref={this.moreFiltersButtonContainer}>
        <Button
          onClick={this.toggleFilters}
          testID="SheetToggleButton"
          disabled={disabled}
        >
          {moreFiltersLabel}
        </Button>
      </div>
    );

    const filterResourceName = resourceName || {
      singular: intl.translate('Polaris.ResourceList.defaultItemSingular'),
      plural: intl.translate('Polaris.ResourceList.defaultItemPlural'),
    };

    const filtersControlMarkup = (
      <ConnectedFilterControl
        rightPopoverableActions={this.transformFilters(filters)}
        rightAction={rightActionMarkup}
        auxiliary={children}
        disabled={disabled}
      >
        <TextField
          placeholder={
            queryPlaceholder ||
            intl.translate('Polaris.Filters.filter', {
              resourceName: filterResourceName.plural,
            })
          }
          onChange={onQueryChange}
          onBlur={onQueryBlur}
          onFocus={onQueryFocus}
          value={queryValue}
          focused={focused}
          label={
            queryPlaceholder ||
            intl.translate('Polaris.Filters.filter', {
              resourceName: filterResourceName.plural,
            })
          }
          labelHidden
          prefix={
            <span className={styles.SearchIcon}>
              <Icon source={SearchMinor} />
            </span>
          }
          clearButton
          onClearButtonClick={onQueryClear}
          disabled={disabled}
        />
      </ConnectedFilterControl>
    );

    const filtersDesktopHeaderMarkup = (
      <div className={styles.FiltersContainerHeader}>
        <DisplayText size="small">{moreFiltersLabel}</DisplayText>
        <Button
          icon={CancelSmallMinor}
          plain
          accessibilityLabel={intl.translate('Polaris.Filters.cancel')}
          onClick={this.closeFilters}
        />
      </div>
    );

    const filtersMobileHeaderMarkup = (
      <div className={styles.FiltersContainerHeader}>
        <Button
          icon={CancelSmallMinor}
          plain
          accessibilityLabel={intl.translate('Polaris.Filters.cancel')}
          onClick={this.closeFilters}
        />
        <DisplayText size="small">{moreFiltersLabel}</DisplayText>
        <Button onClick={this.closeFilters} primary>
          {intl.translate('Polaris.Filters.done')}
        </Button>
      </div>
    );

    const filtersDesktopFooterMarkup = (
      <div className={styles.FiltersContainerFooter}>
        <Button onClick={onClearAll} disabled={!this.hasAppliedFilters()}>
          {intl.translate('Polaris.Filters.clearAllFilters')}
        </Button>
        <Button onClick={this.closeFilters} primary>
          {intl.translate('Polaris.Filters.done')}
        </Button>
      </div>
    );

    const filtersMobileFooterMarkup = (
      <div className={styles.FiltersMobileContainerFooter}>
        {this.hasAppliedFilters() ? (
          <Button onClick={onClearAll} fullWidth>
            {intl.translate('Polaris.Filters.clearAllFilters')}
          </Button>
        ) : (
          <div className={styles.EmptyFooterState}>
            <TextStyle variation="subdued">
              <p>{intl.translate('Polaris.Filters.noFiltersApplied')}</p>
            </TextStyle>
          </div>
        )}
      </div>
    );

    const tagsMarkup =
      !hideTags && appliedFilters && appliedFilters.length ? (
        <div className={styles.TagsContainer}>
          {appliedFilters.map((filter) => {
            return (
              <Tag
                key={filter.key}
                onRemove={() => {
                  filter.onRemove(filter.key);
                }}
                disabled={disabled}
              >
                {filter.label}
              </Tag>
            );
          })}
        </div>
      ) : null;

    const filtersContainerMarkup = isNavigationCollapsed ? (
      <Sheet
        open={open}
        onClose={this.closeFilters}
        onEntered={this.setReadyForFocus(true)}
        onExit={this.setReadyForFocus(false)}
      >
        {filtersMobileHeaderMarkup}
        <Scrollable className={styles.FiltersMobileContainerContent} shadow>
          {filtersContentMarkup}
          {filtersMobileFooterMarkup}
        </Scrollable>
      </Sheet>
    ) : (
      <Sheet
        open={open}
        onClose={this.closeFilters}
        onEntered={this.setReadyForFocus(true)}
        onExit={this.setReadyForFocus(false)}
      >
        <div className={styles.FiltersContainer}>
          {filtersDesktopHeaderMarkup}
          <Scrollable className={styles.FiltersDesktopContainerContent} shadow>
            {filtersContentMarkup}
          </Scrollable>
          {filtersDesktopFooterMarkup}
        </div>
      </Sheet>
    );

    const helpTextMarkup = helpText ? (
      <div id="FiltersHelpText" className={styles.HelpText}>
        <TextStyle variation="subdued">{helpText}</TextStyle>
      </div>
    ) : null;

    return (
      <div className={styles.Filters}>
        {filtersControlMarkup}
        {filtersContainerMarkup}
        {tagsMarkup}
        {helpTextMarkup}
        {backdropMarkup}
        <KeypressListener keyCode={Key.Escape} handler={this.closeFilters} />
      </div>
    );
  }

  private hasAppliedFilters(): boolean {
    const {appliedFilters, queryValue} = this.props;
    const filtersApplied = Boolean(appliedFilters && appliedFilters.length > 0);
    const queryApplied = Boolean(queryValue && queryValue !== '');

    return filtersApplied || queryApplied;
  }

  private getAppliedFilterContent(key: string): string | undefined {
    const {appliedFilters} = this.props;

    if (!appliedFilters) {
      return undefined;
    }

    const filter = appliedFilters.find((filter) => filter.key === key);

    return filter == null ? undefined : filter.label;
  }

  private getAppliedFilterRemoveHandler(key: string): Function | undefined {
    const {appliedFilters} = this.props;

    if (!appliedFilters) {
      return undefined;
    }

    const filter = appliedFilters.find((filter) => filter.key === key);

    return filter == null ? undefined : filter.onRemove;
  }

  private openFilters() {
    this.setState({open: true});
  }

  private closeFilters = () => {
    this.setState({open: false}, () => {
      if (this.moreFiltersButtonContainer.current) {
        focusFirstFocusableNode(this.moreFiltersButtonContainer.current, false);
      }
    });
  };

  private toggleFilters = () => {
    if (this.state.open === true) {
      this.closeFilters();
    } else {
      this.openFilters();
    }
  };

  private setReadyForFocus = (newState: boolean) => () => {
    this.setState({readyForFocus: newState});
  };

  private openFilter(key: string) {
    this.setState({[`${key}${Suffix.Filter}`]: true});
  }

  private closeFilter(key: string) {
    this.setState({[`${key}${Suffix.Filter}`]: false});
  }

  private toggleFilter(key: string) {
    if (this.state[`${key}${Suffix.Filter}`] === true) {
      this.closeFilter(key);
    } else {
      this.openFilter(key);
    }
  }

  private openFilterShortcut(key: string) {
    this.setState({[`${key}${Suffix.Shortcut}`]: true});
  }

  private closeFilterShortcut(key: string) {
    this.setState({[`${key}${Suffix.Shortcut}`]: false});
  }

  private toggleFilterShortcut(key: string) {
    if (this.state[`${key}${Suffix.Shortcut}`] === true) {
      this.closeFilterShortcut(key);
    } else {
      this.openFilterShortcut(key);
    }
  }

  private transformFilters(
    filters: FilterInterface[],
  ): PopoverableAction[] | null {
    const transformedActions: PopoverableAction[] = [];

    getShortcutFilters(filters).forEach((filter) => {
      const {key, label, disabled} = filter;

      transformedActions.push({
        popoverContent: this.generateFilterMarkup(filter),
        popoverOpen: Boolean(this.state[`${key}${Suffix.Shortcut}`]),
        key,
        content: label,
        disabled,
        onAction: () => this.toggleFilterShortcut(key),
      });
    });
    return transformedActions;
  }

  private generateFilterMarkup(filter: FilterInterface) {
    const intl = this.props.polaris.intl;
    const removeCallback = this.getAppliedFilterRemoveHandler(filter.key);
    const removeHandler =
      removeCallback == null
        ? undefined
        : () => {
            removeCallback(filter.key);
          };
    return (
      <div ref={this.focusNode}>
        <Stack vertical spacing="tight">
          {filter.filter}
          <Button
            plain
            disabled={removeHandler == null}
            onClick={removeHandler}
            accessibilityLabel={intl.translate('Polaris.Filters.clearLabel', {
              filterName: filter.label,
            })}
          >
            {intl.translate('Polaris.Filters.clear')}
          </Button>
        </Stack>
      </div>
    );
  }
}

function getShortcutFilters(filters: FilterInterface[]) {
  return filters.filter((filter) => filter.shortcut === true);
}

export const Filters = withAppProvider<FiltersProps>()(FiltersInner);
