import type {ReactNode} from 'react';

import {useSection} from '../Section';

import styles from './Header.scss';

interface HeaderProps {
  children: ReactNode;
}

export function Header({children}: HeaderProps) {
  const sectionId = useSection() || '';

  const content =
    typeof children === 'string' ? (
      <div className={styles.Header}>{children}</div>
    ) : (
      children
    );

  return (
    <div aria-hidden id={sectionId}>
      {content}
    </div>
  );
}
