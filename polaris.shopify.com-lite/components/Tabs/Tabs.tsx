'use client';

import {className} from '@/utils';
import {Tab as HeadlessTab} from '@headlessui/react';
import {ReactNode} from 'react';
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
}: {
  tabs: string[];
  boxed: boolean;
  children: ReactNode;
}) {
  return (
    <HeadlessTab.Group>
      <HeadlessTab.List
        className={className(styles.TabList, boxed && styles.boxed)}
      >
        {tabs.map((tab) => (
          <HeadlessTab key={tab}>{tab}</HeadlessTab>
        ))}
      </HeadlessTab.List>
      <HeadlessTab.Panels
        className={className(styles.TabPanels, boxed && styles.boxed)}
      >
        {children}
      </HeadlessTab.Panels>
    </HeadlessTab.Group>
  );
}
