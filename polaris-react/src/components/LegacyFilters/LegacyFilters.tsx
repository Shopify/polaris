import React, {Component, createRef} from 'react';
import {
  SearchIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  XSmallIcon,
} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import {ResourceListContext} from '../../utilities/resource-list';
import {useI18n} from '../../utilities/i18n';
import {useMediaQuery} from '../../utilities/media-query';
import {focusFirstFocusableNode} from '../../utilities/focus';
import {WithinFilterContext} from '../../utilities/within-filter-context';
import {Button} from '../Button';
import {Text} from '../Text';
import {Collapsible} from '../Collapsible';
import {Scrollable} from '../Scrollable';
import {ScrollLock} from '../ScrollLock';
import {Icon} from '../Icon';
import {TextField} from '../TextField';
import {Tag} from '../Tag';
import {Badge} from '../Badge';
import {Focus} from '../Focus';
// eslint-disable-next-line import/no-deprecated
import {Sheet} from '../Sheet';
// eslint-disable-next-line import/no-deprecated
import {LegacyStack} from '../LegacyStack';
import {Key} from '../../types';
import {KeypressListener} from '../KeypressListener';

import {ConnectedFilterControl, TagsWrapper} from './components';
import type {ConnectedFilterControlProps} from './components';
import styles from './LegacyFilters.module.scss';

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
  /**
   * @default false
   * Whether or not the clear button is displayed
   */
  hideClearButton?: boolean;
}

export interface LegacyFiltersProps {
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
  /** Hide the query field */
  hideQueryField?: boolean;
  /** Disable the query field */
  disableQueryField?: boolean;
}

type CombinedProps = LegacyFiltersProps & {
  i18n: ReturnType<typeof useI18n>;
  mediaQuery: ReturnType<typeof useMediaQuery>;
};

interface State {
  open: boolean;
  readyForFocus: boolean;
  [key: string]: boolean;
}

enum Suffix {
  Filter = 'Filter',
  Shortcut = 'Shortcut',
}

class LegacyFiltersInner extends Component<CombinedProps, State> {
  static contextType = ResourceListContext;
  context!: React.ContextType<typeof ResourceListContext>;

  state: State = {
    open: false,
    readyForFocus: false,
  };

  private moreFiltersButtonContainer = createRef<HTMLDivElement>();
  private moreFiltersDoneButtonContainer = createRef<HTMLDivElement>();
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
      onQueryClear,
      queryPlaceholder,
      children,
      disabled = false,
      helpText,
      hideTags,
      hideQueryField,
      disableQueryField = false,
      i18n,
      mediaQuery: {isNavigationCollapsed},
    } = this.props;
    const {resourceName} = this.context;
    const {open, readyForFocus} = this.state;

    const backdropMarkup = open ? (
      <>
        <ScrollLock />
        <div className={styles.Backdrop} onClick={this.closeFilters} />
      </>
    ) : null;

    const filtersContentMarkup = filters.map((filter, index) => {
      const filterIsOpen = this.state[`${filter.key}${Suffix.Filter}`] === true;
      const icon = filterIsOpen ? ChevronUpIcon : ChevronDownIcon;
      const className = classNames(
        styles.FilterTriggerContainer,
        filterIsOpen && styles.open,
        index === 0 && styles.first,
        filters.length !== 1 && index === filters.length - 1 && styles.last,
      );

      const appliedFilterContent = this.getAppliedFilterContent(filter.key);
      const appliedFilterBadgeMarkup = appliedFilterContent ? (
        <div className={styles.AppliedFilterBadgeContainer}>
          <Badge tone="new">{appliedFilterContent}</Badge>
        </div>
      ) : null;

      const collapsibleID = `${filter.key}Collapsible`;

      const buttonClassName = classNames(styles.FilterTrigger);

      return (
        <div key={filter.key} className={className}>
          <button
            onClick={() => this.toggleFilter(filter.key)}
            className={buttonClassName}
            id={`${filter.key}ToggleButton`}
            type="button"
            aria-controls={collapsibleID}
            aria-expanded={filterIsOpen}
          >
            <div className={styles.FilterTriggerLabelContainer}>
              <h3 className={styles.FilterTriggerTitle}>
                <Text
                  as="span"
                  tone={
                    this.props.disabled || filter.disabled
                      ? 'subdued'
                      : undefined
                  }
                >
                  {filter.label}
                </Text>
              </h3>
              <span className={styles.FilterTriggerIcon}>
                <Icon source={icon} tone="base" />
              </span>
            </div>
            {appliedFilterBadgeMarkup}
          </button>
          <Collapsible
            id={collapsibleID}
            open={filterIsOpen}
            onAnimationEnd={this.setReadyForFocus(true)}
          >
            <div className={styles.FilterNodeContainer}>
              <Focus
                disabled={!filterIsOpen || !readyForFocus || !open}
                root={this.focusNode}
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
        ? i18n.translate('Polaris.Filters.moreFiltersWithCount', {
            count: appliedFiltersCount,
          })
        : i18n.translate('Polaris.Filters.moreFilters');

    const rightActionMarkup = filters.length ? (
      <div ref={this.moreFiltersButtonContainer}>
        <Button onClick={this.toggleFilters} disabled={disabled} size="large">
          {moreFiltersLabel}
        </Button>
      </div>
    ) : null;

    const filterResourceName = resourceName || {
      singular: i18n.translate('Polaris.ResourceList.defaultItemSingular'),
      plural: i18n.translate('Polaris.ResourceList.defaultItemPlural'),
    };

    const transformedFilters = this.transformFilters(filters);

    const filtersControlMarkup = (
      <ConnectedFilterControl
        rightPopoverableActions={transformedFilters}
        rightAction={rightActionMarkup}
        auxiliary={children}
        disabled={disabled}
        forceShowMorefiltersButton={filters.length > transformedFilters.length}
        queryFieldHidden={hideQueryField}
      >
        {hideQueryField ? null : (
          <TextField
            placeholder={
              queryPlaceholder ||
              i18n.translate('Polaris.Filters.filter', {
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
              i18n.translate('Polaris.Filters.filter', {
                resourceName: filterResourceName.plural,
              })
            }
            labelHidden
            prefix={
              <span className={styles.SearchIcon}>
                <Icon source={SearchIcon} />
              </span>
            }
            clearButton
            onClearButtonClick={onQueryClear}
            disabled={disabled || disableQueryField}
            autoComplete="off"
          />
        )}
      </ConnectedFilterControl>
    );

    const filtersContainerHeaderClassname = classNames(
      styles.LegacyFiltersContainerHeader,
    );

    const filtersDesktopHeaderMarkup = (
      <div className={filtersContainerHeaderClassname}>
        <Text variant="headingLg" as="h3">
          {moreFiltersLabel}
        </Text>
        <Button
          icon={XSmallIcon}
          variant="plain"
          accessibilityLabel={i18n.translate('Polaris.Filters.cancel')}
          onClick={this.closeFilters}
        />
      </div>
    );

    const filtersMobileHeaderMarkup = (
      <div className={filtersContainerHeaderClassname}>
        <Button
          icon={XSmallIcon}
          variant="plain"
          accessibilityLabel={i18n.translate('Polaris.Filters.cancel')}
          onClick={this.closeFilters}
        />
        <Text variant="headingLg" as="h3">
          {moreFiltersLabel}
        </Text>
        <Button onClick={this.closeFilters} variant="primary">
          {i18n.translate('Polaris.Filters.done')}
        </Button>
      </div>
    );

    const filtersDesktopFooterClassname = classNames(
      styles.LegacyFiltersContainerFooter,
    );

    const filtersDesktopFooterMarkup = (
      <div className={filtersDesktopFooterClassname}>
        <Button
          onClick={this.handleClearAll}
          disabled={!this.hasAppliedFilters()}
        >
          {i18n.translate('Polaris.Filters.clearAllFilters')}
        </Button>
        <div ref={this.moreFiltersDoneButtonContainer}>
          <Button onClick={this.closeFilters} variant="primary">
            {i18n.translate('Polaris.Filters.done')}
          </Button>
        </div>
      </div>
    );

    const filtersMobileFooterMarkup = (
      <div className={styles.LegacyFiltersMobileContainerFooter}>
        {this.hasAppliedFilters() ? (
          <Button onClick={onClearAll} fullWidth>
            {i18n.translate('Polaris.Filters.clearAllFilters')}
          </Button>
        ) : (
          <div className={styles.EmptyFooterState}>
            <Text tone="subdued" as="span">
              <p>{i18n.translate('Polaris.Filters.noFiltersApplied')}</p>
            </Text>
          </div>
        )}
      </div>
    );

    const shouldHideTagsContainer =
      !appliedFilters || appliedFilters.length < 1;
    const tagsMarkup = !hideTags ? (
      <TagsWrapper hidden={shouldHideTagsContainer}>
        <div className={styles.TagsContainer} aria-live="polite">
          {(appliedFilters || []).map((filter) => {
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
      </TagsWrapper>
    ) : null;

    const filtersMobileContainerContentClassName = classNames(
      styles.LegacyFiltersMobileContainerContent,
    );

    const filtersDesktopContainerContentClassName = classNames(
      styles.LegacyFiltersDesktopContainerContent,
    );

    const filtersContainerMarkup = isNavigationCollapsed ? (
      <Sheet
        accessibilityLabel={moreFiltersLabel}
        open={open}
        onClose={this.closeFilters}
        onEntered={this.setReadyForFocus(true)}
        onExit={this.setReadyForFocus(false)}
      >
        {filtersMobileHeaderMarkup}
        <Scrollable className={filtersMobileContainerContentClassName} shadow>
          {filtersContentMarkup}
          {filtersMobileFooterMarkup}
        </Scrollable>
      </Sheet>
    ) : (
      <Sheet
        accessibilityLabel={moreFiltersLabel}
        open={open}
        onClose={this.closeFilters}
        onEntered={this.setReadyForFocus(true)}
        onExit={this.setReadyForFocus(false)}
      >
        <div className={styles.LegacyFiltersContainer}>
          {filtersDesktopHeaderMarkup}
          <Scrollable
            className={filtersDesktopContainerContentClassName}
            shadow
          >
            {filtersContentMarkup}
          </Scrollable>
          {filtersDesktopFooterMarkup}
        </div>
      </Sheet>
    );

    const helpTextMarkup = helpText ? (
      <div id="FiltersHelpText" className={styles.HelpText}>
        <Text tone="subdued" as="span">
          {helpText}
        </Text>
      </div>
    ) : null;

    return (
      <WithinFilterContext.Provider value>
        <div className={styles.LegacyFilters}>
          {filtersControlMarkup}
          {filtersContainerMarkup}
          {tagsMarkup}
          {helpTextMarkup}
          {backdropMarkup}
          <KeypressListener keyCode={Key.Escape} handler={this.closeFilters} />
        </div>
      </WithinFilterContext.Provider>
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

  private getAppliedFilterRemoveHandler(key: string) {
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

  private toggleFilter(key: string) {
    if (this.state[`${key}${Suffix.Filter}`] === true) {
      this.setState({readyForFocus: false, [`${key}${Suffix.Filter}`]: false});
    } else {
      this.setState({readyForFocus: false, [`${key}${Suffix.Filter}`]: true});
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

  private transformFilters(filters: FilterInterface[]) {
    const transformedActions: Required<
      ConnectedFilterControlProps['rightPopoverableActions']
    > = [];

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
    const i18n = this.props.i18n;
    const removeCallback = this.getAppliedFilterRemoveHandler(filter.key);
    const removeHandler =
      removeCallback == null
        ? undefined
        : () => {
            removeCallback(filter.key);
          };

    const clearButtonMarkup = !filter.hideClearButton && (
      <Button
        variant="plain"
        disabled={removeHandler == null}
        onClick={removeHandler}
        accessibilityLabel={i18n.translate('Polaris.Filters.clearLabel', {
          filterName: filter.label,
        })}
      >
        {i18n.translate('Polaris.Filters.clear')}
      </Button>
    );

    return (
      <div ref={this.focusNode}>
        <LegacyStack vertical spacing="tight">
          {filter.filter}
          {clearButtonMarkup}
        </LegacyStack>
      </div>
    );
  }

  private handleClearAll = () => {
    this.props.onClearAll();

    this.moreFiltersDoneButtonContainer.current &&
      focusFirstFocusableNode(
        this.moreFiltersDoneButtonContainer.current,
        false,
      );
  };
}

function getShortcutFilters(filters: FilterInterface[]) {
  return filters.filter((filter) => filter.shortcut === true);
}

/**
 * @deprecated The LegacyFilters component will be removed in the next
 * major version. The Filters component can be used as a standalone
 * component, but is used primarily within the IndexFilters for sorting
 * and filtering IndexTables. See the Polaris component guide on how to
 * use IndexFilters and Filters.
 *
 * https://polaris.shopify.com/components/selection-and-input/filters
 * https://polaris.shopify.com/components/selection-and-input/index-filters
 */
export function LegacyFilters(props: LegacyFiltersProps) {
  const i18n = useI18n();
  const mediaQuery = useMediaQuery();

  return <LegacyFiltersInner {...props} i18n={i18n} mediaQuery={mediaQuery} />;
}
