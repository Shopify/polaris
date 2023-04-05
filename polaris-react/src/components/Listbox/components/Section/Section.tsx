import React from 'react';
import type {ReactNode} from 'react';

import {classNames} from '../../../../utilities/css';
import {useUniqueId} from '../../../../utilities/unique-id';

import {listboxSectionDataSelector} from './selectors';
import {SectionContext} from './context';
import styles from './Section.module.scss';

interface SectionProps {
  divider?: boolean;
  children?: ReactNode;
  title: ReactNode;
}

export function Section({children, divider = true, title}: SectionProps) {
  const sectionId = useUniqueId('ListboxSection');

  return (
    <SectionContext.Provider value={sectionId}>
      <li role="presentation" {...listboxSectionDataSelector.props}>
        {title}
        <ul
          role="group"
          aria-labelledby={sectionId}
          className={classNames(
            styles.SectionGroup,
            !divider && styles.noDivider,
          )}
        >
          {children}
        </ul>
      </li>
    </SectionContext.Provider>
  );
}
