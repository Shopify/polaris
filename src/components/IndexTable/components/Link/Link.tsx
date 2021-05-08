import React from 'react';

import {classNames} from '../../../../utilities/css';
import {UnstyledLink} from '../../../UnstyledLink';

import styles from './Link.scss';

interface LinkProps {
  url: string;
  children: React.ReactNode;
  subdued?: boolean;
  condensed?: boolean;
  external?: boolean
  onClick?(): void;
}

export function Link({
  url,
  subdued,
  condensed,
  onClick,
  children,
  external,
}: LinkProps) {
  const linkClasses = classNames(
    styles.Link,
    subdued && styles.subdued,
    condensed && styles.condensed,
  );

  const linkAttributes = {
    external: external ? true : false,
    className: linkClasses,
    url,
  };

  const handleClick = (event: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }

    stopPropagation(event);
  };

  return (
    <UnstyledLink {...linkAttributes} onClick={handleClick}>
      {children}
    </UnstyledLink>
  );
}

function stopPropagation(event: React.MouseEvent) {
  event.stopPropagation();
}
