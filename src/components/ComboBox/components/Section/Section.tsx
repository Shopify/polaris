import React from 'react';
import {useUniqueId} from '../../../../utilities/unique-id';
import {OptionProps} from '../Option';
import styles from './Section.scss';
import {SectionContext} from './context/section';

export type SectionProps = {
  title: string;
  children: React.ReactElement<OptionProps>[];
};

export function Section({title, children}: SectionProps) {
  const id = useUniqueId('ComboBoxOption');
  const contextValue = {
    sectionId: id,
  };
  return (
    <SectionContext.Provider value={contextValue}>
      <li
        className={styles.Title}
        id={id}
        role="option"
        aria-selected={false}
        aria-label={title}
      >
        {title}
      </li>
      {children}
    </SectionContext.Provider>
  );
}
