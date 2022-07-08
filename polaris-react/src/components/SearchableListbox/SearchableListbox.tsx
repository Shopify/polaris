import React, {useState, ReactNode, ReactElement} from 'react';

import {Popover} from '../Popover';
import {Scrollable} from '../Scrollable';
import {AutoSelection, Listbox} from '../Listbox';
import {useUniqueId} from '../../utilities/unique-id';

import {StopPropagation, Search, SearchEmptyState} from './components';
import styles from './SearchableListbox.scss';

export interface SearchableListItem {
  children: string | ReactNode;
  value: string;
  selected?: boolean;
}

export interface SearchableListboxProps {
  activatorNode: ReactElement;
  open: boolean;
  showSearch: boolean;
  searchValue: string;
  searchEmptyStateMessage: string;
  searchLabel: string;
  searchPlaceholder?: string;
  listItems?: SearchableListItem[];
  loading?: boolean;
  loadingAccessibilityLabel?: string;
  footerAction?: ReactElement;
  onClose(): void;
  onSearch(search: string): void;
  onOptionSelect(selected: string): void;
  onScrolledToBottom?(): void;
}

export function SearchableListbox({
  activatorNode,
  open,
  showSearch,
  searchValue,
  searchLabel,
  searchPlaceholder,
  searchEmptyStateMessage,
  loading,
  loadingAccessibilityLabel,
  listItems,
  footerAction,
  onClose,
  onOptionSelect,
  onSearch,
  onScrolledToBottom,
}: SearchableListboxProps) {
  const [activeOptionDomId, setActiveOptionDomId] = useState<string>();
  const listId = useUniqueId('SearchableListbox');

  const showEmptyState = !loading && !listItems?.length;

  const handleActiveOptionChange = (_: string, domId: string) => {
    setActiveOptionDomId(domId);
  };

  return (
    <Popover
      preferredAlignment="left"
      activator={activatorNode}
      active={open}
      onClose={onClose}
    >
      {showSearch && (
        <Popover.Pane fixed>
          <div className={styles.SearchFieldWrapper}>
            <StopPropagation>
              <Search
                activeOptionDomId={activeOptionDomId}
                label={searchLabel}
                value={searchValue}
                placeholder={searchPlaceholder}
                listId={listId}
                onSearch={onSearch}
              />
            </StopPropagation>
          </div>
        </Popover.Pane>
      )}
      {showEmptyState ? (
        <SearchEmptyState message={searchEmptyStateMessage} />
      ) : (
        <Scrollable shadow onScrolledToBottom={onScrolledToBottom}>
          <div className={styles.ListBoxWrapper}>
            <Listbox
              autoSelection={AutoSelection.None}
              onSelect={onOptionSelect}
              customListId={listId}
              onActiveOptionChange={handleActiveOptionChange}
            >
              {listItems?.map(({children, value, selected}) => {
                return (
                  <Listbox.Option value={value} selected={selected} key={value}>
                    <Listbox.TextOption selected={selected}>
                      {children}
                    </Listbox.TextOption>
                  </Listbox.Option>
                );
              })}
              {loading && (
                <Listbox.Loading
                  accessibilityLabel={loadingAccessibilityLabel || ''}
                />
              )}
            </Listbox>
          </div>
          {!loading && footerAction && (
            <div className={styles.FooterActionWrapper}>
              <StopPropagation>{footerAction}</StopPropagation>
            </div>
          )}
        </Scrollable>
      )}
    </Popover>
  );
}
