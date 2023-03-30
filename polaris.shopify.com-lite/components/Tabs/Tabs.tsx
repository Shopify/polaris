'use client';

import {className} from '@/utils';
import {Tab as HeadlessTab} from '@headlessui/react';
import {ReactNode, useEffect, useState} from 'react';
import styles from './Tabs.module.scss';

export function Tab({children}: {children: ReactNode}) {
  return (
    <HeadlessTab.Panel className={styles.Panel}>{children}</HeadlessTab.Panel>
  );
}

export function Tabs({
  tabs,
  boxed,
  children,
  onAdd,
}: {
  tabs: {id: string; label: string}[];
  boxed: boolean;
  children: ReactNode;
  onAdd?: () => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const selectedIndexWasDeleted = tabs.length - 1 < selectedIndex;
    if (selectedIndexWasDeleted) {
      setSelectedIndex(tabs.length - 1);
    }
  }, [tabs]);

  return (
    <HeadlessTab.Group
      selectedIndex={selectedIndex}
      onChange={(index) => setSelectedIndex(index)}
    >
      <HeadlessTab.List
        className={className(styles.TabList, boxed && styles.boxed)}
      >
        {tabs.map((tab) => (
          <HeadlessTab key={tab.id}>{tab.label}</HeadlessTab>
        ))}
        {onAdd && <button onClick={onAdd}>+</button>}
      </HeadlessTab.List>
      <HeadlessTab.Panels
        className={className(styles.TabPanels, boxed && styles.boxed)}
      >
        {children}
      </HeadlessTab.Panels>
    </HeadlessTab.Group>
  );
}
