import type {KeyboardEvent} from 'react';
import React, {useEffect, useCallback, useRef} from 'react';
import {PlusMinor} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {Icon} from '../../../Icon';
import type {useI18n} from '../../../../utilities/i18n';
import {useTabsMethods} from '../../hooks';
import type {TabsProps} from '../../Tabs';
import {Tab} from '../Tab';
import {CreateViewModal} from '../CreateViewModal';
import styles from '../../Tabs.scss';
import {getSelectedTab} from '../../utilities';

type CombinedProps = TabsProps & {
  i18n: ReturnType<typeof useI18n>;
};

const CREATE_NEW_VIEW_ID = 'create-new-view';

export const SmallScreenTabs = ({
  tabs,
  i18n,
  selected,
  newViewAccessibilityLabel,
  showNewTab,
  disabled,
  onSaveNewViewModal,
  onSelect,
  fitted,
}: CombinedProps) => {
  const {
    state,
    setState,
    handleCloseNewViewModal,
    handleSaveNewViewModal,
    handleClickNewTab,
    renderTabMarkup,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleToggleModal,
    handleTogglePopover,
  } = useTabsMethods({
    tabs,
    selected,
    disabled,
    onSaveNewViewModal,
    onSelect,
  });

  const {
    tabToFocus,
    isNewViewModalActive,
    isTabModalOpen,
    isTabPopoverOpen,
    modalSubmitted,
    isTabsFocused,
  } = state;

  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const moveToSelectedTab = useCallback(() => {
    const activeButton = getSelectedTab();
    if (activeButton) {
      moveToActiveTab(activeButton.offsetLeft);
    }
  }, []);

  useEffect(() => {
    moveToSelectedTab();
  }, [moveToSelectedTab, selected]);

  useEffect(() => {
    if (isTabsFocused) {
      const tabToFocus = selected;
      setState({tabToFocus});
    }
  }, [isTabsFocused, selected, setState]);

  const handleKeyPress = (event: KeyboardEvent<HTMLElement>) => {
    if (isTabModalOpen || isTabPopoverOpen || isNewViewModalActive) {
      return;
    }
    const key = event.key;
    const tabsArrayInOrder = tabs.map((_, index) => index);

    let newFocus = tabsArrayInOrder.indexOf(tabToFocus);
    if (key === 'ArrowRight') {
      newFocus += 1;
      if (newFocus === tabsArrayInOrder.length) {
        newFocus = 0;
      }
    }
    if (key === 'ArrowLeft') {
      if (newFocus === -1 || newFocus === 0) {
        newFocus = tabsArrayInOrder.length - 1;
      } else {
        newFocus -= 1;
      }
    }

    const buttonToFocus = tabsArrayInOrder[newFocus];

    if (buttonToFocus != null) {
      setState({
        tabToFocus: buttonToFocus,
      });
    }
  };

  const moveToActiveTab = (offsetLeft: number) => {
    setTimeout(() => {
      if (scrollRef.current && typeof scrollRef.current.scroll === 'function') {
        const scrollRefOffset = wrapRef?.current?.offsetLeft || 0;
        scrollRef?.current?.scroll({
          left: offsetLeft - scrollRefOffset,
        });
      }
    }, 0);
  };

  const createViewA11yLabel =
    newViewAccessibilityLabel ||
    i18n.translate('Polaris.Tabs.newViewAccessibilityLabel');

  const tabsMarkup = tabs.map((item, tabIndex) =>
    renderTabMarkup(item, tabIndex),
  );

  const classname = classNames(styles.SmallScreenTabs, fitted && styles.fitted);

  const viewNames = tabs.map(({content}) => content);

  const buttonsWrapperClassName = classNames(
    !fitted && styles.SmallScreenButtonsWrapper,
  );

  return (
    <div className={styles.SmallScreenOuter}>
      <div className={styles.SmallScreenWrapper} ref={scrollRef}>
        <div className={buttonsWrapperClassName} ref={wrapRef}>
          <ul
            role="tablist"
            className={classname}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyPress}
            data-tabs-focus-catchment
          >
            {tabsMarkup}
          </ul>
          {showNewTab && (
            <div className={styles.NewViewWrapper}>
              <CreateViewModal
                open={isNewViewModalActive}
                onClose={handleCloseNewViewModal}
                onPrimaryAction={handleSaveNewViewModal}
                viewNames={viewNames}
                activator={
                  <Tab
                    id={CREATE_NEW_VIEW_ID}
                    content={createViewA11yLabel}
                    permissions={[]}
                    isActive={false}
                    onAction={handleClickNewTab}
                    onFocus={() => {
                      if (modalSubmitted) {
                        setState({
                          tabToFocus: selected,
                          modalSubmitted: false,
                        });
                      }
                    }}
                    icon={
                      <Icon
                        source={PlusMinor}
                        accessibilityLabel={createViewA11yLabel}
                      />
                    }
                    disabled={disabled}
                    onToggleModal={handleToggleModal}
                    onTogglePopover={handleTogglePopover}
                    tabIndexOverride={0}
                  />
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
