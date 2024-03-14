import React, {useId} from 'react';
import type {ReactNode} from 'react';

import {classNames} from '../../../../utilities/css';

import {listboxSectionDataSelector} from './selectors';
import {SectionContext} from './context';
import styles from './Section.module.css';

interface SectionProps {
  divider?: boolean;
  children?: ReactNode;
  title: ReactNode;
}

export function Section({children, divider = true, title}: SectionProps) {
  const id = useId();

  return (
    <SectionContext.Provider value={id}>
      <li role="presentation" {...listboxSectionDataSelector.props}>
        {title}
        <ul
          role="group"
          aria-labelledby={id}
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
