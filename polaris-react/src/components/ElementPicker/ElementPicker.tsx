import React, {useMemo, useState, ReactNode, ReactElement} from 'react';
import {createUniqueIDFactory} from '@web-utilities/id';

import {Popover} from '../Popover';
import {Scrollable} from '../Scrollable';
import {Listbox} from '../Listbox';

import {Search} from './components/Search';
import {SearchEmptyState} from './components/SearchEmptyState';
import {StopPropagation} from './components/StopPropagation';
import styles from './ElementPicker.scss';

interface ListItem {
  children: string | ReactNode;
  value: string;
  selected?: boolean;
}

export interface Props {
  activatorNode: ReactElement;
  open: boolean;
  listItems?: ListItem[];
  loading?: boolean;
  action?: ReactElement;
  loadingAccessibilityLabel?: string;
  searchPlaceholder?: string;
  searchEmptyStateMessage: string;
  onClose(): void;
  onSearch(search: string): void;
  onOptionSelect(selected: string): void;
  onScrolledToBottom?(): void;
}

const getUniqueId = createUniqueIDFactory('ElementPicker');

export function ElementPicker({
  activatorNode,
  open,
  searchPlaceholder,
  searchEmptyStateMessage,
  loading,
  loadingAccessibilityLabel,
  listItems,
  action,
  onClose,
  onOptionSelect,
  onSearch,
  onScrolledToBottom,
}: Props) {
  const [activeOptionDomId, setActiveOptionDomId] = useState<string>();
  const listId = useMemo(() => getUniqueId(), []);

  const showSearch = listItems?.length >= MINIMUM_COUNT_FOR_SEARCH;
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
                placeholder={searchPlaceholder}
                value={searchValue}
                activeOptionDomId={activeOptionDomId}
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
          {!loading && action && (
            <div className={styles.ActionWrapper}>
              <StopPropagation>{action}</StopPropagation>
            </div>
          )}
        </Scrollable>
      )}
    </Popover>
  );
}
