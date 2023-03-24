'use client';

import {className, toPascalCase} from '@/utils';
import Link from 'next/link';
import {ReactNode, useEffect, useRef} from 'react';
import styles from './Button.module.scss';

interface Props {
  label: string;
  ariaLabel?: string;
  didJustCopy?: boolean;
  didJustDownload?: boolean;
  onClick: () => void;
  icon?: 'download' | 'copy';
}

function Button({
  label,
  ariaLabel,
  didJustCopy,
  didJustDownload,
  onClick,
  icon,
}: Props) {
  return (
    <button
      className={className(styles.Button, label.length === 0 && styles.noLabel)}
      onClick={onClick}
      data-icon={icon}
      aria-label={ariaLabel}
    >
      {label}

      {didJustCopy && (
        <span className={styles.CopyIndicator} aria-hidden={true}>
          <span></span>
        </span>
      )}
      {didJustDownload && (
        <span className={styles.DownloadIndicator} aria-hidden={true}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      )}
    </button>
  );
}

export function ButtonGroup({children}: {children: ReactNode}) {
  return <div className={styles.ButtonGroup}>{children}</div>;
}

export default Button;
