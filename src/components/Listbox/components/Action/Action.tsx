import React from 'react';

import {Icon} from '../../../Icon';
import type {IconProps} from '../../../Icon';
import {Option, OptionProps} from '../Option';
import {TextOption} from '../TextOption';

import styles from './Action.scss';

interface ActionProps extends OptionProps {
  icon?: IconProps['source'];
}

export function Action(props: ActionProps) {
  const {selected, disabled, children, icon} = props;

  const iconMarkup = icon && (
    <div className={styles.Icon}>
      <Icon color="subdued" source={icon} />
    </div>
  );

  return (
    <Option {...props}>
      <TextOption selected={selected} disabled={disabled}>
        <div className={styles.Action}>
          {iconMarkup}
          {children}
        </div>
      </TextOption>
    </Option>
  );
}
