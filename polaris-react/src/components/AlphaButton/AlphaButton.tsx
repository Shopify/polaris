import React from 'react';

import {UnstyledButton} from '../UnstyledButton';
import {classNames} from '../../utilities/css';
import {Icon} from '../Icon';

import styles from './AlphaButton.scss';

export interface AlphaButtonProps {
  children?: React.ReactNode;
}

const hasChildOfType = (children: React.ReactNode, type: any) => {
  let hasType = false;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === type) {
      hasType = true;
    } else if (
      React.isValidElement(child) &&
      (child as React.ReactElement).props.children
    ) {
      hasType = hasChildOfType(
        (child as React.ReactElement).props.children,
        type,
      );
    }
  });

  return hasType;
};

export const AlphaButton = ({children}: AlphaButtonProps) => {
  const hasIcon = hasChildOfType(children, Icon);
  const className = classNames(styles.Button, hasIcon && styles.hasIcon);

  return (
    <UnstyledButton className={className}>
      <div>{children}</div>
    </UnstyledButton>
  );
};
