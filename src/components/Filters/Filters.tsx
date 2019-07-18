import * as React from 'react';
import debounce from 'lodash/debounce';
import compose from '@shopify/react-compose';
import {classNames} from '@shopify/css-utilities';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import {
  SearchMinor,
  ChevronUpMinor,
  ChevronDownMinor,
  CancelSmallMinor,
} from '@shopify/polaris-icons';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import {Consumer, ResourceListContext} from '../ResourceList';
import Button from '../Button';
import DisplayText from '../DisplayText';
import Collapsible from '../Collapsible';
import Scrollable from '../Scrollable';
import ScrollLock from '../ScrollLock';
import Icon from '../Icon';
import TextField from '../TextField';
import Tag from '../Tag';
import EventListener from '../EventListener';
import TextStyle from '../TextStyle';
import Badge from '../Badge';
import Focus from '../Focus';
import Sheet from '../Sheet';
import Stack from '../Stack';
import withContext from '../WithContext';
import {Key, WithContextTypes} from '../../types';

import {navigationBarCollapsed} from '../../utilities/breakpoints';
import KeypressListener from '../KeypressListener';
import {ConnectedFilterControl, PopoverableAction} from './components';

import styles from './Filters.scss';

export interface AppliedFilter {
  /** A unique key used to identify the applied filter */
  key: string;
  /** A label for the applied filter */
  label: string;
  /** Callback when the remove button is pressed */
  onRemove(key: string): void;
}

export interface Filter {
  /** A unique key used to identify the filter */
  key: string;
  /** The label for the filter */
  label: string;
  /** The markup for the given filter */
  filter: React.ReactNode;
  /** Whether or not the filter should have a shortcut popover displayed */
  shortcut?: boolean;
}

export interface Props {
  /** Currently entered text in the query field */
  queryValue?: string;
  /** Placeholder text for the query field */
  queryPlaceholder?: string;
  /** Whether the query field is focused */
  focused?: boolean;
  /** Available filters added to the sheet. Shortcut filters are exposed outside of the sheet. */
  filters: Filter[];
  /** Applied filters which are rendered as tags. The remove callback is called with the respective key */
  appliedFilters?: AppliedFilter[];
  /** Callback when the query field is changed */
  onQueryChange(queryValue: string): void;
  /** Callback when the clear button is triggered */
  onQueryClear(): void;
  /** Callback when the reset all button is pressed */
  onClearAll(): void;
  /** Callback when the query field is blurred */
  onQueryBlur?(): void;
  /** The content to display inline with the controls */
  children?: React.ReactNode;
}

type ComposedProps = Props &
  WithAppProviderProps &
  WithContextTypes<ResourceListContext>;

interface State {
  open: boolean;
  mobile: boolean;
  readyForFocus: boolean;
  [key: string]: boolean;
}

enum Suffix {
  Filter = 'Filter',
  Shortcut = 'Shortcut',
}

class Filters extends React.Component<ComposedProps, State> {
  state: State = {
    open: false,
    mobile: false,
    readyForFocus: false,
  };

  private moreFiltersButtonContainer = React.createRef<HTMLDivElement>();

  private get hasAppliedFilters(): boolean {
    const {appliedFilters, queryValue} = this.props;
    const filtersApplied = Boolean(appliedFilters && appliedFilters.length > 0);
    const queryApplied = Boolean(queryValue && queryValue !== '');

    return filtersApplied || queryApplied;
  }

  private handleResize = debounce(
    () => {
      const {mobile} = this.state;
      if (mobile !== isMobile()) {
        this.setState({mobile: !mobile});
      }
    },
    40,
    {leading: true, trailing: true, maxWait: 40},
  );

  componentDidMount() {
    this.handleResize();
  }

  render() {
    const {
      filters,
      queryValue,
      onQueryBlur,
      onQueryChange,
      focused,
      onClearAll,
      appliedFilters,
      polaris: {intl},
      onQueryClear,
      queryPlaceholder,
      context: {resourceName},
      children,
    } = this.props;
    const {open, mobile, readyForFocus} = this.state;

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
        index === filters.length - 1 && styles.last,
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
              <h2 className={styles.FilterTriggerTitle}>{filter.label}</h2>
              <span className={styles.FilterTriggerIcon}>
                <Icon source={icon} color="inkLightest" />
              </span>
            </div>
            {appliedFilterBadgeMarkup}
          </button>
          <Collapsible id={collapsibleID} open={filterIsOpen}>
            <div className={styles.FilterNodeContainer}>
              <Focus disabled={!filterIsOpen || !readyForFocus || !open}>
                {this.generateFilterMarkup(filter)}
              </Focus>
            </div>
          </Collapsible>
        </div>
      );
    });

    const rightActionMarkup = (
      <div ref={this.moreFiltersButtonContainer}>
        <Button onClick={this.toggleFilters} testID="SheetToggleButton">
          {intl.translate('Polaris.Filters.moreFilters')}
        </Button>
      </div>
    );

    const filtersControlMarkup = (
      <ConnectedFilterControl
        rightPopoverableActions={this.transformFilters(filters)}
        rightAction={rightActionMarkup}
        auxiliary={children}
      >
        <TextField
          placeholder={
            queryPlaceholder ||
            intl.translate('Polaris.Filters.filter', {
              resourceName: resourceName.plural,
            })
          }
          onChange={onQueryChange}
          onBlur={onQueryBlur}
          value={queryValue}
          focused={focused}
          label={
            queryPlaceholder ||
            intl.translate('Polaris.Filters.filter', {
              resourceName: resourceName.plural,
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
        />
      </ConnectedFilterControl>
    );

    const filtersDesktopHeaderMarkup = (
      <div className={styles.FiltersContainerHeader}>
        <DisplayText size="small">
          {intl.translate('Polaris.Filters.moreFilters')}
        </DisplayText>
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
        <DisplayText size="small">
          {intl.translate('Polaris.Filters.moreFilters')}
        </DisplayText>
        <Button onClick={this.closeFilters} primary>
          {intl.translate('Polaris.Filters.done')}
        </Button>
      </div>
    );

    const filtersDesktopFooterMarkup = (
      <div className={styles.FiltersContainerFooter}>
        <Button onClick={onClearAll} disabled={!this.hasAppliedFilters}>
          {intl.translate('Polaris.Filters.clearAllFilters')}
        </Button>
        <Button onClick={this.closeFilters} primary>
          {intl.translate('Polaris.Filters.done')}
        </Button>
      </div>
    );

    const filtersMobileFooterMarkup = (
      <div className={styles.FiltersMobileContainerFooter}>
        {this.hasAppliedFilters ? (
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
      appliedFilters && appliedFilters.length ? (
        <div className={styles.TagsContainer}>
          {appliedFilters.map((filter) => {
            return (
              <Tag
                key={filter.key}
                onRemove={() => {
                  filter.onRemove(filter.key);
                }}
              >
                {filter.label}
              </Tag>
            );
          })}
        </div>
      ) : null;

    const filtersContainerMarkup = mobile ? (
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

    return (
      <div className={styles.Filters}>
        {filtersControlMarkup}
        {filtersContainerMarkup}
        {tagsMarkup}
        {backdropMarkup}
        <EventListener event="resize" handler={this.handleResize} />
        <KeypressListener keyCode={Key.Escape} handler={this.closeFilters} />
      </div>
    );
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

  private transformFilters(filters: Filter[]): PopoverableAction[] | null {
    const transformedActions: PopoverableAction[] = [];

    getShortcutFilters(filters).forEach((filter) => {
      const {key, label} = filter;

      transformedActions.push({
        popoverContent: this.generateFilterMarkup(filter),
        popoverOpen: this.state[`${key}${Suffix.Shortcut}`],
        key,
        content: label,
        onAction: () => this.toggleFilterShortcut(key),
      });
    });
    return transformedActions;
  }

  private generateFilterMarkup(filter: Filter) {
    const intl = this.props.polaris.intl;
    const removeCallback = this.getAppliedFilterRemoveHandler(filter.key);
    const removeHandler =
      removeCallback == null
        ? undefined
        : () => {
            removeCallback(filter.key);
          };
    return (
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
    );
  }
}

function isMobile(): boolean {
  return navigationBarCollapsed().matches;
}

function getShortcutFilters(filters: Filter[]) {
  return filters.filter((filter) => filter.shortcut === true);
}

export default compose<Props>(
  withAppProvider<Props>(),
  withContext<Props, WithAppProviderProps, ResourceListContext>(Consumer),
)(Filters);
